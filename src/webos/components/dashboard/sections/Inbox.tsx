import React from 'react';
import { DashboardSectionComponentProps } from '../../../interfaces/dashboard.interface';
import PriorityTasksSection from './common/PriorityTasksSection';

const Inbox: React.FC<DashboardSectionComponentProps> = ({ tasks = [] }) => {
  const inboxTasks = tasks.filter((task) => task.project?.projectId === 0);

  return <PriorityTasksSection title="Inbox" tasks={inboxTasks} showProjectMeta={false} />;
};

export default Inbox;
