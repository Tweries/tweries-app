import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const copy = {
  'github.com/Tweries': 'github.com/Tweries',
  Tweries: 'Tweries',
  '@TweriesApp': '@TweriesApp'
};

function Footer({ healthy, version }) {
  return (
    <footer className="flex flex-col items-center text-sm">
      <ul className="flex">
        <li className="m-1">
          <a
            href="https://github.com/Tweries"
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy['github.com/Tweries']}
          </a>
        </li>
        <li className="m-1">
          <a
            href="https://twitter.com/TweriesApp"
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy['@TweriesApp']}
          </a>
        </li>
      </ul>
      <p
        className={classnames({
          'text-green-800': healthy,
          'text-red-800': !healthy
        })}
      >
        {copy.Tweries} v{version} &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

Footer.propTypes = {
  healthy: PropTypes.bool.isRequired,
  version: PropTypes.string.isRequired
};

export default Footer;
