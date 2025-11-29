import React from 'react'

const GridContext = React.createContext<{ cols: 24 | 120 }>({ cols: 24 })

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  cols?: 24 | 120
  gutter?: number | [number, number]
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  span?: number
  offset?: number
  order?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

// Explicit class mappings - Tailwind v4 supports any grid value natively
const COL_SPAN_CLASSES: Record<number, string> = {
  1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4',
  5: 'col-span-5', 6: 'col-span-6', 7: 'col-span-7', 8: 'col-span-8',
  9: 'col-span-9', 10: 'col-span-10', 11: 'col-span-11', 12: 'col-span-12',
  13: 'col-span-13', 14: 'col-span-14', 15: 'col-span-15', 16: 'col-span-16',
  17: 'col-span-17', 18: 'col-span-18', 19: 'col-span-19', 20: 'col-span-20',
  21: 'col-span-21', 22: 'col-span-22', 23: 'col-span-23', 24: 'col-span-24',
}

const SM_COL_SPAN_CLASSES: Record<number, string> = {
  1: 'sm:col-span-1', 2: 'sm:col-span-2', 3: 'sm:col-span-3', 4: 'sm:col-span-4',
  5: 'sm:col-span-5', 6: 'sm:col-span-6', 7: 'sm:col-span-7', 8: 'sm:col-span-8',
  9: 'sm:col-span-9', 10: 'sm:col-span-10', 11: 'sm:col-span-11', 12: 'sm:col-span-12',
  13: 'sm:col-span-13', 14: 'sm:col-span-14', 15: 'sm:col-span-15', 16: 'sm:col-span-16',
  17: 'sm:col-span-17', 18: 'sm:col-span-18', 19: 'sm:col-span-19', 20: 'sm:col-span-20',
  21: 'sm:col-span-21', 22: 'sm:col-span-22', 23: 'sm:col-span-23', 24: 'sm:col-span-24',
}

const MD_COL_SPAN_CLASSES: Record<number, string> = {
  1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4',
  5: 'md:col-span-5', 6: 'md:col-span-6', 7: 'md:col-span-7', 8: 'md:col-span-8',
  9: 'md:col-span-9', 10: 'md:col-span-10', 11: 'md:col-span-11', 12: 'md:col-span-12',
  13: 'md:col-span-13', 14: 'md:col-span-14', 15: 'md:col-span-15', 16: 'md:col-span-16',
  17: 'md:col-span-17', 18: 'md:col-span-18', 19: 'md:col-span-19', 20: 'md:col-span-20',
  21: 'md:col-span-21', 22: 'md:col-span-22', 23: 'md:col-span-23', 24: 'md:col-span-24',
}

const LG_COL_SPAN_CLASSES: Record<number, string> = {
  1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4',
  5: 'lg:col-span-5', 6: 'lg:col-span-6', 7: 'lg:col-span-7', 8: 'lg:col-span-8',
  9: 'lg:col-span-9', 10: 'lg:col-span-10', 11: 'lg:col-span-11', 12: 'lg:col-span-12',
  13: 'lg:col-span-13', 14: 'lg:col-span-14', 15: 'lg:col-span-15', 16: 'lg:col-span-16',
  17: 'lg:col-span-17', 18: 'lg:col-span-18', 19: 'lg:col-span-19', 20: 'lg:col-span-20',
  21: 'lg:col-span-21', 22: 'lg:col-span-22', 23: 'lg:col-span-23', 24: 'lg:col-span-24',
}

const XL_COL_SPAN_CLASSES: Record<number, string> = {
  1: 'xl:col-span-1', 2: 'xl:col-span-2', 3: 'xl:col-span-3', 4: 'xl:col-span-4',
  5: 'xl:col-span-5', 6: 'xl:col-span-6', 7: 'xl:col-span-7', 8: 'xl:col-span-8',
  9: 'xl:col-span-9', 10: 'xl:col-span-10', 11: 'xl:col-span-11', 12: 'xl:col-span-12',
  13: 'xl:col-span-13', 14: 'xl:col-span-14', 15: 'xl:col-span-15', 16: 'xl:col-span-16',
  17: 'xl:col-span-17', 18: 'xl:col-span-18', 19: 'xl:col-span-19', 20: 'xl:col-span-20',
  21: 'xl:col-span-21', 22: 'xl:col-span-22', 23: 'xl:col-span-23', 24: 'xl:col-span-24',
}

