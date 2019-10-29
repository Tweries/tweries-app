import {
  BACK_UP_TO_LAST_PUNCTUATION,
  COUNTER_V1,
  PICK_YOUR_OWN_LINEFEED_V1,
  PICK_YOUR_OWN_LINEFEED_V2
} from './constants';

const features = [
  BACK_UP_TO_LAST_PUNCTUATION,
  COUNTER_V1,
  PICK_YOUR_OWN_LINEFEED_V1,
  PICK_YOUR_OWN_LINEFEED_V2
];

function setFeatures(features) {
  return {
    active: feature => {
      return features.indexOf(feature) > -1;
    }
  };
}

const feature = setFeatures(features);

export default feature;
