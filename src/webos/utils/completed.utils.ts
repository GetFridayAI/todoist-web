import { Task } from '../../shared/interfaces/tasks.interface';
import { parseDateString } from '../utils';
import { CompletedDaySection } from '../interfaces/dashboard/completed.interface';

export const formatCompletedSectionLabel = (date: Date, locale: string): string => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const targetStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDelta = Math.round((todayStart.getTime() - targetStart.getTime()) / (24 * 60 * 60 * 1000));

  if (dayDelta === 0) {
    return 'Today';
  }

  if (dayDelta === 1) {
    return 'Yesterday';
  }

  return date.toLocaleDateString(locale, { day: '2-digit', month: 'short', year: 'numeric' });
};

export const formatCompletedTimestamp = (completedAt: string, locale: string): string => {
  const completedDate = parseDateString(completedAt);
  if (!completedDate) {
    return completedAt;
  }

  const diffInMs = Date.now() - completedDate.getTime();
  if (diffInMs >= 0 && diffInMs < 24 * 60 * 60 * 1000) {
    const diffInHours = Math.floor(diffInMs / (60 * 60 * 1000));
    if (diffInHours <= 0) {
      const diffInMinutes = Math.max(1, Math.floor(diffInMs / (60 * 1000)));
      return `${diffInMinutes} min ago`;
    }

    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  return completedDate.toLocaleDateString(locale, { day: '2-digit', month: 'short' });
};

export const groupCompletedTasksByDay = (tasks: Task[], locale: string): CompletedDaySection[] => {
  const sectionsMap = new Map<string, CompletedDaySection>();

  [...tasks]
    .filter((task) => task.isCompleted && task.completedAt)
    .sort((left, right) => {
      const leftTime = parseDateString(left.completedAt ?? '')?.getTime() ?? 0;
      const rightTime = parseDateString(right.completedAt ?? '')?.getTime() ?? 0;
      return rightTime - leftTime;
    })
    .forEach((task) => {
      const completedDate = parseDateString(task.completedAt ?? '');
      if (!completedDate) {
        return;
      }

      const sectionKey = completedDate.toISOString().slice(0, 10);
      const existingSection = sectionsMap.get(sectionKey);

      if (existingSection) {
        existingSection.tasks.push(task);
        return;
      }

      sectionsMap.set(sectionKey, {
        dayKey: sectionKey,
        dayLabel: formatCompletedSectionLabel(completedDate, locale),
        tasks: [task],
      });
    });

  return Array.from(sectionsMap.values()).filter((section) => section.tasks.length > 0);
};
