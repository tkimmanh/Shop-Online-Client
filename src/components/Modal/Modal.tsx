import { ReactNode, useContext, useState } from 'react'
import ReactModal from 'react-modal'
import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
  overlayClassName?: string
  children: ReactNode
  isOpenModal: boolean
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ children, className, overlayClassName, isOpenModal, setIsOpenModal }: Props) => {
  return (
    <>
      <ReactModal
        onRequestClose={() => setIsOpenModal(false)}
        isOpen={isOpenModal}
        overlayClassName={twMerge(
          'fixed inset-0 bg-black bg-opacity-40 z-50 w-full transition-opacity duration-500',
          overlayClassName && overlayClassName
        )}
        className={twMerge(
          'modal-content relative bg-white outline-none shadow-md transition-transform transform translate-x-full',
          className && className
        )}
        closeTimeoutMS={500}
      >
        {children}
      </ReactModal>
    </>
  )
}

export default Modal
