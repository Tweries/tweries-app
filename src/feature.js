import {
  EMPTY_FIRST_SEQUENCE_NUMBER_V1,
  FEATURE_V1,
  READONLY_TWEETSTORM_V1,
  SPACE_AFTER_PUNCTUATION_V1
} from './constants';

const features = [
  EMPTY_FIRST_SEQUENCE_NUMBER_V1,
  FEATURE_V1,
  READONLY_TWEETSTORM_V1,
  SPACE_AFTER_PUNCTUATION_V1
];

function setFeatures(features) {
  return {
    active: feature => {
      return features.indexOf(feature) !== -1;
    }
  };
}

const feature = setFeatures(features);

export default feature;
