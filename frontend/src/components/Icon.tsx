import type { ReactNode, SVGProps } from 'react'

export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'calendar'
  | 'close'
  | 'flag'
  | 'map-pin'
  | 'menu'
  | 'motorcycle'
  | 'plus'
  | 'route'
  | 'users'
  | 'user'

const paths: Record<IconName, ReactNode> = {
  'arrow-right': <path d="M5 12h14m-7-7 7 7-7 7" />,
  'arrow-up-right': <path d="M7 17 17 7M7 7h10v10" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="1" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  flag: <><path d="M5 21V5m0 0c5-4 9 4 14 0v11c-5 4-9-4-14 0" /><path d="M5 16c5-4 9 4 14 0" /></>,
  'map-pin': <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  motorcycle: <><circle cx="6" cy="17" r="3" /><circle cx="18" cy="17" r="3" /><path d="m6 17 4-7h4l4 7m-8-7-2-3h4l2 3m-1 0 2 3h3" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  route: <><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h2a4 4 0 0 0 4-4v-2a4 4 0 0 1 4-4" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
}

export function Icon({ name, ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
