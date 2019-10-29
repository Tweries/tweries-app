import { FEATURE_V1 } from './constants';
import feature from './feature';

describe('feature', () => {
  it('active', () => {
    expect(feature.active(FEATURE_V1)).toBe(true);
  });

  it('not active', () => {
    expect(feature.active('FEATURE_V2')).toBe(false);
  });
});
