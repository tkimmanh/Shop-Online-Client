import { AppContext } from 'src/context/app.context'
import classNames from 'src/utils/classNames'
import { ReactNode, useContext } from 'react'
import ReactModal from 'react-modal'

type Props = {
  className: string
  overlayClassName: string
  children: ReactNode
}

const Modal = ({ children, className, overlayClassName }: Props) => {
  const { isOpenModal, setIsOpenModal } = useContext(AppContext)
  return (
    <>
      <ReactModal
        onRequestClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        overlayClassName={classNames(
          'fixed inset-0 bg-black bg-opacity-40 z-50 w-full transition-opacity duration-500',
          overlayClassName
        )}
        className={classNames(
          'modal-content relative bg-white outline-none shadow-md transition-transform transform translate-x-full',
          className
        )}
        closeTimeoutMS={500}
      >
        {children}
      </ReactModal>
    </>
  )
}

export default Modal
