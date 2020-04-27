import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const copy = {
  Tweries: 'Tweries',
  "When 280 characters just aren't enough":
    "When 280 characters just aren't enough"
};

function SubHeader() {
  return (
    <>
      <h1 className="font-bold my-4 text-5xl text-center tweries-font-family">
        {copy.Tweries}
      </h1>
      <h2 className="my-4 text-center">
        {copy["When 280 characters just aren't enough"]}
      </h2>
      <p className="my-4 text-center">
        <FontAwesomeIcon
          className="tweries-color-blue"
          icon={faTwitter}
          size="3x"
        />
      </p>
    </>
  );
}

export default SubHeader;
