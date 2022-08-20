exports.onClientEntry = () => {
  window.addEventListener('load', () => {
    setTimeout(() => document.body.className = document.body.className.replace(/\bnotransition\b/, ''), 75)
  });
}