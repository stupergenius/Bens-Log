require("prism-themes/themes/prism-dracula.css")
require("prismjs/plugins/line-numbers/prism-line-numbers.css")
require("prismjs/plugins/command-line/prism-command-line.css")

exports.onClientEntry = () => {
  window.addEventListener('load', () => {
    setTimeout(() => document.body.className = document.body.className.replace(/\bnotransition\b/, ''), 75)
  });
}