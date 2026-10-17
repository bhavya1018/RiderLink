import { useState } from 'react'
import { Button } from '../components/Button'
import { Card, Badge } from '../components/Card'
import { EmptyState } from '../components/EmptyState'
import { Icon } from '../components/Icon'
import type { Ride } from '../data/rides'

type MyRidesPageProps = {
  rides: Ride[]
  demoUser: string
  onCreateRide: () => void
  onOpenRide: (rideId: string) => void
  onCopyCode: (code: string) => Promise<boolean>
}

export function MyRidesPage({ rides, demoUser, onCreateRide, onOpenRide, onCopyCode }: MyRidesPageProps) {
  const [copiedCode, setCopiedCode] = useState('')
  const myRides = rides.filter((ride) => ride.participants.some(
    (participant) => participant.name.trim().toLowerCase() === demoUser.trim().toLowerCase(),
  ))

  const copyCode = async (code: string) => {
    const copied = await onCopyCode(code)
    setCopiedCode(copied ? code : '')
  }

  return (
    <div className="page-stack inner-page">
      <section className="page-heading-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-mark" /> YOUR GARAGE</p>
          <h1>My rides<span className="heading-period">.</span></h1>
          <p className="welcome-copy">Rides created or joined as <strong>{demoUser}</strong> in this browser demo.</p>
        </div>
        <Button onClick={onCreateRide}><Icon name="plus" /> Create a ride</Button>
      </section>

      {myRides.length === 0 ? (
        <Card className="rides-empty-card">
          <EmptyState
            icon="motorcycle"
            title="Your ride list is wide open."
            description="Rides you create or join will be collected here. No rides have been added yet."
            action={<Button onClick={onCreateRide}>Plan your first ride <Icon name="arrow-right" /></Button>}
          />
        </Card>
      ) : (
        <section className="my-rides-grid" aria-label="Your rides">
          {myRides.map((ride) => (
            <Card as="article" className="my-ride-card" key={ride.id}>
              <div className="my-ride-card__heading">
                <Badge tone="accent">{ride.participants.length} / {ride.maxRiders} RIDERS</Badge>
                <span>{ride.creator.toLowerCase() === demoUser.toLowerCase() ? 'CREATED BY YOU' : 'JOINED'}</span>
              </div>
              <h2>{ride.name}</h2>
              <p className="ride-route">{ride.start} <Icon name="arrow-right" /> {ride.destination}</p>
              <div className="my-ride-card__meta"><span><Icon name="calendar" /> {ride.date}</span><span>{ride.departureTime}</span></div>
              <div className="my-ride-card__code">
                <span><small>RIDE CODE</small><strong>{ride.code}</strong></span>
                <button className="copy-code-button" type="button" onClick={() => void copyCode(ride.code)} aria-label={`Copy ride code ${ride.code}`}>
                  <Icon name="route" /> {copiedCode === ride.code ? 'COPIED' : 'COPY'}
                </button>
              </div>
              <Button variant="outline" onClick={() => onOpenRide(ride.id)}>Open ride details <Icon name="arrow-right" /></Button>
            </Card>
          ))}
        </section>
      )}
      <div className="page-footnote"><Icon name="route" /> Ride data is saved only in this browser and is not synced with other devices.</div>
    </div>
  )
}
