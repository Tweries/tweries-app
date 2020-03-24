import classnames from 'classnames';
import { useFeature } from 'feature-provider';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { version } from '../../../package.json';
import fetchHealth from '../../api/fetchHealth';
import fetchTweetstorm from '../../api/fetchTweetstorm';
import Footer from '../../components/Footer/Footer';
import NavBar from '../../components/NavBar/NavBar';
import ReplyToTweet from '../../components/ReplyToTweet/ReplyToTweet';
import ToastNotification from '../../components/ToastNotification/ToastNotification';
import useLocalStorage from '../../hooks/useLocalStorage';
import makeTweetstorm from '../../store/makeTweetstorm';
import { types } from '../../store/makeReducer';
import {
  DANGER,
  HIDE_TAGS_V1,
  MAX_LENGTH,
  SHOW_INFO_V1,
  SUCCESS
} from '../../constants';
import { useAuth0 } from '../../react-auth0-wrapper';
import Counter from './Counter';
import makeLink from './makeLink';
import TweetstormButton from './TweetstormButton';

const copy = {
  '...': '...',
  'Edits can be made in the boxes below before publishing':
    'Edits can be made in the boxes below before publishing',
  'Log in': 'Log in',
  'Login is necessary in order for your series of Tweets to be sent through your Twitter account':
    'Login is necessary in order for your series of Tweets to be sent through your Twitter account',
  'Start typing. To insert a break prior to reaching 280 characters, please use Newline(s)':
    'Start typing. To insert a break prior to reaching 280 characters, please use Newline(s)',
  Tags: 'Tags',
  Tweet: 'Tweet',
  Tweries: 'Tweries',
  'Type your thoughts here': 'Type your thoughts here',
  "When 280 characters just aren't enough":
    "When 280 characters just aren't enough",
  'Your tweetstorm has been created!': 'Your tweetstorm has been created!',
  '#': '#',
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
        value: !response.error
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

  // eslint-disable-next-line consistent-return
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
      items.find((item) => item.tweet.length > MAX_LENGTH)
    );
  }

  function renderTextarea(item) {
    return (
      <textarea
        className={classnames('p-2 tweries-background-color-blue-white', {
          'tweries-border': item.tweet.length <= MAX_LENGTH,
          'border-2 border-red-500': item.tweet.length > MAX_LENGTH
        })}
        name={item.id}
        onChange={(e) => {
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
    let link = null;
    let message = null;
    let type = SUCCESS;
    if (error || response.error) {
      message = error ? error.message : response.error.message;
      type = DANGER;
    } else {
      link = makeLink(response.data);
    }
    console.log(error, response);
    dispatch({
      type: types.RESET_TWEETSTORM,
      value: {
        link,
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
      <header className="flex flex-row justify-between">
        {isAuthenticated ? (
          <NavBar logout={logout} user={user} />
        ) : (
          <span className="my-4" />
        )}
      </header>
      <h1 className="font-bold my-4 text-5xl text-center tweries-font-family">
        {copy.Tweries}
      </h1>
      <h2 className="my-4 text-center">
        {copy["When 280 characters just aren't enough"]}
      </h2>
      <p className="my-4 text-center">
        <FontAwesomeIcon
          className="tweries-color-blue"
          icon={faTwitter}
          size="3x"
        />
      </p>
      {isAuthenticated ? (
        <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
          <ReplyToTweet
            callback={memoizedCallback}
            onChange={setInReplyToTweetUrl}
            tweetUrl={inReplyToTweetUrl}
            userId={userId}
          />
          <p className="italic py-4 text-sm">
            {
              copy[
                'Start typing. To insert a break prior to reaching 280 characters, please use Newline(s)'
              ]
            }
          </p>
          <textarea
            className="p-2 tweries-background-color-blue-white tweries-border"
            data-testid="source"
            name="source"
            onChange={(e) => {
              dispatch({
                type: types.CHANGE_SOURCE,
                value: e.target.value
              });
              setSource(e.target.value);
            }}
            placeholder={copy['Type your thoughts here']}
            rows={8}
            value={source}
          />
          <Counter length={source.length} />
          {!feature.active(HIDE_TAGS_V1) && (
            <>
              <label className="pb-1 text-sm" htmlFor="hashtags">
                {copy.Tags}
              </label>
              <textarea
                className="p-2 tweries-background-color-blue-white tweries-border"
                data-testid="hashtags"
                name="hashtags"
                onChange={(e) => {
                  dispatch({
                    type: types.CHANGE_HASHTAGS,
                    value: e.target.value
                  });
                  setHashtags(e.target.value);
                }}
                placeholder={copy['#']}
                rows={1}
                type="text"
                value={hashtags}
              />
              <Counter length={hashtags.length} />
            </>
          )}
          {items.length > 0 && [
            <p className="italic py-4 text-sm" key="copy">
              {copy['Edits can be made in the boxes below before publishing']}
            </p>,
            <ul className="flex flex-col" data-testid="list" key="list">
              {items.map((item, index) => (
                <li className="flex flex-col" key={item.id}>
                  <label className="pb-1 text-sm" htmlFor={item.id}>
                    {`${copy.Tweet} #${index + 1}`}
                  </label>
                  {renderTextarea(item)}
                  <Counter length={item.tweet.length} type="tweet" />
                </li>
              ))}
            </ul>
          ]}
          <TweetstormButton
            disabled={disabled() || false}
            onClick={onClick}
            waiting={waiting}
          />
        </form>
      ) : (
        <>
          <p className="flex justify-center my-4">
            <button
              className="font-bold px-6 py-2 rounded tweries-background-color-blue-button"
              data-testid="login"
              onClick={() => loginWithRedirect({})}
              type="button"
            >
              {copy['Log in']}
            </button>
          </p>
          {feature.active(SHOW_INFO_V1) && (
            <p className="flex justify-center my-4">
              <FontAwesomeIcon
                className="tooltip tweries-color-dark-blue"
                icon={faInfo}
                size="1x"
              />
              <span className="p-3 mt-6 -ml-1 tooltip-text tweries-border">
                {
                  copy[
                    'Login is necessary in order for your series of Tweets to be sent through your Twitter account'
                  ]
                }
              </span>
            </p>
          )}
        </>
      )}
      <ToastNotification
        notification={notification}
        onClick={() => dispatch({ type: types.DISMISS_TOAST })}
      />
      <Footer healthy={healthy} version={version} />
    </article>
  );
}

App.propTypes = {
  initialState: PropTypes.object.isRequired,
  reducer: PropTypes.func.isRequired
};

export default App;
