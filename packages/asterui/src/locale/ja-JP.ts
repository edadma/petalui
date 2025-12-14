import type { Locale } from './index'

const jaJP: Locale = {
  locale: 'ja-JP',

  Common: {
    ok: 'OK',
    cancel: 'キャンセル',
    confirm: '確認',
    close: '閉じる',
    loading: '読み込み中...',
    search: '検索',
    reset: 'リセット',
    clear: 'クリア',
    selectAll: 'すべて選択',
    noData: 'データがありません',
    notFound: '見つかりません',
  },

  Modal: {
    okText: 'OK',
    cancelText: 'キャンセル',
  },

  Popconfirm: {
    okText: 'OK',
    cancelText: 'キャンセル',
  },

  Tour: {
    prevText: '前へ',
    nextText: '次へ',
    finishText: '完了',
    skipText: 'スキップ',
  },

  Empty: {
    description: 'データがありません',
  },

  Pagination: {
    page: 'ページ',
    of: '/',
    items: '件',
    itemsPerPage: '件/ページ',
    goTo: '移動',
    prev: '前へ',
    next: '次へ',
  },

  Table: {
    emptyText: 'データがありません',
    filterConfirm: 'OK',
    filterReset: 'リセット',
    sortAscending: '昇順',
    sortDescending: '降順',
    selectAll: 'すべて選択',
    selectInvert: '選択を反転',
    selectNone: 'すべて解除',
    triggerAsc: 'クリックで昇順',
    triggerDesc: 'クリックで降順',
    cancelSort: 'クリックでソート解除',
  },

  Transfer: {
    titles: ['ソース', 'ターゲット'],
    searchPlaceholder: '検索',
    itemUnit: '件',
    itemsUnit: '件',
    notFoundContent: '見つかりません',
    selectAll: 'すべて選択',
    deselectAll: 'すべて解除',
  },

  Upload: {
    uploadText: 'クリックでアップロード',
    removeText: '削除',
    uploadingText: 'アップロード中...',
    previewText: 'プレビュー',
    downloadText: 'ダウンロード',
  },

  Select: {
    placeholder: '選択してください...',
    noOptions: 'オプションがありません',
    loading: '読み込み中...',
  },

  Image: {
    previewText: 'プレビュー',
  },

  DatePicker: {
    placeholder: '日付を選択',
    rangePlaceholder: ['開始日', '終了日'],
    today: '今日',
    now: '現在',
    ok: 'OK',
  },

  TimePicker: {
    placeholder: '時間を選択',
    now: '現在',
    ok: 'OK',
  },

  Calendar: {
    today: '今日',
    month: '月',
    year: '年',
  },
}

export default jaJP
