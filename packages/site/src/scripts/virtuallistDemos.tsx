import { createRoot } from 'react-dom/client'
import React, { useState } from 'react'
import { VirtualList, Chat } from 'asterui'
import { CheckIconSvg } from './icons'

const basicItems = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1}`
}))

const BasicDemo: React.FC = () => (
  <VirtualList
    items={basicItems}
    height={300}
    itemHeight={40}
    className="border border-base-300 rounded-lg"
    renderItem={(item) => (
      <div className="p-2 border-b border-base-300 flex items-center h-full">
        {item.name}
      </div>
    )}
  />
)

const users = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`
}))

const StyledDemo: React.FC = () => (
  <VirtualList
    items={users}
    height={300}
    itemHeight={60}
    className="border border-base-300 rounded-lg"
    renderItem={(user) => (
      <div className="p-3 hover:bg-base-200 transition-colors border-b border-base-300 h-full flex flex-col justify-center">
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-base-content/60">{user.email}</div>
      </div>
    )}
  />
)

const cardItems = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  title: `Card ${i + 1}`,
  description: 'A brief description'
}))

const GapDemo: React.FC = () => (
  <VirtualList
    items={cardItems}
    height={300}
    itemHeight={72}
    gap={8}
    className="p-2 border border-base-300 rounded-lg"
    renderItem={(item) => (
      <div className="card bg-base-200 p-3 h-full flex flex-col justify-center">
        <h3 className="font-bold">{item.title}</h3>
        <p className="text-sm text-base-content/70">{item.description}</p>
      </div>
    )}
  />
)

const scrollItems = Array.from({ length: 10000 }, (_, i) => ({ id: i }))

const ScrollCallbackDemo: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0)

  return (
    <div>
      <div className="mb-2 text-sm text-base-content/70">Scroll position: {Math.round(scrollTop)}px</div>
      <VirtualList
        items={scrollItems}
        height={250}
        itemHeight={40}
        onScroll={setScrollTop}
        className="border border-base-300 rounded-lg"
        renderItem={(_, index) => (
          <div className="p-2 border-b border-base-300 flex items-center h-full">
            Row {index + 1}
          </div>
        )}
      />
    </div>
  )
}

const chatMessages = [
  { id: 1, user: 'Alex', text: 'Hey!' },
  { id: 2, user: 'You', text: 'Hi Alex, what\'s up?' },
  { id: 3, user: 'Alex', text: 'Not much, just wanted to check if you\'re coming to the party on Saturday' },
  { id: 4, user: 'You', text: 'Oh yeah, I\'ll be there! What time does it start?' },
  { id: 5, user: 'Alex', text: '8pm' },
  { id: 6, user: 'You', text: 'Cool' },
  { id: 7, user: 'Alex', text: 'Can you bring some snacks? We\'re running low on chips and stuff. Maybe grab a couple bags of tortilla chips and some salsa if you can find good ones' },
  { id: 8, user: 'You', text: 'Sure thing, I\'ll stop by the store on the way' },
  { id: 9, user: 'Alex', text: 'Thanks!' },
  { id: 10, user: 'You', text: 'No problem. Who else is coming?' },
  { id: 11, user: 'Alex', text: 'Sarah, Mike, probably Jordan. Maybe a few others' },
  { id: 12, user: 'You', text: 'Nice' },
  { id: 13, user: 'Alex', text: 'Yeah it should be fun. We\'re gonna set up the projector in the backyard for a movie later if the weather holds up' },
  { id: 14, user: 'You', text: 'What movie?' },
  { id: 15, user: 'Alex', text: 'Haven\'t decided yet. Any suggestions?' },
  { id: 16, user: 'You', text: 'How about something funny? We could do a comedy' },
  { id: 17, user: 'Alex', text: 'Good idea' },
  { id: 18, user: 'You', text: 'Alright, see you Saturday then!' },
  { id: 19, user: 'Alex', text: 'See ya!' },
  { id: 20, user: 'You', text: '👋' },
]

const VariableHeightDemo: React.FC = () => (
  <VirtualList
    items={chatMessages}
    height={300}
    itemHeight={(msg) => 70 + Math.floor(msg.text.length / 40) * 24}
    className="bg-base-100 border border-base-300 rounded-lg p-2"
    renderItem={(msg) => (
      <Chat
        position={msg.user === 'You' ? 'end' : 'start'}
        header={msg.user}
        message={msg.text}
        color={msg.user === 'You' ? 'primary' : undefined}
      />
    )}
  />
)

const statefulDemos: Record<string, React.FC> = {
  basic: BasicDemo,
  styled: StyledDemo,
  'with-gap': GapDemo,
  'scroll-callback': ScrollCallbackDemo,
  'variable-height': VariableHeightDemo,
}

document.querySelectorAll('.demo-container').forEach((container) => {
  const exampleId = container.getAttribute('data-example')
  if (exampleId && statefulDemos[exampleId]) {
    const root = createRoot(container as HTMLElement)
    const Component = statefulDemos[exampleId]
    root.render(<Component />)
  }
})

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const code = btn.getAttribute('data-code')
    if (code) {
      await navigator.clipboard.writeText(code)
      const originalHTML = btn.innerHTML
      btn.innerHTML = CheckIconSvg
      setTimeout(() => {
        btn.innerHTML = originalHTML
      }, 2000)
    }
  })
})
