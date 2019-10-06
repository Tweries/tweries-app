import React, { useReducer } from 'react';
import './App.css';
import Item from './Item';

function App() {
  function reducer(state = initialState, action) {
    switch (action.type) {
      case 'ADD_ITEM': {
        return {
          ...state,
          items: [...state.items, {}]
        };
      }
      case 'REMOVE_ITEM': {
        const copy = [...state.items];
        copy.pop();
        return {
          ...state,
          items: copy
        };
      }
      case 'UPDATE_HASHTAGS': {
        return {
          ...state,
          hashtags: action.value
        };
      }
      default:
        return state;
    }
  }

  const initialState = {
    hashtags: '',
    items: [{}]
  };

  const [{ hashtags, items }, dispatch] = useReducer(reducer, initialState);

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
          {items.map((item, index, items) => (
            <Item
              hashtags={hashtags}
              index={index}
              key={index}
              lenght={items.length}
            />
          ))}
        </ul>
        <button onClick={() => dispatch({ type: 'ADD_ITEM' })}>+</button>
        <button onClick={() => dispatch({ type: 'REMOVE_ITEM' })}>-</button>
        <button onClick={console.log}>Tweet</button>
      </form>
    </article>
  );
}

export default App;
