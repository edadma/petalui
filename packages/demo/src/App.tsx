import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Menu, Navbar } from '@edadma/petalui'
import { ThemeSwitcher } from './ThemeSwitcher'
import { BadgePage } from './pages/BadgePage'
import { ButtonPage } from './pages/ButtonPage'
import { CardPage } from './pages/CardPage'
import { CheckboxPage } from './pages/CheckboxPage'
import { DrawerPage } from './pages/DrawerPage'
import { DropdownPage } from './pages/DropdownPage'
import { FormPage } from './pages/FormPage'
import { InputPage } from './pages/InputPage'
import { LoadingPage } from './pages/LoadingPage'
import { MenuPage } from './pages/MenuPage'
import { TablePage } from './pages/TablePage'
import { TogglePage } from './pages/TogglePage'

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

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
              <Menu.Item active={isActive('/button')} onClick={() => navigate('/button')}>
                Button
              </Menu.Item>
              <Menu.Item active={isActive('/dropdown')} onClick={() => navigate('/dropdown')}>
                Dropdown
              </Menu.Item>

              <Menu.Title>Data Entry</Menu.Title>
              <Menu.Item active={isActive('/checkbox')} onClick={() => navigate('/checkbox')}>
                Checkbox
              </Menu.Item>
              <Menu.Item active={isActive('/form')} onClick={() => navigate('/form')}>
                Form
              </Menu.Item>
              <Menu.Item active={isActive('/input')} onClick={() => navigate('/input')}>
                Input
              </Menu.Item>
              <Menu.Item active={isActive('/toggle')} onClick={() => navigate('/toggle')}>
                Toggle
              </Menu.Item>

              <Menu.Title>Data Display</Menu.Title>
              <Menu.Item active={isActive('/badge')} onClick={() => navigate('/badge')}>
                Badge
              </Menu.Item>
              <Menu.Item active={isActive('/card')} onClick={() => navigate('/card')}>
                Card
              </Menu.Item>
              <Menu.Item active={isActive('/table')} onClick={() => navigate('/table')}>
                Table
              </Menu.Item>

              <Menu.Title>Navigation</Menu.Title>
              <Menu.Item active={isActive('/drawer')} onClick={() => navigate('/drawer')}>
                Drawer
              </Menu.Item>
              <Menu.Item active={isActive('/menu')} onClick={() => navigate('/menu')}>
                Menu
              </Menu.Item>

              <Menu.Title>Feedback</Menu.Title>
              <Menu.Item active={isActive('/loading')} onClick={() => navigate('/loading')}>
                Loading
              </Menu.Item>
            </Menu>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1920px] mx-auto">
            <Routes>
              <Route path="/" element={<ButtonPage />} />
              <Route path="/badge" element={<BadgePage />} />
              <Route path="/button" element={<ButtonPage />} />
              <Route path="/card" element={<CardPage />} />
              <Route path="/checkbox" element={<CheckboxPage />} />
              <Route path="/drawer" element={<DrawerPage />} />
              <Route path="/dropdown" element={<DropdownPage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/input" element={<InputPage />} />
              <Route path="/loading" element={<LoadingPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/table" element={<TablePage />} />
              <Route path="/toggle" element={<TogglePage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename="/petalui">
      <AppContent />
    </BrowserRouter>
  )
}

export default App
