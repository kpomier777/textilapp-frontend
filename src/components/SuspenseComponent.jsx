import React, { Suspense } from "react"
import PropTypes from "prop-types"
import LoaderView from "@/components/LoaderView"

const SuspenseComponent = ({ children }) => (
  <Suspense fallback={<LoaderView showIcon />}>{children}</Suspense>
)

SuspenseComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default SuspenseComponent
