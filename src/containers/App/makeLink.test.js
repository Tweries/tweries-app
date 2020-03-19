import makeLink from './makeLink';

describe('makeLink', () => {
  const scenarios = [
    {
      statusIds: [
        '1230233654959407104',
        '1230233655626301442',
        '1230233656658157573'
      ],
      userId: 'twitter|1183836409850814464'
    }
  ];

  scenarios.forEach(data => {
    it('to match snapshot', () => {
      expect(makeLink(data)).toMatchSnapshot();
    });
  });
});
