import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { MAX_LENGTH } from '../../constants';

function Textarea({ item, onChange }) {
  return (
    <textarea
      className={classnames('p-2 tweries-background-color-blue-white', {
        'border-2 border-red-500': item.tweet.length > MAX_LENGTH,
        'tweries-border': item.tweet.length <= MAX_LENGTH
      })}
      data-testid="textarea"
      name={item.id}
      onChange={onChange}
      rows={4}
      value={item.tweet}
    />
  );
}

Textarea.propTypes = {
  item: PropTypes.shape({ id: PropTypes.string, tweet: PropTypes.string })
    .isRequired,
  onChange: PropTypes.func.isRequired
};

export default Textarea;
