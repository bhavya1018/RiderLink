import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import { Badge, Card } from '../components/Card'
import { FormField } from '../components/FormField'
import { Icon } from '../components/Icon'
import type { JoinRideResult, Ride } from '../data/rides'

type JoinRidePageProps = {
  demoUser: string
  onJoin: (code: string, participantName: string) => JoinRideResult
  onOpenRide: (rideId: string) => void
}

export function JoinRidePage({ demoUser, onJoin, onOpenRide }: JoinRidePageProps) {
  const [code, setCode] = useState('')
  const [participantName, setParticipantName] = useState(demoUser)
  const [error, setError] = useState('')
  const [joinedRide, setJoinedRide] = useState<Ride | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedCode = code.trim().toUpperCase()
    if (!/^RL-[A-Z0-9]{6}$/.test(normalizedCode)) {
      setError('Enter a ride code in the format RL-7K9P2X.')
      setJoinedRide(null)
      return
    }
    if (!participantName.trim()) {
      setError('Enter the name for this demo rider.')
      setJoinedRide(null)
      return
    }

    const result = onJoin(normalizedCode, participantName.trim())
    if (result.status === 'joined') {
      setError('')
      setJoinedRide(result.ride)
      return
    }

    const messages = {
      unknown: 'We couldn’t find a ride with that code. Check the code and try again.',
      full: 'This ride is full and cannot accept another rider.',
      duplicate: `${participantName.trim()} has already joined this ride.`,
    }
    setError(messages[result.status])
    setJoinedRide(null)
  }

  return (
    <div className="page-stack inner-page">
      <section className="page-heading-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-mark" /> GOT AN INVITE?</p>
          <h1>Join a ride<span className="heading-period">.</span></h1>
          <p className="welcome-copy">Enter the private ride code shared by your crew.</p>
        </div>
        <Badge tone="accent">CODE REQUIRED</Badge>
      </section>

      <Card className="workflow-card join-workflow-card">
        <div className="workflow-card__symbol"><Icon name="users" /></div>
        <div className="workflow-card__content">
          <Badge tone="neutral">NO PUBLIC RIDE DIRECTORY</Badge>
          <h2>Got the code?</h2>
          <p>Ride lookup only works with a valid invite code. Demo participants are saved in this browser only.</p>
          <form className="workflow-fields workflow-fields--join ride-form" onSubmit={submit} noValidate>
            <FormField id="invite-code" label="Ride code" placeholder="RL-7K9P2X" autoCapitalize="characters" value={code} onChange={(event) => { setCode(event.target.value); setError(''); setJoinedRide(null) }} aria-invalid={Boolean(error)} />
            <FormField id="participant-name" label="Joining as" value={participantName} onChange={(event) => { setParticipantName(event.target.value); setError(''); setJoinedRide(null) }} />
            {error && <p className="form-alert form-alert--error" role="alert">{error}</p>}
            <Button type="submit"><Icon name="arrow-right" /> Check code & join</Button>
          </form>
          {joinedRide && <JoinSuccess ride={joinedRide} onOpenRide={onOpenRide} />}
        </div>
        <div className="workflow-card__number">RL / 02</div>
      </Card>
    </div>
  )
}

type JoinSuccessProps = {
  ride: Ride
  onOpenRide: (rideId: string) => void
}

function JoinSuccess({ ride, onOpenRide }: JoinSuccessProps) {
  return (
    <section className="join-success" aria-live="polite">
      <div className="join-success__heading">
        <Badge tone="accent">YOU’RE IN</Badge>
        <span>{ride.participants.length} / {ride.maxRiders} riders</span>
      </div>
      <h3>{ride.name}</h3>
      <p className="ride-route">{ride.start} <Icon name="arrow-right" /> {ride.destination}</p>
      <p className="ride-date-line">{ride.date} · {ride.departureTime} · Code {ride.code}</p>
      <h4>Participants</h4>
      <ul className="participant-list">
        {ride.participants.map((participant, index) => (
          <li key={`${participant.name}-${participant.joinedAt}`}>
            <span className="participant-avatar">{participant.name.slice(0, 1).toUpperCase()}</span>
            <span>{participant.name}</span>
            {index === 0 && <Badge>CREATOR</Badge>}
          </li>
        ))}
      </ul>
      <Button variant="outline" onClick={() => onOpenRide(ride.id)}>Full ride details <Icon name="arrow-right" /></Button>
    </section>
  )
}
