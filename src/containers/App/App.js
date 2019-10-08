import React, { useReducer } from 'react';
import { version } from '../../../package.json';
import initialState from '../../store/initialState';
import reducer from '../../store/reducer';
import './App.css';
import augment from './augment';

function App() {
  const [{ hashtags, items, source }, dispatch] = useReducer(
    augment(reducer),
    initialState
  );

  return (
    <article>
      <h1>Serial Twitter</h1>
      <form onSubmit={e => e.preventDefault()}>
        <textarea
          cols={80}
          data-testid="source"
          rows={10}
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
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <textarea cols={80} readOnly rows={5} value={item.tweet} />
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
