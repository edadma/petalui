import React, { useState, useRef, DragEvent, ChangeEvent } from 'react'

export interface UploadFile {
  uid: string
  name: string
  status: 'uploading' | 'done' | 'error'
  percent?: number
  url?: string
  response?: any
  error?: any
  originFileObj?: File
}

export interface UploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  action?: string
  accept?: string
  multiple?: boolean
  maxCount?: number
  maxSize?: number // in bytes
  listType?: 'text' | 'picture' | 'picture-card'
  fileList?: UploadFile[]
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>
  onChange?: (info: { file: UploadFile; fileList: UploadFile[] }) => void
  onRemove?: (file: UploadFile) => void | boolean | Promise<void | boolean>
  customRequest?: (options: {
    file: File
    onProgress: (percent: number) => void
    onSuccess: (response: any) => void
    onError: (error: any) => void
  }) => void
  showUploadList?: boolean
  disabled?: boolean
  children?: React.ReactNode
}

export const Upload: React.FC<UploadProps> = ({
  action,
  accept,
  multiple = false,
  maxCount,
  maxSize,
  listType = 'text',
  fileList: controlledFileList,
  defaultFileList = [],
  beforeUpload,
  onChange,
  onRemove,
  customRequest,
  showUploadList = true,
  disabled = false,
  children,
  className = '',
  ...rest
}) => {
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const uidCounter = useRef(0)
  const dragCounter = useRef(0)

  const fileList = controlledFileList !== undefined ? controlledFileList : internalFileList

  const generateUid = () => {
    uidCounter.current += 1
    return `upload-${Date.now()}-${uidCounter.current}`
  }

  const updateFileList = (newFileList: UploadFile[]) => {
    if (controlledFileList === undefined) {
      setInternalFileList(newFileList)
    }
  }

  const uploadFile = (file: File) => {
    const uploadFile: UploadFile = {
      uid: generateUid(),
      name: file.name,
      status: 'uploading',
      percent: 0,
      originFileObj: file,
    }

    const newFileList = [...fileList, uploadFile]
    updateFileList(newFileList)
    onChange?.({ file: uploadFile, fileList: newFileList })

    const updateProgress = (percent: number) => {
      const updatedList = newFileList.map((f) =>
        f.uid === uploadFile.uid ? { ...f, percent } : f
      )
      updateFileList(updatedList)
      onChange?.({ file: { ...uploadFile, percent }, fileList: updatedList })
    }

    const onSuccess = (response: any) => {
      const successFile = {
        ...uploadFile,
        status: 'done' as const,
        percent: 100,
        response,
      }
      const updatedList = newFileList.map((f) =>
        f.uid === uploadFile.uid ? successFile : f
      )
      updateFileList(updatedList)
      onChange?.({ file: successFile, fileList: updatedList })
    }

    const onError = (error: any) => {
      const errorFile = {
        ...uploadFile,
        status: 'error' as const,
        error,
      }
      const updatedList = newFileList.map((f) =>
        f.uid === uploadFile.uid ? errorFile : f
      )
      updateFileList(updatedList)
      onChange?.({ file: errorFile, fileList: updatedList })
    }

    if (customRequest) {
      customRequest({
        file,
        onProgress: updateProgress,
        onSuccess,
        onError,
      })
    } else if (action) {
      const formData = new FormData()
      formData.append('file', file)

      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100)
          updateProgress(percent)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          onSuccess(xhr.response)
        } else {
          onError(new Error(`Upload failed with status ${xhr.status}`))
        }
      })

      xhr.addEventListener('error', () => {
        onError(new Error('Upload failed'))
      })

      xhr.open('POST', action)
      xhr.send(formData)
    } else {
      // No upload action, just mark as done
      onSuccess(null)
    }
  }

  const handleFiles = async (files: FileList | File[]) => {
    if (disabled) return

    const fileArray = Array.from(files)

    // Check maxCount
    if (maxCount && fileList.length + fileArray.length > maxCount) {
      console.warn(`Cannot upload more than ${maxCount} files`)
      return
    }

    // Check maxSize
    if (maxSize) {
      const oversizedFiles = fileArray.filter((file) => file.size > maxSize)
      if (oversizedFiles.length > 0) {
        console.warn(
          `Files exceed maximum size of ${maxSize} bytes:`,
          oversizedFiles.map((f) => f.name)
        )
        return
      }
    }

    // beforeUpload hook
    if (beforeUpload) {
      const results = await Promise.all(
        fileArray.map((file) => beforeUpload(file, fileArray))
      )
      const filteredFiles = fileArray.filter((_, index) => results[index] !== false)
      filteredFiles.forEach(uploadFile)
    } else {
      fileArray.forEach(uploadFile)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
    // Reset input value to allow uploading the same file again
    e.target.value = ''
  }

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      dragCounter.current++
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      dragCounter.current--
      if (dragCounter.current === 0) {
        setIsDragging(false)
      }
    }
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current = 0
    setIsDragging(false)

    if (disabled) return

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleRemove = async (file: UploadFile) => {
    if (onRemove) {
      const result = await onRemove(file)
      if (result === false) return
    }

    const newFileList = fileList.filter((f) => f.uid !== file.uid)
    updateFileList(newFileList)
    onChange?.({ file, fileList: newFileList })
  }

  const renderFileList = () => {
    if (!showUploadList || fileList.length === 0) return null

    if (listType === 'picture-card') {
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          {fileList.map((file) => (
            <div
              key={file.uid}
              className="relative w-24 h-24 border border-base-content/20 rounded-lg overflow-hidden"
            >
              {file.status === 'uploading' && (
                <div className="absolute inset-0 bg-base-300/80 flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                </div>
              )}
              {file.status === 'done' && file.url && (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              )}
              {file.status === 'error' && (
                <div className="absolute inset-0 bg-error/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-error"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
              <button
                onClick={() => handleRemove(file)}
                className="absolute top-1 right-1 btn btn-xs btn-circle btn-error"
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="mt-2 space-y-2">
        {fileList.map((file) => (
          <div
            key={file.uid}
            className="flex items-center gap-2 p-2 border border-base-content/10 rounded-lg"
          >
            {listType === 'picture' && file.url && (
              <img
                src={file.url}
                alt={file.name}
                className="w-12 h-12 object-cover rounded"
              />
            )}
            <div className="flex-1 min-w-0">
              <div className="truncate text-sm">{file.name}</div>
              {file.status === 'uploading' && file.percent !== undefined && (
                <div className="w-full bg-base-200 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{ width: `${file.percent}%` }}
                  />
                </div>
              )}
              {file.status === 'error' && (
                <div className="text-xs text-error mt-1">Upload failed</div>
              )}
            </div>
            <button
              onClick={() => handleRemove(file)}
              className="btn btn-xs btn-ghost btn-circle"
              type="button"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={className} data-state={isDragging ? 'dragging' : 'idle'} {...rest}>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors
          ${isDragging ? 'border-primary bg-primary/5' : 'border-base-content/20'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'}
        `}
      >
        {children || (
          <div className="flex flex-col items-center gap-2 py-4">
            <svg
              className="w-12 h-12 text-base-content/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div className="text-sm text-center">
              <span className="font-semibold text-primary">Click to upload</span>
              <span className="text-base-content/60"> or drag and drop</span>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />

      {renderFileList()}
    </div>
  )
}

Upload.displayName = 'Upload'

export default Upload
