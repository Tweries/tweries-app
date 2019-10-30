import { FEATURE_V1, SPACE_AFTER_PUNCTUATION_V1 } from './constants';

const features = [FEATURE_V1, SPACE_AFTER_PUNCTUATION_V1];

function setFeatures(features) {
  return {
    active: feature => {
      return features.indexOf(feature) !== -1;
    }
  };
}

const feature = setFeatures(features);

export default feature;
