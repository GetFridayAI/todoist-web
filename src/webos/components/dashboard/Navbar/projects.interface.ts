import { TaskProject } from '../../../../shared/interfaces/tasks.interface';
import { ProjectMenuOption } from './projectmenu.interface';

export interface ProjectsProps {
  projects: TaskProject[];
  isLoading?: boolean;
}

export const PROJECT_MENU_OPTIONS: ProjectMenuOption[] = [
  { key: 'favorite', label: 'Add to Favorites', icon: 'star-outline' },
  { key: 'edit', label: 'Edit', icon: 'create-outline' },
  { key: 'archive', label: 'Archive', icon: 'archive-outline' },
  { key: 'move', label: 'Move', icon: 'move-outline' },
  { key: 'share', label: 'Share', icon: 'share-social-outline' },
  { key: 'delete', label: 'Delete', icon: 'trash-outline', isDestructive: true },
];

export const ROOT_PARENT_ID = null;
