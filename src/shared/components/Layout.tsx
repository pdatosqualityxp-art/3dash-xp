import { Sidebar } from './Sidebar'

type LayoutProps = {
  children: React.ReactNode
  activeView: 'home' | 'info' | 'description' | 'dashboard'
  onChangeView: (view: 'home' | 'info' | 'description' | 'dashboard') => void
}

export function Layout({ children, activeView, onChangeView }: LayoutProps) {
  return (
    <div className="flex h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar activeView={activeView} onChangeView={onChangeView} />
      <main className="flex-1 overflow-y-auto p-4 pt-20 md:p-8 lg:pt-8">{children}</main>
    </div>
  )
}
