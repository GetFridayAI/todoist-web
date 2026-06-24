import React from 'react';
import { DashboardSectionComponentProps } from '../../../interfaces/dashboard.interface';
import PriorityTasksSection from './common/PriorityTasksSection';

const Today: React.FC<DashboardSectionComponentProps> = ({ tasks = [] }) => {
  return <PriorityTasksSection title="Today" tasks={tasks} />;
};

export default Today;
