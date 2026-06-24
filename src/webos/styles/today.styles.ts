import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../shared/styles/spacing.styles';

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    paddingHorizontal: SPACING.EXTRA_LARGE,
    paddingTop: SPACING.EXTRA_LARGE * 2,
  },
  todaySummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
    marginBottom: SPACING.MEDIUM,
    borderRadius: SPACING.SMALL,
    fontWeight: FONT_WEIGHT.LIGHT,
  },
  todaySummaryText: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.OFF_WHITE,
  },
  priorityBoardScroll: {
    flex: 1,
  },
  priorityBoardContent: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: SPACING.MEDIUM,
    paddingBottom: SPACING.MEDIUM,
    borderRadius: SPACING.SMALL,
  },
  priorityColumn: {
    width: 270,
    borderWidth: 1,
    borderColor: COLORS.BLACK,
    borderRadius: SPACING.SMALL,
    overflow: 'hidden',
    backgroundColor: COLORS.BLACK,
  },
  priorityColumnHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingVertical: SPACING.MEDIUM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BLACK
  },
  priorityColumnTitle: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    width: 90,
    marginRight: SPACING.EXTRA_SMALL,
  },
  priorityColumnCount: {
    fontSize: FONT_SIZES.EXTRA_SMALL,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    color: COLORS.GREY_LIGHT,
  },
  priorityColumnList: {
    maxHeight: '90%',
  },
  priorityColumnListContent: {
    paddingBottom: SPACING.MEDIUM,
  },
  emptyColumnText: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.MEDIUM,
    fontSize: 13,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  taskCard: {
    marginBottom: SPACING.SMALL,
    borderRadius: SPACING.SMALL,
    borderWidth: 1,
    borderColor: COLORS.GREY,
    backgroundColor: COLORS.GREY_DARK,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  }
});

export default styles;
