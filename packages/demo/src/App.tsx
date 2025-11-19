import { useState } from 'react'
import { Menu, Navbar } from '@edadma/petalui'
import { ThemeSwitcher } from './ThemeSwitcher'
import { BadgePage } from './pages/BadgePage'
import { ButtonPage } from './pages/ButtonPage'
import { CardPage } from './pages/CardPage'
import { DrawerPage } from './pages/DrawerPage'
import { DropdownPage } from './pages/DropdownPage'
import { LoadingPage } from './pages/LoadingPage'
import { MenuPage } from './pages/MenuPage'
import { TablePage } from './pages/TablePage'

type Page = 'badge' | 'button' | 'card' | 'drawer' | 'dropdown' | 'loading' | 'menu' | 'table'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('button')

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Top Navbar - Full Width */}
      <Navbar
        className="shadow-lg border-b border-base-content/10"
        start={
          <div className="flex items-center gap-3">
            <img src="/petalui/logo.png" alt="PetalUI" className="w-8 h-8" />
            <span className="text-xl font-semibold">PetalUI Components</span>
          </div>
        }
        end={<ThemeSwitcher />}
      />

      {/* Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Fixed Sidebar */}
        <aside className="w-44 bg-base-100 border-r border-base-content/10 overflow-y-auto">
          <div className="p-4">
            <Menu>
              <Menu.Title>Actions</Menu.Title>
              <Menu.Item active={currentPage === 'button'} onClick={() => setCurrentPage('button')}>
                Button
              </Menu.Item>
              <Menu.Item active={currentPage === 'dropdown'} onClick={() => setCurrentPage('dropdown')}>
                Dropdown
              </Menu.Item>

              <Menu.Title>Data Display</Menu.Title>
              <Menu.Item active={currentPage === 'badge'} onClick={() => setCurrentPage('badge')}>
                Badge
              </Menu.Item>
              <Menu.Item active={currentPage === 'card'} onClick={() => setCurrentPage('card')}>
                Card
              </Menu.Item>
              <Menu.Item active={currentPage === 'table'} onClick={() => setCurrentPage('table')}>
                Table
              </Menu.Item>

              <Menu.Title>Navigation</Menu.Title>
              <Menu.Item active={currentPage === 'drawer'} onClick={() => setCurrentPage('drawer')}>
                Drawer
              </Menu.Item>
              <Menu.Item active={currentPage === 'menu'} onClick={() => setCurrentPage('menu')}>
                Menu
              </Menu.Item>

              <Menu.Title>Feedback</Menu.Title>
              <Menu.Item active={currentPage === 'loading'} onClick={() => setCurrentPage('loading')}>
                Loading
              </Menu.Item>
            </Menu>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1920px] mx-auto">
            {currentPage === 'badge' && <BadgePage />}
            {currentPage === 'button' && <ButtonPage />}
            {currentPage === 'card' && <CardPage />}
            {currentPage === 'drawer' && <DrawerPage />}
            {currentPage === 'dropdown' && <DropdownPage />}
            {currentPage === 'loading' && <LoadingPage />}
            {currentPage === 'menu' && <MenuPage />}
            {currentPage === 'table' && <TablePage />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
