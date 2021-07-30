import * as React from 'react';

class Footer extends React.Component {
  render() {
    const year = new Date().getFullYear();
    return (
      <div>
        <div className="footer">© {year} Blockchain Explorer (C)</div>
      </div>
    );
  }
}

export default Footer;
