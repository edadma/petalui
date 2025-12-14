import { useState } from 'react'
import { Affix, Button } from 'asterui'
import { Demo } from './Demo'

export function BasicDemo() {
  return (
    <Demo>
      <Affix offsetTop={80}>
        <Button color="primary">Affixed Button</Button>
      </Affix>
    </Demo>
  )
}

export function CallbackDemo() {
  const [affixed, setAffixed] = useState(false)

  return (
    <Demo>
      <Affix offsetTop={80} onChange={setAffixed}>
        <Button type={affixed ? 'primary' : 'neutral'}>
          {affixed ? 'Affixed!' : 'Not Affixed'}
        </Button>
      </Affix>
    </Demo>
  )
}

export function BottomDemo() {
  return (
    <Demo>
      <Affix offsetBottom={20}>
        <Button color="secondary">Bottom Affixed</Button>
      </Affix>
    </Demo>
  )
}

export function TargetDemo() {
  return (
    <Demo>
      <div id="scroll-container" className="h-64 overflow-auto">
        <Affix offsetTop={0} target={() => document.getElementById('scroll-container')!}>
          <div className="bg-primary text-primary-content p-2">
            Sticky Header
          </div>
        </Affix>
        {/* Scrollable content */}
      </div>
    </Demo>
  )
}
