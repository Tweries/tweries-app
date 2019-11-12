// TODO: move it to a separate libary

import { createContext, useContext } from 'react';

const FeatureContext = createContext();

export default FeatureContext;

export function setFeatures(features) {
  return {
    active: feature => {
      return features.indexOf(feature) !== -1;
    }
  };
}

export function useFeature() {
  return useContext(FeatureContext);
}
