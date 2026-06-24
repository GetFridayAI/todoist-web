import { Task, TaskLabel } from '../../shared/interfaces/tasks.interface';
import { BacklogProjectSection } from '../interfaces/dashboard/backlog.interface';

/**
 * Filters tasks that have the 'someday' label (labelId: 0)
 */
export const filterTasksWithSomedayLabel = (tasks: Task[]): Task[] => {
  return tasks.filter((task) =>
    task.labels.some((label) => label.labelId === 0)
  );
};

/**
 * Finds the 'someday' label (labelId: 0) in the provided labels array
 */
export const getSomedayLabel = (labels: TaskLabel[]): TaskLabel | undefined => {
  return labels.find((label) => label.labelId === 0);
};

/**
 * Builds a project hierarchy string for display
 * For root projects: returns project name
 * For sub-projects: returns "Parent > Child" format
 * Note: Currently uses just the project name; parent info would need to be fetched separately
 */
export const buildProjectHierarchy = (project: { projectname: string; parentProjectId: number | null }): string => {
  // If there's a parent project ID, we would format it as "Parent > Child"
  // For now, with mock data, we just return the project name
  // In a real implementation, you might fetch parent project data or have it in context
  return project.projectname;
};

/**
 * Groups backlog tasks by their root project ID
 * Returns sorted array of project sections
 */
export const groupBacklogTasksByProject = (tasks: Task[]): BacklogProjectSection[] => {
  const projectsMap = new Map<number, BacklogProjectSection>();

  // Group tasks by root project ID
  tasks.forEach((task) => {
    const rootProjectId = task.project.parentProjectId ?? task.project.projectId;
    const existingSection = projectsMap.get(rootProjectId);

    if (existingSection) {
      existingSection.tasks.push(task);
    } else {
      projectsMap.set(rootProjectId, {
        rootProjectId,
        projectHierarchy: buildProjectHierarchy(task.project),
        project: task.project,
        tasks: [task],
      });
    }
  });

  // Convert to array and sort by project name
  return Array.from(projectsMap.values()).sort((a, b) =>
    a.projectHierarchy.localeCompare(b.projectHierarchy)
  );
};
