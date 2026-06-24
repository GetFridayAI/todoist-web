import { TaskProject } from '../../../../shared/interfaces/tasks.interface';
import { TaskView } from '../viewtask.interface';

export interface AddTaskProjectSectionHandle {
  getProject: () => TaskProject | null;
  reset: () => void;
  closePanel: () => void;
}

export interface AddTaskProjectSectionProps {
  projects: TaskProject[];
  defaultProject?: TaskProject | null;
  viewType?: TaskView;
  onPanelOpen?: () => void;
  onPanelClose?: () => void;
}

export interface ProjectOption {
  project: TaskProject;
  depth: number;
  path: string;
}
