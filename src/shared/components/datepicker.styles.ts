import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../styles/spacing.styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    right: -9999,
    bottom: -9999,
  },
  panel: {
    width: 340,
    backgroundColor: '#25272d',
    borderWidth: 1,
    borderColor: '#3f4248',
    borderRadius: SPACING.SMALL,
    padding: SPACING.SMALL,
    gap: SPACING.SMALL,
  },
  manualDateInput: {
    borderWidth: 1,
    borderColor: '#44474d',
    borderRadius: SPACING.SMALL,
    color: COLORS.WHITE,
    paddingHorizontal: SPACING.SMALL,
    paddingVertical: SPACING.SMALL,
    fontSize: FONT_SIZES.SMALL,
  },
  dateQuickList: {
    gap: SPACING.SMALL,
  },
  dateQuickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.SMALL,
  },
  dateQuickLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
    flex: 1,
  },
  dateQuickText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MEDIUM,
  },
  dateQuickMeta: {
    color: COLORS.OFF_WHITE,
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarMonthText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  calendarHeaderActions: {
    flexDirection: 'row',
    gap: SPACING.SMALL,
  },
  calendarWeekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarWeekdayText: {
    width: '14.2%',
    textAlign: 'center',
    color: COLORS.OFF_WHITE,
    fontSize: FONT_SIZES.SMALL,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.2%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.SMALL,
    borderRadius: 999,
  },
  calendarCellSelected: {
    backgroundColor: COLORS.RED_DEEP,
  },
  calendarCellText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
  },
  calendarCellTextSelected: {
    color: COLORS.RED_TOMATO,
    fontWeight: FONT_WEIGHT.BOLD,
  },
});

export default styles;
