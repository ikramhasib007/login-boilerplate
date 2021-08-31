import React from 'react'
import PropTypes from 'prop-types'

// `onClick`, `href`, and `ref` need to be passed to the DOM element
// for proper handling
const CustomLink = React.forwardRef(({ onClick, href, className, label = 'Click me' }, ref) => {
  return (
    <a href={href} className={className} onClick={onClick} ref={ref}>
      {label}
    </a>
  )
})

CustomLink.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
}

export default CustomLink