import { useMemo, useState } from 'react'
import {
  BarChart3,
  FileText,
  Home,
  Info,
  Languages,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
} from 'lucide-react'
import logo from '../../assets/logo.png'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { key: 'home', icon: Home },
  { key: 'info', icon: Info },
  { key: 'description', icon: FileText },
  { key: 'dashboard', icon: BarChart3 },
  { key: 'item-1', icon: Home },
  { key: 'item-2', icon: Info },
  { key: 'item-3', icon: FileText },
  { key: 'item-4', icon: Home },
  { key: 'item-5', icon: Info },
  { key: 'item-6', icon: FileText },
  { key: 'item-7', icon: Home },
  { key: 'item-8', icon: Info },
  { key: 'item-9', icon: FileText },
  { key: 'item-10', icon: Home },
  { key: 'item-11', icon: Info },
  { key: 'item-12', icon: FileText },
  { key: 'item-13', icon: Home },
  { key: 'item-14', icon: Info },
  { key: 'item-15', icon: FileText },
  { key: 'item-16', icon: Home },
  { key: 'item-17', icon: Info },
  { key: 'item-18', icon: FileText },
  { key: 'item-19', icon: Home },
  { key: 'item-20', icon: Info },
  { key: 'item-21', icon: FileText },
  { key: 'item-22', icon: Home },
  { key: 'item-23', icon: Info },
  { key: 'item-24', icon: FileText },
  { key: 'item-25', icon: Home },
  { key: 'item-26', icon: Info },
  { key: 'item-27', icon: FileText },
  { key: 'item-28', icon: Home },
  { key: 'item-29', icon: Info },
  { key: 'item-30', icon: FileText },
] as const

type ViewKey = 'home' | 'info' | 'description' | 'dashboard'
type NavKey = ViewKey | `item-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30}`

type SidebarProps = {
  activeView: ViewKey
  onChangeView: (view: ViewKey) => void
}

