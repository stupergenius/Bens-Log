import React, { useState } from 'react'
import '../../styles/main.scss'
import { Navbar } from './Navbar'
import Footer from './Footer'

const PrimaryLayout = ({children, location}) => {
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
      <Navbar currentPathname={location.pathname} menus={menus} onOpen={toggleMenuOpen} />
      <div className={`wrapper ${blurClass}`}>
        {children}
        <Footer />
      </div>
    </>
  )
}

export default PrimaryLayout
