export enum MENU_ITEMS {
  Search = 'Search',
  Inbox = 'Inbox',
  Today = 'Today',
  Upcoming = 'Upcoming',
  Completed = 'Completed',
  Backlog = 'Backlog',
}

export const MENU_ICONS = {
  [MENU_ITEMS.Search]: 'search',
  [MENU_ITEMS.Inbox]: 'inbox',
  [MENU_ITEMS.Today]: 'today',
  [MENU_ITEMS.Upcoming]: 'upcoming',
  [MENU_ITEMS.Completed]: 'completed',
  [MENU_ITEMS.Backlog]: 'backlog',
} as const satisfies Record<MENU_ITEMS, string>;

export const NAVIGATION_PATHS = {
  [MENU_ITEMS.Search]: '/dashboard/search',
  [MENU_ITEMS.Inbox]: '/dashboard/inbox',
  [MENU_ITEMS.Today]: '/dashboard/today',
  [MENU_ITEMS.Upcoming]: '/dashboard/upcoming',
  [MENU_ITEMS.Completed]: '/dashboard/completed',
  [MENU_ITEMS.Backlog]: '/dashboard/backlog',
} as const satisfies Record<MENU_ITEMS, string>;

export type NavigationIconName = (typeof MENU_ICONS)[MENU_ITEMS];