const XXL_COL_SPAN_CLASSES: Record<number, string> = {
  1: '2xl:col-span-1', 2: '2xl:col-span-2', 3: '2xl:col-span-3', 4: '2xl:col-span-4',
  5: '2xl:col-span-5', 6: '2xl:col-span-6', 7: '2xl:col-span-7', 8: '2xl:col-span-8',
  9: '2xl:col-span-9', 10: '2xl:col-span-10', 11: '2xl:col-span-11', 12: '2xl:col-span-12',
  13: '2xl:col-span-13', 14: '2xl:col-span-14', 15: '2xl:col-span-15', 16: '2xl:col-span-16',
  17: '2xl:col-span-17', 18: '2xl:col-span-18', 19: '2xl:col-span-19', 20: '2xl:col-span-20',
  21: '2xl:col-span-21', 22: '2xl:col-span-22', 23: '2xl:col-span-23', 24: '2xl:col-span-24',
}

const COL_START_CLASSES: Record<number, string> = {
  1: 'col-start-1', 2: 'col-start-2', 3: 'col-start-3', 4: 'col-start-4',
  5: 'col-start-5', 6: 'col-start-6', 7: 'col-start-7', 8: 'col-start-8',
  9: 'col-start-9', 10: 'col-start-10', 11: 'col-start-11', 12: 'col-start-12',
  13: 'col-start-13', 14: 'col-start-14', 15: 'col-start-15', 16: 'col-start-16',
  17: 'col-start-17', 18: 'col-start-18', 19: 'col-start-19', 20: 'col-start-20',
  21: 'col-start-21', 22: 'col-start-22', 23: 'col-start-23', 24: 'col-start-24',
  25: 'col-start-25',
}

const ORDER_CLASSES: Record<number, string> = {
  1: 'order-1', 2: 'order-2', 3: 'order-3', 4: 'order-4',
  5: 'order-5', 6: 'order-6', 7: 'order-7', 8: 'order-8',
  9: 'order-9', 10: 'order-10', 11: 'order-11', 12: 'order-12',
}

// 120-column grid mappings - using arbitrary value syntax for values > 12
const COL_SPAN_120_CLASSES: Record<number, string> = {
  1: 'col-span-1', 2: 'col-span-2', 3: 'col-span-3', 4: 'col-span-4', 5: 'col-span-5',
  6: 'col-span-6', 7: 'col-span-7', 8: 'col-span-8', 9: 'col-span-9', 10: 'col-span-10',
  11: 'col-span-11', 12: 'col-span-12', 13: 'col-span-13', 14: 'col-span-14', 15: 'col-span-15',
  16: 'col-span-16', 17: 'col-span-17', 18: 'col-span-18', 19: 'col-span-19', 20: 'col-span-20',
  21: 'col-span-21', 22: 'col-span-22', 23: 'col-span-23', 24: 'col-span-24', 25: 'col-span-25',
  26: 'col-span-26', 27: 'col-span-27', 28: 'col-span-28', 29: 'col-span-29', 30: 'col-span-30',
  31: 'col-span-31', 32: 'col-span-32', 33: 'col-span-33', 34: 'col-span-34', 35: 'col-span-35',
  36: 'col-span-36', 37: 'col-span-37', 38: 'col-span-38', 39: 'col-span-39', 40: 'col-span-40',
  41: 'col-span-41', 42: 'col-span-42', 43: 'col-span-43', 44: 'col-span-44', 45: 'col-span-45',
  46: 'col-span-46', 47: 'col-span-47', 48: 'col-span-48', 49: 'col-span-49', 50: 'col-span-50',
  51: 'col-span-51', 52: 'col-span-52', 53: 'col-span-53', 54: 'col-span-54', 55: 'col-span-55',
  56: 'col-span-56', 57: 'col-span-57', 58: 'col-span-58', 59: 'col-span-59', 60: 'col-span-60',
  61: 'col-span-61', 62: 'col-span-62', 63: 'col-span-63', 64: 'col-span-64', 65: 'col-span-65',
  66: 'col-span-66', 67: 'col-span-67', 68: 'col-span-68', 69: 'col-span-69', 70: 'col-span-70',
  71: 'col-span-71', 72: 'col-span-72', 73: 'col-span-73', 74: 'col-span-74', 75: 'col-span-75',
  76: 'col-span-76', 77: 'col-span-77', 78: 'col-span-78', 79: 'col-span-79', 80: 'col-span-80',
  81: 'col-span-81', 82: 'col-span-82', 83: 'col-span-83', 84: 'col-span-84', 85: 'col-span-85',
  86: 'col-span-86', 87: 'col-span-87', 88: 'col-span-88', 89: 'col-span-89', 90: 'col-span-90',
  91: 'col-span-91', 92: 'col-span-92', 93: 'col-span-93', 94: 'col-span-94', 95: 'col-span-95',
  96: 'col-span-96', 97: 'col-span-97', 98: 'col-span-98', 99: 'col-span-99', 100: 'col-span-100',
  101: 'col-span-101', 102: 'col-span-102', 103: 'col-span-103', 104: 'col-span-104', 105: 'col-span-105',
  106: 'col-span-106', 107: 'col-span-107', 108: 'col-span-108', 109: 'col-span-109', 110: 'col-span-110',
  111: 'col-span-111', 112: 'col-span-112', 113: 'col-span-113', 114: 'col-span-114', 115: 'col-span-115',
  116: 'col-span-116', 117: 'col-span-117', 118: 'col-span-118', 119: 'col-span-119', 120: 'col-span-120',
}

