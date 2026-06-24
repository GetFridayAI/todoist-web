import fetchTasksAllMock from './tasks/fetch/all';
import fetchProjectsAllMock from './fetch/projects/all';
import healthMock from './health';
import retrieveAllCollaboratorsMock from './fetch/collaborators/all';
import retrieveAllLabelsMock from './fetch/labels/all';
import createLabelMock from './createLabel';
import completedTasksMock from './tasks/completed';
import somedayTasksMock from './tasks/someday';

export const mockResponses: Record<string, unknown> = {
  health: healthMock,
  'tasks/all': fetchTasksAllMock,
  'tasks/fetch/all': fetchTasksAllMock,
  'fetch/projects/all': fetchProjectsAllMock,
  'fetch/collaborators/all': retrieveAllCollaboratorsMock,
  'fetch/labels/all': retrieveAllLabelsMock,
  'create/label': createLabelMock,
  'tasks/completed': completedTasksMock,
  'tasks/someday': somedayTasksMock,
};
