import PropTypes from "prop-types"

export default function Separator({ width, height, inline }) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: `${inline ? "inline-block" : "block"}`,
      }}
    ></div>
  )
}

Separator.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  inline: PropTypes.bool,
}

Separator.defaultProps = {
  width: 0,
  height: 0,
  inline: false,
}
