import { Link } from 'gatsby'
import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/thanks" className="footer_item">ack.</Link>
      {/* <a className="footer_item" href="javascript::void(0)">resume</a> */}
      <a className="footer_item" href="/feeds/all.atom.xml">rss</a>
      <small className="footer_copyright">
        <div style={{display: 'none'}}>Klisé Theme: https://github.com/piharpi/jekyll-klise</div>

        <a href="https://github.com/piharpi/jekyll-klise" target="_blank" rel="noreferrer noopener">klisé</a>
        &nbsp;theme on&nbsp;
        <a href="https://www.gatsbyjs.com/" target="_blank" rel="noreferrer noopener">gatsby</a>
      </small>
    </footer>
  )
}

export default Footer
