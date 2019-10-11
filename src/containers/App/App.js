import React, { useReducer } from 'react';
import { version } from '../../../package.json';
import NavBar from '../../components/NavBar/NavBar';
import initialState from '../../store/initialState';
import reducer from '../../store/reducer';
import { useAuth0 } from '../../react-auth0-wrapper';
import './App.css';
import augment from './augment';

function App() {
  const { loading } = useAuth0();
  const [{ hashtags, items, source }, dispatch] = useReducer(
    augment(reducer),
    initialState
  );

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
          onClick={() => console.log('now:', new Date())}
        >
          Tweet
        </button>
      </form>
      <footer>v{version}</footer>
    </article>
  );
}

export default App;