const SM_COL_SPAN_120_CLASSES: Record<number, string> = {
  1: 'sm:col-span-1', 2: 'sm:col-span-2', 3: 'sm:col-span-3', 4: 'sm:col-span-4', 5: 'sm:col-span-5',
  6: 'sm:col-span-6', 7: 'sm:col-span-7', 8: 'sm:col-span-8', 9: 'sm:col-span-9', 10: 'sm:col-span-10',
  11: 'sm:col-span-11', 12: 'sm:col-span-12', 13: 'sm:col-span-13', 14: 'sm:col-span-14', 15: 'sm:col-span-15',
  16: 'sm:col-span-16', 17: 'sm:col-span-17', 18: 'sm:col-span-18', 19: 'sm:col-span-19', 20: 'sm:col-span-20',
  21: 'sm:col-span-21', 22: 'sm:col-span-22', 23: 'sm:col-span-23', 24: 'sm:col-span-24', 25: 'sm:col-span-25',
  26: 'sm:col-span-26', 27: 'sm:col-span-27', 28: 'sm:col-span-28', 29: 'sm:col-span-29', 30: 'sm:col-span-30',
  31: 'sm:col-span-31', 32: 'sm:col-span-32', 33: 'sm:col-span-33', 34: 'sm:col-span-34', 35: 'sm:col-span-35',
  36: 'sm:col-span-36', 37: 'sm:col-span-37', 38: 'sm:col-span-38', 39: 'sm:col-span-39', 40: 'sm:col-span-40',
  41: 'sm:col-span-41', 42: 'sm:col-span-42', 43: 'sm:col-span-43', 44: 'sm:col-span-44', 45: 'sm:col-span-45',
  46: 'sm:col-span-46', 47: 'sm:col-span-47', 48: 'sm:col-span-48', 49: 'sm:col-span-49', 50: 'sm:col-span-50',
  51: 'sm:col-span-51', 52: 'sm:col-span-52', 53: 'sm:col-span-53', 54: 'sm:col-span-54', 55: 'sm:col-span-55',
  56: 'sm:col-span-56', 57: 'sm:col-span-57', 58: 'sm:col-span-58', 59: 'sm:col-span-59', 60: 'sm:col-span-60',
  61: 'sm:col-span-61', 62: 'sm:col-span-62', 63: 'sm:col-span-63', 64: 'sm:col-span-64', 65: 'sm:col-span-65',
  66: 'sm:col-span-66', 67: 'sm:col-span-67', 68: 'sm:col-span-68', 69: 'sm:col-span-69', 70: 'sm:col-span-70',
  71: 'sm:col-span-71', 72: 'sm:col-span-72', 73: 'sm:col-span-73', 74: 'sm:col-span-74', 75: 'sm:col-span-75',
  76: 'sm:col-span-76', 77: 'sm:col-span-77', 78: 'sm:col-span-78', 79: 'sm:col-span-79', 80: 'sm:col-span-80',
  81: 'sm:col-span-81', 82: 'sm:col-span-82', 83: 'sm:col-span-83', 84: 'sm:col-span-84', 85: 'sm:col-span-85',
  86: 'sm:col-span-86', 87: 'sm:col-span-87', 88: 'sm:col-span-88', 89: 'sm:col-span-89', 90: 'sm:col-span-90',
  91: 'sm:col-span-91', 92: 'sm:col-span-92', 93: 'sm:col-span-93', 94: 'sm:col-span-94', 95: 'sm:col-span-95',
  96: 'sm:col-span-96', 97: 'sm:col-span-97', 98: 'sm:col-span-98', 99: 'sm:col-span-99', 100: 'sm:col-span-100',
  101: 'sm:col-span-101', 102: 'sm:col-span-102', 103: 'sm:col-span-103', 104: 'sm:col-span-104', 105: 'sm:col-span-105',
  106: 'sm:col-span-106', 107: 'sm:col-span-107', 108: 'sm:col-span-108', 109: 'sm:col-span-109', 110: 'sm:col-span-110',
  111: 'sm:col-span-111', 112: 'sm:col-span-112', 113: 'sm:col-span-113', 114: 'sm:col-span-114', 115: 'sm:col-span-115',
  116: 'sm:col-span-116', 117: 'sm:col-span-117', 118: 'sm:col-span-118', 119: 'sm:col-span-119', 120: 'sm:col-span-120',
}

