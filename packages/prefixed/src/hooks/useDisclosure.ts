import { useState, useCallback } from 'react'

export interface UseDisclosureReturn {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
  setIsOpen: (value: boolean) => void
}

/**
 * Hook for managing open/close state of modals, drawers, dropdowns, etc.
 *
 * @param defaultIsOpen - Initial open state (default: false)
 * @returns Object with isOpen state and control functions
 *
 * @example
 * const { isOpen, onOpen, onClose } = useDisclosure()
 *
 * <Button onClick={onOpen}>Open Modal</Button>
 * <Modal open={isOpen} onClose={onClose}>Content</Modal>
 */
export function useDisclosure(defaultIsOpen = false): UseDisclosureReturn {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const onOpen = useCallback(() => setIsOpen(true), [])
  const onClose = useCallback(() => setIsOpen(false), [])
  const onToggle = useCallback(() => setIsOpen(prev => !prev), [])

  return { isOpen, onOpen, onClose, onToggle, setIsOpen }
}
