import { Button } from './Button'
import { Icon } from './Icon'

export type AppPage = 'dashboard' | 'rides' | 'profile' | 'create' | 'join' | 'details'

type TopNavigationProps = {
  activePage: AppPage
  menuOpen: boolean
  onNavigate: (page: AppPage) => void
  onMenuToggle: () => void
}

const links: { label: string; page: AppPage; icon: 'route' | 'motorcycle' | 'user' }[] = [
  { label: 'Dashboard', page: 'dashboard', icon: 'route' },
  { label: 'My rides', page: 'rides', icon: 'motorcycle' },
  { label: 'Profile', page: 'profile', icon: 'user' },
]

export function TopNavigation({ activePage, menuOpen, onNavigate, onMenuToggle }: TopNavigationProps) {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <button className="wordmark" type="button" onClick={() => onNavigate('dashboard')} aria-label="RiderLink dashboard">
          <span className="wordmark__symbol"><Icon name="motorcycle" /></span>
          <span>RIDER<span className="wordmark__accent">LINK</span><small>RIDE AS ONE</small></span>
        </button>

        <nav className={`primary-nav${menuOpen ? ' primary-nav--open' : ''}`} aria-label="Main navigation">
          {links.map((link) => (
            <button
              key={link.page}
              className={`nav-link${activePage === link.page ? ' nav-link--active' : ''}`}
              type="button"
              aria-current={activePage === link.page ? 'page' : undefined}
              onClick={() => onNavigate(link.page)}
            >
              <Icon name={link.icon} />
              {link.label}
            </button>
          ))}
          <Button className="mobile-create" onClick={() => onNavigate('create')}>
            <Icon name="plus" /> Create a ride
          </Button>
        </nav>

        <div className="topbar__actions">
          <Button className="desktop-create" onClick={() => onNavigate('create')}>
            <Icon name="plus" /> Create a ride
          </Button>
          <button
            type="button"
            className="menu-toggle"
            onClick={onMenuToggle}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