const MD_COL_SPAN_120_CLASSES: Record<number, string> = {
  1: 'md:col-span-1', 2: 'md:col-span-2', 3: 'md:col-span-3', 4: 'md:col-span-4', 5: 'md:col-span-5',
  6: 'md:col-span-6', 7: 'md:col-span-7', 8: 'md:col-span-8', 9: 'md:col-span-9', 10: 'md:col-span-10',
  11: 'md:col-span-11', 12: 'md:col-span-12', 13: 'md:col-span-13', 14: 'md:col-span-14', 15: 'md:col-span-15',
  16: 'md:col-span-16', 17: 'md:col-span-17', 18: 'md:col-span-18', 19: 'md:col-span-19', 20: 'md:col-span-20',
  21: 'md:col-span-21', 22: 'md:col-span-22', 23: 'md:col-span-23', 24: 'md:col-span-24', 25: 'md:col-span-25',
  26: 'md:col-span-26', 27: 'md:col-span-27', 28: 'md:col-span-28', 29: 'md:col-span-29', 30: 'md:col-span-30',
  31: 'md:col-span-31', 32: 'md:col-span-32', 33: 'md:col-span-33', 34: 'md:col-span-34', 35: 'md:col-span-35',
  36: 'md:col-span-36', 37: 'md:col-span-37', 38: 'md:col-span-38', 39: 'md:col-span-39', 40: 'md:col-span-40',
  41: 'md:col-span-41', 42: 'md:col-span-42', 43: 'md:col-span-43', 44: 'md:col-span-44', 45: 'md:col-span-45',
  46: 'md:col-span-46', 47: 'md:col-span-47', 48: 'md:col-span-48', 49: 'md:col-span-49', 50: 'md:col-span-50',
  51: 'md:col-span-51', 52: 'md:col-span-52', 53: 'md:col-span-53', 54: 'md:col-span-54', 55: 'md:col-span-55',
  56: 'md:col-span-56', 57: 'md:col-span-57', 58: 'md:col-span-58', 59: 'md:col-span-59', 60: 'md:col-span-60',
  61: 'md:col-span-61', 62: 'md:col-span-62', 63: 'md:col-span-63', 64: 'md:col-span-64', 65: 'md:col-span-65',
  66: 'md:col-span-66', 67: 'md:col-span-67', 68: 'md:col-span-68', 69: 'md:col-span-69', 70: 'md:col-span-70',
  71: 'md:col-span-71', 72: 'md:col-span-72', 73: 'md:col-span-73', 74: 'md:col-span-74', 75: 'md:col-span-75',
  76: 'md:col-span-76', 77: 'md:col-span-77', 78: 'md:col-span-78', 79: 'md:col-span-79', 80: 'md:col-span-80',
  81: 'md:col-span-81', 82: 'md:col-span-82', 83: 'md:col-span-83', 84: 'md:col-span-84', 85: 'md:col-span-85',
  86: 'md:col-span-86', 87: 'md:col-span-87', 88: 'md:col-span-88', 89: 'md:col-span-89', 90: 'md:col-span-90',
  91: 'md:col-span-91', 92: 'md:col-span-92', 93: 'md:col-span-93', 94: 'md:col-span-94', 95: 'md:col-span-95',
  96: 'md:col-span-96', 97: 'md:col-span-97', 98: 'md:col-span-98', 99: 'md:col-span-99', 100: 'md:col-span-100',
  101: 'md:col-span-101', 102: 'md:col-span-102', 103: 'md:col-span-103', 104: 'md:col-span-104', 105: 'md:col-span-105',
  106: 'md:col-span-106', 107: 'md:col-span-107', 108: 'md:col-span-108', 109: 'md:col-span-109', 110: 'md:col-span-110',
  111: 'md:col-span-111', 112: 'md:col-span-112', 113: 'md:col-span-113', 114: 'md:col-span-114', 115: 'md:col-span-115',
  116: 'md:col-span-116', 117: 'md:col-span-117', 118: 'md:col-span-118', 119: 'md:col-span-119', 120: 'md:col-span-120',
}

