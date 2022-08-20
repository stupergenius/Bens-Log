import React from "react"

const MainPageContent = ({ children }) => {
  return (
    <main className="page-content" aria-label="Content">
      {children}
    </main>
  )
}

export default MainPageContent