import { useState } from 'react'
import { Upload, Button, Masonry } from '@edadma/bloomui'
import type { UploadFile } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const uploadApi: ApiProperty[] = [
  {
    property: 'action',
    description: 'Upload URL',
    type: 'string',
  },
  {
    property: 'accept',
    description: 'File types that can be accepted',
    type: 'string',
  },
  {
    property: 'multiple',
    description: 'Whether to support multiple file upload',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'maxCount',
    description: 'Maximum number of files',
    type: 'number',
  },
  {
    property: 'maxSize',
    description: 'Maximum file size in bytes',
    type: 'number',
  },
  {
    property: 'listType',
    description: 'Built-in file list style',
    type: "'text' | 'picture' | 'picture-card'",
    default: "'text'",
  },
  {
    property: 'fileList',
    description: 'Controlled file list',
    type: 'UploadFile[]',
  },
  {
    property: 'defaultFileList',
    description: 'Default file list',
    type: 'UploadFile[]',
    default: '[]',
  },
  {
    property: 'beforeUpload',
    description: 'Hook before uploading, return false to cancel',
    type: '(file: File, fileList: File[]) => boolean | Promise<boolean>',
  },
  {
    property: 'onChange',
    description: 'Callback when upload state changes',
    type: '(info: { file: UploadFile; fileList: UploadFile[] }) => void',
  },
  {
    property: 'onRemove',
    description: 'Callback when file is removed, return false to cancel',
    type: '(file: UploadFile) => void | boolean | Promise<void | boolean>',
  },
  {
    property: 'customRequest',
    description: 'Custom upload implementation',
    type: '(options: { file: File; onProgress: (percent: number) => void; onSuccess: (response: any) => void; onError: (error: any) => void }) => void',
  },
  {
    property: 'showUploadList',
    description: 'Whether to show file list',
    type: 'boolean',
    default: 'true',
  },
  {
    property: 'disabled',
    description: 'Whether upload is disabled',
    type: 'boolean',
    default: 'false',
  },
  {
    property: 'children',
    description: 'Custom upload button',
    type: 'React.ReactNode',
  },
  {
    property: 'className',
    description: 'Additional CSS classes',
    type: 'string',
  },
]

const uploadFileApi: ApiProperty[] = [
  {
    property: 'uid',
    description: 'Unique identifier',
    type: 'string',
  },
  {
    property: 'name',
    description: 'File name',
    type: 'string',
  },
  {
    property: 'status',
    description: 'Upload status',
    type: "'uploading' | 'done' | 'error'",
  },
  {
    property: 'percent',
    description: 'Upload progress percentage',
    type: 'number',
  },
  {
    property: 'url',
    description: 'File URL',
    type: 'string',
  },
  {
    property: 'response',
    description: 'Server response',
    type: 'any',
  },
  {
    property: 'error',
    description: 'Error information',
    type: 'any',
  },
  {
    property: 'originFileObj',
    description: 'Original File object',
    type: 'File',
  },
]

