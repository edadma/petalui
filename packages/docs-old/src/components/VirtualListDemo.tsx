import React, { useState } from 'react'
import { Chat } from '@aster-ui/prefixed'
import { VirtualList } from '@aster-ui/prefixed/virtuallist'
import { Demo } from './Demo'

const basicItems = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  name: `Item ${i + 1}`
}))

// @example-imports: { VirtualList } from 'asterui/virtuallist'
export const BasicDemo: React.FC = () => {
  // @example-include
  const basicItems = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item ${i + 1}`
  }))
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

const users = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`
}))

// @example-imports: { VirtualList } from 'asterui/virtuallist'
export const StyledDemo: React.FC = () => {
  // @example-include
  const users = Array.from({ length: 5000 }, (_, i) => ({
    id: i,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`
  }))
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

const cardItems = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  title: `Card ${i + 1}`,
  description: 'A brief description'
}))

// @example-imports: { VirtualList } from 'asterui/virtuallist'
export const GapDemo: React.FC = () => {
  // @example-include
  const cardItems = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    title: `Card ${i + 1}`,
    description: 'A brief description'
  }))
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}

const scrollItems = Array.from({ length: 10000 }, (_, i) => ({ id: i }))

// @example-imports: { VirtualList } from 'asterui/virtuallist'
// @example-imports: { useState } from 'react'
export const ScrollCallbackDemo: React.FC = () => {
  // @example-include
  const scrollItems = Array.from({ length: 10000 }, (_, i) => ({ id: i }))
  const [scrollTop, setScrollTop] = useState(0)
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
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

// @example-imports: { Chat } from 'asterui'
// @example-imports: { VirtualList } from 'asterui/virtuallist'
export const VariableHeightDemo: React.FC = () => {
  // @example-include
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
  // @example-include-end

  return (
    <Demo>
      {/* @example-return */}
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
      {/* @example-return-end */}
    </Demo>
  )
}
