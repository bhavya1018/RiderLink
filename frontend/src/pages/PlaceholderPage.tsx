import { Card, Badge } from '../components/Card'
import { Icon } from '../components/Icon'

type PlaceholderPageProps = {
  page: 'profile'
}

const pageContent = {
  profile: {
    eyebrow: 'YOUR RIDER CARD',
    title: 'Profile setup',
    description: 'Your rider profile will keep your crew details in one place.',
    heading: 'Make it yours.',
    detail: 'Profile editing is planned for a future phase. Only the demo name used for rides is stored locally in this browser.',
    icon: 'user' as const,
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
          <div className="profile-preview">
            <span className="profile-preview__avatar"><Icon name="user" /></span>
            <span><strong>Rider profile</strong><small>Personal details and preferences will live here.</small></span>
            <span className="profile-preview__edit">EDITING NOT AVAILABLE</span>
          </div>
        </div>
        <div className="workflow-card__number">RL / 03</div>
      </Card>
    </div>
  )
}
