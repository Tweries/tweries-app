import {
  FEATURE_V1,
  LAYOUT_V1,
  LINEFEED_PICKER_V1,
  READONLY_TWEETSTORM_V1,
  READONLY_TWEETSTORM_V2
} from './constants';

const features = [FEATURE_V1, READONLY_TWEETSTORM_V2];

function setFeatures(features) {
  return {
    active: feature => {
      return features.indexOf(feature) !== -1;
    }
  };
}

const feature = setFeatures(features);

export default feature;