export default function UploadPage() {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-4xl font-bold mb-2">Upload</h1>
        <p className="text-lg opacity-70">
          Upload files by clicking or drag-and-drop.
        </p>
      </div>

      <div className="space-y-6">
        <ExampleSection
          title="Basic Usage"
          code={`import React from 'react'
import { Upload, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Upload>
    <Button>Click to Upload</Button>
  </Upload>
)

export default App`}
        >
          <Upload>
            <Button>Click to Upload</Button>
          </Upload>
        </ExampleSection>

        <ExampleSection
          title="Default Drag and Drop"
          code={`import React from 'react'
import { Upload } from '@edadma/bloomui'

const App: React.FC = () => <Upload />

export default App`}
        >
          <Upload />
        </ExampleSection>

        <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
          <ExampleSection
            title="Multiple Files"
            code={`import React from 'react'
import { Upload, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Upload multiple>
    <Button>Upload Multiple Files</Button>
  </Upload>
)

export default App`}
          >
            <Upload multiple>
              <Button>Upload Multiple Files</Button>
            </Upload>
          </ExampleSection>

          <ExampleSection
            title="Accept Specific Types"
            code={`import React from 'react'
import { Upload, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Upload accept="image/*">
    <Button>Upload Images Only</Button>
  </Upload>
)

export default App`}
          >
            <Upload accept="image/*">
              <Button>Upload Images Only</Button>
            </Upload>
          </ExampleSection>

          <ExampleSection
            title="Max Count"
            code={`import React from 'react'
import { Upload, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Upload maxCount={3}>
    <Button>Upload (Max 3 Files)</Button>
  </Upload>
)

export default App`}
          >
            <Upload maxCount={3}>
              <Button>Upload (Max 3 Files)</Button>
            </Upload>
          </ExampleSection>

          <ExampleSection
            title="Max Size"
            code={`import React from 'react'
import { Upload, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Upload maxSize={1024 * 1024}>
    <Button>Upload (Max 1MB)</Button>
  </Upload>
)

export default App`}
          >
            <Upload maxSize={1024 * 1024}>
              <Button>Upload (Max 1MB)</Button>
            </Upload>
          </ExampleSection>
        </Masonry>

        <ExampleSection
          title="Picture List"
          code={`import React from 'react'
import { Upload, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Upload listType="picture" multiple>
    <Button>Upload Pictures</Button>
  </Upload>
)

export default App`}
        >
          <Upload listType="picture" multiple>
            <Button>Upload Pictures</Button>
          </Upload>
        </ExampleSection>

        <ExampleSection
          title="Picture Card List"
          code={`import React from 'react'
import { Upload } from '@edadma/bloomui'

const App: React.FC = () => <Upload listType="picture-card" multiple />

export default App`}
        >
          <Upload listType="picture-card" multiple />
        </ExampleSection>

        <ExampleSection
          title="Controlled Mode"
          code={`import React, { useState } from 'react'
import { Upload, Button } from '@edadma/bloomui'
import type { UploadFile } from '@edadma/bloomui'

const App: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  return (
    <Upload
      fileList={fileList}
      onChange={(info) => setFileList(info.fileList)}
    >
      <Button>Upload</Button>
    </Upload>
  )
}

export default App`}
        >
          <Upload
            fileList={fileList}
            onChange={(info) => setFileList(info.fileList)}
          >
            <Button>Upload</Button>
          </Upload>
        </ExampleSection>

        <ExampleSection
          title="Custom Request"
          code={`import React from 'react'
import { Upload, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Upload
    customRequest={({ file, onProgress, onSuccess }) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        onProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          onSuccess({ url: '/uploads/' + file.name })
        }
      }, 100)
    }}
  >
    <Button>Custom Upload</Button>
  </Upload>
)

export default App`}
        >
          <Upload
            customRequest={({ file, onProgress, onSuccess }) => {
              // Simulate upload with progress
              let progress = 0
              const interval = setInterval(() => {
                progress += 10
                onProgress(progress)
                if (progress >= 100) {
                  clearInterval(interval)
                  onSuccess({ url: '/uploads/' + file.name })
                }
              }, 100)
            }}
          >
            <Button>Custom Upload</Button>
          </Upload>
        </ExampleSection>

        <ExampleSection
          title="Disabled"
          code={`import React from 'react'
import { Upload, Button } from '@edadma/bloomui'

const App: React.FC = () => (
  <Upload disabled>
    <Button disabled>Upload Disabled</Button>
  </Upload>
)

export default App`}
        >
          <Upload disabled>
            <Button disabled>Upload Disabled</Button>
          </Upload>
        </ExampleSection>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Upload</h3>
            <ApiTable data={uploadApi} title="Upload" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">UploadFile</h3>
            <ApiTable data={uploadFileApi} title="UploadFile" />
          </div>
        </div>
      </div>
    </div>
  )
}
