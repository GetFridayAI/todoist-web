import baseStyles from '../addtask.styles';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../../shared/styles/spacing.styles';
import { themes } from '../../../../shared/styles/themes.styles';

const styles = {
  bottomLeftRow: baseStyles.bottomLeftRow,
  breadcrumbHash: baseStyles.breadcrumbHash,
  projectSelectorAnchor: baseStyles.projectSelectorAnchor,
  projectSelector: baseStyles.projectSelector,
  projectSelectorText: baseStyles.projectSelectorText,
  projectEditRow: {
    paddingVertical: SPACING.MEDIUM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SMOKE,
    paddingTop: SPACING.SMALL,
    paddingBottom: SPACING.SMALL,
  },
  projectEditRowHovered: {
    backgroundColor: themes.dark.accentColor,
  },
  projectEditHeaderRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  projectEditLabel: {
    color: '#c7c8cd',
    fontSize: FONT_SIZES.EXTRA_SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  projectEditValueRow: {
    marginTop: SPACING.SMALL,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: SPACING.SMALL,
    padding: SPACING.SMALL,
    height: SPACING.HUGE,
    borderRadius: SPACING.SMALL
  },
  projectEditHash: {
    fontSize: FONT_SIZES.SMALL,
    lineHeight: FONT_SIZES.EXTRA_LARGE,
  },
  projectEditValueText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.NORMAL,
    width: '100%',
  },
  projectDropdown: baseStyles.projectDropdown,
  projectDropdownEdit: {
    left: 'auto' as const,
    top: '80%',
    width: 300,
    maxHeight: 260,
    overflowY: 'auto' as const,
    scrollbarWidth: 'thin' as const,
    scrollbarColor: '#ff3b30 #34c759',
  },
  projectDropdownItem: baseStyles.projectDropdownItem,
  projectDropdownItemSelected: baseStyles.projectDropdownItemSelected,
  projectDropdownItemText: baseStyles.projectDropdownItemText,
  projectEditIcon: {
    right: 0
  },
};

export default styles;
