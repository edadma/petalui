export interface Locale {
  /** Locale code (e.g., 'en-US', 'zh-CN') */
  locale: string

  // Common
  Common?: {
    ok?: string
    cancel?: string
    confirm?: string
    close?: string
    loading?: string
    search?: string
    reset?: string
    clear?: string
    selectAll?: string
    noData?: string
    notFound?: string
  }

  // Modal
  Modal?: {
    okText?: string
    cancelText?: string
  }

  // Popconfirm
  Popconfirm?: {
    okText?: string
    cancelText?: string
  }

  // Tour
  Tour?: {
    prevText?: string
    nextText?: string
    finishText?: string
    skipText?: string
  }

  // Empty
  Empty?: {
    description?: string
  }

  // Pagination
  Pagination?: {
    page?: string
    of?: string
    items?: string
    itemsPerPage?: string
    goTo?: string
    prev?: string
    next?: string
  }

  // Table
  Table?: {
    emptyText?: string
    filterConfirm?: string
    filterReset?: string
    sortAscending?: string
    sortDescending?: string
    selectAll?: string
    selectInvert?: string
    selectNone?: string
    triggerAsc?: string
    triggerDesc?: string
    cancelSort?: string
  }

  // Transfer
  Transfer?: {
    titles?: [string, string]
    searchPlaceholder?: string
    itemUnit?: string
    itemsUnit?: string
    notFoundContent?: string
    selectAll?: string
    deselectAll?: string
  }

  // Upload
  Upload?: {
    uploadText?: string
    removeText?: string
    uploadingText?: string
    previewText?: string
    downloadText?: string
  }

  // Select
  Select?: {
    placeholder?: string
    noOptions?: string
    loading?: string
  }

  // Image
  Image?: {
    previewText?: string
  }

  // DatePicker
  DatePicker?: {
    placeholder?: string
    rangePlaceholder?: [string, string]
    today?: string
    now?: string
    ok?: string
  }

  // TimePicker
  TimePicker?: {
    placeholder?: string
    now?: string
    ok?: string
  }

  // Calendar
  Calendar?: {
    today?: string
    month?: string
    year?: string
  }
}

// Re-export all locales
export { default as enUS } from './en-US'
export { default as enGB } from './en-GB'
export { default as enCA } from './en-CA'
export { default as zhCN } from './zh-CN'
export { default as esES } from './es-ES'
export { default as jaJP } from './ja-JP'
export { default as ptBR } from './pt-BR'
export { default as deDE } from './de-DE'
export { default as frFR } from './fr-FR'
export { default as koKR } from './ko-KR'
