import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { TaskProject } from '../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { AddTaskProjectSectionHandle, AddTaskProjectSectionProps, ProjectOption } from '../../../interfaces/tasks/add/add-task-project.interface';
import styles from '../../../styles/tasks/add/add-task-project.styles';
import { FONT_SIZES } from '../../../../shared/styles/spacing.styles';
import { TaskView } from '../../../interfaces/tasks/viewtask.interface';
import { useTheme } from '../../../../shared/context/ThemeContext';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

const AddTaskProjectSection = React.forwardRef<AddTaskProjectSectionHandle, AddTaskProjectSectionProps>(({ projects, defaultProject = null, viewType = TaskView.CREATE, onPanelOpen, onPanelClose }, ref) => {
  const [projectDropdownOpen, setProjectDropdownOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<TaskProject | null>(defaultProject);
  const [dropdownPlacement, setDropdownPlacement] = React.useState<'above' | 'below'>('below');
  const editFieldAnchorRef = React.useRef<View>(null);
  const [isProjectHovered, setIsProjectHovered] = React.useState<boolean>(false);

  React.useEffect(() => {
    setSelectedProject(defaultProject);
  }, [defaultProject]);

  const projectDropdownOptions = React.useMemo(() => {
    const childrenByParentId = new Map<number | null, TaskProject[]>();

    projects.forEach((project) => {
      const siblings = childrenByParentId.get(project.parentProjectId) ?? [];
      siblings.push(project);
      childrenByParentId.set(project.parentProjectId, siblings);
    });

    const flattened: ProjectOption[] = [];
    const visited = new Set<number>();

    const walk = (parentId: number | null, depth: number, pathParts: string[]) => {
      const children = childrenByParentId.get(parentId) ?? [];

      children.forEach((project) => {
        if (visited.has(project.projectId)) {
          return;
        }

        visited.add(project.projectId);
        const nextPathParts = [...pathParts, project.projectname];
        flattened.push({ project, depth, path: nextPathParts.join('/') });
        walk(project.projectId, depth + 1, nextPathParts);
      });
    };

    walk(null, 0, []);

    projects.forEach((project) => {
      if (visited.has(project.projectId)) {
        return;
      }

      visited.add(project.projectId);
      flattened.push({ project, depth: 0, path: project.projectname });
      walk(project.projectId, 1, [project.projectname]);
    });

    return flattened;
  }, [projects]);

  const selectedProjectName = React.useMemo(() => {
    const selectedProjectId = selectedProject?.projectId;

    if (!selectedProjectId) {
      return 'Todoist';
    }

    const selectedOption = projectDropdownOptions.find(({ project }) => project.projectId === selectedProjectId);
    return selectedOption?.path ?? selectedProject?.projectname ?? 'Todoist';
  }, [projectDropdownOptions, selectedProject]);

  React.useImperativeHandle(ref, () => ({
    getProject: () => selectedProject,
    reset: () => {
      setSelectedProject(defaultProject);
      setProjectDropdownOpen(false);
    },
    closePanel: () => {
      setProjectDropdownOpen(false);
      onPanelClose?.();
    },
  }), [defaultProject, selectedProject, onPanelClose]);

  const isEditView = viewType === TaskView.EDIT;

  const toggleEditDropdown = () => {
    if (projectDropdownOpen) {
      setProjectDropdownOpen(false);
      onPanelClose?.();
      return;
    }

    editFieldAnchorRef.current?.measureInWindow((_x, y, _width, height) => {
      const estimatedPanelHeight = 260;
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 900;
      const spaceBelow = viewportHeight - (y + height);
      const spaceAbove = y;
      const shouldOpenAbove = spaceBelow < estimatedPanelHeight && spaceAbove > estimatedPanelHeight;

      setDropdownPlacement(shouldOpenAbove ? 'above' : 'below');
      setProjectDropdownOpen(true);
      onPanelOpen?.();
    });
  };

  if (isEditView) {
    return (
      <View ref={editFieldAnchorRef} style={[styles.projectSelectorAnchor, { zIndex: projectDropdownOpen ? 120 : 1 }]}> 
        <Pressable style={styles.projectEditRow} onHoverIn={()=>{setIsProjectHovered(true)}} onHoverOut={()=>{setIsProjectHovered(false)}} onPress={toggleEditDropdown}>
          <View style={styles.projectEditHeaderRow}>
            <Text style={styles.projectEditLabel}>Project</Text>
          </View>
          <View style={[styles.projectEditValueRow, (isProjectHovered || projectDropdownOpen) && styles.projectEditRowHovered]}>
            <Text style={[styles.projectEditHash, { color: selectedProject?.projectIconColor ?? COLORS.OFF_WHITE }]}>#</Text>
            <Text style={styles.projectEditValueText}>{selectedProjectName}</Text>
            {
              (isProjectHovered || projectDropdownOpen) && <MaterialIcons name="keyboard-arrow-down" size={FONT_SIZES.LARGE} color={COLORS.OFF_WHITE} style={styles.projectEditIcon} />
            }
          </View>
        </Pressable>

        {projectDropdownOpen && (
          <View
            style={[
              styles.projectDropdown,
              styles.projectDropdownEdit,
              dropdownPlacement === 'above'
                ? { top: 'auto', bottom: '100%', marginTop: 0, marginBottom: 4 }
                : null,
            ]}
          > 
            {projectDropdownOptions.map(({ project, depth }) => {
              const isSelected = selectedProject?.projectId === project.projectId;
              const indentation = 12 + depth * 14;

              return (
                <Pressable
                  key={project.projectId}
                  style={[
                    styles.projectDropdownItem,
                    isSelected && styles.projectDropdownItemSelected,
                    { paddingLeft: indentation },
                  ]}
                  onPress={() => {
                    setSelectedProject(project);
                    setProjectDropdownOpen(false);
                    onPanelClose?.();
                  }}
                >
                    <Text style={{ color: project.projectIconColor }}>#</Text>
                    <Text style={styles.projectDropdownItemText}>{project.projectname}</Text>
                    {isSelected && <Ionicons name="checkmark" size={FONT_SIZES.SMALL} color={COLORS.WHITE} />}
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.bottomLeftRow}>
      <Text style={[styles.breadcrumbHash, , { color: selectedProject?.projectIconColor ?? COLORS.OFF_WHITE }]}>#</Text>
      <View style={styles.projectSelectorAnchor}>
        <Pressable style={styles.projectSelector} onPress={() => {
          const nextOpen = !projectDropdownOpen;
          setProjectDropdownOpen(nextOpen);
          if (nextOpen) {
            onPanelOpen?.();
          } else {
            onPanelClose?.();
          }
        }}>
          <Text style={styles.projectSelectorText}>{selectedProjectName}</Text>
          <Ionicons name="chevron-down-outline" size={12} color={COLORS.OFF_WHITE} />
        </Pressable>

        {projectDropdownOpen && (
          <View style={styles.projectDropdown}>
            {projectDropdownOptions.map(({ project, depth }) => {
              const isSelected = selectedProject?.projectId === project.projectId;
              const indentation = 12 + depth * 14;

              return (
                <Pressable
                  key={project.projectId}
                  style={[
                    styles.projectDropdownItem,
                    isSelected && styles.projectDropdownItemSelected,
                    { paddingLeft: indentation },
                  ]}
                  onPress={() => {
                    setSelectedProject(project);
                    setProjectDropdownOpen(false);
                    onPanelClose?.();
                  }}
                >
                    <Text style={{color: project.projectIconColor}}>#</Text>
                    <Text style={styles.projectDropdownItemText}>{project.projectname}</Text>
                    {isSelected && <Ionicons name="checkmark" size={FONT_SIZES.SMALL} color={COLORS.WHITE} />}
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
});

AddTaskProjectSection.displayName = 'AddTaskProjectSection';

export default AddTaskProjectSection;
