import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropdownInput from '../../../shared/components/DropdownInput';
import DatePicker from '../../../shared/components/DatePicker';
import SearchDropdownInput from '../../../shared/components/SearchDropdownInput';
import {
  PRIORITY,
  TASK_TYPE,
  TaskReminder,
} from '../../../shared/interfaces/tasks.interface';
import { TaskLabel } from '../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../shared/styles/colors.styles';
import {
  ActivePanel,
  AddTaskPayload,
  AddTaskProps,
  PRIORITY_OPTIONS,
  ReminderMode,
  TASK_TYPE_OPTIONS,
} from '../../interfaces/tasks/addtask.interface';
import styles from '../../styles/tasks/addtask.styles';
import {
  buildInitialState,
  formatDateToDayMonth,
  formatReminderSummary,
  toIsoDate,
} from '../../utils';
import { postRequest } from '../../../api/request';

const MIN_DESCRIPTION_INPUT_HEIGHT = 24;
const MAX_DESCRIPTION_INPUT_HEIGHT = 200;

const AddTask: React.FC<AddTaskProps> = ({
  visible,
  collaborators,
  projects,
  labels,
  onClose,
  onCancel,
  onAdd,
}) => {
  const [formState, setFormState] = React.useState<AddTaskPayload>(buildInitialState);
  const [activePanel, setActivePanel] = React.useState<ActivePanel>(null);
  const [projectDropdownOpen, setProjectDropdownOpen] = React.useState(false);
  const [isReminderWindowOpen, setIsReminderWindowOpen] = React.useState(false);
  const [reminderMode, setReminderMode] = React.useState<ReminderMode>('dateTime');
  const [reminderDraft, setReminderDraft] = React.useState<TaskReminder>({
    date: toIsoDate(new Date()),
    time: '21:00',
  });

  const scaleAnimation = React.useRef(new Animated.Value(0.94)).current;
  const opacityAnimation = React.useRef(new Animated.Value(0)).current;
  const chipsAnchorRef = React.useRef<View>(null);
  const labelsChipRef = React.useRef<View>(null);
  const assigneeChipRef = React.useRef<View>(null);
  const reporterChipRef = React.useRef<View>(null);
  const priorityChipRef = React.useRef<View>(null);
  const taskTypeChipRef = React.useRef<View>(null);
  const dateChipRef = React.useRef<View>(null);
  const deadlineChipRef = React.useRef<View>(null);
  const [searchPanelOffset, setSearchPanelOffset] = React.useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [dropdownPanelOffset, setDropdownPanelOffset] = React.useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [datePanelOffset, setDatePanelOffset] = React.useState<{ left: number; top: number }>({ left: 0, top: 0 });
  const [descriptionInputHeight, setDescriptionInputHeight] = React.useState(MIN_DESCRIPTION_INPUT_HEIGHT);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnimation, {
        toValue: visible ? 1 : 0.94,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnimation, {
        toValue: visible ? 1 : 0,
        duration: 160,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityAnimation, scaleAnimation, visible]);

  const collaboratorOptions = collaborators.map((collaborator) => ({
    label: collaborator.userName,
    value: collaborator.userId,
  }));

  // localLabels may grow when a new label is created via the "Create X" link.
  const [localLabels, setLocalLabels] = React.useState(labels);

  React.useEffect(() => {
    setLocalLabels(labels);
  }, [labels]);

  const labelOptions = localLabels.map((label) => ({
    label: label.labelName,
    value: label.labelName,
  }));

  const projectDropdownOptions = React.useMemo(() => {
    const childrenByParentId = new Map<number | null, typeof projects>();

    projects.forEach((project) => {
      const siblings = childrenByParentId.get(project.parentProjectId) ?? [];
      siblings.push(project);
      childrenByParentId.set(project.parentProjectId, siblings);
    });

    const flattened: Array<{ project: (typeof projects)[number]; depth: number; path: string }> = [];
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

    // Include orphaned/cyclic entries that are not reachable from root.
    projects.forEach((project) => {
      if (visited.has(project.projectId)) {
        return;
      }

      visited.add(project.projectId);
      const path = project.projectname;
      flattened.push({ project, depth: 0, path });
      walk(project.projectId, 1, [project.projectname]);
    });

    return flattened;
  }, [projects]);

  const selectedProjectName = React.useMemo(() => {
    const selectedProjectId = formState.project?.projectId;

    if (!selectedProjectId) {
      return 'Todoist';
    }

    const selectedProjectOption = projectDropdownOptions.find(
      ({ project }) => project.projectId === selectedProjectId,
    );

    return selectedProjectOption?.path ?? formState.project?.projectname ?? 'Todoist';
  }, [formState.project, projectDropdownOptions]);

  const selectedLabelsText: string | null = formState.labels.length > 0
    ? formState.labels[0] : null;

  const selectedPriorityText: string | null = formState.priority !== null
    ? (PRIORITY_OPTIONS.find((o) => o.value === formState.priority)?.shortfallName ?? null)
    : null;

  const selectedDateText: string | null = formState.dates.start
    ? formatDateToDayMonth(formState.dates.start)
    : null;

  const selectedDueDateText: string | null = formState.dates.due
    ? formatDateToDayMonth(formState.dates.due)
    : null;

  const resolveDateColor = (isoDate: string): string => {
    const today = toIsoDate(new Date());
    if (isoDate < today) return COLORS.RED_BLOOD;
    if (isoDate === today) return COLORS.GREEN;
    return COLORS.OFF_WHITE;
  };

  const startDateColor = formState.dates.start ? resolveDateColor(formState.dates.start) : COLORS.OFF_WHITE;
  const dueDateColor = formState.dates.due ? resolveDateColor(formState.dates.due) : COLORS.OFF_WHITE;

  const selectedAssigneeText: string | null = formState.assignee
    ? formState.assignee.userName
    : null;

  const selectedReporterText: string | null = formState.reporter
    ? formState.reporter.userName
    : null;

  const selectedTaskTypeText: string | null = formState.taskType !== null
    ? (TASK_TYPE_OPTIONS.find((o) => o.value === formState.taskType)?.label ?? null)
    : null;

  const resetLocalState = () => {
    setFormState(buildInitialState());
    setActivePanel(null);
    setProjectDropdownOpen(false);
    setIsReminderWindowOpen(false);
    setReminderMode('dateTime');
    setReminderDraft({ date: toIsoDate(new Date()), time: '21:00' });
    setDescriptionInputHeight(MIN_DESCRIPTION_INPUT_HEIGHT);
  };

  const handleCancel = () => {
    resetLocalState();
    onCancel();
  };

  const handleClose = () => {
    handleCancel();
    onClose();
  };

  const handleAdd = () => {
    onAdd(formState);
    resetLocalState();
    onClose();
  };

  const updateDateField = (dateValue: string) => {
    if (activePanel === 'startDate') {
      setFormState((prev) => ({ ...prev, dates: { ...prev.dates, start: dateValue } }));
    }

    if (activePanel === 'dueDate') {
      setFormState((prev) => ({ ...prev, dates: { ...prev.dates, due: dateValue } }));
    }
  };

  const openDropdownPanel = (panel: 'priority' | 'taskType', chipRef: React.RefObject<View | null>) => {
    chipRef.current?.measureLayout(
      chipsAnchorRef.current as never,
      (left, top, _width, height) => {
        setDropdownPanelOffset({ left, top: top + height + 10 });
        setActivePanel(panel);
      },
      () => {
        setActivePanel(panel);
      },
    );
  };

  const openSearchPanel = (panel: 'labels' | 'assignee' | 'reporter', chipRef: React.RefObject<View | null>) => {
    chipRef.current?.measureLayout(
      chipsAnchorRef.current as never,
      (left, top, _width, height) => {
        setSearchPanelOffset({ left, top: top + height + 10 });
        setActivePanel(panel);
      },
      () => {
        setActivePanel(panel);
      },
    );
  };

  const openDatePanel = (panel: 'startDate' | 'dueDate', chipRef: React.RefObject<View | null>) => {
    chipRef.current?.measureLayout(
      chipsAnchorRef.current as never,
      (left, top, _width, height) => {
        setDatePanelOffset({ left, top: top + height + 10 });
        setActivePanel(panel);
      },
      () => {
        setActivePanel(panel);
      },
    );
  };

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={handleClose}>
      <View style={styles.modalOverlay}>
        <Pressable style={styles.modalBackdrop} onPress={handleClose} />
        <Animated.View
          style={[
            styles.modalCard,
            {
              opacity: opacityAnimation,
              transform: [{ scale: scaleAnimation }],
            },
          ]}
        >
          <TextInput
            style={styles.titleInput}
            value={formState.taskName}
            onChangeText={(taskName) => setFormState((prev) => ({ ...prev, taskName }))}
            placeholder="Task name"
            placeholderTextColor={COLORS.OFF_WHITE}
          />

          <TextInput
            multiline
            style={[styles.descriptionInput, { height: descriptionInputHeight }]}
            value={formState.taskDesc}
            onChangeText={(taskDesc) => {
              setFormState((prev) => ({ ...prev, taskDesc }));
              if (!taskDesc) {
                setDescriptionInputHeight(MIN_DESCRIPTION_INPUT_HEIGHT);
              }
            }}
            onContentSizeChange={(event) => {
              const nextHeight = Math.max(
                MIN_DESCRIPTION_INPUT_HEIGHT,
                Math.min(event.nativeEvent.contentSize.height, MAX_DESCRIPTION_INPUT_HEIGHT),
              );
              setDescriptionInputHeight(nextHeight);
            }}
            placeholder="Description"
            placeholderTextColor={COLORS.OFF_WHITE}
            scrollEnabled={descriptionInputHeight >= MAX_DESCRIPTION_INPUT_HEIGHT}
            textAlignVertical="top"
          />

          <View ref={chipsAnchorRef} style={styles.chipsAnchor}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
              <Pressable
                ref={labelsChipRef}
                style={styles.chip}
                onPress={() => {
                  if (activePanel === 'labels') { setActivePanel(null); return; }
                  openSearchPanel('labels', labelsChipRef);
                }}
              >
                <Ionicons name="pricetag-outline" size={14} color={COLORS.OFF_WHITE} />
                <Text style={[styles.chipText, !selectedLabelsText && styles.chipTextPlaceholder]}>
                  {selectedLabelsText ?? 'Labels'}
                </Text>
                {selectedLabelsText && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      setFormState((prev) => ({ ...prev, labels: [] }));
                      setActivePanel(null);
                    }}
                  >
                    <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
                  </Pressable>
                )}
              </Pressable>

              <Pressable
                ref={priorityChipRef}
                style={styles.chip}
                onPress={() => {
                  if (activePanel === 'priority') { setActivePanel(null); return; }
                  openDropdownPanel('priority', priorityChipRef);
                }}
              >
                <Ionicons name="flag-outline" size={14} color={selectedPriorityText ? ((PRIORITY_OPTIONS.find((o) => o.value === formState.priority)?.iconColor)) : COLORS.OFF_WHITE} />
                <Text style={[styles.chipText, !selectedPriorityText && styles.chipTextPlaceholder]}>
                  {selectedPriorityText ?? 'Priority'}
                </Text>
                {selectedPriorityText && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      setFormState((prev) => ({ ...prev, priority: null }));
                      setActivePanel(null);
                    }}
                  >
                    <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
                  </Pressable>
                )}
              </Pressable>

              <Pressable
                ref={dateChipRef}
                style={styles.chip}
                onPress={() => {
                  if (activePanel === 'startDate') { setActivePanel(null); return; }
                  openDatePanel('startDate', dateChipRef);
                }}
              >
                <Ionicons name="calendar-outline" size={14} color={selectedDateText ? startDateColor : COLORS.OFF_WHITE} />
                <Text style={[styles.chipText, !selectedDateText && styles.chipTextPlaceholder, selectedDateText ? { color: startDateColor } : null]}>
                  {selectedDateText ?? 'Date'}
                </Text>
                {selectedDateText && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      setFormState((prev) => ({ ...prev, dates: { ...prev.dates, start: '' } }));
                      setActivePanel(null);
                    }}
                  >
                    <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
                  </Pressable>
                )}
              </Pressable>

              <Pressable
                ref={assigneeChipRef}
                style={styles.chip}
                onPress={() => {
                  if (activePanel === 'assignee') { setActivePanel(null); return; }
                  openSearchPanel('assignee', assigneeChipRef);
                }}
              >
                <Ionicons name="person-outline" size={14} color={COLORS.OFF_WHITE} />
                <Text style={[styles.chipText, !selectedAssigneeText && styles.chipTextPlaceholder]}>
                  {selectedAssigneeText ?? 'Assignee'}
                </Text>
                {selectedAssigneeText && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      setFormState((prev) => ({ ...prev, assignee: null }));
                      setActivePanel(null);
                    }}
                  >
                    <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
                  </Pressable>
                )}
              </Pressable>

              <Pressable
                ref={deadlineChipRef}
                style={styles.chip}
                onPress={() => {
                  if (activePanel === 'dueDate') { setActivePanel(null); return; }
                  openDatePanel('dueDate', deadlineChipRef);
                }}
              >
                <Ionicons name="alarm-outline" size={14} color={selectedDueDateText ? dueDateColor : COLORS.OFF_WHITE} />
                <Text style={[styles.chipText, !selectedDueDateText && styles.chipTextPlaceholder, selectedDueDateText ? { color: dueDateColor } : null]}>
                  {selectedDueDateText ?? 'Deadline'}
                </Text>
                {selectedDueDateText && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      setFormState((prev) => ({ ...prev, dates: { ...prev.dates, due: '' } }));
                      setActivePanel(null);
                    }}
                  >
                    <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
                  </Pressable>
                )}
              </Pressable>

              <Pressable
                ref={taskTypeChipRef}
                style={styles.chip}
                onPress={() => {
                  if (activePanel === 'taskType') { setActivePanel(null); return; }
                  openDropdownPanel('taskType', taskTypeChipRef);
                }}
              >
                <Ionicons name="layers-outline" size={14} color={COLORS.OFF_WHITE} />
                <Text style={[styles.chipText, !selectedTaskTypeText && styles.chipTextPlaceholder]}>
                  {selectedTaskTypeText ?? 'Task type'}
                </Text>
                {selectedTaskTypeText && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      setFormState((prev) => ({ ...prev, taskType: null }));
                      setActivePanel(null);
                    }}
                  >
                    <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
                  </Pressable>
                )}
              </Pressable>

              <Pressable
                ref={reporterChipRef}
                style={styles.chip}
                onPress={() => {
                  if (activePanel === 'reporter') { setActivePanel(null); return; }
                  openSearchPanel('reporter', reporterChipRef);
                }}
              >
                <Ionicons name="people-outline" size={14} color={COLORS.OFF_WHITE} />
                <Text style={[styles.chipText, !selectedReporterText && styles.chipTextPlaceholder]}>
                  {selectedReporterText ?? 'Reporter'}
                </Text>
                {selectedReporterText && (
                  <Pressable
                    onPress={(e) => {
                      e.stopPropagation();
                      setFormState((prev) => ({ ...prev, reporter: null }));
                      setActivePanel(null);
                    }}
                  >
                    <Ionicons name="close-outline" size={14} color={COLORS.OFF_WHITE} />
                  </Pressable>
                )}
              </Pressable>
            </ScrollView>

            {(activePanel === 'priority' || activePanel === 'taskType') && (() => {
              const dropdownPanelConfig = {
                priority: {
                  label: 'Priority',
                  options: PRIORITY_OPTIONS,
                  value: formState.priority as string | number,
                  onChange: (v: string | number) => setFormState((prev) => ({ ...prev, priority: v as PRIORITY })),
                },
                taskType: {
                  label: 'Task type',
                  options: TASK_TYPE_OPTIONS,
                  value: formState.taskType as string | number,
                  onChange: (v: string | number) => setFormState((prev) => ({ ...prev, taskType: v as TASK_TYPE })),
                },
              };
              const config = dropdownPanelConfig[activePanel as 'priority' | 'taskType'];
              return (
                <View style={[styles.panelContainer, { left: dropdownPanelOffset.left, top: dropdownPanelOffset.top, minWidth: 200 }]}>
                  <DropdownInput
                    options={config.options}
                    value={config.value}
                    onChange={config.onChange}
                    onRequestClose={() => setActivePanel(null)}
                  />
                </View>
              );
            })()}

            {(activePanel === 'labels' || activePanel === 'assignee' || activePanel === 'reporter') && (() => {
              const searchPanelConfig = {
                labels: {
                  placeholder: 'Search labels',
                  options: labelOptions,
                  value: formState.labels as string | string[] | null,
                  isMultiSelect: true as const,
                  onConfirm: (selected: string | number | (string | number)[]) => {
                    const nextLabels = Array.isArray(selected) ? selected.map(String) : [String(selected)];
                    setFormState((prev) => ({ ...prev, labels: nextLabels }));
                    setActivePanel(null);
                  },
                  onRequestCreate: async (text: string) => {
                    const created = await postRequest<TaskLabel>('create/label', { labelName: text });
                    setLocalLabels((prev) => [...prev, created]);
                    setFormState((prev) => ({ ...prev, labels: [...prev.labels, created.labelName] }));
                  },
                  iconName: 'pricetag-outline' as const,
                  iconColor: COLORS.OFF_WHITE,
                },
                assignee: {
                  placeholder: 'Search assignee',
                  options: collaboratorOptions,
                  value: formState.assignee?.userId ?? null,
                  isMultiSelect: false as const,
                  onConfirm: (selected: string | number | (string | number)[]) => {
                    const userId = Array.isArray(selected) ? selected[0] : selected;
                    const assignee = collaborators.find((c) => c.userId === userId) ?? null;
                    setFormState((prev) => ({ ...prev, assignee }));
                    setActivePanel(null);
                  },
                  iconName: 'person-outline' as const,
                  iconColor: COLORS.OFF_WHITE,
                },
                reporter: {
                  placeholder: 'Search reporter',
                  options: collaboratorOptions,
                  value: formState.reporter?.userId ?? null,
                  isMultiSelect: false as const,
                  onConfirm: (selected: string | number | (string | number)[]) => {
                    const userId = Array.isArray(selected) ? selected[0] : selected;
                    const reporter = collaborators.find((c) => c.userId === userId) ?? null;
                    setFormState((prev) => ({ ...prev, reporter }));
                    setActivePanel(null);
                  },
                  iconName: 'person-outline' as const,
                  iconColor: COLORS.OFF_WHITE,
                },
              };
              const config = searchPanelConfig[activePanel as 'labels' | 'assignee' | 'reporter'];
              return (
                <View style={[styles.panelContainer, { left: searchPanelOffset.left, top: searchPanelOffset.top, minWidth: 200 }]}>
                  <SearchDropdownInput
                    options={config.options}
                    value={config.value}
                    onConfirm={config.onConfirm}
                    onRequestClose={() => setActivePanel(null)}
                    onRequestCreate={'onRequestCreate' in config ? config.onRequestCreate : undefined}
                    placeholderText={config.placeholder}
                    isMultiSelect={config.isMultiSelect}
                    iconName={config.iconName}
                    iconColor={config.iconColor}
                  />
                </View>
              );
            })()}

            {(activePanel === 'startDate' || activePanel === 'dueDate') && (
              <View style={[styles.panelContainer, { left: datePanelOffset.left, top: datePanelOffset.top, padding: 0, borderWidth: 0 }]}> 
                <DatePicker
                  selectedDate={activePanel === 'startDate' ? formState.dates.start : formState.dates.due}
                  onChange={updateDateField}
                  onRequestClose={() => setActivePanel(null)}
                />
              </View>
            )}
          </View>

          <View style={styles.reminderRow}>
            <Text style={styles.reminderLabel}>Reminders</Text>
            <Pressable onPress={() => setIsReminderWindowOpen(true)}>
              <Ionicons name="add-circle-outline" size={18} color={COLORS.RED_TOMATO} />
            </Pressable>
          </View>

          {formState.reminders.map((reminder, index) => (
            <Text key={`${reminder.date}-${reminder.time}-${index}`} style={styles.reminderSummary}>
              {formatReminderSummary(reminder)}
            </Text>
          ))}

          <View style={styles.bottomRow}>
            <View style={styles.bottomLeftRow}>
              <Text style={styles.breadcrumbHash}>#</Text>
              <View style={styles.projectSelectorAnchor}>
                <Pressable
                  style={styles.projectSelector}
                  onPress={() => setProjectDropdownOpen((prev) => !prev)}>
                  <Text style={styles.projectSelectorText}>{selectedProjectName}</Text>
                  <Ionicons name="chevron-down-outline" size={12} color={COLORS.OFF_WHITE} />
                </Pressable>

                {projectDropdownOpen && (
                  <View style={styles.projectDropdown}>
                    {projectDropdownOptions.map(({ project, depth }) => {
                      const isSelected = formState.project?.projectId === project.projectId;
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
                          setFormState((prev) => ({ ...prev, project }));
                          setProjectDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.projectDropdownItemText}>{project.projectname}</Text>
                        {isSelected && (
                          <Ionicons name="checkmark" size={14} color={COLORS.WHITE} />
                        )}
                      </Pressable>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>

            <View style={styles.bottomActions}>
              <Pressable style={[styles.actionButton, styles.actionButtonMuted]} onPress={handleCancel}>
                <Text style={styles.actionButtonMutedText}>Cancel</Text>
              </Pressable>
              <Pressable disabled={!formState.taskName} style={[styles.actionButton, styles.actionButtonPrimary, !formState.taskName && styles.actionButtonPrimaryDisabled]} onPress={handleAdd}>
                <Text style={[styles.actionButtonPrimaryText,  !formState.taskName && styles.actionButtonPrimaryDisabledText]}>Add task</Text>
              </Pressable>
            </View>
          </View>

        </Animated.View>
      </View>

      <Modal visible={isReminderWindowOpen} transparent animationType="fade" onRequestClose={() => setIsReminderWindowOpen(false)}>
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setIsReminderWindowOpen(false)} />
          <View style={styles.reminderModalCard}>
            <Text style={styles.reminderTitle}>Reminders</Text>

            <View style={styles.reminderTabs}>
              <Pressable
                style={[styles.reminderTab, reminderMode === 'dateTime' && styles.reminderTabActive]}
                onPress={() => setReminderMode('dateTime')}
              >
                <Text style={styles.reminderTabText}>Date & time</Text>
              </Pressable>
              <Pressable
                style={[styles.reminderTab, reminderMode === 'beforeTask' && styles.reminderTabActive]}
                onPress={() => setReminderMode('beforeTask')}
              >
                <Text style={styles.reminderTabText}>Before task</Text>
              </Pressable>
            </View>

            {reminderMode === 'dateTime' && (
              <>
                <View style={styles.reminderTimeRow}>
                  <Ionicons name="alarm-outline" size={14} color={COLORS.OFF_WHITE} />
                  <TextInput
                    style={styles.reminderTimeInput}
                    value={reminderDraft.time}
                    onChangeText={(time) => setReminderDraft((prev) => ({ ...prev, time }))}
                  />
                  <Text style={styles.reminderAvatar}>A</Text>
                </View>

                <Text style={styles.reminderHintText}>
                  Set a notification for a specific time ("9am") or date and time ("Mon 18:00").
                </Text>
              </>
            )}

            {reminderMode === 'beforeTask' && (
              <Text style={styles.reminderHintText}>Before task reminders are coming soon. Use Date & time for now.</Text>
            )}

            <View style={styles.reminderActions}>
              <Pressable
                style={[styles.actionButton, styles.actionButtonMuted]}
                onPress={() => {
                  setReminderDraft({ date: toIsoDate(new Date()), time: '21:00' });
                  setIsReminderWindowOpen(false);
                }}
              >
                <Text style={styles.actionButtonMutedText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.actionButton, styles.actionButtonPrimary]}
                onPress={() => {
                  setFormState((prev) => ({
                    ...prev,
                    reminders: [...prev.reminders, reminderDraft],
                  }));
                  setReminderDraft({ date: toIsoDate(new Date()), time: '21:00' });
                  setIsReminderWindowOpen(false);
                }}
              >
                <Text style={styles.actionButtonPrimaryText}>Add reminder</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default AddTask;
