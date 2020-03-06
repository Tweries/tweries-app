import classnames from 'classnames';
import React from 'react';

const copy = {
  'github.com/Tweries': 'github.com/Tweries',
  Tweries: 'Tweries',
  '@TweriesApp': '@TweriesApp'
};

function Footer({ healthy, version }) {
  return (
    <footer className="flex flex-col items-center text-xs">
      <ul className="flex">
        <li className="font-bold m-1 text-blue-800">
          <a
            href="https://github.com/Tweries"
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy['github.com/Tweries']}
          </a>
        </li>
        <li className="font-bold m-1 text-blue-800">
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
        {copy.Tweries} v{version} &copy; {new Date().getFullYear()}{' '}
      </p>
    </footer>
  );
}

export default Footer;
