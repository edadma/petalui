import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { Menu, Navbar, Tag, ThemeController } from '@edadma/petalui'
import { HomePage } from './pages/HomePage'
import { AlertPage } from './pages/AlertPage'
import { AutocompletePage } from './pages/AutocompletePage'
import { AvatarPage } from './pages/AvatarPage'
import { BadgePage } from './pages/BadgePage'
import { BreadcrumbPage } from './pages/BreadcrumbPage'
import { IndicatorPage } from './pages/IndicatorPage'
import { TagPage } from './pages/TagPage'
import { ButtonPage } from './pages/ButtonPage'
import { CardPage } from './pages/CardPage'
import { CarouselPage } from './pages/CarouselPage'
import { CascaderPage } from './pages/CascaderPage'
import { ChatPage } from './pages/ChatPage'
import { CheckboxPage } from './pages/CheckboxPage'
import { ColorPickerPage } from './pages/ColorPickerPage'
import { CollapsePage } from './pages/CollapsePage'
import { DatePickerPage } from './pages/DatePickerPage'
import { DescriptionsPage } from './pages/DescriptionsPage'
import { DividerPage } from './pages/DividerPage'
import { DrawerPage } from './pages/DrawerPage'
import { DropdownPage } from './pages/DropdownPage'
import { EmptyPage } from './pages/EmptyPage'
import { FieldsetPage } from './pages/FieldsetPage'
import { FileInputPage } from './pages/FileInputPage'
import { FooterPage } from './pages/FooterPage'
import { FormPage } from './pages/FormPage'
import { GridPage } from './pages/GridPage'
import { HeroPage } from './pages/HeroPage'
import { ImagePage } from './pages/ImagePage'
import { InputPage } from './pages/InputPage'
import InputNumberPage from './pages/InputNumberPage'
import { JoinPage } from './pages/JoinPage'
import { LabelPage } from './pages/LabelPage'
import { LayoutPage } from './pages/LayoutPage'
import { LinkPage } from './pages/LinkPage'
import { ListPage } from './pages/ListPage'
import { LoadingPage } from './pages/LoadingPage'
import { MasonryPage } from './pages/MasonryPage'
import { MentionPage } from './pages/MentionPage'
import { MenuPage } from './pages/MenuPage'
import { PhonePage } from './pages/PhonePage'
import { BrowserPage } from './pages/BrowserPage'
import { WindowPage } from './pages/WindowPage'
import { CodeMockupPage } from './pages/CodeMockupPage'
import { ModalPage } from './pages/ModalPage'
import { NavbarPage } from './pages/NavbarPage'
import { NotificationPage } from './pages/NotificationPage'
import { PaginationPage } from './pages/PaginationPage'
import { PopconfirmPage } from './pages/PopconfirmPage'
import PopoverPage from './pages/PopoverPage'
import { ProgressPage } from './pages/ProgressPage'
import { QRCodePage } from './pages/QRCodePage'
import { RadioPage } from './pages/RadioPage'
import { RadialProgressPage } from './pages/RadialProgressPage'
import { RangePage } from './pages/RangePage'
import { RatingPage } from './pages/RatingPage'
import ResultPage from './pages/ResultPage'
import { SelectPage } from './pages/SelectPage'
import { SkeletonPage } from './pages/SkeletonPage'
import { SpacePage } from './pages/SpacePage'
import { SplitterPage } from './pages/SplitterPage'
import { StatPage } from './pages/StatPage'
import { StepsPage } from './pages/StepsPage'
import { TablePage } from './pages/TablePage'
import { TabsPage } from './pages/TabsPage'
import { TextareaPage } from './pages/TextareaPage'
import { ThemeControllerPage } from './pages/ThemeControllerPage'
import { TimePickerPage } from './pages/TimePickerPage'
import { TimelinePage } from './pages/TimelinePage'
import { TogglePage } from './pages/TogglePage'
import { TooltipPage } from './pages/TooltipPage'
import { TransferPage } from './pages/TransferPage'
import { TreePage } from './pages/TreePage'
import { TreeSelectPage } from './pages/TreeSelectPage'
import { TypographyPage } from './pages/TypographyPage'
import UploadPage from './pages/UploadPage'

