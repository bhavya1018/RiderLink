import { Button } from '../components/Button'
import { Card, Badge } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Icon } from '../components/Icon'

type DashboardPageProps = {
  onCreateRide: () => void
  onJoinRide: () => void
}

export function DashboardPage({ onCreateRide, onJoinRide }: DashboardPageProps) {
  return (
    <div className="page-stack">
      <section className="welcome-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-mark" /> YOUR RIDER DASHBOARD</p>
          <h1>Good miles start <span>together.</span></h1>
          <p className="welcome-copy">Bring your people, plan the route, and make every ride count.</p>
        </div>
        <div className="welcome-stamp" aria-label="Ride together">
          <span>RIDE</span><Icon name="motorcycle" /><span>TOGETHER</span>
        </div>
      </section>

      <section className="action-grid" aria-label="Ride actions">
        <Card className="action-card action-card--create">
          <div className="action-card__copy">
            <Badge tone="neutral">START SOMETHING</Badge>
            <h2>Your crew. Your route.</h2>
            <p>Set up a ride and get your group ready to roll.</p>
            <Button onClick={onCreateRide}>Create a ride <Icon name="arrow-right" /></Button>
          </div>
          <div className="action-card__graphic" aria-hidden="true">
            <span className="graphic-sun" />
            <span className="graphic-road graphic-road--one" />
            <span className="graphic-road graphic-road--two" />
            <Icon name="motorcycle" />
          </div>
          <span className="action-card__index">01 / PLAN</span>
        </Card>

        <Card className="action-card action-card--join">
          <span className="join-icon"><Icon name="users" /></span>
          <Badge>GOT AN INVITE?</Badge>
          <h2>Meet up with your crew.</h2>
          <p>Join a ride when you have a link or invite code.</p>
          <Button variant="outline" onClick={onJoinRide}>Join a ride <Icon name="arrow-right" /></Button>
          <span className="action-card__index">02 / CONNECT</span>
        </Card>
      </section>

      <section className="dashboard-sections">
        <Card className="dashboard-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">ON THE HORIZON</p>
              <h2>Upcoming rides</h2>
            </div>
            <Badge tone="accent">0 SCHEDULED</Badge>
          </div>
          <EmptyState
            icon="calendar"
            title="Nothing on the calendar. Yet."
            description="Your rides will show up here once you create or join one."
            compact
            action={<button type="button" className="text-action" onClick={onCreateRide}>Plan your first ride <Icon name="arrow-up-right" /></button>}
          />
        </Card>

        <Card className="dashboard-panel activity-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">FROM YOUR CREW</p>
              <h2>Ride activity</h2>
            </div>
            <span className="panel-heading__icon"><Icon name="route" /></span>
          </div>
          <EmptyState
            icon="users"
            title="It’s quiet out here."
            description="Ride updates from your group will appear here."
            compact
          />
          <div className="activity-note"><span className="activity-note__dot" /> No live ride or location sharing is active.</div>
        </Card>
      </section>

      <Card className="safety-strip">
        <span className="safety-strip__icon"><Icon name="flag" /></span>
        <div><strong>Ride-ready starts with the basics.</strong><p>Check your gear, check your bike, and look out for your crew.</p></div>
        <span className="safety-strip__label">RIDE SMART</span>
      </Card>
    </div>
  )
}
