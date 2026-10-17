import { useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import { Badge, Card } from '../components/Card'
import { FormField } from '../components/FormField'
import { Icon } from '../components/Icon'
import type { NewRide, Ride } from '../data/rides'

type CreateRidePageProps = {
  onCreate: (ride: NewRide) => Ride
  onViewRide: (rideId: string) => void
}

type RideDraft = {
  name: string
  start: string
  destination: string
  date: string
  departureTime: string
  maxRiders: string
}

const emptyDraft: RideDraft = {
  name: '',
  start: '',
  destination: '',
  date: '',
  departureTime: '',
  maxRiders: '8',
}

function localDateString(date: Date) {
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

export function CreateRidePage({ onCreate, onViewRide }: CreateRidePageProps) {
  const [draft, setDraft] = useState(emptyDraft)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [createdRide, setCreatedRide] = useState<Ride | null>(null)
  const [copyMessage, setCopyMessage] = useState('')

  const updateField = (field: keyof RideDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}
    if (!draft.name.trim()) nextErrors.name = 'Enter a name for this ride.'
    if (!draft.start.trim()) nextErrors.start = 'Enter a starting location.'
    if (!draft.destination.trim()) nextErrors.destination = 'Enter a destination.'
    if (!draft.date) nextErrors.date = 'Choose a ride date.'
    if (!draft.departureTime) nextErrors.departureTime = 'Choose a departure time.'

    const departure = draft.date && draft.departureTime ? new Date(`${draft.date}T${draft.departureTime}`) : null
    if (departure && (Number.isNaN(departure.getTime()) || departure.getTime() <= Date.now())) {
      nextErrors.date = 'Choose a future date and departure time.'
    }
    const maxRiders = Number(draft.maxRiders)
    if (!Number.isInteger(maxRiders) || maxRiders < 2) {
      nextErrors.maxRiders = 'Capacity must be at least 2 riders, including the creator.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const ride = onCreate({
      name: draft.name.trim(),
      start: draft.start.trim(),
      destination: draft.destination.trim(),
      date: draft.date,
      departureTime: draft.departureTime,
      maxRiders,
    })
    setCreatedRide(ride)
  }

  const copyCode = async () => {
    if (!createdRide) return
    try {
      await navigator.clipboard.writeText(createdRide.code)
      setCopyMessage('Ride code copied.')
    } catch {
      setCopyMessage('Clipboard access is unavailable. Select and copy the code above.')
    }
  }

  if (createdRide) {
    return (
      <div className="page-stack inner-page">
        <section className="page-heading-row">
          <div>
            <p className="eyebrow"><span className="eyebrow-mark" /> RIDE PLANNED</p>
            <h1>It’s a go<span className="heading-period">.</span></h1>
            <p className="welcome-copy">Share this private code with the people you’re riding with.</p>
          </div>
          <Badge tone="accent">RIDE CREATED</Badge>
        </section>
        <Card className="success-card">
          <div className="success-card__mark"><Icon name="flag" /></div>
          <div className="success-card__content">
            <p className="eyebrow">YOUR RIDE CODE</p>
            <div className="ride-code ride-code--large">{createdRide.code}</div>
            <p className="success-card__copy">Only someone with this code can attempt to join in this demo.</p>
            <div className="success-card__actions">
              <Button onClick={copyCode}><Icon name="route" /> Copy ride code</Button>
              <Button variant="outline" onClick={() => onViewRide(createdRide.id)}>View ride details <Icon name="arrow-right" /></Button>
            </div>
            <p className="copy-feedback" role="status">{copyMessage}</p>
            <div className="success-summary">
              <strong>{createdRide.name}</strong>
              <span>{createdRide.start} <Icon name="arrow-right" /> {createdRide.destination}</span>
              <span>{createdRide.date} at {createdRide.departureTime}</span>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="page-stack inner-page">
      <section className="page-heading-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-mark" /> PLAN A RIDE</p>
          <h1>Create a ride<span className="heading-period">.</span></h1>
          <p className="welcome-copy">Set the plan, then share your unique code with your crew.</p>
        </div>
        <Badge tone="accent">PRIVATE GROUP RIDE</Badge>
      </section>

      <Card className="workflow-card create-workflow-card">
        <div className="workflow-card__symbol"><Icon name="flag" /></div>
        <div className="workflow-card__content">
          <Badge tone="neutral">YOUR CREW · YOUR ROUTE</Badge>
          <h2>Where are we headed?</h2>
          <p>Ride codes are the only way to join. This local demo does not provide real privacy or multi-user sync.</p>
          <form className="workflow-fields ride-form" onSubmit={submit} noValidate>
            <div>
              <FormField id="ride-name" label="Ride name" placeholder="Example: Saturday coast run" value={draft.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>
            <div className="workflow-fields__row">
              <div>
                <FormField id="ride-start" label="Starting location" placeholder="Meetup spot or town" value={draft.start} onChange={(event) => updateField('start', event.target.value)} aria-invalid={Boolean(errors.start)} />
                {errors.start && <span className="field-error">{errors.start}</span>}
              </div>
              <div>
                <FormField id="ride-destination" label="Destination" placeholder="Where the ride ends" value={draft.destination} onChange={(event) => updateField('destination', event.target.value)} aria-invalid={Boolean(errors.destination)} />
                {errors.destination && <span className="field-error">{errors.destination}</span>}
              </div>
            </div>
            <div className="workflow-fields__row">
              <div>
                <FormField id="ride-date" label="Ride date" type="date" min={localDateString(new Date())} value={draft.date} onChange={(event) => updateField('date', event.target.value)} aria-invalid={Boolean(errors.date)} />
                {errors.date && <span className="field-error">{errors.date}</span>}
              </div>
              <div>
                <FormField id="ride-time" label="Departure time" type="time" value={draft.departureTime} onChange={(event) => updateField('departureTime', event.target.value)} aria-invalid={Boolean(errors.departureTime)} />
                {errors.departureTime && <span className="field-error">{errors.departureTime}</span>}
              </div>
            </div>
            <div className="capacity-field">
              <FormField id="ride-capacity" label="Maximum riders" type="number" min={2} step={1} value={draft.maxRiders} onChange={(event) => updateField('maxRiders', event.target.value)} hint="Includes you, the ride creator." aria-invalid={Boolean(errors.maxRiders)} />
              {errors.maxRiders && <span className="field-error">{errors.maxRiders}</span>}
            </div>
            <Button type="submit"><Icon name="plus" /> Create private ride</Button>
          </form>
        </div>
        <div className="workflow-card__number">RL / 01</div>
      </Card>
    </div>
  )
}
