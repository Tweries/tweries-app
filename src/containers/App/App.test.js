import React from 'react';
import App from './App';
import { render, fireEvent } from '@testing-library/react';

const HASHTAGS = '#foo';
const SOURCE = 'Hello!';

describe('App', () => {
  it('to match snapshot', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it('update hashtags', () => {
    const { getByTestId } = render(<App />);
    fireEvent.change(getByTestId('hashtags'), { target: { value: HASHTAGS } });
    expect(getByTestId('hashtags').value).toEqual(HASHTAGS);
  });

  it('update source', () => {
    const { getAllByTestId } = render(<App />);
    fireEvent.change(getAllByTestId('source')[0], {
      target: { value: SOURCE }
    });
    expect(getAllByTestId('source')[0].value).toEqual(SOURCE);
  });

  it('add item', () => {
    const { getAllByTestId, getByTestId } = render(<App />);
    fireEvent.click(getByTestId('add'));
    expect(getAllByTestId('source').length).toEqual(5);
  });

  it('remove item', () => {
    const { getAllByTestId, getByTestId } = render(<App />);
    fireEvent.click(getByTestId('remove'));
    expect(getAllByTestId('source').length).toEqual(3);
  });

  it('tweet', () => {
    const { getByTestId } = render(<App />);
    fireEvent.click(getByTestId('tweet'));
    // TODO: add assertion
  });
});
