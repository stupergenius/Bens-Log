import React from "react"

const MenuTrigger = ({ isOpen, onOpenChange }) => {
  return (
    <>
      <input
        onChange={onOpenChange}
        checked={isOpen}
        type="checkbox"
        id="menu-trigger"
        className="menu-trigger" />
      <label htmlFor="menu-trigger">
        <span className="menu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 512 512"
          >
            <path
              d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
            />
          </svg>
        </span>
      </label>
    </>
  )
}

export default MenuTrigger