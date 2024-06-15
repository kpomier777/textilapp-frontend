import PropTypes from "prop-types"
import { useNavigate } from "react-router"
import ModalContent from "@/components/Modal/ModalContent"
import ClientViewModal from "@/pages/clients/components/ClientViewModal"
import OperatorViewModal from "@/pages/operators/components/OperatorViewModal"
import MachineryViewModal from "./machinery/MachineryViewModal"
import ProductViewModal from "@/pages/products/components/ProductViewModal"

const VIEWS_ENABLED = {
  productos: {
    view: ProductViewModal,
  },
  maquinarias: {
    view: MachineryViewModal,
  },
  operadores: {
    view: OperatorViewModal,
  },
  clientes: {
    view: ClientViewModal,
  },
}
const ModalManager = ({ modalView, modalViewId }) => {
  const navigate = useNavigate()
  const handleCloseModal = (e) => {
    const modalElementClicked = e?.target
    const modalElementClassName = String(modalElementClicked.className)
    if (modalElementClassName?.includes("modal")) {
      navigate("./")
    }
  }

  if (Object.keys(VIEWS_ENABLED)?.includes(modalView)) {
    const viewComponent = VIEWS_ENABLED[modalView]
    return (
      <ModalContent handleOverlayClose={handleCloseModal}>
        <viewComponent.view id={modalViewId} />
      </ModalContent>
    )
  }
  return null
}

ModalManager.propTypes = {
  modalView: PropTypes.string,
  modalViewId: PropTypes.string,
}
ModalManager.defaultProps = {
  modalView: null,
  modalViewId: null,
}

export default ModalManager
