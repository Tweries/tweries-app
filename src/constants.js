const { NODE_ENV } = process.env;

export const BASE_URL =
  NODE_ENV === 'development'
    ? 'http://localhost:9000'
    : 'https://tweries-api.herokuapp.com';

export const FEATURE_V1 = 'FEATURE_V1';
export const SPACE_AFTER_PUNCTUATION_V1 = 'SPACE_AFTER_PUNCTUATION_V1';

export const LINEFEED = ';;';
export const NEWLINE = '\n';
