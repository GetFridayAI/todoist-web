import { TaskProject } from '../../src/shared/interfaces/tasks.interface';

/** Root-level project with sub-projects */
export const mockProjectWork: TaskProject = {
  projectId: 1,
  projectname: 'Work',
  projectIconColor: '#a970ff',
  createdAt: '2026/01/01',
  parentProjectId: null,
  isFavorite: true,
  openTasksCount: 5,
  hasSubProjects: true,
};

/** Root-level leaf project (no children) */
export const mockProjectPersonal: TaskProject = {
  projectId: 2,
  projectname: 'Personal',
  projectIconColor: '#ff9913',
  createdAt: '2026/01/02',
  parentProjectId: null,
  isFavorite: false,
  openTasksCount: 3,
  hasSubProjects: false,
};

/** Child project nested under Work */
export const mockProjectTodoist: TaskProject = {
  projectId: 3,
  projectname: 'Todoist',
  projectIconColor: '#e26a60',
  createdAt: '2026/01/03',
  parentProjectId: 1,
  isFavorite: false,
  openTasksCount: 2,
  hasSubProjects: false,
};

export const mockProjects: TaskProject[] = [
  mockProjectWork,
  mockProjectPersonal,
  mockProjectTodoist,
];
