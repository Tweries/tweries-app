import makeItem from './makeItem';

const HASHTAGS = '#prodmgmt';

const initialState = {
  hashtags: HASHTAGS,
  items: [
    makeItem(HASHTAGS, null, 4, 1, 'Foo'),
    makeItem(HASHTAGS, null, 4, 2, 'Bar'),
    makeItem(HASHTAGS, null, 4, 3, 'Barfood'),
    makeItem(HASHTAGS, null, 4, 4, 'Barfood at bar')
  ]
};

export default initialState;
