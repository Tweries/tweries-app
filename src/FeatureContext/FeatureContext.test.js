import { render } from '@testing-library/react';
import React from 'react';
import { FEATURE_V1 } from '../constants';
import feature from '../feature';
import FeatureContext, { useFeature } from './FeatureContext';

function Paragraph() {
  const feature = useFeature();
  return feature.active(FEATURE_V1) ? <p>YATTA</p> : <p>Oh Noes!</p>;
}

test(`${FEATURE_V1} is active`, () => {
  const { container } = render(
    <FeatureContext.Provider value={feature}>
      <Paragraph />
    </FeatureContext.Provider>
  );

  expect(container).toMatchSnapshot();
});
