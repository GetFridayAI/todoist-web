import fetchTasksAllMock from './fetch/tasks/all';
import fetchProjectsAllMock from './fetch/projects/all';
import healthMock from './health';
import retrieveAllCollaboratorsMock from './retrieveAllCollaborators';
import retrieveAllLabelsMock from './retrieveAllLabels';
import createLabelMock from './createLabel';

export const mockResponses: Record<string, unknown> = {
  health: healthMock,
  'fetch/tasks/all': fetchTasksAllMock,
  'fetch/projects/all': fetchProjectsAllMock,
  retrieveAllCollaborators: retrieveAllCollaboratorsMock,
  retrieveAllLabels: retrieveAllLabelsMock,
  'create/label': createLabelMock,
};
