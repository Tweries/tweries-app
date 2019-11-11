import {
  EDITABLE_TWEETSTORM_V1,
  FEATURE_V1,
  READONLY_TWEETSTORM_V2
} from './constants';

const features = [EDITABLE_TWEETSTORM_V1, FEATURE_V1, READONLY_TWEETSTORM_V2];

function setFeatures(features) {
  return {
    active: feature => {
      return features.indexOf(feature) !== -1;
    }
  };
}

const feature = setFeatures(features);

export default feature;
