import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { LINEFEED } from '../../store/makeTweetstorm';
import {
  PICK_YOUR_OWN_LINEFEED_V1,
  PICK_YOUR_OWN_LINEFEED_V2
} from '../../feature';
import LinefeedPicker from './LinefeedPicker';

describe('LinefeedPicker', () => {
  it('simple', () => {
    const { container } = render(
      <LinefeedPicker feature={{ active: () => false }} />
    );

    expect(container).toMatchSnapshot();
  });

  it('v1', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <LinefeedPicker
        feature={{
          active: feature => feature === PICK_YOUR_OWN_LINEFEED_V1
        }}
        onChange={mockOnChange}
      />
    );

    fireEvent.change(getByTestId('linefeed'), { target: { value: '||' } });

    expect(mockOnChange).toBeCalled();
  });

  it('v2', () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(
      <LinefeedPicker
        feature={{
          active: feature => feature === PICK_YOUR_OWN_LINEFEED_V2
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
