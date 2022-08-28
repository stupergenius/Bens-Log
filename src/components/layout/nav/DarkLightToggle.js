import React from "react"

const DarkLightToggle = () => {
  const toggleDarkLight = () => {
    const body = document.body
    const state = localStorage.getItem("theme")
    const data = body.getAttribute("data-theme")

    if (state === "dark") {
      localStorage.setItem("theme", "light")
      body.removeAttribute("data-theme")
    } else if (state === "light") {
      localStorage.setItem("theme", "dark")
      body.setAttribute("data-theme", "dark")
    } else {
      localStorage.setItem("theme", data)
    }
  }

  return (
    <button onClick={toggleDarkLight} id="mode">
      <svg
        className="mode-sunny"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 512 512"
      >
        <title>LIGHT</title>
        <line
          x1="256"
          y1="48"
          x2="256"
          y2="96"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="256"
          y1="416"
          x2="256"
          y2="464"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="403.08"
          y1="108.92"
          x2="369.14"
          y2="142.86"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="142.86"
          y1="369.14"
          x2="108.92"
          y2="403.08"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="464"
          y1="256"
          x2="416"
          y2="256"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="96"
          y1="256"
          x2="48"
          y2="256"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="403.08"
          y1="403.08"
          x2="369.14"
          y2="369.14"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="142.86"
          y1="142.86"
          x2="108.92"
          y2="108.92"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <circle
          cx="256"
          cy="256"
          r="80"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
      </svg>
      <svg
        className="mode-moon"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 512 512"
      >
        <title>DARK</title>
        <line
          x1="256"
          y1="48"
          x2="256"
          y2="96"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="256"
          y1="416"
          x2="256"
          y2="464"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="403.08"
          y1="108.92"
          x2="369.14"
          y2="142.86"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="142.86"
          y1="369.14"
          x2="108.92"
          y2="403.08"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="464"
          y1="256"
          x2="416"
          y2="256"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="96"
          y1="256"
          x2="48"
          y2="256"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="403.08"
          y1="403.08"
          x2="369.14"
          y2="369.14"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <line
          x1="142.86"
          y1="142.86"
          x2="108.92"
          y2="108.92"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
        <circle
          cx="256"
          cy="256"
          r="80"
          style={{
            strokeLinecap: "round",
            strokeMiterlimit: 10,
            strokeWidth: "32px",
          }}
        />
      </svg>
    </button>
  )
}

export default DarkLightToggle