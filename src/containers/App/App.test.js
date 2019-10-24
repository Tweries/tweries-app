import {
  cleanup,
  render,
  fireEvent,
  waitForDomChange
} from '@testing-library/react';
import React from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth0 } from '../../react-auth0-wrapper';
import App from './App';
import reducer from '../../store/reducer';

jest.mock('../../components/NavBar/NavBar');
jest.mock('../../react-auth0-wrapper');

describe('App', () => {
  NavBar.mockImplementation(() => <div>NavBar</div>);

  beforeEach(() => {
    fetch.mockResponseOnce(JSON.stringify({ data: { message: 'baz' } }));
  });

  afterEach(() => {
    fetch.resetMocks();
    useAuth0.mockReset();
    cleanup();
  });

  it('loading', () => {
    useAuth0.mockImplementation(() => ({
      loading: true
    }));

    const { container } = render(<App reducer={reducer} />);

    expect(container).toMatchSnapshot();
  });

  const mockUseAuth0 = () => ({
    isAuthenticated: false,
    loading: false
  });

  it('unauthenticated user', () => {
    useAuth0.mockImplementation(mockUseAuth0);

    const { container } = render(<App reducer={reducer} />);

    expect(container).toMatchSnapshot();
  });

  it('change source', () => {
    useAuth0.mockImplementation(mockUseAuth0);

    const { getByTestId } = render(<App reducer={reducer} />);
    fireEvent.change(getByTestId('source'), { target: { value: 'bar' } });

    expect(getByTestId('source')).toMatchSnapshot();
  });

  it('change hashtags', () => {
    useAuth0.mockImplementation(mockUseAuth0);

    const { getByTestId } = render(<App reducer={reducer} />);
    fireEvent.change(getByTestId('hashtags'), { target: { value: '#FOO' } });

    expect(getByTestId('hashtags')).toMatchSnapshot();
  });

  it('tweet', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: { message: 'qux' } })); // INFO: adding a second response
    useAuth0.mockImplementation(() => ({
      isAuthenticated: true,
      loading: false
    }));

    const { container, getByTestId } = render(<App reducer={reducer} />);
    fireEvent.change(getByTestId('source'), { target: { value: 'bar' } });
    fireEvent.change(getByTestId('hashtags'), { target: { value: '#FOO' } });
    await waitForDomChange();
    fireEvent.click(getByTestId('tweet'));

    expect(container).toMatchSnapshot(3);
  });
});
