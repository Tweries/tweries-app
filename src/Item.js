import classnames from 'classnames';
import React, { useState } from 'react';
import './Item.css';

const COLS = 40;
const ROWS = 10;

function Item({ hashtags, index, lenght }) {
  const [source, setSource] = useState('');

  function makeTweet() {
    return `${index + 1}/${lenght} ${source} ${hashtags}`;
  }

  return (
    <li>
      <textarea
        cols={COLS}
        onChange={e => {
          setSource(e.target.value);
        }}
        rows={ROWS}
        value={source}
      />
      <textarea
        className={classnames({ warning: makeTweet().length > 280 })}
        cols={COLS}
        disabled="disabled"
        rows={ROWS}
        value={makeTweet()}
      />
    </li>
  );
}

export default Item;
