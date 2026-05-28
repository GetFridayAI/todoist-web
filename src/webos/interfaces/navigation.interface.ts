export enum MENU_ITEMS {
  Search = 'Search',
  Inbox = 'Inbox',
  Today = 'Today',
  Upcoming = 'Upcoming',
  Completed = 'Completed',
}

export const MENU_ICONS = {
  [MENU_ITEMS.Search]: 'search',
  [MENU_ITEMS.Inbox]: 'inbox',
  [MENU_ITEMS.Today]: 'today',
  [MENU_ITEMS.Upcoming]: 'upcoming',
  [MENU_ITEMS.Completed]: 'completed',
} as const satisfies Record<MENU_ITEMS, string>;

export type NavigationIconName = (typeof MENU_ICONS)[MENU_ITEMS];