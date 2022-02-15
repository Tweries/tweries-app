import { render } from '@testing-library/react';
import React from 'react';
import { DANGER, SUCCESS } from '../../constants';
import ToastNotification from './ToastNotification';

describe('<ToastNotification />', () => {
  it('empty', () => {
    const { container } = render(<ToastNotification onClick={jest.fn()} />);

    expect(container).toMatchSnapshot();
  });

  it(SUCCESS, () => {
    const { container } = render(
      <ToastNotification
        notification={{
          link: 'https://twitter.com/1183836409850814464/status/1230233654959407104',
          type: SUCCESS
        }}
        onClick={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it(DANGER, () => {
    const { container } = render(
      <ToastNotification
        notification={{ message: 'Oh Noes!', type: DANGER }}
        onClick={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
