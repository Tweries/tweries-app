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
        notification={{ message: 'Success!', type: 'success' }}
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
