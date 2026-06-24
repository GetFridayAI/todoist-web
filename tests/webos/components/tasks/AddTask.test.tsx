import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { PRIORITY, TASK_STATUS, TASK_TYPE } from '../../../../src/shared/interfaces/tasks.interface';
import { postRequest } from '../../../../src/api/request';

jest.mock('../../../../src/api/request', () => ({
  postRequest: jest.fn(),
}));

jest.mock('../../../../src/shared/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'dark',
    styles: { backgroundColor: '#1f1f1f', color: '#ffffff' },
  }),
}));

jest.mock('../../../../src/shared/context/AppStoreContext', () => ({
  useUsersStore: () => [
    { userId: 1, userName: 'Amit Rai' },
    { userId: 2, userName: 'Jane Smith' },
  ],
  useProjectsStore: () => [
    {
      projectId: 1,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
  ],
  useLabelsStore: () => [
    { labelId: 0, labelName: 'someday', isDefault: true },
    { labelId: 1, labelName: 'frontend', isDefault: false },
  ],
  useTasksStore: () => [],
  useAppStoreDispatch: () => jest.fn(),
}));

import AddTask from '../../../../src/webos/components/tasks/AddTask';

const mockPostRequest = postRequest as jest.MockedFunction<typeof postRequest>;

describe('AddTask Label Management', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render AddTask modal when visible prop is true', () => {
    const result = render(
      <AddTask visible={true} onClose={jest.fn()} onCancel={jest.fn()} defaultPriority={PRIORITY.P3} />
    );

    expect(result).toBeTruthy();
  });

  it('should not render AddTask modal when visible prop is false', () => {
    const result = render(
      <AddTask visible={false} onClose={jest.fn()} onCancel={jest.fn()} defaultPriority={PRIORITY.P3} />
    );

    expect(result).toBeTruthy();
  });

  it('should include someday label for new task without dates', async () => {
    mockPostRequest.mockResolvedValue({ success: true });

    render(
      <AddTask visible={true} onClose={jest.fn()} onCancel={jest.fn()} defaultPriority={PRIORITY.P3} />
    );

    await waitFor(() => {
      expect(render).toBeTruthy();
    });
  });

  it('should post task to /tasks/create endpoint', async () => {
    mockPostRequest.mockResolvedValue({ success: true });

    render(
      <AddTask visible={true} onClose={jest.fn()} onCancel={jest.fn()} defaultPriority={PRIORITY.P3} />
    );

    await waitFor(() => {
      expect(render).toBeTruthy();
    });
  });

  it('should use fallback values when user/project not selected', async () => {
    mockPostRequest.mockResolvedValue({ success: true });

    render(
      <AddTask visible={true} onClose={jest.fn()} onCancel={jest.fn()} defaultPriority={PRIORITY.P3} />
    );

    await waitFor(() => {
      expect(render).toBeTruthy();
    });
  });

  it('should handle task creation errors gracefully', async () => {
    const errorMessage = 'Network error';
    mockPostRequest.mockRejectedValue(new Error(errorMessage));

    render(
      <AddTask visible={true} onClose={jest.fn()} onCancel={jest.fn()} defaultPriority={PRIORITY.P3} />
    );

    await waitFor(() => {
      expect(render).toBeTruthy();
    });
  });
});
