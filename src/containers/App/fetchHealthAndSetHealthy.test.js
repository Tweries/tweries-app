import { types } from '../../store/makeReducer';
import fetchHealthAndSetHealthy from './fetchHealthAndSetHealthy';

describe('fetchHealthAndSetHealthy', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it.skip('healthy', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { message: 'foo' } }));

    const dispatch = jest.fn();

    await fetchHealthAndSetHealthy(dispatch);

    expect(dispatch).toBeCalledWith({ type: types.SET_HEALTHY, value: true });
  });

  it('unhealthy', async () => {
    fetch.mockResponseOnce(JSON.stringify({ error: new Error('Oh Noes!') }));

    const dispatch = jest.fn();

    await fetchHealthAndSetHealthy(dispatch);

    expect(dispatch).toBeCalledWith({ type: types.SET_HEALTHY, value: false });
  });

  it('error', async () => {
    fetch.mockResponseOnce('');

    const dispatch = jest.fn();

    await fetchHealthAndSetHealthy(dispatch);

    expect(dispatch).toBeCalledWith({ type: types.SET_HEALTHY, value: false });
  });
});
