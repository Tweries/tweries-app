import PropTypes from 'prop-types';
import React from 'react';
import { MAX_LENGTH } from '../../constants';
import Counter from '../Counter/Counter';
import ReplyToTweet from '../ReplyToTweet/ReplyToTweet';
import Textarea from '../Textarea/Textarea';
import TweetstormButton from '../TweetstormButton/TweetstormButton';

const copy = {
  'Edits can be made in the boxes below before publishing':
    'Edits can be made in the boxes below before publishing',
  'Start typing. To insert a break prior to reaching 280 characters, please use Newline(s)':
    'Start typing. To insert a break prior to reaching 280 characters, please use Newline(s)',
  Tweet: 'Tweet',
  'Type your thoughts here': 'Type your thoughts here'
};

function Form({
  healthy,
  inReplyToTweetUrl,
  items,
  onChangeSource,
  onChangeTweet,
  onClick,
  replyToTweetCallback,
  setInReplyToTweetUrl,
  source,
  userId,
  waiting
}) {
  function disabled() {
    return (
      !healthy ||
      !items.length > 0 ||
      items.some((item) => item.tweet.length > MAX_LENGTH)
    );
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={/* istanbul ignore next */ (e) => e.preventDefault()}
    >
      <ReplyToTweet
        callback={replyToTweetCallback}
        onChange={setInReplyToTweetUrl}
        tweetUrl={inReplyToTweetUrl}
        userId={userId}
      />
      <p className="italic py-4 text-sm">
        {
          copy[
            'Start typing. To insert a break prior to reaching 280 characters, please use Newline(s)'
          ]
        }
      </p>
      <textarea
        className="p-2 tweries-background-color-blue-white tweries-border"
        data-testid="source"
        name="source"
        onChange={onChangeSource}
        placeholder={copy['Type your thoughts here']}
        rows={8}
        value={source}
      />
      <Counter length={source.length} />
      {items.length > 0 && [
        <p className="italic py-4 text-sm" key="copy">
          {copy['Edits can be made in the boxes below before publishing']}
        </p>,
        <ul className="flex flex-col" data-testid="list" key="list">
          {items.map((item, index) => (
            <li className="flex flex-col" key={item.id}>
              <label className="pb-1 text-sm" htmlFor={item.id}>
                {`${copy.Tweet} #${index + 1}`}
              </label>
              <Textarea item={item} onChange={(e) => onChangeTweet(e, item)} />
              <Counter length={item.tweet.length} type="tweet" />
            </li>
          ))}
        </ul>
      ]}
      <TweetstormButton
        disabled={disabled()}
        onClick={onClick}
        waiting={waiting}
      />
    </form>
  );
}

Form.propTypes = {
  healthy: PropTypes.bool.isRequired,
  inReplyToTweetUrl: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChangeSource: PropTypes.func.isRequired,
  onChangeTweet: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  replyToTweetCallback: PropTypes.func.isRequired,
  setInReplyToTweetUrl: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  waiting: PropTypes.bool.isRequired
};

export default Form;
