const React = require("react")

const bodyAttrs = {
  className: 'notransition',
  'data-theme': 'dark',
}

const fontSpecs = [
  'family=Roboto:wght@300;400;700',
  'family=Source+Sans+Pro:ital,wght@0,400;1,400',
  'family=Ubuntu+Mono:ital,wght@0,400;1,400&family=Ubuntu+Mono:ital,wght@0,700;1,700',
]

const linkStyles = fontSpecs.map(spec =>
  <link key={spec} rel="stylesheet" href={`https://fonts.googleapis.com/css2?${spec}&display=swap`} />
)

const darkLighScript = (
  <script key="darklightscript" type="application/javascript" dangerouslySetInnerHTML={{ __html: `
    function initTheme(state) {
      var body = document.body;
      var data = body.getAttribute("data-theme");

      if (state === "dark") {
        body.setAttribute("data-theme", "dark");
      } else if (state === "light") {
        body.removeAttribute("data-theme");
      } else {
        localStorage.setItem("theme", data);
      }
    }

    if (document.readyState !== "loading") {
      initTheme(localStorage.getItem("theme"));
    } else {
      document.addEventListener("DOMContentLoaded", function(event) {
        initTheme(localStorage.getItem("theme"));
      });
    }
  `}} />
)

const headCmps = [...linkStyles, darkLighScript]

exports.onRenderBody = ({ setBodyAttributes, setHeadComponents }) => {
  setBodyAttributes(bodyAttrs)
  setHeadComponents(headCmps)
}