const LG_COL_SPAN_120_CLASSES: Record<number, string> = {
  1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4', 5: 'lg:col-span-5',
  6: 'lg:col-span-6', 7: 'lg:col-span-7', 8: 'lg:col-span-8', 9: 'lg:col-span-9', 10: 'lg:col-span-10',
  11: 'lg:col-span-11', 12: 'lg:col-span-12', 13: 'lg:col-span-13', 14: 'lg:col-span-14', 15: 'lg:col-span-15',
  16: 'lg:col-span-16', 17: 'lg:col-span-17', 18: 'lg:col-span-18', 19: 'lg:col-span-19', 20: 'lg:col-span-20',
  21: 'lg:col-span-21', 22: 'lg:col-span-22', 23: 'lg:col-span-23', 24: 'lg:col-span-24', 25: 'lg:col-span-25',
  26: 'lg:col-span-26', 27: 'lg:col-span-27', 28: 'lg:col-span-28', 29: 'lg:col-span-29', 30: 'lg:col-span-30',
  31: 'lg:col-span-31', 32: 'lg:col-span-32', 33: 'lg:col-span-33', 34: 'lg:col-span-34', 35: 'lg:col-span-35',
  36: 'lg:col-span-36', 37: 'lg:col-span-37', 38: 'lg:col-span-38', 39: 'lg:col-span-39', 40: 'lg:col-span-40',
  41: 'lg:col-span-41', 42: 'lg:col-span-42', 43: 'lg:col-span-43', 44: 'lg:col-span-44', 45: 'lg:col-span-45',
  46: 'lg:col-span-46', 47: 'lg:col-span-47', 48: 'lg:col-span-48', 49: 'lg:col-span-49', 50: 'lg:col-span-50',
  51: 'lg:col-span-51', 52: 'lg:col-span-52', 53: 'lg:col-span-53', 54: 'lg:col-span-54', 55: 'lg:col-span-55',
  56: 'lg:col-span-56', 57: 'lg:col-span-57', 58: 'lg:col-span-58', 59: 'lg:col-span-59', 60: 'lg:col-span-60',
  61: 'lg:col-span-61', 62: 'lg:col-span-62', 63: 'lg:col-span-63', 64: 'lg:col-span-64', 65: 'lg:col-span-65',
  66: 'lg:col-span-66', 67: 'lg:col-span-67', 68: 'lg:col-span-68', 69: 'lg:col-span-69', 70: 'lg:col-span-70',
  71: 'lg:col-span-71', 72: 'lg:col-span-72', 73: 'lg:col-span-73', 74: 'lg:col-span-74', 75: 'lg:col-span-75',
  76: 'lg:col-span-76', 77: 'lg:col-span-77', 78: 'lg:col-span-78', 79: 'lg:col-span-79', 80: 'lg:col-span-80',
  81: 'lg:col-span-81', 82: 'lg:col-span-82', 83: 'lg:col-span-83', 84: 'lg:col-span-84', 85: 'lg:col-span-85',
  86: 'lg:col-span-86', 87: 'lg:col-span-87', 88: 'lg:col-span-88', 89: 'lg:col-span-89', 90: 'lg:col-span-90',
  91: 'lg:col-span-91', 92: 'lg:col-span-92', 93: 'lg:col-span-93', 94: 'lg:col-span-94', 95: 'lg:col-span-95',
  96: 'lg:col-span-96', 97: 'lg:col-span-97', 98: 'lg:col-span-98', 99: 'lg:col-span-99', 100: 'lg:col-span-100',
  101: 'lg:col-span-101', 102: 'lg:col-span-102', 103: 'lg:col-span-103', 104: 'lg:col-span-104', 105: 'lg:col-span-105',
  106: 'lg:col-span-106', 107: 'lg:col-span-107', 108: 'lg:col-span-108', 109: 'lg:col-span-109', 110: 'lg:col-span-110',
  111: 'lg:col-span-111', 112: 'lg:col-span-112', 113: 'lg:col-span-113', 114: 'lg:col-span-114', 115: 'lg:col-span-115',
  116: 'lg:col-span-116', 117: 'lg:col-span-117', 118: 'lg:col-span-118', 119: 'lg:col-span-119', 120: 'lg:col-span-120',
}

