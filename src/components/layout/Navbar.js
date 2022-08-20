import React, { useEffect, useState } from 'react'
import DarkLightToggle from './nav/DarkLightToggle'
import MenuItem from './nav/MenuItem'
import MenuRssLink from './nav/MenuRssLink'
import MenuTrigger from './nav/MenuTrigger'

export const Navbar = ({ currentPathname, menus, onOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpenChange = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const onMenuItemClicked = () => {
    setIsMenuOpen(false)
  }

  useEffect(() => {
    onOpen(isMenuOpen)
  } , [isMenuOpen])

  return (
    <div className="navbar" role="navigation">
      <nav className="menu">
        <MenuTrigger isOpen={isMenuOpen} onOpenChange={handleMenuOpenChange} />
        <DarkLightToggle />

        <div className="trigger">
          <div className="trigger-container">
            {menus.map(menu => (
              <MenuItem key={menu.to} {...menu} currentPathname={currentPathname} onClick={onMenuItemClicked} />
            ))}
            <MenuRssLink />
          </div>
        </div>
      </nav>
    </div>
  )
}
