import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <a href="https://t.me/OG_bratflix" target="_blank" rel="noopener noreferrer" className="telegram-link">
          Join our Telegram Channel
        </a>
        <p className="footer-text">© 2024 Your WebApp Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
