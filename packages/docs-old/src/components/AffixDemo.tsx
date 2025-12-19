import { useState } from 'react'
import { Affix, Button } from '@aster-ui/prefixed'
import { Demo } from './Demo'

// @example-imports: { Affix, Button } from 'asterui'
export function BasicDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Affix offsetTop={80}>
        <Button color="primary">Affixed Button</Button>
      </Affix>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Affix, Button } from 'asterui'
// @example-imports: { useState } from 'react'
export function CallbackDemo() {
  // @example-include
  const [affixed, setAffixed] = useState(false)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
      <Affix offsetTop={80} onChange={setAffixed}>
        <Button type={affixed ? 'primary' : 'neutral'}>
          {affixed ? 'Affixed!' : 'Not Affixed'}
        </Button>
      </Affix>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Affix, Button } from 'asterui'
export function BottomDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <Affix offsetBottom={20}>
        <Button color="secondary">Bottom Affixed</Button>
      </Affix>
      {/* @example-return-end */}
    </Demo>
  )
}

// @example-imports: { Affix } from 'asterui'
export function TargetDemo() {
  return (
    <Demo>
      {/* @example-return */}
      <div id="scroll-container" className="h-64 overflow-auto">
        <Affix offsetTop={0} target={() => document.getElementById('scroll-container')!}>
          <div className="bg-primary text-primary-content p-2">
            Sticky Header
          </div>
        </Affix>
        {/* Scrollable content */}
      </div>
      {/* @example-return-end */}
    </Demo>
  )
}
