import classnames from 'classnames';
import React from 'react';
import './Footer.css';

function Footer({ healthy, version }) {
  return (
    <footer className={classnames({ healthy: healthy })}>
      Tweries v{version} &copy; {new Date().getFullYear()}{' '}
      <a
        href="https://twitter.com/TweriesApp"
        rel="noopener noreferrer"
        target="_blank"
      >
        @TweriesApp
      </a>
    </footer>
  );
}

export default Footer;
