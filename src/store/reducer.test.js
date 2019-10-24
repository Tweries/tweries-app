import reducer, { types } from './reducer';
import makeInitialState from './makeInitialState';

const USER_ID = 'twitter|1183836409850814464';

describe('reducer', () => {
  const scenarios = [
    {
      description: types.CHANGE_HASHTAGS,
      props: {
        action: {
          type: types.CHANGE_HASHTAGS,
          value: '#FOO'
        },
        state: { ...makeInitialState({ source: 'bar' }) }
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
          ...makeInitialState({
            source: 'Can you can a can [..] as a canner || can can a can?'
          })
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
        state: undefined
      }
    },
    {
      description: types.RESET_TWEETSTORM,
      props: {
        action: {
          type: types.RESET_TWEETSTORM
        },
        state: {
          ...makeInitialState({ hashtags: '#FOO', source: 'bar' }),
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
        state: undefined
      }
    },
    {
      description: types.SET_USER_ID,
      props: {
        action: {
          type: types.SET_USER_ID,
          value: USER_ID
        },
        state: undefined
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
      expect(reducer(state, action)).toMatchSnapshot();
    });
  });
});
