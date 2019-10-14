import classnames from 'classnames';
import React, { useEffect, useReducer } from 'react';
import { version } from '../../../package.json';
import NavBar from '../../components/NavBar/NavBar';
import initialState from '../../store/initialState';
import reducer from '../../store/reducer';
import { useAuth0 } from '../../react-auth0-wrapper';
import './App.css';
import augment from './augment';

const BASE_URL = 'https://china-musk-api.herokuapp.com'; // 'https://china-musk-api.herokuapp.com' | 'http://localhost:9000'

function App() {
  const { isAuthenticated, loading } = useAuth0();

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/health`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        dispatch({ type: 'SET_HEALTHY', value: true });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: 'SET_HEALTHY', value: false });
      });
  }, []);

  const [{ hashtags, healthy, items, source }, dispatch] = useReducer(
    augment(reducer),
    initialState
  );

  function disabled() {
    return !isAuthenticated || !items.length > 0 || !healthy;
  }

  return loading ? (
    <article>...</article>
  ) : (
    <article>
      <NavBar />
      <h1>Serial Twitter</h1>
      <form onSubmit={e => e.preventDefault()}>
        <textarea
          data-testid="source"
          rows={16}
          value={source}
          onChange={e =>
            dispatch({ type: 'CHANGE_SOURCE', value: e.target.value })
          }
        />
        <input
          data-testid="hashtags"
          onChange={e =>
            dispatch({ type: 'CHANGE_HASHTAGS', value: e.target.value })
          }
          type="text"
          value={hashtags}
        />
        <button
          data-testid="generate"
          onClick={() => dispatch({ type: 'GENERATE_TWEETSTORM' })}
        >
          Generate Tweetstorm
        </button>
        <ul data-testid="list">
          {items.map((item, index) => (
            <li key={index}>
              <textarea readOnly rows={8} value={item.tweet} />
            </li>
          ))}
        </ul>
        <button
          data-testid="tweet"
          disabled={disabled()}
          onClick={() => {
            fetch(`${BASE_URL}/api/v1/tweetstorm`, {
              body: JSON.stringify({ items }),
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'POST'
            })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                dispatch({ type: 'RESET_TWEETSTORM' });
              })
              .catch(error => {
                console.log(error);
                dispatch({ type: 'RESET_TWEETSTORM' });
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
