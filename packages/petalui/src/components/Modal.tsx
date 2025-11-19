import React, { useEffect, useRef } from 'react'

export interface ModalProps {
  children: React.ReactNode
  open?: boolean
  onClose?: () => void
  position?: 'top' | 'middle' | 'bottom'
  align?: 'start' | 'end'
  className?: string
}

export interface ModalBoxProps {
  children: React.ReactNode
  className?: string
}

export interface ModalActionProps {
  children: React.ReactNode
  className?: string
}

export interface ModalBackdropProps {
  onClick?: () => void
  className?: string
}

function ModalRoot({ children, open = false, onClose, position, align, className = '' }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [open])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    const handleClose = () => {
      onClose?.()
    }

    dialog.addEventListener('close', handleClose)
    return () => {
      dialog.removeEventListener('close', handleClose)
    }
  }, [onClose])

  const positionClasses = {
    top: 'modal-top',
    middle: 'modal-middle',
    bottom: 'modal-bottom',
  }

  const alignClasses = {
    start: 'modal-start',
    end: 'modal-end',
  }

  const classes = [
    'modal',
    position && positionClasses[position],
    align && alignClasses[align],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <dialog ref={dialogRef} className={classes}>
      {children}
    </dialog>
  )
}

function ModalBox({ children, className = '' }: ModalBoxProps) {
  return <div className={`modal-box ${className}`}>{children}</div>
}

function ModalAction({ children, className = '' }: ModalActionProps) {
  return <div className={`modal-action ${className}`}>{children}</div>
}

function ModalBackdrop({ onClick, className = '' }: ModalBackdropProps) {
  return (
    <form method="dialog" className={`modal-backdrop ${className}`}>
      <button onClick={onClick}>close</button>
    </form>
  )
}

export const Modal = Object.assign(ModalRoot, {
  Box: ModalBox,
  Action: ModalAction,
  Backdrop: ModalBackdrop,
})
