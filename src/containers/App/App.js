import classnames from 'classnames';
import React, { useEffect, useReducer } from 'react';
import { version } from '../../../package.json';
import fetchHealth from '../../api/fetchHealth.js';
import fetchTweetstorm from '../../api/fetchTweetstorm.js';
import Footer from '../../components/Footer/Footer';
import LinefeedPicker from '../../components/LinefeedPicker/LinefeedPicker';
import NavBar from '../../components/NavBar/NavBar';
import ToastNotification from '../../components/ToastNotification/ToastNotification.js';
import useLocalStorage from '../../hooks/useLocalStorage';
import makeInitialState from '../../store/makeInitialState';
import { types } from '../../store/reducer';
import { NEWLINE } from '../../constants';
import { useAuth0 } from '../../react-auth0-wrapper';
import './App.css';
import Counter from './Counter';

function App({ feature, reducer }) {
  const { isAuthenticated, loading } = useAuth0();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchHealth();
        console.log(data);
        dispatch({ type: types.SET_HEALTHY, value: true });
      } catch (error) {
        console.log(error);
        dispatch({ type: types.SET_HEALTHY, value: false });
      }
    }
    fetchData();
  }, []);

  const [hashtags_, setHashtags] = useLocalStorage('hashtags', '');
  const [source_, setSource] = useLocalStorage('source', '');

  const [
    { hashtags, healthy, items, notification, source, userId },
    dispatch
  ] = useReducer(
    reducer,
    makeInitialState({
      feature,
      hashtags: hashtags_,
      linefeed: NEWLINE,
      source: source_
    })
  );

  function disabled() {
    return !isAuthenticated || !items.length > 0 || !healthy;
  }

  return loading ? (
    <article>...</article>
  ) : (
    <article>
      <NavBar dispatch={dispatch} />
      <h1>Tweries</h1>
      <form onSubmit={e => e.preventDefault()}>
        <small className="App__small">
          Start typing, to insert a break prior to reaching 280 characters
          please use{' '}
          <LinefeedPicker
            feature={feature}
            onChange={value => {
              dispatch({ type: types.CHANGE_LINEFEED, value });
            }}
          />
        </small>
        <textarea
          data-testid="source"
          placeholder="What's happening?"
          rows={8}
          value={source}
          onChange={e => {
            dispatch({ type: types.CHANGE_SOURCE, value: e.target.value });
            setSource(e.target.value);
          }}
        />
        <Counter length={source.length} />
        <textarea
          data-testid="hashtags"
          onChange={e => {
            dispatch({ type: types.CHANGE_HASHTAGS, value: e.target.value });
            setHashtags(e.target.value);
          }}
          placeholder="#hashtags"
          rows={1}
          type="text"
          value={hashtags}
        />
        <Counter length={hashtags.length} />
        <ul data-testid="list">
          {items.map((item, index) => (
            <li key={index}>
              <textarea readOnly rows={4} value={item.tweet} />
              <Counter length={item.length} />
            </li>
          ))}
        </ul>
        <button
          className={classnames('App__button', {
            'App__button--disabled': disabled()
          })}
          data-testid="tweet"
          disabled={disabled()}
          onClick={async () => {
            try {
              const data = await fetchTweetstorm({ items, userId });
              console.log(data);
              dispatch({
                type: types.RESET_TWEETSTORM,
                value: {
                  message: 'The tweetstorm has been created successfully.',
                  type: 'success'
                }
              });
              setSource('');
              setHashtags('');
            } catch (error) {
              console.log(error);
              dispatch({
                type: types.RESET_TWEETSTORM,
                value: { message: error.message, type: 'danger' }
              });
              setSource('');
              setHashtags('');
            }
          }}
        >
          Tweet
        </button>
      </form>
      <ToastNotification
        notification={notification}
        onClick={() => dispatch({ type: types.DISMISS_TOAST })}
      />
      <Footer healthy={healthy} version={version} />
    </article>
  );
}

export default App;
