import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Menu, Navbar } from '@edadma/petalui'
import { ThemeSwitcher } from './ThemeSwitcher'
import { AlertPage } from './pages/AlertPage'
import { AvatarPage } from './pages/AvatarPage'
import { BadgePage } from './pages/BadgePage'
import { ButtonPage } from './pages/ButtonPage'
import { CardPage } from './pages/CardPage'
import { CheckboxPage } from './pages/CheckboxPage'
import { DrawerPage } from './pages/DrawerPage'
import { DropdownPage } from './pages/DropdownPage'
import { FieldsetPage } from './pages/FieldsetPage'
import { FileInputPage } from './pages/FileInputPage'
import { FooterPage } from './pages/FooterPage'
import { FormPage } from './pages/FormPage'
import { HeroPage } from './pages/HeroPage'
import { InputPage } from './pages/InputPage'
import { LabelPage } from './pages/LabelPage'
import { LoadingPage } from './pages/LoadingPage'
import { MenuPage } from './pages/MenuPage'
import { ModalPage } from './pages/ModalPage'
import { NavbarPage } from './pages/NavbarPage'
import { RadioPage } from './pages/RadioPage'
import { SelectPage } from './pages/SelectPage'
import { StatPage } from './pages/StatPage'
import { TablePage } from './pages/TablePage'
import { TabsPage } from './pages/TabsPage'
import { TextareaPage } from './pages/TextareaPage'
import { TimelinePage } from './pages/TimelinePage'
import { TogglePage } from './pages/TogglePage'
import { TooltipPage } from './pages/TooltipPage'

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
              <Menu.Item active={isActive('/fieldset')} onClick={() => navigate('/fieldset')}>
                Fieldset
              </Menu.Item>
              <Menu.Item active={isActive('/file-input')} onClick={() => navigate('/file-input')}>
                File Input
              </Menu.Item>
              <Menu.Item active={isActive('/form')} onClick={() => navigate('/form')}>
                Form
              </Menu.Item>
              <Menu.Item active={isActive('/input')} onClick={() => navigate('/input')}>
                Input
              </Menu.Item>
              <Menu.Item active={isActive('/label')} onClick={() => navigate('/label')}>
                Label
              </Menu.Item>
              <Menu.Item active={isActive('/radio')} onClick={() => navigate('/radio')}>
                Radio
              </Menu.Item>
              <Menu.Item active={isActive('/select')} onClick={() => navigate('/select')}>
                Select
              </Menu.Item>
              <Menu.Item active={isActive('/textarea')} onClick={() => navigate('/textarea')}>
                Textarea
              </Menu.Item>
              <Menu.Item active={isActive('/toggle')} onClick={() => navigate('/toggle')}>
                Toggle
              </Menu.Item>

              <Menu.Title>Data Display</Menu.Title>
              <Menu.Item active={isActive('/avatar')} onClick={() => navigate('/avatar')}>
                Avatar
              </Menu.Item>
              <Menu.Item active={isActive('/badge')} onClick={() => navigate('/badge')}>
                Badge
              </Menu.Item>
              <Menu.Item active={isActive('/card')} onClick={() => navigate('/card')}>
                Card
              </Menu.Item>
              <Menu.Item active={isActive('/hero')} onClick={() => navigate('/hero')}>
                Hero
              </Menu.Item>
              <Menu.Item active={isActive('/stat')} onClick={() => navigate('/stat')}>
                Stats
              </Menu.Item>
              <Menu.Item active={isActive('/table')} onClick={() => navigate('/table')}>
                Table
              </Menu.Item>
              <Menu.Item active={isActive('/timeline')} onClick={() => navigate('/timeline')}>
                Timeline
              </Menu.Item>

              <Menu.Title>Navigation</Menu.Title>
              <Menu.Item active={isActive('/drawer')} onClick={() => navigate('/drawer')}>
                Drawer
              </Menu.Item>
              <Menu.Item active={isActive('/menu')} onClick={() => navigate('/menu')}>
                Menu
              </Menu.Item>
              <Menu.Item active={isActive('/footer')} onClick={() => navigate('/footer')}>
                Footer
              </Menu.Item>
              <Menu.Item active={isActive('/navbar')} onClick={() => navigate('/navbar')}>
                Navbar
              </Menu.Item>
              <Menu.Item active={isActive('/tabs')} onClick={() => navigate('/tabs')}>
                Tabs
              </Menu.Item>

              <Menu.Title>Feedback</Menu.Title>
              <Menu.Item active={isActive('/alert')} onClick={() => navigate('/alert')}>
                Alert
              </Menu.Item>
              <Menu.Item active={isActive('/loading')} onClick={() => navigate('/loading')}>
                Loading
              </Menu.Item>
              <Menu.Item active={isActive('/modal')} onClick={() => navigate('/modal')}>
                Modal
              </Menu.Item>
              <Menu.Item active={isActive('/tooltip')} onClick={() => navigate('/tooltip')}>
                Tooltip
              </Menu.Item>
            </Menu>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1920px] mx-auto">
            <Routes>
              <Route path="/" element={<ButtonPage />} />
              <Route path="/alert" element={<AlertPage />} />
              <Route path="/avatar" element={<AvatarPage />} />
              <Route path="/badge" element={<BadgePage />} />
              <Route path="/button" element={<ButtonPage />} />
              <Route path="/card" element={<CardPage />} />
              <Route path="/checkbox" element={<CheckboxPage />} />
              <Route path="/drawer" element={<DrawerPage />} />
              <Route path="/dropdown" element={<DropdownPage />} />
              <Route path="/fieldset" element={<FieldsetPage />} />
              <Route path="/file-input" element={<FileInputPage />} />
              <Route path="/footer" element={<FooterPage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/hero" element={<HeroPage />} />
              <Route path="/input" element={<InputPage />} />
              <Route path="/label" element={<LabelPage />} />
              <Route path="/loading" element={<LoadingPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/modal" element={<ModalPage />} />
              <Route path="/navbar" element={<NavbarPage />} />
              <Route path="/radio" element={<RadioPage />} />
              <Route path="/select" element={<SelectPage />} />
              <Route path="/stat" element={<StatPage />} />
              <Route path="/table" element={<TablePage />} />
              <Route path="/tabs" element={<TabsPage />} />
              <Route path="/textarea" element={<TextareaPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/toggle" element={<TogglePage />} />
              <Route path="/tooltip" element={<TooltipPage />} />
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