const XL_COL_SPAN_120_CLASSES: Record<number, string> = {
  1: 'xl:col-span-1', 2: 'xl:col-span-2', 3: 'xl:col-span-3', 4: 'xl:col-span-4', 5: 'xl:col-span-5',
  6: 'xl:col-span-6', 7: 'xl:col-span-7', 8: 'xl:col-span-8', 9: 'xl:col-span-9', 10: 'xl:col-span-10',
  11: 'xl:col-span-11', 12: 'xl:col-span-12', 13: 'xl:col-span-13', 14: 'xl:col-span-14', 15: 'xl:col-span-15',
  16: 'xl:col-span-16', 17: 'xl:col-span-17', 18: 'xl:col-span-18', 19: 'xl:col-span-19', 20: 'xl:col-span-20',
  21: 'xl:col-span-21', 22: 'xl:col-span-22', 23: 'xl:col-span-23', 24: 'xl:col-span-24', 25: 'xl:col-span-25',
  26: 'xl:col-span-26', 27: 'xl:col-span-27', 28: 'xl:col-span-28', 29: 'xl:col-span-29', 30: 'xl:col-span-30',
  31: 'xl:col-span-31', 32: 'xl:col-span-32', 33: 'xl:col-span-33', 34: 'xl:col-span-34', 35: 'xl:col-span-35',
  36: 'xl:col-span-36', 37: 'xl:col-span-37', 38: 'xl:col-span-38', 39: 'xl:col-span-39', 40: 'xl:col-span-40',
  41: 'xl:col-span-41', 42: 'xl:col-span-42', 43: 'xl:col-span-43', 44: 'xl:col-span-44', 45: 'xl:col-span-45',
  46: 'xl:col-span-46', 47: 'xl:col-span-47', 48: 'xl:col-span-48', 49: 'xl:col-span-49', 50: 'xl:col-span-50',
  51: 'xl:col-span-51', 52: 'xl:col-span-52', 53: 'xl:col-span-53', 54: 'xl:col-span-54', 55: 'xl:col-span-55',
  56: 'xl:col-span-56', 57: 'xl:col-span-57', 58: 'xl:col-span-58', 59: 'xl:col-span-59', 60: 'xl:col-span-60',
  61: 'xl:col-span-61', 62: 'xl:col-span-62', 63: 'xl:col-span-63', 64: 'xl:col-span-64', 65: 'xl:col-span-65',
  66: 'xl:col-span-66', 67: 'xl:col-span-67', 68: 'xl:col-span-68', 69: 'xl:col-span-69', 70: 'xl:col-span-70',
  71: 'xl:col-span-71', 72: 'xl:col-span-72', 73: 'xl:col-span-73', 74: 'xl:col-span-74', 75: 'xl:col-span-75',
  76: 'xl:col-span-76', 77: 'xl:col-span-77', 78: 'xl:col-span-78', 79: 'xl:col-span-79', 80: 'xl:col-span-80',
  81: 'xl:col-span-81', 82: 'xl:col-span-82', 83: 'xl:col-span-83', 84: 'xl:col-span-84', 85: 'xl:col-span-85',
  86: 'xl:col-span-86', 87: 'xl:col-span-87', 88: 'xl:col-span-88', 89: 'xl:col-span-89', 90: 'xl:col-span-90',
  91: 'xl:col-span-91', 92: 'xl:col-span-92', 93: 'xl:col-span-93', 94: 'xl:col-span-94', 95: 'xl:col-span-95',
  96: 'xl:col-span-96', 97: 'xl:col-span-97', 98: 'xl:col-span-98', 99: 'xl:col-span-99', 100: 'xl:col-span-100',
  101: 'xl:col-span-101', 102: 'xl:col-span-102', 103: 'xl:col-span-103', 104: 'xl:col-span-104', 105: 'xl:col-span-105',
  106: 'xl:col-span-106', 107: 'xl:col-span-107', 108: 'xl:col-span-108', 109: 'xl:col-span-109', 110: 'xl:col-span-110',
  111: 'xl:col-span-111', 112: 'xl:col-span-112', 113: 'xl:col-span-113', 114: 'xl:col-span-114', 115: 'xl:col-span-115',
  116: 'xl:col-span-116', 117: 'xl:col-span-117', 118: 'xl:col-span-118', 119: 'xl:col-span-119', 120: 'xl:col-span-120',
}

const XXL_COL_SPAN_120_CLASSES: Record<number, string> = {
  1: '2xl:col-span-1', 2: '2xl:col-span-2', 3: '2xl:col-span-3', 4: '2xl:col-span-4', 5: '2xl:col-span-5',
  6: '2xl:col-span-6', 7: '2xl:col-span-7', 8: '2xl:col-span-8', 9: '2xl:col-span-9', 10: '2xl:col-span-10',
  11: '2xl:col-span-11', 12: '2xl:col-span-12', 13: '2xl:col-span-13', 14: '2xl:col-span-14', 15: '2xl:col-span-15',
  16: '2xl:col-span-16', 17: '2xl:col-span-17', 18: '2xl:col-span-18', 19: '2xl:col-span-19', 20: '2xl:col-span-20',
  21: '2xl:col-span-21', 22: '2xl:col-span-22', 23: '2xl:col-span-23', 24: '2xl:col-span-24', 25: '2xl:col-span-25',
  26: '2xl:col-span-26', 27: '2xl:col-span-27', 28: '2xl:col-span-28', 29: '2xl:col-span-29', 30: '2xl:col-span-30',
  31: '2xl:col-span-31', 32: '2xl:col-span-32', 33: '2xl:col-span-33', 34: '2xl:col-span-34', 35: '2xl:col-span-35',
  36: '2xl:col-span-36', 37: '2xl:col-span-37', 38: '2xl:col-span-38', 39: '2xl:col-span-39', 40: '2xl:col-span-40',
  41: '2xl:col-span-41', 42: '2xl:col-span-42', 43: '2xl:col-span-43', 44: '2xl:col-span-44', 45: '2xl:col-span-45',
  46: '2xl:col-span-46', 47: '2xl:col-span-47', 48: '2xl:col-span-48', 49: '2xl:col-span-49', 50: '2xl:col-span-50',
  51: '2xl:col-span-51', 52: '2xl:col-span-52', 53: '2xl:col-span-53', 54: '2xl:col-span-54', 55: '2xl:col-span-55',
  56: '2xl:col-span-56', 57: '2xl:col-span-57', 58: '2xl:col-span-58', 59: '2xl:col-span-59', 60: '2xl:col-span-60',
  61: '2xl:col-span-61', 62: '2xl:col-span-62', 63: '2xl:col-span-63', 64: '2xl:col-span-64', 65: '2xl:col-span-65',
  66: '2xl:col-span-66', 67: '2xl:col-span-67', 68: '2xl:col-span-68', 69: '2xl:col-span-69', 70: '2xl:col-span-70',
  71: '2xl:col-span-71', 72: '2xl:col-span-72', 73: '2xl:col-span-73', 74: '2xl:col-span-74', 75: '2xl:col-span-75',
  76: '2xl:col-span-76', 77: '2xl:col-span-77', 78: '2xl:col-span-78', 79: '2xl:col-span-79', 80: '2xl:col-span-80',
  81: '2xl:col-span-81', 82: '2xl:col-span-82', 83: '2xl:col-span-83', 84: '2xl:col-span-84', 85: '2xl:col-span-85',
  86: '2xl:col-span-86', 87: '2xl:col-span-87', 88: '2xl:col-span-88', 89: '2xl:col-span-89', 90: '2xl:col-span-90',
  91: '2xl:col-span-91', 92: '2xl:col-span-92', 93: '2xl:col-span-93', 94: '2xl:col-span-94', 95: '2xl:col-span-95',
  96: '2xl:col-span-96', 97: '2xl:col-span-97', 98: '2xl:col-span-98', 99: '2xl:col-span-99', 100: '2xl:col-span-100',
  101: '2xl:col-span-101', 102: '2xl:col-span-102', 103: '2xl:col-span-103', 104: '2xl:col-span-104', 105: '2xl:col-span-105',
  106: '2xl:col-span-106', 107: '2xl:col-span-107', 108: '2xl:col-span-108', 109: '2xl:col-span-109', 110: '2xl:col-span-110',
  111: '2xl:col-span-111', 112: '2xl:col-span-112', 113: '2xl:col-span-113', 114: '2xl:col-span-114', 115: '2xl:col-span-115',
  116: '2xl:col-span-116', 117: '2xl:col-span-117', 118: '2xl:col-span-118', 119: '2xl:col-span-119', 120: '2xl:col-span-120',
}

