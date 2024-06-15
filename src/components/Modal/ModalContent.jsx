import PropTypes from "prop-types"

const ModalContent = ({ children, handleOverlayClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-75 transition-opacity z-[9999] flex justify-center"
    onClick={handleOverlayClose}
  >
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full modal">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-slate-900 rounded-lg shadow">
          {children}
        </div>
      </div>
    </div>
  </div>
)

ModalContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  handleOverlayClose: PropTypes.func.isRequired,
}

export default ModalContent
