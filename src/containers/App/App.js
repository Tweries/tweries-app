import { useFeature } from 'feature-provider';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { version } from '../../../package.json';
import Footer from '../../components/Footer/Footer';
import Form from '../../components/Form/Form';
import Loading from '../../components/Loading/Loading';
import LogIn from '../../components/LogIn/LogIn';
import NavBar from '../../components/NavBar/NavBar';
import SubHeader from '../../components/SubHeader/SubHeader';
import ToastNotification from '../../components/ToastNotification/ToastNotification';
import { DANGER } from '../../constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import { useAuth0 } from '../../react-auth0-wrapper';
import { types } from '../../store/makeReducer';
import makeTweetstorm from '../../store/makeTweetstorm';
import fetchHealthAndSetHealthy from './fetchHealthAndSetHealthy';
import makeOnChangeSource from './makeOnChangeSource';
import makeOnChangeTweet from './makeOnChangeTweet';
import makeOnClick from './makeOnClick';
import makeReplyToTweetCallback from './makeReplyToTweetCallback';

function App({ initialState, reducer }) {
  const {
    isAuthenticated,
    loading,
    loginWithRedirect,
    logout,
    user
  } = useAuth0();

  const feature = useFeature();

  useEffect(() => {
    fetchHealthAndSetHealthy(dispatch);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch({ type: types.SET_USER_ID, value: user.sub });
    }
  }, [isAuthenticated, user]);

  const [source_, setSource] = useLocalStorage('source', '');

  const [
    { healthy, items, notification, source, userId },
    dispatch
  ] = useReducer(reducer, {
    ...initialState,
    items: makeTweetstorm(feature)({
      linefeed: initialState.linefeed,
      source: source_
    }),
    source: source_
  });

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (notification && notification.type !== DANGER) {
      const timer = setTimeout(() => {
        dispatch({ type: types.DISMISS_TOAST });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // TODO: add to global state? YES!
  const [inReplyToTweetUrl, setInReplyToTweetUrl] = useState('');
  const [waiting, setWaiting] = useState(false);

  const onChangeSource = makeOnChangeSource({ dispatch, setSource });

  const onChangeTweet = makeOnChangeTweet({ dispatch });

  const onClick = makeOnClick({
    dispatch,
    inReplyToTweetUrl,
    items,
    setInReplyToTweetUrl,
    setSource,
    setWaiting,
    userId
  });

  const replyToTweetCallback = makeReplyToTweetCallback({ dispatch });

  const memoizedReplyToTweetCallback = useCallback(replyToTweetCallback, []);

  return loading ? (
    <Loading />
  ) : (
    <article className="container content-center mx-auto m-1 p-4">
      <header className="flex flex-row justify-between">
        {isAuthenticated ? (
          <NavBar logout={logout} user={user} />
        ) : (
          <span className="my-4" />
        )}
      </header>
      <SubHeader />
      {isAuthenticated ? (
        <Form
          healthy={healthy}
          inReplyToTweetUrl={inReplyToTweetUrl}
          items={items}
          onChangeSource={onChangeSource}
          onChangeTweet={onChangeTweet}
          onClick={onClick}
          replyToTweetCallback={memoizedReplyToTweetCallback}
          setInReplyToTweetUrl={setInReplyToTweetUrl}
          source={source}
          userId={userId}
          waiting={waiting}
        />
      ) : (
        <LogIn loginWithRedirect={loginWithRedirect} />
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