const COL_START_120_CLASSES: Record<number, string> = {
  1: 'col-start-1', 2: 'col-start-2', 3: 'col-start-3', 4: 'col-start-4', 5: 'col-start-5',
  6: 'col-start-6', 7: 'col-start-7', 8: 'col-start-8', 9: 'col-start-9', 10: 'col-start-10',
  11: 'col-start-11', 12: 'col-start-12', 13: 'col-start-13', 14: 'col-start-14', 15: 'col-start-15',
  16: 'col-start-16', 17: 'col-start-17', 18: 'col-start-18', 19: 'col-start-19', 20: 'col-start-20',
  21: 'col-start-21', 22: 'col-start-22', 23: 'col-start-23', 24: 'col-start-24', 25: 'col-start-25',
  26: 'col-start-26', 27: 'col-start-27', 28: 'col-start-28', 29: 'col-start-29', 30: 'col-start-30',
  31: 'col-start-31', 32: 'col-start-32', 33: 'col-start-33', 34: 'col-start-34', 35: 'col-start-35',
  36: 'col-start-36', 37: 'col-start-37', 38: 'col-start-38', 39: 'col-start-39', 40: 'col-start-40',
  41: 'col-start-41', 42: 'col-start-42', 43: 'col-start-43', 44: 'col-start-44', 45: 'col-start-45',
  46: 'col-start-46', 47: 'col-start-47', 48: 'col-start-48', 49: 'col-start-49', 50: 'col-start-50',
  51: 'col-start-51', 52: 'col-start-52', 53: 'col-start-53', 54: 'col-start-54', 55: 'col-start-55',
  56: 'col-start-56', 57: 'col-start-57', 58: 'col-start-58', 59: 'col-start-59', 60: 'col-start-60',
  61: 'col-start-61', 62: 'col-start-62', 63: 'col-start-63', 64: 'col-start-64', 65: 'col-start-65',
  66: 'col-start-66', 67: 'col-start-67', 68: 'col-start-68', 69: 'col-start-69', 70: 'col-start-70',
  71: 'col-start-71', 72: 'col-start-72', 73: 'col-start-73', 74: 'col-start-74', 75: 'col-start-75',
  76: 'col-start-76', 77: 'col-start-77', 78: 'col-start-78', 79: 'col-start-79', 80: 'col-start-80',
  81: 'col-start-81', 82: 'col-start-82', 83: 'col-start-83', 84: 'col-start-84', 85: 'col-start-85',
  86: 'col-start-86', 87: 'col-start-87', 88: 'col-start-88', 89: 'col-start-89', 90: 'col-start-90',
  91: 'col-start-91', 92: 'col-start-92', 93: 'col-start-93', 94: 'col-start-94', 95: 'col-start-95',
  96: 'col-start-96', 97: 'col-start-97', 98: 'col-start-98', 99: 'col-start-99', 100: 'col-start-100',
  101: 'col-start-101', 102: 'col-start-102', 103: 'col-start-103', 104: 'col-start-104', 105: 'col-start-105',
  106: 'col-start-106', 107: 'col-start-107', 108: 'col-start-108', 109: 'col-start-109', 110: 'col-start-110',
  111: 'col-start-111', 112: 'col-start-112', 113: 'col-start-113', 114: 'col-start-114', 115: 'col-start-115',
  116: 'col-start-116', 117: 'col-start-117', 118: 'col-start-118', 119: 'col-start-119', 120: 'col-start-120',
  121: 'col-start-121',
}

