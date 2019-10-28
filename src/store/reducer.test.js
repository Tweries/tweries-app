import reducer, { types } from './reducer';
import makeInitialState from './makeInitialState';

const USER_ID = 'twitter|1183836409850814464';

const feature = { active: () => true };
const base = { ...makeInitialState({ feature }) };

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
      description: types.RESET_TWEETSTORM,
      props: {
        action: {
          type: types.RESET_TWEETSTORM
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
        state: base
      }
    }
  ];

  scenarios.forEach(({ description, props: { action, state } }) => {
    it(description, () => {
      expect(reducer(state, action)).toMatchSnapshot();
    });
  });
});
