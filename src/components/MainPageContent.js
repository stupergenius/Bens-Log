import React from "react"

const MinPageContent = ({ children }) => {
  return (
    <main className="page-content" aria-label="Content">
      {children}
    </main>
  )
}

export default MinPageContent