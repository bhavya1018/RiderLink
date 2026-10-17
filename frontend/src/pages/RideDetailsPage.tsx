import { Button } from '../components/Button'
import { Badge, Card } from '../components/Card'
import { Icon } from '../components/Icon'
import type { Ride } from '../data/rides'

type RideDetailsPageProps = {
  ride: Ride
  demoUser: string
  onBack: () => void
  onCopyCode: (code: string) => void
  copyMessage: string
}

export function RideDetailsPage({ ride, demoUser, onBack, onCopyCode, copyMessage }: RideDetailsPageProps) {
  return (
    <div className="page-stack inner-page">
      <section className="page-heading-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-mark" /> PRIVATE RIDE DETAILS</p>
          <h1>{ride.name}<span className="heading-period">.</span></h1>
          <p className="welcome-copy">A private ride for your crew. Share the code only with the people you invite.</p>
        </div>
        <Button variant="outline" onClick={onBack}><Icon name="arrow-right" /> My rides</Button>
      </section>

      <Card className="ride-details-card">
        <div className="ride-details-card__top">
          <div>
            <Badge tone="accent">{ride.participants.length} / {ride.maxRiders} RIDERS</Badge>
            <div className="ride-code ride-code--detail">{ride.code}</div>
          </div>
          <Button variant="outline" onClick={() => onCopyCode(ride.code)}><Icon name="route" /> Copy code</Button>
        </div>
        <p className="copy-feedback" role="status">{copyMessage}</p>

        <div className="ride-route-panel">
          <div className="route-stop">
            <span className="route-stop__marker"><Icon name="map-pin" /></span>
            <div><span>STARTING POINT</span><strong>{ride.start}</strong></div>
          </div>
          <div className="route-line" aria-hidden="true" />
          <div className="route-stop">
            <span className="route-stop__marker route-stop__marker--end"><Icon name="flag" /></span>
            <div><span>DESTINATION</span><strong>{ride.destination}</strong></div>
          </div>
        </div>

        <div className="ride-info-grid">
          <div className="ride-info-item"><span>RIDE DATE</span><strong>{ride.date}</strong></div>
          <div className="ride-info-item"><span>DEPARTURE TIME</span><strong>{ride.departureTime}</strong></div>
          <div className="ride-info-item"><span>CREATED BY</span><strong>{ride.creator}{ride.creator === demoUser ? ' · You' : ''}</strong></div>
          <div className="ride-info-item"><span>CAPACITY</span><strong>{ride.participants.length} of {ride.maxRiders} riders</strong></div>
        </div>

        <div className="ride-participants">
          <div className="panel-heading">
            <div><p className="eyebrow">THE CREW</p><h2>Participants</h2></div>
            <Badge>{ride.participants.length} JOINED</Badge>
          </div>
          <ul className="participant-list participant-list--details">
            {ride.participants.map((participant, index) => (
              <li key={`${participant.name}-${participant.joinedAt}`}>
                <span className="participant-avatar">{participant.name.slice(0, 1).toUpperCase()}</span>
                <span className="participant-list__name">{participant.name}</span>
                {index === 0 && <Badge tone="accent">CREATOR</Badge>}
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <p className="page-footnote"><Icon name="users" /> Ride codes in this browser demo are not secure access control; a backend must verify codes, membership, and capacity.</p>
    </div>
  )
}
