import initialState from './initialState';
import makeItem from './makeItem';

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      return {
        ...state,
        items: [
          ...state.items.map(
            item =>
              (item = makeItem(
                state.hashtags,
                item.id,
                state.items.length + 1,
                item.position,
                item.source
              ))
          ),
          makeItem(
            state.hashtags,
            null,
            state.items.length + 1,
            state.items.length + 1
          )
        ]
      };
    }
    case 'CHANGE_SOURCE': {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.value.id) {
            item = makeItem(
              state.hashtags,
              item.id,
              state.items.length,
              item.position,
              action.value.source
            );
          }
          return item;
        })
      };
    }
    case 'REMOVE_ITEM': {
      const copy = [...state.items];
      copy.pop();
      return {
        ...state,
        items: copy.map(
          item =>
            (item = makeItem(
              state.hashtags,
              item.id,
              copy.length,
              item.position,
              item.source
            ))
        )
      };
    }
    case 'UPDATE_HASHTAGS': {
      return {
        ...state,
        hashtags: action.value,
        items: state.items.map(
          item =>
            (item = makeItem(
              action.value,
              item.id,
              state.items.length,
              item.position,
              item.source
            ))
        )
      };
    }
    default:
      return state;
  }
}

export default reducer;
