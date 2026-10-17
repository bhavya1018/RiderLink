import { useState } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { MyRidesPage } from './pages/MyRidesPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { TopNavigation } from './components/TopNavigation'
import type { AppPage } from './components/TopNavigation'
import './App.css'

function App() {
  const [page, setPage] = useState<AppPage>('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigate = (nextPage: AppPage) => {
    setPage(nextPage)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-shell">
      <TopNavigation
        activePage={page}
        menuOpen={mobileMenuOpen}
        onNavigate={navigate}
        onMenuToggle={() => setMobileMenuOpen((open) => !open)}
      />
      <main className="main-content">
        {page === 'dashboard' && (
          <DashboardPage onCreateRide={() => navigate('create')} onJoinRide={() => navigate('join')} />
        )}
        {page === 'rides' && <MyRidesPage onCreateRide={() => navigate('create')} />}
        {page === 'profile' && <PlaceholderPage page="profile" />}
        {page === 'create' && <PlaceholderPage page="create" />}
        {page === 'join' && <PlaceholderPage page="join" />}
      </main>
      <footer className="site-footer">
        <span className="footer-mark">RL</span>
        <span>Built for the miles between here and there.</span>
        <span className="footer-phase">PHASE 01 · FOUNDATION</span>
      </footer>
    </div>
  )
}

export default App
