import { PRIORITY, TASK_STATUS, TASK_TYPE } from '../../../shared/interfaces/tasks.interface';
import { CompletedTasksResponse } from '../../../webos/interfaces/dashboard/completed.interface';

const buildCompletedAt = (hoursAgo: number): string => {
  return new Date(Date.now() - hoursAgo * 60 * 60 * 1000).toISOString();
};

const completedTasksMock: CompletedTasksResponse = [
  {
    taskId: 9201,
    taskName: 'Publish weekly blog post',
    taskDesc: 'Finalize edits and publish the scheduled post.',
    priority: PRIORITY.P1,
    assignee: { userId: 1, userName: 'Amit Rai' },
    reporter: { userId: 2, userName: 'John Doe' },
    dates: {
      created: '2026-06-10',
      updated: '2026-06-14',
      start: '2026-06-12',
      due: '2026-06-14',
    },
    project: {
      projectId: 11,
      projectname: 'Personal Branding / Blogging',
      projectIconColor: '#2d7ef7',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [
      { labelId: 41, labelName: 'streak' },
    ],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.DONE,
    reminders: [{ date: '2026-06-15', time: '09:00' }],
    isCompleted: true,
    completedAt: buildCompletedAt(2),
    completedBy: { userId: 1, userName: 'Amit Rai' },
  },
  {
    taskId: 9202,
    taskName: 'Review newsletter draft',
    taskDesc: 'Proof-read and approve content.',
    priority: PRIORITY.P2,
    assignee: { userId: 3, userName: 'Jane Smith' },
    reporter: { userId: 2, userName: 'John Doe' },
    dates: {
      created: '2026-06-11',
      updated: '2026-06-14',
      start: '2026-06-13',
      due: '2026-06-14',
    },
    project: {
      projectId: 12,
      projectname: 'Growth Ops',
      projectIconColor: '#a970ff',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [
      { labelId: 42, labelName: 'content' },
    ],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.DONE,
    reminders: [],
    isCompleted: true,
    completedAt: buildCompletedAt(8),
    completedBy: { userId: 3, userName: 'Jane Smith' },
  },
  {
    taskId: 9203,
    taskName: 'Prepare speaking outline',
    taskDesc: 'Create key points for workshop session.',
    priority: PRIORITY.P0,
    assignee: { userId: 4, userName: 'Alex Johnson' },
    reporter: { userId: 1, userName: 'Amit Rai' },
    dates: {
      created: '2026-06-09',
      updated: '2026-06-12',
      start: '2026-06-10',
      due: '2026-06-12',
    },
    project: {
      projectId: 13,
      projectname: 'Public Speaking',
      projectIconColor: '#ff9913',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [
      { labelId: 43, labelName: 'prep' },
      { labelId: 44, labelName: 'slides' },
    ],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.DONE,
    reminders: [{ date: '2026-06-13', time: '10:00' }],
    isCompleted: true,
    completedAt: buildCompletedAt(56),
    completedBy: { userId: 4, userName: 'Alex Johnson' },
  },
];

export default completedTasksMock;
