import React from "react"

const PageHeader = ({ title, children }) => {
  return (
    <header className="header">
      <h1 className="header-title center" itemprop="headline">{title}</h1>
      {children}
    </header>
  )
}

export default PageHeader