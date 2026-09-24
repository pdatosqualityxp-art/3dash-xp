import { useState } from 'react'
import { DescriptionView } from './features/description/DescriptionView'
import { HomeView } from './features/home/HomeView'
import { InfoView } from './features/info/InfoView'
import { Layout } from './shared/components/Layout'
import { ThemeProvider } from './shared/context/ThemeContext'
import { LanguageProvider } from './shared/context/LanguageContext'

function App() {
  const [activeView, setActiveView] = useState<'home' | 'info' | 'description'>('home')

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView />
      case 'info':
        return <InfoView />
      case 'description':
        return <DescriptionView />
      default:
        return <HomeView />
    }
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Layout activeView={activeView} onChangeView={setActiveView}>
          {renderView()}
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
