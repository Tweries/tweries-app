import classnames from 'classnames';
import React from 'react';
import './Footer.css';

function Footer({ healthy, version }) {
  return (
    <footer className={classnames({ healthy: healthy })}>
      v{version} &copy; {new Date().getFullYear()}
    </footer>
  );
}

export default Footer;
