import makeReducer, { types } from './makeReducer';
import makeInitialState from './makeInitialState';

const USER_ID = 'twitter|1183836409850814464';

const feature = { active: () => true };
const base = { ...makeInitialState({ feature }) };
const notification = { message: 'Oh Noes!', type: 'danger' };

describe('reducer', () => {
  const scenarios = [
    {
      description: types.APPEND_SCREEN_NAME,
      props: {
        action: {
          type: types.APPEND_SCREEN_NAME,
          value: 'TweriesApp'
        },
        state: { ...base, source: 'is awesome' }
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
          items: [
            { id: 'baz', tweet: 'qux' },
            { id: 'quuz', tweet: 'corge' }
          ],
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
      items.forEach((item) => {
        expect(item).toMatchSnapshot({
          id: expect.any(String)
        });
      });
    });
  });
});
