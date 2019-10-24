import classnames from 'classnames';
import React, { useEffect, useReducer } from 'react';
import { version } from '../../../package.json';
import NavBar from '../../components/NavBar/NavBar';
import useLocalStorage from '../../hooks/useLocalStorage';
import makeInitialState from '../../store/makeInitialState';
import { types } from '../../store/reducer';
import { useAuth0 } from '../../react-auth0-wrapper';
import './App.css';

const BASE_URL = 'https://china-musk-api.herokuapp.com'; // 'https://china-musk-api.herokuapp.com' | 'http://localhost:9000'

function App({ reducer }) {
  const { isAuthenticated, loading } = useAuth0();

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/health`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch({ type: types.SET_HEALTHY, value: true });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: types.SET_HEALTHY, value: false });
      });
  }, []);

  const [hashtags_, setHashtags] = useLocalStorage('hashtags', '');
  const [source_, setSource] = useLocalStorage('source', '');

  const [{ hashtags, healthy, items, source, userId }, dispatch] = useReducer(
    reducer,
    makeInitialState(hashtags_, source_)
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
        <small>
          Start typing, to insert a break prior to reaching 280 characters
          please use [..]
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
        <ul data-testid="list">
          {items.map((item, index) => (
            <li key={index}>
              <textarea readOnly rows={4} value={item.tweet} />
            </li>
          ))}
        </ul>
        <button
          className={classnames('App__button', {
            'App__button--disabled': disabled()
          })}
          data-testid="tweet"
          disabled={disabled()}
          onClick={() => {
            fetch(`${BASE_URL}/api/v1/tweetstorm`, {
              body: JSON.stringify({ items, userId }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                dispatch({ type: types.RESET_TWEETSTORM });
                setSource('');
                setHashtags('');
              })
              .catch(error => {
                console.log(error);
                dispatch({ type: types.RESET_TWEETSTORM });
                setSource('');
                setHashtags('');
              });
          }}
        >
          Tweet
        </button>
      </form>
      <footer className={classnames({ healthy: healthy })}>v{version}</footer>
    </article>
  );
}

export default App;
