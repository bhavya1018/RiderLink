import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Icon } from '../components/Icon'

type MyRidesPageProps = {
  onCreateRide: () => void
}

export function MyRidesPage({ onCreateRide }: MyRidesPageProps) {
  return (
    <div className="page-stack inner-page">
      <section className="page-heading-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-mark" /> YOUR GARAGE</p>
          <h1>My rides<span className="heading-period">.</span></h1>
          <p className="welcome-copy">All the rides you plan and the crews you roll with.</p>
        </div>
        <Button onClick={onCreateRide}><Icon name="plus" /> Create a ride</Button>
      </section>
      <Card className="rides-empty-card">
        <EmptyState
          icon="motorcycle"
          title="Your ride list is wide open."
          description="Rides you create or join will be collected here. No rides have been added yet."
          action={<Button onClick={onCreateRide}>Plan your first ride <Icon name="arrow-right" /></Button>}
        />
      </Card>
      <div className="page-footnote"><Icon name="route" /> Rides listed here will be connected to your account in a future phase.</div>
    </div>
  )
}
