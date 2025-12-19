import { Footer } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Footer } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Footer horizontal className="bg-base-200 p-4">
        <a href="#" className="link link-hover">About</a>
        <a href="#" className="link link-hover">Contact</a>
        <a href="#" className="link link-hover">Privacy</a>
        <a href="#" className="link link-hover">Terms</a>
      </Footer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Footer } from 'asterui'
export function WithSectionsDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Footer horizontal className="bg-base-200 p-10">
        <nav>
          <Footer.Title>Services</Footer.Title>
          <a href="#" className="link link-hover">Branding</a>
          <a href="#" className="link link-hover">Design</a>
          <a href="#" className="link link-hover">Marketing</a>
        </nav>
        <nav>
          <Footer.Title>Company</Footer.Title>
          <a href="#" className="link link-hover">About us</a>
          <a href="#" className="link link-hover">Contact</a>
          <a href="#" className="link link-hover">Jobs</a>
        </nav>
        <nav>
          <Footer.Title>Legal</Footer.Title>
          <a href="#" className="link link-hover">Terms of use</a>
          <a href="#" className="link link-hover">Privacy policy</a>
          <a href="#" className="link link-hover">Cookie policy</a>
        </nav>
      </Footer>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Footer } from 'asterui'
export function CenteredDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Footer center horizontal className="bg-base-200 p-4">
        <nav className="flex gap-4">
          <a href="#" className="link link-hover">About</a>
          <a href="#" className="link link-hover">Contact</a>
          <a href="#" className="link link-hover">Privacy</a>
          <a href="#" className="link link-hover">Terms</a>
        </nav>
        <aside>
          <p>© 2024 Company Name. All rights reserved.</p>
        </aside>
      </Footer>
      {/* @example-return-end */}
    </Demo>
  )
}
