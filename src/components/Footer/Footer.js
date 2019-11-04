import classnames from 'classnames';
import React from 'react';

function Footer({ healthy, version }) {
  return (
    <footer className="flex flex-col items-center text-xs">
      <p
        className={classnames({
          'text-green-800': healthy,
          'text-red-800': !healthy
        })}
      >
        Tweries v{version} &copy; {new Date().getFullYear()}{' '}
      </p>
      <ul className="flex">
        <li className="font-bold m-1 text-blue-800">
          <a
            href="https://twitter.com/TweriesApp"
            rel="noopener noreferrer"
            target="_blank"
          >
            @TweriesApp
          </a>
        </li>
        <li className="font-bold m-1 text-blue-800">
          <a
            href="https://github.com/Tweries"
            rel="noopener noreferrer"
            target="_blank"
          >
            github.com/Tweries
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
