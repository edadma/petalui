import { Breadcrumb } from '@aster-ui/prefixed'
import { FolderIcon, DocumentTextIcon, ChevronRightIcon } from '@aster-ui/icons-prefixed'
import { Demo } from './Demo'

// @example-imports: { Breadcrumb } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/documents">Documents</Breadcrumb.Item>
        <Breadcrumb.Item>Add Document</Breadcrumb.Item>
      </Breadcrumb>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Breadcrumb } from 'asterui'
// @example-imports: { FolderIcon, DocumentTextIcon } from '@aster-ui/icons'
export function IconsDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Breadcrumb } from 'asterui'
// @example-imports: { ChevronRightIcon } from '@aster-ui/icons'
export function SeparatorDemo() {
  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Breadcrumb } from 'asterui'
export function ItemsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Breadcrumb
        items={[
          { title: 'Home', href: '/' },
          { title: 'Products', href: '/products' },
          { title: 'Category', href: '/products/category' },
          { title: 'Item Details' },
        ]}
      />
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Breadcrumb } from 'asterui'
export function ScrollDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Breadcrumb className="max-w-xs">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/documents">Documents</Breadcrumb.Item>
        <Breadcrumb.Item href="/projects">Projects</Breadcrumb.Item>
        <Breadcrumb.Item href="/team">Team</Breadcrumb.Item>
        <Breadcrumb.Item>Add New Member</Breadcrumb.Item>
      </Breadcrumb>
      {/* @example-return-end */}
    </Demo>
  )
}
