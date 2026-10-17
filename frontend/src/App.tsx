import { useState } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { MyRidesPage } from './pages/MyRidesPage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import { CreateRidePage } from './pages/CreateRidePage'
import { JoinRidePage } from './pages/JoinRidePage'
import { RideDetailsPage } from './pages/RideDetailsPage'
import { TopNavigation } from './components/TopNavigation'
import type { AppPage } from './components/TopNavigation'
import { createRide as buildRide, joinRide, loadDemoUser, loadRides, saveDemoUser, saveRides } from './data/rides'
import type { NewRide, Ride } from './data/rides'
import './App.css'

function App() {
  const [page, setPage] = useState<AppPage>('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [rides, setRides] = useState<Ride[]>(loadRides)
  const [demoUser, setDemoUser] = useState(loadDemoUser)
  const [selectedRideId, setSelectedRideId] = useState('')
  const [copyMessage, setCopyMessage] = useState('')

  const navigate = (nextPage: AppPage) => {
    setPage(nextPage)
    setMobileMenuOpen(false)
    setCopyMessage('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const updateRides = (nextRides: Ride[]) => {
    setRides(nextRides)
    saveRides(nextRides)
  }

  const createRide = (input: NewRide) => {
    const ride = buildRide(input, demoUser, rides)
    updateRides([...rides, ride])
    setSelectedRideId(ride.id)
    return ride
  }

  const attemptJoin = (code: string, participantName: string) => {
    const result = joinRide(code, participantName, rides)
    if (result.status === 'joined') {
      updateRides(rides.map((ride) => ride.id === result.ride.id ? result.ride : ride))
      setDemoUser(participantName)
      saveDemoUser(participantName)
      setSelectedRideId(result.ride.id)
    }
    return result
  }

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyMessage(`${code} copied.`)
      return true
    } catch {
      setCopyMessage('Clipboard access is unavailable. Select and copy the code.')
      return false
    }
  }

  const selectedRide = rides.find((ride) => ride.id === selectedRideId)
  const showRideDetails = (rideId: string) => {
    setSelectedRideId(rideId)
    navigate('details')
  }

  return (
    <div className="app-shell">
      <TopNavigation
        activePage={page === 'details' ? 'rides' : page}
        menuOpen={mobileMenuOpen}
        onNavigate={navigate}
        onMenuToggle={() => setMobileMenuOpen((open) => !open)}
      />
      <main className="main-content">
        {page === 'dashboard' && (
          <DashboardPage rides={rides} demoUser={demoUser} onCreateRide={() => navigate('create')} onJoinRide={() => navigate('join')} />
        )}
        {page === 'rides' && (
          <MyRidesPage rides={rides} demoUser={demoUser} onCreateRide={() => navigate('create')} onOpenRide={showRideDetails} onCopyCode={copyCode} />
        )}
        {page === 'profile' && <PlaceholderPage page="profile" />}
        {page === 'create' && <CreateRidePage onCreate={createRide} onViewRide={showRideDetails} />}
        {page === 'join' && <JoinRidePage demoUser={demoUser} onJoin={attemptJoin} onOpenRide={showRideDetails} />}
        {page === 'details' && selectedRide && (
          <RideDetailsPage ride={selectedRide} demoUser={demoUser} onBack={() => navigate('rides')} onCopyCode={copyCode} copyMessage={copyMessage} />
        )}
        {page === 'details' && !selectedRide && <MyRidesPage rides={rides} demoUser={demoUser} onCreateRide={() => navigate('create')} onOpenRide={showRideDetails} onCopyCode={copyCode} />}
      </main>
      <footer className="site-footer">
        <span className="footer-mark">RL</span>
        <span>Built for the miles between here and there.</span>
        <span className="footer-phase">PHASE 02 · RIDE PLANNING</span>
      </footer>
    </div>
  )
}

export default App
