import { render } from '@testing-library/react';
import React from 'react';
import ToastNotification from './ToastNotification';

describe('ToastNotification', () => {
  it('empty', () => {
    const { container } = render(<ToastNotification onClick={jest.fn()} />);

    expect(container).toMatchSnapshot();
  });

  it('success', () => {
    const { container } = render(
      <ToastNotification
        notification={{
          link:
            'https://twitter.com/1183836409850814464/status/1230233654959407104',
          type: 'success'
        }}
        onClick={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('danger', () => {
    const { container } = render(
      <ToastNotification
        notification={{ message: 'Oh Noes!', type: 'danger' }}
        onClick={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
