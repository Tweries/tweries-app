import classnames from 'classnames';
import { useFeature } from 'feature-provider';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { version } from '../../../package.json';
import fetchHealth from '../../api/fetchHealth.js';
import fetchTweetstorm from '../../api/fetchTweetstorm.js';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import ReplyToTweet from '../../components/ReplyToTweet/ReplyToTweet';
import ToastNotification from '../../components/ToastNotification/ToastNotification.js';
import useLocalStorage from '../../hooks/useLocalStorage';
import makeTweetstorm from '../../store/makeTweetstorm';
import { types } from '../../store/makeReducer';
import { MAX_LENGTH } from '../../constants';
import { useAuth0 } from '../../react-auth0-wrapper';
import Counter from './Counter';
import TweetstormButton from './TweetstormButton';

const copy = {
  '...': '...',
  'Edits can be made in the boxes below before publishing':
    'Edits can be made in the boxes below before publishing',
  'Log in': 'Log in',
  'Newline(s)': 'Newline(s)',
  "See what's happening in the world right now.":
    "See what's happening in the world right now.",
  'Start typing, to insert a break prior to reaching 280 characters please use':
    'Start typing, to insert a break prior to reaching 280 characters please use',
  'The tweetstorm has been created successfully.':
    'The tweetstorm has been created successfully.',
  Tweries: 'Tweries',
  "What's happening?": "What's happening?",
  '#hashtags': '#hashtags'
};

function App({ initialState, reducer }) {
  const {
    isAuthenticated,
    loading,
    loginWithRedirect,
    logout,
    user
  } = useAuth0();

  const feature = useFeature();

  function setHealthy(error, response) {
    if (error) {
      console.log(error);
      dispatch({ type: types.SET_HEALTHY, value: false });
    }
    if (response) {
      console.log(response);
      dispatch({
        type: types.SET_HEALTHY,
        value: response.error ? false : true
      });
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchHealth();
        setHealthy(null, response);
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

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch({ type: types.DISMISS_TOAST });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // TODO: add to global state?
  const [inReplyToTweetUrl, setInReplyToTweetUrl] = useState('');
  const [waiting, setWaiting] = useState(false);

  function disabled() {
    return (
      !isAuthenticated ||
      !items.length > 0 ||
      !healthy ||
      items.find(item => item.tweet.length > MAX_LENGTH)
    );
  }

  function renderTextarea(item) {
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

  function resetTweetstorm(error, response) {
    let message = copy['The tweetstorm has been created successfully.'];
    let type = 'success';
    if (error || response.error) {
      message = error ? error.message : response.error.message;
      type = 'danger';
    }
    console.log(error, response);
    dispatch({
      type: types.RESET_TWEETSTORM,
      value: {
        message,
        type
      }
    });
    setHashtags('');
    setInReplyToTweetUrl('');
    setSource('');
    setWaiting(false);
  }

  async function onClick() {
    setWaiting(true);
    try {
      const response = await fetchTweetstorm({
        inReplyToTweetUrl,
        items,
        userId
      });
      resetTweetstorm(null, response);
    } catch (error) {
      resetTweetstorm(error);
    }
  }

  const memoizedCallback = useCallback((error, data) => {
    if (data) {
      dispatch({
        type: types.APPEND_SCREEN_NAME,
        value: data.user.screen_name
      });
    }
  }, []);

  return loading ? (
    <article className="container content-center mx-auto m-1 p-4 text-center">
      {copy['...']}
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
      <h1 className="font-bold logo my-4 text-5xl text-center">
        {copy.Tweries}
      </h1>
      {isAuthenticated ? (
        <form className="flex flex-col" onSubmit={e => e.preventDefault()}>
          <ReplyToTweet
            callback={memoizedCallback}
            onChange={setInReplyToTweetUrl}
            tweetUrl={inReplyToTweetUrl}
            userId={userId}
          />
          <small className="mb-2 p-2">
            {
              copy[
                'Start typing, to insert a break prior to reaching 280 characters please use'
              ]
            }{' '}
            <span className="font-bold">{copy['Newline(s)']}</span>
          </small>
          <textarea
            className="bg-gray-200 border border-gray-500 p-2 rounded"
            data-testid="source"
            placeholder={copy["What's happening?"]}
            rows={8}
            value={source}
            onChange={e => {
              dispatch({
                type: types.CHANGE_SOURCE,
                value: e.target.value
              });
              setSource(e.target.value);
            }}
          />
          <Counter length={source.length} />
          <textarea
            className="bg-gray-200 border border-gray-500 p-2 rounded"
            data-testid="hashtags"
            onChange={e => {
              dispatch({
                type: types.CHANGE_HASHTAGS,
                value: e.target.value
              });
              setHashtags(e.target.value);
            }}
            placeholder={copy['#hashtags']}
            rows={1}
            type="text"
            value={hashtags}
          />
          <Counter length={hashtags.length} />
          {items.length > 0 && [
            <small className="mb-2 p-2" key="copy">
              {copy['Edits can be made in the boxes below before publishing']}
            </small>,
            <ul className="flex flex-col" data-testid="list" key="list">
              {items.map((item, index) => (
                <li className="flex flex-col" key={index}>
                  {renderTextarea(item)}
                  <Counter length={item.tweet.length} type="tweet" />
                </li>
              ))}
            </ul>
          ]}
          <TweetstormButton
            disabled={disabled()}
            onClick={onClick}
            waiting={waiting}
          />
        </form>
      ) : (
        <h2 className=" flex flex-col text-center">
          {copy["See what's happening in the world right now."]}
          <button
            className="bg-gray-300 border border-gray-500 font-bold my-4 px-4 rounded self-center"
            data-testid="login"
            onClick={() => loginWithRedirect({})}
          >
            {copy['Log in']}
          </button>
        </h2>
      )}
      <ToastNotification
        notification={notification}
        onClick={() => dispatch({ type: types.DISMISS_TOAST })}
      />
      <Footer healthy={healthy} version={version} />
    </article>
  );
}

export default App;
