import classnames from 'classnames';
import React from 'react';
import './Footer.css';

function Footer({ healthy, version }) {
  return (
    <footer className={classnames({ healthy: healthy })}>
      <p>
        Tweries v{version} &copy; {new Date().getFullYear()}{' '}
      </p>
      <ul>
        <li>
          <a
            href="https://twitter.com/TweriesApp"
            rel="noopener noreferrer"
            target="_blank"
          >
            @TweriesApp
          </a>
        </li>
        <li>
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
