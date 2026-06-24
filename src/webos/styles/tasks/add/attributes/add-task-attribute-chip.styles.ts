import baseStyles from '../../addtask.styles';
import { COLORS } from '../../../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../../../shared/styles/spacing.styles';
import { themes } from '../../../../../shared/styles/themes.styles';

const styles = {
  chip: baseStyles.chip,
  chipEdit: {
    position: 'relative' as const,
    paddingVertical: SPACING.MEDIUM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SMOKE,
    paddingTop: SPACING.SMALL,
    paddingBottom: SPACING.SMALL,
  },
  chipEditTopRow: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  chipEditLabel: {
    color: COLORS.OFF_WHITE,
    fontSize: FONT_SIZES.EXTRA_SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  chipEditValueRow: {
    marginTop: SPACING.SMALL,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: SPACING.SMALL,
    padding: SPACING.SMALL,
    height: SPACING.HUGE,
    borderRadius: SPACING.SMALL
  },
  chipEditValueRowHovered: {
    backgroundColor: themes.dark.accentColor,
  },
  chipText: {
    ...baseStyles.chipText,
  },
  chipTextEdit: {
    color: '#f1f2f4',
    fontSize: FONT_SIZES.EXTRA_SMALL,
    flexShrink: 1,
    width: '100%',
  },
  chipTextPlaceholder: baseStyles.chipTextPlaceholder,
  chipEditClearButton: {
    position: 'absolute' as const,
    right: 0,
    top: SPACING.MEDIUM,
  },
};

export default styles;
