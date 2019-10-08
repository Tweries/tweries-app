import React, { useReducer } from 'react';
import { version } from '../../../package.json';
import Item from '../../components/Item';
import initialState from '../../store/initialState';
import reducer from '../../store/reducer';
import './App.css';
import augment from './augment';

function App() {
  const [{ hashtags, items }, dispatch] = useReducer(
    augment(reducer),
    initialState
  );

  return (
    <article>
      <h1>Serial Twitter</h1>
      <form onSubmit={e => e.preventDefault()}>
        <input
          data-testid="hashtags"
          onChange={e =>
            dispatch({ type: 'UPDATE_HASHTAGS', value: e.target.value })
          }
          type="text"
          value={hashtags}
        />
        <ul>
          {items.map(item => (
            <Item
              key={item.id}
              onChange={e =>
                dispatch({
                  type: 'CHANGE_SOURCE',
                  value: { id: item.id, source: e.target.value }
                })
              }
              source={item.source}
              tweet={item.tweet}
            />
          ))}
        </ul>
        <button
          data-testid="add"
          onClick={() => dispatch({ type: 'ADD_ITEM' })}
        >
          +
        </button>
        <button
          data-testid="remove"
          onClick={() => dispatch({ type: 'REMOVE_ITEM' })}
        >
          -
        </button>
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
