import { Hero, Button } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Hero } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Hero contentClassName="text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
          </p>
        </div>
      </Hero>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Hero, Button } from 'asterui'
export function WithButtonDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Hero contentClassName="text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi.
          </p>
          <Button color="primary">Get Started</Button>
        </div>
      </Hero>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Hero, Button } from 'asterui'
export function WithFigureDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Hero contentClassName="flex-col lg:flex-row-reverse">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          alt="Hero"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
          </p>
          <Button color="primary">Get Started</Button>
        </div>
      </Hero>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Hero, Button } from 'asterui'
export function OverlayDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Hero
        overlay
        contentClassName="text-center text-neutral-content"
        style={{
          backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
            et a id nisi.
          </p>
          <Button color="primary">Get Started</Button>
        </div>
      </Hero>
      {/* @example-return-end */}
    </Demo>
  )
}
