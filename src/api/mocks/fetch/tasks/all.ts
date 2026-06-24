import { PRIORITY, TASK_STATUS, TASK_TYPE, TasksResponse } from '../../../../shared/interfaces/tasks.interface';

const mockTasks: TasksResponse = [
  {
    taskId: 1223,
    taskName: 'Some Name',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P0,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1224,
    taskName: 'Some Name 1',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P0,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/08/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1225,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P1,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1226,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P2,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1227,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P2,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1228,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P1,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1229,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1230,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1231,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1232,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1233,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1234,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1235,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1236,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  },
  {
    taskId: 1237,
    taskName: 'Some Name 2',
    taskDesc: 'hkvbs',
    priority: PRIORITY.P3,
    assignee: {
      userId: 2321,
      userName: 'Name',
    },
    reporter: {
      userId: 2311,
      userName: 'Name',
    },
    dates: {
      created: '2026/04/03',
      updated: '2026/04/03',
      start: '2026/04/03',
      due: '2026/04/03',
    },
    project: {
      projectId: 3423,
      projectname: 'Test Project',
      parentProjectId: null,
      openTasksCount: null,
      hasSubProjects: false,
    },
    labels: [],
    comments: [],
    taskType: TASK_TYPE.TASK,
    status: TASK_STATUS.TODO,
    reminders: [
      {
        date: '2026/09/09',
        time: '',
      },
    ],
  }
];

export default mockTasks;
