import makeReducer, { types } from './makeReducer';
import makeInitialState from './makeInitialState';

const USER_ID = 'twitter|1183836409850814464';

const feature = { active: () => true };
const base = { ...makeInitialState({ feature }) };
const notification = { message: 'Oh Noes!', type: 'danger' };

describe('reducer', () => {
  const scenarios = [
    {
      description: types.CHANGE_HASHTAGS,
      props: {
        action: {
          type: types.CHANGE_HASHTAGS,
          value: '#FOO'
        },
        state: { ...base, source: 'bar' }
      }
    },
    {
      description: types.CHANGE_LINEFEED,
      props: {
        action: {
          type: types.CHANGE_LINEFEED,
          value: '||'
        },
        state: {
          ...base,
          source: 'Can you can a can [..] as a canner || can can a can?'
        }
      }
    },
    {
      description: types.CHANGE_SOURCE,
      props: {
        action: {
          type: types.CHANGE_SOURCE,
          value: 'bar'
        },
        state: base
      }
    },
    {
      description: types.CHANGE_TWEET,
      props: {
        action: {
          type: types.CHANGE_TWEET,
          value: {
            id: 'baz',
            tweet: 'quux'
          }
        },
        state: {
          ...base,
          items: [{ id: 'baz', tweet: 'qux' }, { id: 'quuz', tweet: 'corge' }],
          source: 'qux'
        }
      }
    },
    {
      description: types.DISMISS_TOAST,
      props: {
        action: {
          type: types.DISMISS_TOAST
        },
        state: {
          ...base,
          notification
        }
      }
    },
    {
      description: types.RESET_TWEETSTORM,
      props: {
        action: {
          type: types.RESET_TWEETSTORM,
          value: notification
        },
        state: {
          ...base,
          hashtags: '#FOO',
          source: 'bar',
          healthy: true,
          userId: USER_ID
        }
      }
    },
    {
      description: types.SET_HEALTHY,
      props: {
        action: {
          type: types.SET_HEALTHY,
          value: true
        },
        state: base
      }
    },
    {
      description: types.SET_USER_ID,
      props: {
        action: {
          type: types.SET_USER_ID,
          value: USER_ID
        },
        state: base
      }
    },
    {
      description: 'default',
      props: {
        action: { type: 'UNKNOWN', value: undefined },
        state: undefined
      }
    }
  ];

  scenarios.forEach(({ description, props: { action, state } }) => {
    it(description, () => {
      const { items, ...rest } = makeReducer(feature)(state, action);
      expect(rest).toMatchSnapshot();
      items.forEach(item => {
        expect(item).toMatchSnapshot({
          id: expect.any(String)
        });
      });
    });
  });
});
