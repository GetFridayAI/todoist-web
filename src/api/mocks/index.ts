import fetchTasksAllMock from './fetch/tasks/all';
import fetchProjectsAllMock from './fetch/projects/all';
import healthMock from './health';

export const mockResponses: Record<string, unknown> = {
  health: healthMock,
  'fetch/tasks/all': fetchTasksAllMock,
  'fetch/projects/all': fetchProjectsAllMock,
};
