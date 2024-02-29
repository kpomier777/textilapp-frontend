import React from "react"
import PropTypes from "prop-types"
import TextilAppLogo from "./Graphics/textilapp-logo"
import TextilAppText from "./Graphics/textilapp-text"

const LoaderView = ({ showIcon }) => (
  // eslint-disable-next-line max-len
  <div className="flex flex-col items-center min-h-screen">
    <div className="px-16 mt-[15rem] w-[20rem]">
      <div className="flex flex-col items-center gap-6 justify-center">
        {showIcon ? (
          <TextilAppLogo
            fillColor="rgba(255, 255, 255, 0.7)"
            className="w-20 h-20"
          />
        ) : (
          <TextilAppText fillColor="#fff" className="w-48 h-12" />
        )}
        <div className="loader rounded w-44">
          <div className="loader-value"></div>
        </div>
      </div>
    </div>
  </div>
)

LoaderView.propTypes = {
  showIcon: PropTypes.bool,
}

LoaderView.defaultProps = {
  showIcon: false,
}
export default LoaderView
