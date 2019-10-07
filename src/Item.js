import classnames from 'classnames';
import React from 'react';
import './Item.css';

const COLS = 40;
const ROWS = 10;

function Item({ onChange, source, tweet }) {
  return (
    <li>
      <textarea cols={COLS} onChange={onChange} rows={ROWS} value={source} />
      <textarea
        className={classnames({ warning: tweet.length > 280 })}
        cols={COLS}
        disabled="disabled"
        rows={ROWS}
        value={tweet}
      />
    </li>
  );
}

export default Item;
