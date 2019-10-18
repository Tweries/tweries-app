import React from 'react';
import App from './App';
import { render, fireEvent } from '@testing-library/react';

const HASHTAGS = '#foo';
const SOURCE = 'Hello!';

describe.skip('App', () => {
  it('to match snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('change source', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('source'), {
      target: { value: SOURCE }
    });
    expect(getByTestId('source').value).toEqual(SOURCE);
  });

  it('change hashtags', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('hashtags'), { target: { value: HASHTAGS } });
    expect(getByTestId('hashtags').value).toEqual(HASHTAGS);
  });

  it('click on generate', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('generate'));
    expect(getByTestId('list')).toMatchSnapshot();
  });

  it('tweet', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('tweet'));
    // TODO: add assertion
  });
});
