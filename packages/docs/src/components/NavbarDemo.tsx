import React from 'react'
import { Navbar, Button, Dropdown, Typography, Flex } from 'asterui'
import { ChevronDownIcon } from '@aster-ui/icons'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Navbar
        start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
        end={
          <Flex gap="sm">
            <Button variant="ghost">Home</Button>
            <Button variant="ghost">About</Button>
            <Button color="primary">Sign In</Button>
          </Flex>
        }
      />
    </Demo>
  )
}

export function WithDropdownDemo() {
  return (
    <Demo>
      <Navbar
        start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
        end={
          <Flex gap="sm">
            <Button variant="ghost">Home</Button>
            <Dropdown>
              <Dropdown.Trigger>
                <Button variant="ghost">
                  Products
                  <ChevronDownIcon size="sm" className="ml-1" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                <Dropdown.Item>Product 1</Dropdown.Item>
                <Dropdown.Item>Product 2</Dropdown.Item>
                <Dropdown.Item>Product 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="ghost">About</Button>
            <Button color="primary">Sign In</Button>
          </Flex>
        }
      />
    </Demo>
  )
}

export function WithMenuIconDemo() {
  return (
    <Demo>
      <Navbar
        start={
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="ghost" shape="circle">☰</Button>
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
        end={<Button color="primary">Sign In</Button>}
      />
    </Demo>
  )
}

export function ColorsDemo() {
  return (
    <Demo>
      <Flex direction="column" gap="md">
        <Navbar
          color="neutral"
          start={<Typography.Text strong className="text-xl">Neutral</Typography.Text>}
          end={<Button variant="ghost">Action</Button>}
        />
        <Navbar
          color="primary"
          start={<Typography.Text strong className="text-xl">Primary</Typography.Text>}
          end={<Button variant="ghost">Action</Button>}
        />
        <Navbar
          color="secondary"
          start={<Typography.Text strong className="text-xl">Secondary</Typography.Text>}
          end={<Button variant="ghost">Action</Button>}
        />
      </Flex>
    </Demo>
  )
}

export function ShadowDemo() {
  return (
    <Demo>
      <Navbar
        shadow="md"
        start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
        end={
          <Flex gap="sm">
            <Button variant="ghost">Home</Button>
            <Button color="primary">Sign In</Button>
          </Flex>
        }
      />
    </Demo>
  )
}

export function RoundedDemo() {
  return (
    <Demo>
      <Navbar
        color="neutral"
        rounded="lg"
        start={<Typography.Text strong className="text-xl">AsterUI</Typography.Text>}
        end={
          <Flex gap="sm">
            <Button variant="ghost">Home</Button>
            <Button color="primary">Sign In</Button>
          </Flex>
        }
      />
    </Demo>
  )
}
