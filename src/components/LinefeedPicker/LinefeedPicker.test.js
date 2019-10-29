import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import LinefeedPicker from './LinefeedPicker';

describe('LinefeedPicker', () => {
  it('v2', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <LinefeedPicker
        feature={{
          active: jest.fn()
        }}
        onChange={mockOnChange}
      />
    );

    fireEvent.click(getByTestId('custom'));
    fireEvent.change(getByTestId('linefeed'), { target: { value: '||' } });
    fireEvent.click(getByTestId('newline'));

    expect(mockOnChange.mock.calls).toMatchSnapshot();
  });
});
