import type { ReactNode } from 'react'
import { Icon } from './Icon'
import type { IconName } from './Icon'

type EmptyStateProps = {
  icon: IconName
  title: string
  description: string
  action?: ReactNode
  compact?: boolean
}

export function EmptyState({ icon, title, description, action, compact = false }: EmptyStateProps) {
  return (
    <div className={`empty-state${compact ? ' empty-state--compact' : ''}`}>
      <span className="empty-state__icon"><Icon name={icon} /></span>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  )
}
