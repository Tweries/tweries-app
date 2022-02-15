import fetchTweetstorm from './fetchTweetstorm';

describe('fetchTweetstorm', () => {
  it.skip('data', async () => {
    const STATUS_ID = '1252017902485737472';
    const USER_ID = 'twitter|1183836409850814464';

    fetch.mockResponseOnce(
      JSON.stringify({
        data: {
          message: 'TEST',
          statusIds: [STATUS_ID],
          userId: USER_ID
        }
      })
    );

    const args = {
      inReplyToTweetUrl:
        'https://twitter.com/_ericelliott/status/1250046734249664512',
      items: [
        {
          id: '_hnoyohthb',
          tweet:
            '@_ericelliott Code is temporary. It exists while it is useful.'
        }
      ],
      userId: USER_ID
    };

    const { data } = await fetchTweetstorm(args);

    expect(data.statusIds[0]).toEqual(STATUS_ID);
    expect(data.userId).toEqual(USER_ID);
  });
});
