# Upload

File upload component with drag-and-drop support.

**Import:** `import { Upload } from 'asterui'`

## Examples

### Basic

```tsx
import React from 'react'
import { Upload, Button } from 'asterui'

const App: React.FC = () => (
  <Upload>
    <Button>Click to Upload</Button>
  </Upload>
)

export default App
```

### Drag

```tsx
import React from 'react'
import { Upload } from 'asterui'

const App: React.FC = () => (
  <Upload.Dragger>
    <p className="text-4xl mb-4">📁</p>
    <p className="text-lg">Click or drag file to this area to upload</p>
    <p className="text-sm opacity-60">Support for single or bulk upload</p>
  </Upload.Dragger>
)

export default App
```

### Picture Card

```tsx
import React, { useState } from 'react'
import { Upload } from 'asterui'

const App: React.FC = () => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      url: 'https://picsum.photos/200',
    },
  ])

  return (
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
  )
}

export default App
```

### Controlled

```tsx
import React, { useState } from 'react'
import { Upload, Button } from 'asterui'

const App: React.FC = () => {
  const [fileList, setFileList] = useState([])

  const customRequest = ({ file, onSuccess }) => {
    // Simulate upload
    setTimeout(() => {
      onSuccess()
    }, 1000)
  }

  return (
    <div>
      <Upload
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
        customRequest={customRequest}
        maxCount={3}
      >
        <Button>Upload (max 3)</Button>
      </Upload>
      <p>Files: {fileList.length}/3</p>
    </div>
  )
}

export default App
```

### Form

```tsx
import React from 'react'
import { Upload, Form, Button } from 'asterui'

const App: React.FC = () => {
  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
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
  )
}

export default App
```

## API

### Upload

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `fileList` | Controlled list of uploaded files | `UploadFile[]` | `-` |
| `onChange` | Callback when file list changes | `({ fileList` | `-` |
| `listType` | Display style of file list | `text' \| 'picture' \| 'picture-card` | `text` |
| `maxCount` | Maximum number of files | `number` | `-` |
| `maxSize` | Maximum file size in bytes | `number` | `-` |
| `accept` | Accepted file types | `string` | `-` |
| `disabled` | Disable the upload | `boolean` | `false` |
| `children` | Upload trigger element | `React.ReactNode` | `-` |
| `data-testid` | Test ID prefix for child elements | `string` | `-` |
| `className` | Additional CSS classes | `string` | `-` |

### Upload File

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| `uid` | Unique identifier | `string` | `-` |
| `name` | File name | `string` | `-` |
| `status` | Upload status | `uploading' \| 'done' \| 'error' \| 'removed` | `-` |
| `url` | File URL | `string` | `-` |
| `thumbUrl` | Thumbnail URL | `string` | `-` |
| `percent` | Upload progress percentage | `number` | `-` |