const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
  'caramellatte',
  'abyss',
  'silk',
]

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="h-screen bg-base-200 flex flex-col">
      {/* Fixed Navbar */}
      <Navbar
        className="shadow-lg border-b border-base-content/10 flex-shrink-0"
        start={
          <div className="flex items-center gap-3">
            <img src="/petalui/logo.png" alt="PetalUI" className="w-8 h-8" />
            <span className="text-xl font-semibold">PetalUI Components</span>
            <Tag color="ghost">v0.6.0</Tag>
          </div>
        }
        end={<ThemeController.Dropdown themes={THEMES} />}
      />

      {/* Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Scrollable Sidebar */}
        <aside className="w-44 bg-base-100 border-r border-base-content/10 overflow-y-auto flex-shrink-0">
          <div className="p-4">
            <Menu>
              <Menu.Item active={isActive('/')} onClick={() => navigate('/')}>
                Overview
              </Menu.Item>

              <Menu.Title>General</Menu.Title>
              <Menu.Item active={isActive('/typography')} onClick={() => navigate('/typography')}>
                Typography
              </Menu.Item>

              <Menu.Title>Actions</Menu.Title>
              <Menu.Item active={isActive('/button')} onClick={() => navigate('/button')}>
                Button
              </Menu.Item>
              <Menu.Item active={isActive('/dropdown')} onClick={() => navigate('/dropdown')}>
                Dropdown
              </Menu.Item>
              <Menu.Item active={isActive('/theme-controller')} onClick={() => navigate('/theme-controller')}>
                Theme Controller
              </Menu.Item>

              <Menu.Title>Data Entry</Menu.Title>
              <Menu.Item active={isActive('/autocomplete')} onClick={() => navigate('/autocomplete')}>
                Autocomplete
              </Menu.Item>
              <Menu.Item active={isActive('/cascader')} onClick={() => navigate('/cascader')}>
                Cascader
              </Menu.Item>
              <Menu.Item active={isActive('/checkbox')} onClick={() => navigate('/checkbox')}>
                Checkbox
              </Menu.Item>
              <Menu.Item active={isActive('/colorpicker')} onClick={() => navigate('/colorpicker')}>
                ColorPicker
              </Menu.Item>
              <Menu.Item active={isActive('/datepicker')} onClick={() => navigate('/datepicker')}>
                DatePicker
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
              <Menu.Item active={isActive('/input-number')} onClick={() => navigate('/input-number')}>
                InputNumber
              </Menu.Item>
              <Menu.Item active={isActive('/label')} onClick={() => navigate('/label')}>
                Label
              </Menu.Item>
              <Menu.Item active={isActive('/mention')} onClick={() => navigate('/mention')}>
                Mention
              </Menu.Item>
              <Menu.Item active={isActive('/radio')} onClick={() => navigate('/radio')}>
                Radio
              </Menu.Item>
              <Menu.Item active={isActive('/range')} onClick={() => navigate('/range')}>
                Range
              </Menu.Item>
              <Menu.Item active={isActive('/rating')} onClick={() => navigate('/rating')}>
                Rating
              </Menu.Item>
              <Menu.Item active={isActive('/select')} onClick={() => navigate('/select')}>
                Select
              </Menu.Item>
              <Menu.Item active={isActive('/textarea')} onClick={() => navigate('/textarea')}>
                Textarea
              </Menu.Item>
              <Menu.Item active={isActive('/timepicker')} onClick={() => navigate('/timepicker')}>
                TimePicker
              </Menu.Item>
              <Menu.Item active={isActive('/toggle')} onClick={() => navigate('/toggle')}>
                Toggle
              </Menu.Item>
              <Menu.Item active={isActive('/transfer')} onClick={() => navigate('/transfer')}>
                Transfer
              </Menu.Item>
              <Menu.Item active={isActive('/tree-select')} onClick={() => navigate('/tree-select')}>
                TreeSelect
              </Menu.Item>
              <Menu.Item active={isActive('/upload')} onClick={() => navigate('/upload')}>
                Upload
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
              <Menu.Item active={isActive('/carousel')} onClick={() => navigate('/carousel')}>
                Carousel
              </Menu.Item>
              <Menu.Item active={isActive('/chat')} onClick={() => navigate('/chat')}>
                Chat
              </Menu.Item>
              <Menu.Item active={isActive('/collapse')} onClick={() => navigate('/collapse')}>
                Collapse
              </Menu.Item>
              <Menu.Item active={isActive('/descriptions')} onClick={() => navigate('/descriptions')}>
                Descriptions
              </Menu.Item>
              <Menu.Item active={isActive('/empty')} onClick={() => navigate('/empty')}>
                Empty
              </Menu.Item>
              <Menu.Item active={isActive('/image')} onClick={() => navigate('/image')}>
                Image
              </Menu.Item>
              <Menu.Item active={isActive('/list')} onClick={() => navigate('/list')}>
                List
              </Menu.Item>
              <Menu.Item active={isActive('/pagination')} onClick={() => navigate('/pagination')}>
                Pagination
              </Menu.Item>
              <Menu.Item active={isActive('/qrcode')} onClick={() => navigate('/qrcode')}>
                QR Code
              </Menu.Item>
              <Menu.Item active={isActive('/stat')} onClick={() => navigate('/stat')}>
                Stats
              </Menu.Item>
              <Menu.Item active={isActive('/steps')} onClick={() => navigate('/steps')}>
                Steps
              </Menu.Item>
              <Menu.Item active={isActive('/table')} onClick={() => navigate('/table')}>
                Table
              </Menu.Item>
              <Menu.Item active={isActive('/tag')} onClick={() => navigate('/tag')}>
                Tag
              </Menu.Item>
              <Menu.Item active={isActive('/timeline')} onClick={() => navigate('/timeline')}>
                Timeline
              </Menu.Item>
              <Menu.Item active={isActive('/tree')} onClick={() => navigate('/tree')}>
                Tree
              </Menu.Item>

              <Menu.Title>Layout</Menu.Title>
              <Menu.Item active={isActive('/divider')} onClick={() => navigate('/divider')}>
                Divider
              </Menu.Item>
              <Menu.Item active={isActive('/drawer')} onClick={() => navigate('/drawer')}>
                Drawer
              </Menu.Item>
              <Menu.Item active={isActive('/footer')} onClick={() => navigate('/footer')}>
                Footer
              </Menu.Item>
              <Menu.Item active={isActive('/grid')} onClick={() => navigate('/grid')}>
                Grid
              </Menu.Item>
              <Menu.Item active={isActive('/hero')} onClick={() => navigate('/hero')}>
                Hero
              </Menu.Item>
              <Menu.Item active={isActive('/indicator')} onClick={() => navigate('/indicator')}>
                Indicator
              </Menu.Item>
              <Menu.Item active={isActive('/join')} onClick={() => navigate('/join')}>
                Join
              </Menu.Item>
              <Menu.Item active={isActive('/layout')} onClick={() => navigate('/layout')}>
                Layout
              </Menu.Item>
              <Menu.Item active={isActive('/masonry')} onClick={() => navigate('/masonry')}>
                Masonry
              </Menu.Item>
              <Menu.Item active={isActive('/space')} onClick={() => navigate('/space')}>
                Space
              </Menu.Item>
              <Menu.Item active={isActive('/splitter')} onClick={() => navigate('/splitter')}>
                Splitter
              </Menu.Item>

              <Menu.Title>Navigation</Menu.Title>
              <Menu.Item active={isActive('/breadcrumbs')} onClick={() => navigate('/breadcrumbs')}>
                Breadcrumbs
              </Menu.Item>
              <Menu.Item active={isActive('/link')} onClick={() => navigate('/link')}>
                Link
              </Menu.Item>
              <Menu.Item active={isActive('/menu')} onClick={() => navigate('/menu')}>
                Menu
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
              <Menu.Item active={isActive('/notification')} onClick={() => navigate('/notification')}>
                Notification
              </Menu.Item>
              <Menu.Item active={isActive('/popconfirm')} onClick={() => navigate('/popconfirm')}>
                Popconfirm
              </Menu.Item>
              <Menu.Item active={isActive('/popover')} onClick={() => navigate('/popover')}>
                Popover
              </Menu.Item>
              <Menu.Item active={isActive('/progress')} onClick={() => navigate('/progress')}>
                Progress
              </Menu.Item>
              <Menu.Item active={isActive('/radial-progress')} onClick={() => navigate('/radial-progress')}>
                Radial Progress
              </Menu.Item>
              <Menu.Item active={isActive('/result')} onClick={() => navigate('/result')}>
                Result
              </Menu.Item>
              <Menu.Item active={isActive('/skeleton')} onClick={() => navigate('/skeleton')}>
                Skeleton
              </Menu.Item>
              <Menu.Item active={isActive('/tooltip')} onClick={() => navigate('/tooltip')}>
                Tooltip
              </Menu.Item>

              <Menu.Title>Mockup</Menu.Title>
              <Menu.Item active={isActive('/browser')} onClick={() => navigate('/browser')}>
                Browser
              </Menu.Item>
              <Menu.Item active={isActive('/code-mockup')} onClick={() => navigate('/code-mockup')}>
                CodeMockup
              </Menu.Item>
              <Menu.Item active={isActive('/phone')} onClick={() => navigate('/phone')}>
                Phone
              </Menu.Item>
              <Menu.Item active={isActive('/window')} onClick={() => navigate('/window')}>
                Window
              </Menu.Item>
            </Menu>
          </div>
        </aside>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1920px] mx-auto p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/alert" element={<AlertPage />} />
              <Route path="/autocomplete" element={<AutocompletePage />} />
              <Route path="/avatar" element={<AvatarPage />} />
              <Route path="/badge" element={<BadgePage />} />
              <Route path="/breadcrumbs" element={<BreadcrumbPage />} />
              <Route path="/button" element={<ButtonPage />} />
              <Route path="/card" element={<CardPage />} />
              <Route path="/carousel" element={<CarouselPage />} />
              <Route path="/cascader" element={<CascaderPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/checkbox" element={<CheckboxPage />} />
              <Route path="/colorpicker" element={<ColorPickerPage />} />
              <Route path="/collapse" element={<CollapsePage />} />
              <Route path="/datepicker" element={<DatePickerPage />} />
              <Route path="/descriptions" element={<DescriptionsPage />} />
              <Route path="/divider" element={<DividerPage />} />
              <Route path="/drawer" element={<DrawerPage />} />
              <Route path="/dropdown" element={<DropdownPage />} />
              <Route path="/empty" element={<EmptyPage />} />
              <Route path="/fieldset" element={<FieldsetPage />} />
              <Route path="/file-input" element={<FileInputPage />} />
              <Route path="/footer" element={<FooterPage />} />
              <Route path="/form" element={<FormPage />} />
              <Route path="/grid" element={<GridPage />} />
              <Route path="/hero" element={<HeroPage />} />
              <Route path="/indicator" element={<IndicatorPage />} />
              <Route path="/image" element={<ImagePage />} />
              <Route path="/input" element={<InputPage />} />
              <Route path="/input-number" element={<InputNumberPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/label" element={<LabelPage />} />
              <Route path="/layout" element={<LayoutPage />} />
              <Route path="/link" element={<LinkPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/loading" element={<LoadingPage />} />
              <Route path="/masonry" element={<MasonryPage />} />
              <Route path="/mention" element={<MentionPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/modal" element={<ModalPage />} />
              <Route path="/navbar" element={<NavbarPage />} />
              <Route path="/notification" element={<NotificationPage />} />
              <Route path="/pagination" element={<PaginationPage />} />
              <Route path="/popconfirm" element={<PopconfirmPage />} />
              <Route path="/popover" element={<PopoverPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/qrcode" element={<QRCodePage />} />
              <Route path="/radio" element={<RadioPage />} />
              <Route path="/radial-progress" element={<RadialProgressPage />} />
              <Route path="/range" element={<RangePage />} />
              <Route path="/rating" element={<RatingPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/select" element={<SelectPage />} />
              <Route path="/skeleton" element={<SkeletonPage />} />
              <Route path="/space" element={<SpacePage />} />
              <Route path="/splitter" element={<SplitterPage />} />
              <Route path="/stat" element={<StatPage />} />
              <Route path="/steps" element={<StepsPage />} />
              <Route path="/table" element={<TablePage />} />
              <Route path="/tabs" element={<TabsPage />} />
              <Route path="/tag" element={<TagPage />} />
              <Route path="/textarea" element={<TextareaPage />} />
              <Route path="/theme-controller" element={<ThemeControllerPage />} />
              <Route path="/timepicker" element={<TimePickerPage />} />
              <Route path="/timeline" element={<TimelinePage />} />
              <Route path="/toggle" element={<TogglePage />} />
              <Route path="/tooltip" element={<TooltipPage />} />
              <Route path="/typography" element={<TypographyPage />} />
              <Route path="/transfer" element={<TransferPage />} />
              <Route path="/tree" element={<TreePage />} />
              <Route path="/tree-select" element={<TreeSelectPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/browser" element={<BrowserPage />} />
              <Route path="/code-mockup" element={<CodeMockupPage />} />
              <Route path="/phone" element={<PhonePage />} />
              <Route path="/window" element={<WindowPage />} />
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
