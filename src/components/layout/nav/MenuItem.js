import React from "react"
import { Link } from "gatsby"

const MenuItem = ({ to, label, external, onClick, currentPathname }) => {
  // <a className="menu-link active" href="{{ menu.url }}">{{ menu.title }}</a>
  const isActive = currentPathname === to
  const linkClass = isActive ? "menu-link active" : "menu-link"

  if (external) {
    return (
      <a
        className="menu-link"
        href="{{ menu.url }}"
        target="_blank"
        rel="noopener"
      >{{ label }}</a>
    )
  } else {
    return (
      <Link onClick={onClick} className={linkClass} to={to}>{label}</Link>
    )
  }
}

export default MenuItem