import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';
import { TaskReminder } from '../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { AddTaskReminderSectionHandle, AddTaskReminderSectionProps, ReminderMode } from '../../../interfaces/tasks/add/add-task-reminder.interface';
import { TaskView } from '../../../interfaces/tasks/viewtask.interface';
import { AddTaskAttributePanel } from '../../../interfaces/tasks/add/attributes/add-task-attributes.interface';
import styles from '../../../styles/tasks/add/add-task-reminder.styles';
import { formatReminderSummary, toIsoDate } from '../../../utils';
import AddTaskAttributeChip from './attributes/AddTaskAttributeChip';

const AddTaskReminderSection = React.forwardRef<AddTaskReminderSectionHandle, AddTaskReminderSectionProps>(({ defaultReminders = [], viewType = TaskView.CREATE }, ref) => {
  const [isReminderWindowOpen, setIsReminderWindowOpen] = React.useState(false);
  const [reminderMode, setReminderMode] = React.useState<ReminderMode>('dateTime');
  const [reminders, setReminders] = React.useState<TaskReminder[]>(defaultReminders);
  const [reminderDraft, setReminderDraft] = React.useState<TaskReminder>({
    date: toIsoDate(new Date()),
    time: '21:00',
  });

  React.useEffect(() => {
    setReminders(defaultReminders);
  }, [defaultReminders]);

  const reset = React.useCallback(() => {
    setIsReminderWindowOpen(false);
    setReminderMode('dateTime');
    setReminders(defaultReminders);
    setReminderDraft({ date: toIsoDate(new Date()), time: '21:00' });
  }, [defaultReminders]);

  React.useImperativeHandle(ref, () => ({
    getReminders: () => reminders,
    reset,
  }), [reminders, reset]);

  const isEditView = viewType === TaskView.EDIT;
  const reminderSummary = reminders.length > 0 ? formatReminderSummary(reminders[0]) : 'Add reminder';

  return (
    <>
      {isEditView ? (
        <AddTaskAttributeChip
          panel={AddTaskAttributePanel.DueDate}
          label="Reminders"
          iconName="notifications-outline"
          iconColor={COLORS.OFF_WHITE}
          text={reminderSummary}
          isPlaceholder={reminders.length === 0}
          viewType={viewType}
          showAddCtaWhenEmpty={true}
          hideValueWhenPlaceholder={true}
          onPress={() => setIsReminderWindowOpen(true)}
          onClear={reminders.length > 0 ? () => setReminders([]) : undefined}
        />
      ) : (
        <View style={styles.reminderRow}>
          <Text style={styles.reminderLabel}>Reminders</Text>
          <Pressable onPress={() => setIsReminderWindowOpen(true)}>
            <Ionicons name="add-circle-outline" size={18} color={COLORS.RED_TOMATO} />
          </Pressable>
        </View>
      )}

      {reminders.map((reminder, index) => (
        <Text key={`${reminder.date}-${reminder.time}-${index}`} style={styles.reminderSummary}>
          {formatReminderSummary(reminder)}
        </Text>
      ))}

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
                  setReminders((prev) => [...prev, reminderDraft]);
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
    </>
  );
});

AddTaskReminderSection.displayName = 'AddTaskReminderSection';

export default AddTaskReminderSection;
