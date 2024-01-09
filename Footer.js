import React from 'react';

const footerStyles = {
  padding: '20px',
  textAlign: 'center',
  maxWidth: '960px',
  margin: '0 auto',
};

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <div>
        <p>&copy; Created by Zain ul abideen shaikh and Muhammad Omer</p>
        <p>CSC-21F-134  & CSC-21F-077</p>
        <p>Software Engineering Project</p>
      </div>
    </footer>
  );
}

export default Footer;
