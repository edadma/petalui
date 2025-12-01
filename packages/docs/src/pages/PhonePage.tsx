import { Phone, Button, Masonry } from '@edadma/bloomui'
import { ExampleSection } from '../components/ExampleSection'
import { ApiTable } from '../components/ApiTable'
import type { ApiProperty } from '../components/ApiTable'

const phoneApi: ApiProperty[] = [
  { property: 'children', description: 'Content inside the phone screen', type: 'React.ReactNode' },
  { property: 'color', description: 'Custom frame color', type: 'string' },
  { property: 'className', description: 'Classes for phone container', type: 'string' },
  { property: 'displayClassName', description: 'Classes for display area', type: 'string' },
]

export function PhonePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Phone</h1>
        <p className="text-base-content/70">
          Display content in an iPhone-style phone frame mockup.
        </p>
      </div>

      <Masonry columns={{ xs: 1, lg: 2 }} gap={4}>
        <ExampleSection
          title="Basic Phone"
          description="Simple phone mockup."
          code={`<Phone displayClassName="bg-base-100 grid place-content-center">
  <span className="text-xl">Hello World</span>
</Phone>`}
        >
          <div className="flex justify-center py-4">
            <Phone displayClassName="bg-base-100 grid place-content-center">
              <span className="text-xl">Hello World</span>
            </Phone>
          </div>
        </ExampleSection>

        <ExampleSection
          title="With Image"
          description="Display an image as wallpaper."
          code={`<Phone>
  <img
    src="https://img.daisyui.com/images/stock/453966.webp"
    alt="wallpaper"
    className="w-full h-full object-cover"
  />
</Phone>`}
        >
          <div className="flex justify-center py-4">
            <Phone>
              <img
                src="https://img.daisyui.com/images/stock/453966.webp"
                alt="wallpaper"
                className="w-full h-full object-cover"
              />
            </Phone>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Custom Color"
          description="Customize the phone frame color."
          code={`<Phone
  color="#ff8938"
  displayClassName="bg-gradient-to-b from-orange-400 to-orange-600 grid place-content-center"
>
  <span className="text-white text-xl font-bold">Orange</span>
</Phone>`}
        >
          <div className="flex justify-center py-4">
            <Phone color="#ff8938" displayClassName="bg-gradient-to-b from-orange-400 to-orange-600 grid place-content-center">
              <span className="text-white text-xl font-bold">Orange</span>
            </Phone>
          </div>
        </ExampleSection>

        <ExampleSection
          title="App Interface"
          description="Mock up a mobile app."
          code={`<Phone displayClassName="bg-base-100 flex flex-col">
  <div className="bg-primary text-primary-content p-4">
    <h2 className="font-bold">My App</h2>
  </div>
  <div className="flex-1 p-4 space-y-3">
    <div className="bg-base-200 rounded-lg p-3">Item 1</div>
    <div className="bg-base-200 rounded-lg p-3">Item 2</div>
  </div>
  <div className="p-4 border-t border-base-300">
    <Button type="primary" className="w-full">Action</Button>
  </div>
</Phone>`}
        >
          <div className="flex justify-center py-4">
            <Phone displayClassName="bg-base-100 flex flex-col">
              <div className="bg-primary text-primary-content p-4">
                <h2 className="font-bold">My App</h2>
              </div>
              <div className="flex-1 p-4 space-y-3">
                <div className="bg-base-200 rounded-lg p-3 text-sm">Item 1</div>
                <div className="bg-base-200 rounded-lg p-3 text-sm">Item 2</div>
                <div className="bg-base-200 rounded-lg p-3 text-sm">Item 3</div>
              </div>
              <div className="p-4 border-t border-base-300">
                <Button type="primary" size="sm" className="w-full">Action</Button>
              </div>
            </Phone>
          </div>
        </ExampleSection>

        <ExampleSection
          title="Chat Interface"
          description="Mock up a chat app."
          code={`<Phone displayClassName="bg-base-200 flex flex-col">
  <div className="bg-base-100 p-3 border-b border-base-300 flex items-center gap-3">
    <div className="avatar">
      <div className="w-8 rounded-full">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=jane" />
      </div>
    </div>
    <span className="font-medium text-sm">Jane</span>
  </div>
  <div className="flex-1 p-3 space-y-2">
    <div className="chat chat-start">
      <div className="chat-bubble chat-bubble-primary text-xs">Hey!</div>
    </div>
    <div className="chat chat-end">
      <div className="chat-bubble text-xs">Hi there!</div>
    </div>
  </div>
</Phone>`}
        >
          <div className="flex justify-center py-4">
            <Phone displayClassName="bg-base-200 flex flex-col">
              <div className="bg-base-100 p-3 border-b border-base-300 flex items-center gap-3">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=jane" alt="" />
                  </div>
                </div>
                <span className="font-medium text-sm">Jane</span>
              </div>
              <div className="flex-1 p-3 space-y-2 overflow-auto">
                <div className="chat chat-start">
                  <div className="chat-bubble chat-bubble-primary text-xs">Hey! How are you?</div>
                </div>
                <div className="chat chat-end">
                  <div className="chat-bubble text-xs">Hi there! I'm good!</div>
                </div>
                <div className="chat chat-start">
                  <div className="chat-bubble chat-bubble-primary text-xs">Great to hear!</div>
                </div>
              </div>
            </Phone>
          </div>
        </ExampleSection>

      </Masonry>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">API</h2>
        <ApiTable title="Phone" data={phoneApi} />
      </div>
    </div>
  )
}
