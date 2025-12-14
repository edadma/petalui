import { Breadcrumb } from 'asterui'
import { FolderIcon, DocumentTextIcon, ChevronRightIcon } from '@aster-ui/icons'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/documents">Documents</Breadcrumb.Item>
        <Breadcrumb.Item>Add Document</Breadcrumb.Item>
      </Breadcrumb>
    </Demo>
  )
}

export function IconsDemo() {
  return (
    <Demo>
      <Breadcrumb>
        <Breadcrumb.Item href="/" icon={<FolderIcon size="sm" />}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="/documents" icon={<FolderIcon size="sm" />}>
          Documents
        </Breadcrumb.Item>
        <Breadcrumb.Item icon={<DocumentTextIcon size="sm" />}>
          Add Document
        </Breadcrumb.Item>
      </Breadcrumb>
    </Demo>
  )
}

export function SeparatorDemo() {
  return (
    <Demo>
      <div className="space-y-4">
        <Breadcrumb separator="/">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>
        <Breadcrumb separator={<ChevronRightIcon size="sm" />}>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/products">Products</Breadcrumb.Item>
          <Breadcrumb.Item>Details</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </Demo>
  )
}

export function ItemsDemo() {
  return (
    <Demo>
      <Breadcrumb
        items={[
          { title: 'Home', href: '/' },
          { title: 'Products', href: '/products' },
          { title: 'Category', href: '/products/category' },
          { title: 'Item Details' },
        ]}
      />
    </Demo>
  )
}

export function ScrollDemo() {
  return (
    <Demo>
      <Breadcrumb className="max-w-xs">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/documents">Documents</Breadcrumb.Item>
        <Breadcrumb.Item href="/projects">Projects</Breadcrumb.Item>
        <Breadcrumb.Item href="/team">Team</Breadcrumb.Item>
        <Breadcrumb.Item>Add New Member</Breadcrumb.Item>
      </Breadcrumb>
    </Demo>
  )
}
