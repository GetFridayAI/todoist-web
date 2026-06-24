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
  listScroll: {
    flex: 1,
    marginTop: SPACING.MEDIUM,
  },
  daySection: {
    marginBottom: SPACING.LARGE,
  },
  dayHeading: {
    color: COLORS.OFF_WHITE,
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHT.SEMIBOLD,
    marginBottom: SPACING.SMALL,
  },
  taskRow: {
    borderWidth: 1,
    borderColor: '#2a2d34',
    borderRadius: SPACING.SMALL,
    backgroundColor: '#181a1f',
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
    marginBottom: SPACING.SMALL,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: SPACING.SMALL,
  },
  taskRowSelected: {
    borderColor: '#3f4a5a',
    backgroundColor: '#1e2229',
  },
  taskRowContent: {
    flex: 1,
    gap: 4,
  },
  taskStatement: {
    color: '#eceff4',
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  taskProject: {
    color: '#9aa2b1',
    fontSize: FONT_SIZES.SMALL,
  },
  taskTime: {
    color: '#97a0b2',
    fontSize: FONT_SIZES.EXTRA_SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
    marginTop: 1,
  },
  completedSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
    marginBottom: SPACING.MEDIUM,
  },
  completedSummaryText: {
    color: COLORS.OFF_WHITE,
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  loadingText: {
    color: '#a5adbc',
    fontSize: FONT_SIZES.SMALL,
  },
});

export default styles;
