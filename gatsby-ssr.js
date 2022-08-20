exports.onRenderBody = ({ setBodyAttributes }) => {
  setBodyAttributes({
    className: 'notransition',
    'data-theme': 'dark',
  })
}