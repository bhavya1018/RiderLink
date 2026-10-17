import { Button } from '../components/Button'
import { Card, Badge } from '../components/Card'
import { FormField } from '../components/FormField'
import { Icon } from '../components/Icon'
import type { AppPage } from '../components/TopNavigation'

type PlaceholderPageProps = {
  page: Extract<AppPage, 'profile' | 'create' | 'join'>
}

const pageContent = {
  profile: {
    eyebrow: 'YOUR RIDER CARD',
    title: 'Profile setup',
    description: 'Your rider profile will keep your crew details in one place.',
    heading: 'Make it yours.',
    detail: 'Profile editing is planned for a future phase. Your details are not being collected or saved yet.',
    icon: 'user' as const,
  },
  create: {
    eyebrow: 'PLAN A RIDE',
    title: 'Create a ride',
    description: 'Get the crew together and start planning your next day out.',
    heading: 'The ride planner is on its way.',
    detail: 'Ride creation is not available yet. Nothing entered on this screen is saved or shared.',
    icon: 'flag' as const,
  },
  join: {
    eyebrow: 'FIND YOUR CREW',
    title: 'Join a ride',
    description: 'Got an invite? The ride code flow is coming soon.',
    heading: 'Invites are coming soon.',
    detail: 'Ride lookup is not connected yet, so an invite code cannot be checked right now.',
    icon: 'users' as const,
  },
}

export function PlaceholderPage({ page }: PlaceholderPageProps) {
  const content = pageContent[page]

  return (
    <div className="page-stack inner-page">
      <section className="page-heading-row">
        <div>
          <p className="eyebrow"><span className="eyebrow-mark" /> {content.eyebrow}</p>
          <h1>{content.title}<span className="heading-period">.</span></h1>
          <p className="welcome-copy">{content.description}</p>
        </div>
        <Badge tone="warning">COMING IN A FUTURE PHASE</Badge>
      </section>

      <Card className="workflow-card">
        <div className="workflow-card__symbol"><Icon name={content.icon} /></div>
        <div className="workflow-card__content">
          <Badge tone="warning">WORKFLOW NOT ACTIVE</Badge>
          <h2>{content.heading}</h2>
          <p>{content.detail}</p>
          {page === 'create' && (
            <div className="workflow-fields">
              <FormField id="ride-name" label="Ride name" placeholder="Example: Saturday coast run" disabled />
              <div className="workflow-fields__row">
                <FormField id="ride-start" label="Starting point" placeholder="Add a meetup spot" disabled />
                <FormField id="ride-date" label="Ride date" type="date" disabled />
              </div>
              <Button disabled>Ride creation coming soon <Icon name="arrow-right" /></Button>
            </div>
          )}
          {page === 'join' && (
            <div className="workflow-fields workflow-fields--join">
              <FormField id="invite-code" label="Ride invite code" placeholder="Enter a code" hint="Code entry will be enabled when ride invites are available." disabled />
              <Button disabled>Ride lookup coming soon <Icon name="arrow-right" /></Button>
            </div>
          )}
          {page === 'profile' && (
            <div className="profile-preview">
              <span className="profile-preview__avatar"><Icon name="user" /></span>
              <span><strong>Rider profile</strong><small>Personal details and preferences will live here.</small></span>
              <span className="profile-preview__edit">EDITING NOT AVAILABLE</span>
            </div>
          )}
        </div>
        <div className="workflow-card__number">RL / 0{page === 'create' ? '1' : page === 'join' ? '2' : '3'}</div>
      </Card>
    </div>
  )
}
