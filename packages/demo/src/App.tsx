import { useState } from 'react'
import { Menu, Navbar } from '@edadma/petalui'
import type { MenuGroup } from '@edadma/petalui'
import { ThemeSwitcher } from './ThemeSwitcher'
import { BadgePage } from './pages/BadgePage'
import { ButtonPage } from './pages/ButtonPage'
import { DrawerPage } from './pages/DrawerPage'
import { SpinPage } from './pages/SpinPage'
import { TablePage } from './pages/TablePage'

type Page = 'badge' | 'button' | 'drawer' | 'spin' | 'table'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('button')

  const menuGroups: MenuGroup[] = [
    {
      title: 'General',
      items: [
        {
          key: 'button',
          label: 'Button',
          active: currentPage === 'button',
          onClick: () => setCurrentPage('button'),
        },
        {
          key: 'spin',
          label: 'Spin',
          active: currentPage === 'spin',
          onClick: () => setCurrentPage('spin'),
        },
      ],
    },
    {
      title: 'Navigation',
      items: [
        {
          key: 'drawer',
          label: 'Drawer',
          active: currentPage === 'drawer',
          onClick: () => setCurrentPage('drawer'),
        },
      ],
    },
    {
      title: 'Data Display',
      items: [
        {
          key: 'badge',
          label: 'Badge',
          active: currentPage === 'badge',
          onClick: () => setCurrentPage('badge'),
        },
        {
          key: 'table',
          label: 'Table',
          active: currentPage === 'table',
          onClick: () => setCurrentPage('table'),
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Top Navbar - Full Width */}
      <Navbar
        className="shadow-lg border-b border-base-content/10"
        start={<span className="text-xl font-semibold">PetalUI Demo</span>}
        end={<ThemeSwitcher />}
      />

      {/* Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <aside className="w-[154px] bg-base-100 border-r border-base-content/10 overflow-y-auto">
          <div className="p-4">
            <Menu groups={menuGroups} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1920px] mx-auto">
            {currentPage === 'badge' && <BadgePage />}
            {currentPage === 'button' && <ButtonPage />}
            {currentPage === 'drawer' && <DrawerPage />}
            {currentPage === 'spin' && <SpinPage />}
            {currentPage === 'table' && <TablePage />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
