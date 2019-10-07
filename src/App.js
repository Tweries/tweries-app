import React, { useReducer } from 'react';
import { version } from '../package.json';
import './App.css';
import augment from './augment';
import initialState from './initialState';
import Item from './Item';
import reducer from './reducer';

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
        <button onClick={() => dispatch({ type: 'ADD_ITEM' })}>+</button>
        <button onClick={() => dispatch({ type: 'REMOVE_ITEM' })}>-</button>
        <button onClick={() => console.log('now:', new Date())}>Tweet</button>
      </form>
      <footer>v{version}</footer>
    </article>
  );
}

export default App;
