import fetchTasksAllMock from './fetch/tasks/all';
import fetchProjectsAllMock from './fetch/projects/all';
import healthMock from './health';
import retrieveAllCollaboratorsMock from './fetch/collaborators/all';
import retrieveAllLabelsMock from './fetch/labels/all';
import createLabelMock from './createLabel';

export const mockResponses: Record<string, unknown> = {
  health: healthMock,
  'fetch/tasks/all': fetchTasksAllMock,
  'fetch/projects/all': fetchProjectsAllMock,
  'fetch/collaborators/all': retrieveAllCollaboratorsMock,
  'fetch/labels/all': retrieveAllLabelsMock,
  'create/label': createLabelMock,
};
