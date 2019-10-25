import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import {
  PICK_YOUR_OWN_LINEFEED_V1,
  PICK_YOUR_OWN_LINEFEED_V2
} from '../../feature';
import LinefeedPicker from './LinefeedPicker';

describe('LinefeedPicker', () => {
  it('simple', () => {
    const { container } = render(
      <LinefeedPicker feature={{ active: () => false }} linefeed="[..]" />
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
        linefeed="[..]"
        onChange={mockOnChange}
      />
    );

    fireEvent.change(getByTestId('linefeed'), { target: { value: '||' } });

    expect(mockOnChange).toBeCalled();
  });

  it('v2', () => {
    const { container } = render(
      <LinefeedPicker
        feature={{
          active: feature => feature === PICK_YOUR_OWN_LINEFEED_V2
        }}
        linefeed="[..]"
        onChange={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
