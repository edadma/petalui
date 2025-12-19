import { useState } from 'react'
import { Upload, Button, Form } from '@aster-ui/prefixed'
import { Demo } from './Demo'

interface UploadFile {
  uid: string
  name: string
  status?: 'uploading' | 'done' | 'error' | 'removed'
  url?: string
  thumbUrl?: string
  percent?: number
}

// @example-imports: { Upload, Button } from 'asterui'
export function BasicUploadDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Upload>
        <Button>Click to Upload</Button>
      </Upload>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Upload } from 'asterui'
export function DragUploadDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Upload.Dragger>
        <p className="text-4xl mb-4">📁</p>
        <p className="text-lg">Click or drag file to this area to upload</p>
        <p className="text-sm opacity-60">Support for single or bulk upload</p>
      </Upload.Dragger>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Upload } from 'asterui'
// @example-imports: { useState } from 'react'
export function PictureCardUploadDemo() {
  // @example-include
  interface UploadFile {
    uid: string
    name: string
    status?: 'uploading' | 'done' | 'error' | 'removed'
    url?: string
    thumbUrl?: string
    percent?: number
  }

  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      url: 'https://picsum.photos/200',
    },
  ])
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
      >
        {fileList.length < 5 && (
          <div className="flex flex-col items-center">
            <span className="text-2xl">+</span>
            <span className="text-sm">Upload</span>
          </div>
        )}
      </Upload>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Upload, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function ControlledUploadDemo() {
  // @example-include
  interface UploadFile {
    uid: string
    name: string
    status?: 'uploading' | 'done' | 'error' | 'removed'
    url?: string
    thumbUrl?: string
    percent?: number
  }

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList)
  }

  const customRequest = ({ file, onSuccess }: { file: File; onSuccess: () => void }) => {
    // Simulate upload
    setTimeout(() => {
      onSuccess()
    }, 1000)
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <div>
        <Upload
          fileList={fileList}
          onChange={handleChange}
          customRequest={customRequest}
          maxCount={3}
        >
          <Button>Upload (max 3)</Button>
        </Upload>
        <p>Files: {fileList.length}/3</p>
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Upload, Button } from 'asterui'
export function MaxSizeUploadDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Upload maxSize={1024 * 1024 * 5}>
        <Button>Upload (max 5MB)</Button>
      </Upload>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Upload, Button } from 'asterui'
export function AcceptUploadDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Upload accept="image/*">
        <Button>Upload Images Only</Button>
      </Upload>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Upload, Button, Form } from 'asterui'
export function FormUploadDemo() {
  // @example-include
  const handleSubmit = (values: Record<string, unknown>) => {
    console.log(values)
  }
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="avatar"
          label="Avatar"
          required
          rules={{
            required: 'Please upload an avatar',
          }}
        >
          <Upload listType="picture-card" maxCount={1}>
            <div className="flex flex-col items-center">
              <span className="text-2xl">+</span>
              <span className="text-sm">Upload</span>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item name="documents" label="Documents">
          <Upload maxCount={5}>
            <Button>Upload Documents</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" color="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* @example-return-end */}
    </Demo>
  )
}