export function Sidebar({ activeView, onChangeView }: SidebarProps) {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const translatedItems = useMemo(
    () =>
      navItems.map(({ key, icon: Icon }) => ({
        key,
        icon: Icon,
        label:
          key === 'item-1'
            ? 'Item 1'
            : key === 'item-2'
              ? 'Item 2'
              : key === 'item-3'
                ? 'Item 3'
                : key === 'item-4'
                  ? 'Item 4'
                  : key === 'item-5'
                    ? 'Item 5'
                    : key === 'item-6'
                      ? 'Item 6'
                      : key === 'item-7'
                        ? 'Item 7'
                        : key === 'item-8'
                          ? 'Item 8'
                          : key === 'item-9'
                            ? 'Item 9'
                            : key === 'item-10'
                              ? 'Item 10'
                              : key === 'item-11'
                                ? 'Item 11'
                                : key === 'item-12'
                                  ? 'Item 12'
                                  : key === 'item-13'
                                    ? 'Item 13'
                                    : key === 'item-14'
                                      ? 'Item 14'
                                      : key === 'item-15'
                                        ? 'Item 15'
                                        : key === 'item-16'
                                          ? 'Item 16'
                                          : key === 'item-17'
                                            ? 'Item 17'
                                            : key === 'item-18'
                                              ? 'Item 18'
                                              : key === 'item-19'
                                                ? 'Item 19'
                                                : key === 'item-20'
                                                  ? 'Item 20'
                                                  : key === 'item-21'
                                                    ? 'Item 21'
                                                    : key === 'item-22'
                                                      ? 'Item 22'
                                                      : key === 'item-23'
                                                        ? 'Item 23'
                                                        : key === 'item-24'
                                                          ? 'Item 24'
                                                          : key === 'item-25'
                                                            ? 'Item 25'
                                                            : key === 'item-26'
                                                              ? 'Item 26'
                                                              : key === 'item-27'
                                                                ? 'Item 27'
                                                                : key === 'item-28'
                                                                  ? 'Item 28'
                                                                  : key === 'item-29'
                                                                    ? 'Item 29'
                                                                    : key === 'item-30'
                                                                      ? 'Item 30'
                                                                      : t(key),
      })),
    [t],
  )

  const sidebarClassName = isCollapsed
    ? 'lg:w-24'
    : 'lg:w-72'

  const activeItemClasses =
    'bg-gradient-to-r from-[#0f766e] via-[#0b8a7d] to-[#14b8a6] text-white shadow-lg shadow-[#0f766e]/20 dark:from-[#0b5d5a] dark:via-[#0d6f6d] dark:to-[#11a59b] dark:text-white'

  const handleNavClick = (key: NavKey) => {
    if (key === 'home' || key === 'info' || key === 'description' || key === 'dashboard') {
      onChangeView(key)
    }
  }

  const renderNav = () => (
    <nav className="sidebar-scroll mt-8 flex-1 overflow-y-auto pr-1">
      <div className="space-y-2">
        {translatedItems.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleNavClick(key)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
              activeView === key ? activeItemClasses : 'hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-slate-800 dark:hover:text-teal-300'
            }`}
            title={label}
          >
            <Icon size={18} className="shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
          </button>
        ))}
      </div>
    </nav>
  )

  const renderFooter = () => (
    <div className="mt-auto space-y-4">
      <div className="h-px bg-slate-200 dark:bg-slate-700" />

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
          <Languages size={16} className="shrink-0 text-slate-500 dark:text-slate-300" />
          {!isCollapsed && <span className="whitespace-nowrap text-sm text-slate-600 dark:text-slate-200">{t('language')}</span>}
          <div className="relative ml-auto w-full max-w-[130px]">
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as 'ca' | 'es' | 'en')}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 pr-9 text-right text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              aria-label="Select language"
            >
              <option value="ca">Català</option>
              <option value="es">Español</option>
              <option value="en">English</option>
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-300">
              <span className="text-xs">▾</span>
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-teal-50/60 px-3 py-2.5 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:to-slate-800/80">
          <div className="flex min-w-0 items-center gap-3 overflow-hidden">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-teal-200 text-[10px] font-bold text-slate-700 dark:from-slate-700 dark:to-teal-900 dark:text-slate-100">
              IN
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-800" />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{t('profile')}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">online</div>
              </div>
            )}
          </div>
          {!isCollapsed && <UserRound size={16} className="shrink-0 text-slate-500 dark:text-slate-300" />}
        </div>
      </div>

      {!isCollapsed && (
        <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{t('version')}</div>
      )}
    </div>
  )

  const desktopSidebar = (
    <aside
      className={`hidden lg:flex lg:h-screen lg:flex-col border-r border-slate-200 bg-white/80 p-4 shadow-soft backdrop-blur transition-all duration-200 dark:border-slate-800 dark:bg-slate-900/80 ${sidebarClassName}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <img src={logo} alt="MiWeb logo" className="h-9 w-9 shrink-0 rounded-lg object-cover" />
          {!isCollapsed && <span className="truncate text-xl font-semibold">MiWeb</span>}
        </div>

        {!isCollapsed && (
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setIsCollapsed(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <X size={16} className="rotate-90" />
          </button>
        )}
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {renderNav()}
      {renderFooter()}
    </aside>
  )

  const collapsedDesktopSidebar = (
    <aside className="hidden lg:flex lg:h-screen lg:w-24 lg:flex-col lg:items-center lg:border-r lg:border-slate-200 lg:bg-white/80 lg:p-4 lg:shadow-soft lg:backdrop-blur dark:lg:border-slate-800 dark:lg:bg-slate-900/80">
      <button
        type="button"
        aria-label="Expand sidebar"
        onClick={() => setIsCollapsed(false)}
        className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
      >
        <Menu size={18} />
      </button>

      <img src={logo} alt="MiWeb logo" className="h-9 w-9 rounded-lg object-cover" />

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          aria-label="Toggle theme"
          onClick={toggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <nav className="sidebar-scroll mt-8 flex w-full flex-1 flex-col items-center gap-2 overflow-y-auto pb-2">
        {translatedItems.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleNavClick(key)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
              activeView === key ? activeItemClasses : 'hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-slate-800 dark:hover:text-teal-300'
            }`}
            title={label}
            aria-label={label}
          >
            <Icon size={18} />
          </button>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="mt-auto flex w-full flex-col items-center gap-3 pb-2">
          <button
            type="button"
            aria-label="Select language"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Languages size={18} />
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-100">
            xp
          </div>
        </div>
      )}
    </aside>
  )

  const mobileSidebar = (
    <>
      <div className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" style={{ opacity: isMobileOpen ? 1 : 0, pointerEvents: isMobileOpen ? 'auto' : 'none' }} />

      <div className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] transform border-r border-slate-200 bg-white/95 p-4 shadow-soft transition-transform duration-200 dark:border-slate-800 dark:bg-slate-900/95 lg:hidden ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="MiWeb logo" className="h-9 w-9 rounded-lg object-cover" />
            <span className="text-xl font-semibold">MiWeb</span>
          </div>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setIsMobileOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <nav className="sidebar-scroll mt-8 max-h-[calc(100vh-20rem)] space-y-2 overflow-y-auto pr-1">
          {translatedItems.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                handleNavClick(key)
                setIsMobileOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                activeView === key ? activeItemClasses : 'hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-slate-800 dark:hover:text-teal-300'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="my-6 h-px bg-slate-200 dark:bg-slate-700" />

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <Languages size={16} className="shrink-0 text-slate-500 dark:text-slate-300" />
            <span className="text-sm text-slate-600 dark:text-slate-200">{t('language')}</span>
            <div className="relative ml-auto w-full max-w-[130px]">
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value as 'ca' | 'es' | 'en')}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 pr-9 text-right text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-teal-400 dark:focus:ring-teal-500/20"
              >
                <option value="ca">Català</option>
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 dark:text-slate-300">
                <span className="text-xs">▾</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-teal-50/60 px-3 py-2.5 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:to-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-teal-200 text-[10px] font-bold text-slate-700 dark:from-slate-700 dark:to-teal-900 dark:text-slate-100">
                IN
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-800" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t('profile')}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">online</div>
              </div>
            </div>
            <UserRound size={16} className="text-slate-500 dark:text-slate-300" />
          </div>
        </div>

        <div className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">{t('version')}</div>
      </div>
    </>
  )

  return (
    <>
      <div className="lg:hidden">
        <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <img src={logo} alt="MiWeb logo" className="h-8 w-8 rounded-lg object-cover" />
            <span className="text-lg font-semibold">MiWeb</span>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <Menu size={18} />
          </button>
        </header>

        <div className="h-16" />
      </div>

      {isCollapsed ? collapsedDesktopSidebar : desktopSidebar}
      {mobileSidebar}
    </>
  )
}
