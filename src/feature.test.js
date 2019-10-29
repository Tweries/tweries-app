import { PICK_YOUR_OWN_LINEFEED_V1 } from './constants';
import feature from './feature';

describe('feature', () => {
  it('not active', () => {
    expect(feature.active('FEATURE_V1')).toBe(false);
  });

  it('active', () => {
    expect(feature.active(PICK_YOUR_OWN_LINEFEED_V1)).toBe(true);
  });
});
