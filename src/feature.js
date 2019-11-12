import { setFeatures } from './FeatureContext/FeatureContext';

import {
  EDITABLE_TWEETSTORM_V1,
  EDITABLE_TWEETSTORM_COPY_V1,
  FEATURE_V1,
  READONLY_TWEETSTORM_V2
} from './constants';

const features = [
  EDITABLE_TWEETSTORM_V1,
  EDITABLE_TWEETSTORM_COPY_V1,
  FEATURE_V1,
  READONLY_TWEETSTORM_V2
];

const feature = setFeatures(features);

export default feature;
