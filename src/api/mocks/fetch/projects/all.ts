import { TaskProject } from '../../../../shared/interfaces/tasks.interface';

const mockProjects: TaskProject[] = [
  {
    projectId: 1,
    projectname: 'Work',
    projectIconColor: '#a970ff',
    createdAt: '2026/01/01',
    parentProjectId: null,
    isFavorite: true,
    openTasksCount: 5,
    hasSubProjects: true,
  },
  {
    projectId: 2,
    projectname: 'Personal',
    projectIconColor: '#ff9913',
    createdAt: '2026/01/02',
    parentProjectId: 1,
    isFavorite: false,
    openTasksCount: 3,
    hasSubProjects: true,
  },
  {
    projectId: 6,
    projectname: 'Personal',
    projectIconColor: '#ff9913',
    createdAt: '2026/01/02',
    parentProjectId: 2,
    isFavorite: false,
    openTasksCount: 3,
    hasSubProjects: false,
  },
  {
    projectId: 3,
    projectname: 'Side Projects',
    projectIconColor: '#7ec8ad',
    createdAt: '2026/01/03',
    parentProjectId: null,
    isFavorite: false,
    openTasksCount: null,
    hasSubProjects: true,
  },
  {
    projectId: 4,
    projectname: 'Todoist',
    projectIconColor: '#e26a60',
    createdAt: '2026/01/04',
    parentProjectId: 3,
    isFavorite: true,
    openTasksCount: 2,
    hasSubProjects: false,
  },
];

export default mockProjects;
