import { createRoot } from 'react-dom/client'
import React from 'react'
import { Navbar, Button, Dropdown, Typography, Flex } from 'asterui'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

// Basic demo
const BasicDemo: React.FC = () => (
  <Navbar
    start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Button type="ghost">About</Button>
        <Button type="primary">Sign In</Button>
      </Flex>
    }
  />
)

// With dropdown menu demo
const WithMenuDemo: React.FC = () => (
  <Navbar
    start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Dropdown>
          <Dropdown.Trigger>
            <Button type="ghost">
              Products
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item>Product 1</Dropdown.Item>
            <Dropdown.Item>Product 2</Dropdown.Item>
            <Dropdown.Item>Product 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button type="ghost">About</Button>
        <Button type="primary">Sign In</Button>
      </Flex>
    }
  />
)

// With menu icon demo
const WithMenuIconDemo: React.FC = () => (
  <Navbar
    start={
      <Dropdown>
        <Dropdown.Trigger>
          <Button type="ghost" shape="circle">☰</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item>Home</Dropdown.Item>
          <Dropdown.Item>Products</Dropdown.Item>
          <Dropdown.Item>About</Dropdown.Item>
          <Dropdown.Item>Contact</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    }
    center={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={<Button type="primary">Sign In</Button>}
  />
)

// Color variants demo
const ColorDemo: React.FC = () => (
  <Flex direction="column" gap="md">
    <Navbar
      color="neutral"
      start={<Typography.Text strong className="text-xl">Neutral</Typography.Text>}
      end={<Button type="ghost">Action</Button>}
    />
    <Navbar
      color="primary"
      start={<Typography.Text strong className="text-xl">Primary</Typography.Text>}
      end={<Button type="ghost">Action</Button>}
    />
    <Navbar
      color="secondary"
      start={<Typography.Text strong className="text-xl">Secondary</Typography.Text>}
      end={<Button type="ghost">Action</Button>}
    />
  </Flex>
)

// Shadow demo
const ShadowDemo: React.FC = () => (
  <Navbar
    shadow="md"
    start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Button type="primary">Sign In</Button>
      </Flex>
    }
  />
)

// Rounded demo
const RoundedDemo: React.FC = () => (
  <Navbar
    color="neutral"
    rounded="lg"
    start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
    end={
      <Flex gap="sm">
        <Button type="ghost">Home</Button>
        <Button type="primary">Sign In</Button>
      </Flex>
    }
  />
)

const demos: Record<string, React.FC> = {
  basic: BasicDemo,
  'with-dropdown': WithMenuDemo,
  'with-menu-icon': WithMenuIconDemo,
  colors: ColorDemo,
  shadow: ShadowDemo,
  rounded: RoundedDemo,
}

// Mount React demos
document.querySelectorAll('.demo-container').forEach(container => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && demos[exampleId]) {
    const root = createRoot(container as HTMLElement)
    const Demo = demos[exampleId]
    root.render(<Demo />)
  }
})

// Copy button functionality
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      btn.classList.add('btn-success')
      setTimeout(() => btn.classList.remove('btn-success'), 1000)
    }
  })
})