export function Row({ children, cols = 24, gutter = 0, justify, align, className = '', style: userStyle, ...rest }: RowProps) {
  const [gutterX, gutterY] = Array.isArray(gutter) ? gutter : [gutter, 0]

  // Scale gutter for 120-column grids to maintain consistent visual spacing
  // 120 columns creates 5x more grid tracks than 24 columns, so gutter needs to be 1/5
  const actualGutterX = cols === 120 ? gutterX / 5 : gutterX
  const actualGutterY = cols === 120 ? gutterY / 5 : gutterY

  const justifyClasses: Record<string, string> = {
    start: 'justify-items-start',
    end: 'justify-items-end',
    center: 'justify-items-center',
    between: 'justify-items-between',
    around: 'justify-items-around',
    evenly: 'justify-items-evenly',
  }

  const alignClasses: Record<string, string> = {
    start: 'items-start',
    end: 'items-end',
    center: 'items-center',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  }

  // Grid column class mapping - literal strings for Tailwind
  const GRID_COLS_CLASSES: Record<24 | 120, string> = {
    24: 'grid-cols-[repeat(24,minmax(0,1fr))]',
    120: 'grid-cols-[repeat(120,minmax(0,1fr))]',
  }

  const classes = [
    'grid',
    GRID_COLS_CLASSES[cols],
    'w-full',
    justify && justifyClasses[justify],
    align && alignClasses[align],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const style: React.CSSProperties = {
    ...(actualGutterX && { columnGap: `${actualGutterX}px` }),
    ...(actualGutterY && { rowGap: `${actualGutterY}px` }),
    ...userStyle,
  }

  return (
    <GridContext.Provider value={{ cols }}>
      <div className={classes} style={style} {...rest}>
        {children}
      </div>
    </GridContext.Provider>
  )
}

export function Col({ children, span, offset, order, xs, sm, md, lg, xl, xxl, className = '', ...rest }: ColProps) {
  const { cols } = React.useContext(GridContext)
  const classes: string[] = []

  // Select mapping objects based on column count
  const colSpanClasses = cols === 120 ? COL_SPAN_120_CLASSES : COL_SPAN_CLASSES
  const smColSpanClasses = cols === 120 ? SM_COL_SPAN_120_CLASSES : SM_COL_SPAN_CLASSES
  const mdColSpanClasses = cols === 120 ? MD_COL_SPAN_120_CLASSES : MD_COL_SPAN_CLASSES
  const lgColSpanClasses = cols === 120 ? LG_COL_SPAN_120_CLASSES : LG_COL_SPAN_CLASSES
  const xlColSpanClasses = cols === 120 ? XL_COL_SPAN_120_CLASSES : XL_COL_SPAN_CLASSES
  const xxlColSpanClasses = cols === 120 ? XXL_COL_SPAN_120_CLASSES : XXL_COL_SPAN_CLASSES
  const colStartClasses = cols === 120 ? COL_START_120_CLASSES : COL_START_CLASSES

  // Base span or xs (mobile-first)
  const baseSpan = span || xs
  if (baseSpan && colSpanClasses[baseSpan]) {
    classes.push(colSpanClasses[baseSpan])
  }

  // Responsive spans
  if (sm && smColSpanClasses[sm]) classes.push(smColSpanClasses[sm])
  if (md && mdColSpanClasses[md]) classes.push(mdColSpanClasses[md])
  if (lg && lgColSpanClasses[lg]) classes.push(lgColSpanClasses[lg])
  if (xl && xlColSpanClasses[xl]) classes.push(xlColSpanClasses[xl])
  if (xxl && xxlColSpanClasses[xxl]) classes.push(xxlColSpanClasses[xxl])

  // Offset (uses col-start)
  if (offset && colStartClasses[offset + 1]) {
    classes.push(colStartClasses[offset + 1])
  }

  // Order
  if (order && ORDER_CLASSES[order]) {
    classes.push(ORDER_CLASSES[order])
  }

  if (className) classes.push(className)

  return <div className={classes.join(' ')} {...rest}>{children}</div>
}

export const Grid = {
  Row,
  Col,
}
