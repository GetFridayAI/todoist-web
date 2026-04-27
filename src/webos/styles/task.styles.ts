import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/styles/colors.styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    gap: 12,
    width: '100%',
    borderColor: COLORS.GREY,
    shadowColor: COLORS.BLACK_PITCH,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  containerHovered: {
    borderColor: COLORS.OFF_WHITE,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: '#6b7280',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxP0: {
    borderColor: COLORS.RED_BLOOD
  },
  checkboxP1: {
    borderColor: COLORS.YELLOW
  },
  checkboxP2: {
    borderColor: COLORS.PURPLE
  },
  checkboxP3: {
    borderColor: COLORS.GREEN
  },
  checkboxCompleted: {
    borderColor: '#6b7280',
    backgroundColor: '#374151',
  },
  body: {
    flex: 1,
    gap: 5,
  },
  taskName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e5e7eb',
  },
  taskNameCompleted: {
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#7ec8ad',
  },
  metaTextPast: {
    color: COLORS.RED_BLOOD
  },
  metaTextToday: {
    color: COLORS.GREEN
  },
  metaTextFuture: {
    color: COLORS.PURPLE
  },
  metaTextSecondary: {
    fontSize: 12,
    color: '#8b949e',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#e5e7eb',
  },
  separator: {
    color: '#6b7280',
    fontSize: 12,
    marginHorizontal: 2,
  },
});

export default styles;
