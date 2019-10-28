export const BACK_UP_TO_LAST_PUNCTUATION = 'BACK_UP_TO_LAST_PUNCTUATION';
export const PICK_YOUR_OWN_LINEFEED_V1 = 'PICK_YOUR_OWN_LINEFEED_V1';
export const PICK_YOUR_OWN_LINEFEED_V2 = 'PICK_YOUR_OWN_LINEFEED_V2';

const features = [PICK_YOUR_OWN_LINEFEED_V1, PICK_YOUR_OWN_LINEFEED_V2];

function setFeatures(features) {
  return {
    active: feature => {
      if (features) {
        return features.indexOf(feature) > -1;
      }
      return false;
    }
  };
}

const feature = setFeatures(features);

export default feature;
