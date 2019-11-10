import classnames from 'classnames';
import React, { useEffect, useReducer } from 'react';
import { version } from '../../../package.json';
import fetchHealth from '../../api/fetchHealth.js';
import fetchTweetstorm from '../../api/fetchTweetstorm.js';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import ToastNotification from '../../components/ToastNotification/ToastNotification.js';
import useLocalStorage from '../../hooks/useLocalStorage';
import makeTweetstorm from '../../store/makeTweetstorm';
import { types } from '../../store/makeReducer';
import {
  EDITABLE_TWEETSTORM_V1,
  MAX_LENGTH,
  READONLY_TWEETSTORM_V2
} from '../../constants';
import { useAuth0 } from '../../react-auth0-wrapper';
import Counter from './Counter';
import TweetstormButton from './TweetstormButton';

function App({ feature, initialState, reducer }) {
  const {
    isAuthenticated,
    loading,
    loginWithRedirect,
    logout,
    user
  } = useAuth0();

  function setHealthy(error, data) {
    let message = data;
    let value = true;
    if (error) {
      message = error;
      value = false;
    }
    console.log(message);
    dispatch({ type: types.SET_HEALTHY, value });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchHealth();
        setHealthy(null, data);
      } catch (error) {
        setHealthy(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch({ type: types.SET_USER_ID, value: user.sub });
    }
  }, [isAuthenticated, user]);

  const [hashtags_, setHashtags] = useLocalStorage('hashtags', '');
  const [source_, setSource] = useLocalStorage('source', '');

  const [
    { hashtags, healthy, items, notification, source, userId },
    dispatch
  ] = useReducer(reducer, {
    ...initialState,
    hashtags: hashtags_,
    items: makeTweetstorm(feature)({
      hashtags: hashtags_,
      linefeed: initialState.linefeed,
      source: source_
    }),
    source: source_
  });

  function disabled() {
    return !isAuthenticated || !items.length > 0 || !healthy;
  }

  function renderTextarea(item) {
    if (feature.active(EDITABLE_TWEETSTORM_V1)) {
      return (
        <textarea
          className={classnames('bg-gray-200 p-2 rounded', {
            'border border-gray-500': item.tweet.length <= MAX_LENGTH,
            'border-2 border-red-500': item.tweet.length > MAX_LENGTH
          })}
          onChange={e => {
            dispatch({
              type: types.CHANGE_TWEET,
              value: {
                id: item.id,
                tweet: e.target.value
              }
            });
          }}
          rows={4}
          value={item.tweet}
        />
      );
    }
    if (feature.active(READONLY_TWEETSTORM_V2)) {
      return <p className="p-2 text-gray-700">{item.tweet}</p>;
    } else {
      return (
        <textarea
          className="bg-gray-200 border border-gray-500 p-2 rounded"
          disabled
          readOnly
          rows={4}
          value={item.tweet}
        />
      );
    }
  }

  function resetTweetstorm(error, data) {
    let message = 'The tweetstorm has been created successfully.';
    let type = 'success';
    if (error) {
      message = error.message;
      type = 'danger';
    }
    console.log(error, data);
    dispatch({
      type: types.RESET_TWEETSTORM,
      value: {
        message,
        type
      }
    });
    setSource('');
    setHashtags('');
  }

  async function onClick() {
    try {
      const data = await fetchTweetstorm({ items, userId });
      resetTweetstorm(null, data);
    } catch (error) {
      resetTweetstorm(error);
    }
  }

  return loading ? (
    <article className="container content-center mx-auto m-1 p-4 text-center">
      ...
    </article>
  ) : (
    <article className="container content-center mx-auto m-1 p-4">
      <NavBar
        dispatch={dispatch}
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        logout={logout}
        user={user}
      />
      <h1 className="font-bold logo my-4 text-5xl text-center">Tweries</h1>
      <form className="flex flex-col" onSubmit={e => e.preventDefault()}>
        <small className="mb-4">
          Start typing, to insert a break prior to reaching 280 characters
          please use <span className="font-bold">Newline(s)</span>
        </small>
        <textarea
          className="bg-gray-200 border border-gray-500 p-2 rounded"
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
          className="bg-gray-200 border border-gray-500 p-2 rounded"
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
        <ul className="flex flex-col" data-testid="list">
          {items.map((item, index) => (
            <li className="flex flex-col" key={index}>
              {renderTextarea(item)}
              <Counter length={item.tweet.length} type="tweet" />
            </li>
          ))}
        </ul>
        <TweetstormButton disabled={disabled()} onClick={onClick} />
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
