import React, { useState } from 'react'
import Link from 'gatsby-link'
import '../styles/main.scss'
import { Navbar } from './Navbar'

const ListLink = ({to, children}) => (
  <li style={{ display: 'inline-block', marginLeft: '1rem' }}>
    <Link to={to}>
      {children}
    </Link>
  </li>
)

const SiteTitle = ({title}) => (
  <Link to="/" style={{
    textShadow: 'none',
    backgroundImage: 'none',
  }}>
    <h1 style={{ display: 'inline' }}>
      {title}
    </h1>
  </Link>
)

const PrimaryLayout = ({children}) => {
  const [isBlurred, setIsBlurred] = useState(false)
  const toggleMenuOpen = (isOpen) => setIsBlurred(isOpen)
  const blurClass = isBlurred ? 'blurry' : ''

  const menus = [
    {label: 'home', to: '/'},
    {label: 'archives', to: '/archives'},
    {label: 'about', to: '/about'},
    {label: 'contact', to: '/contact'},
  ]

  return (
    <>
      <Navbar menus={menus} onOpen={toggleMenuOpen} />
      <div className={`wrapper ${blurClass}`}>
        {children}
      </div>
    </>
  )
}

export default PrimaryLayout
