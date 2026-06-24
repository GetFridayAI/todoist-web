import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../../shared/styles/spacing.styles';
import { themes } from '../../../../shared/styles/themes.styles';

const styles = StyleSheet.create({
  fieldAnchor: {
    position: 'relative' as any,
    zIndex: 1,
  },
  fieldAnchorOpen: {
    zIndex: 120,
  },
  editViewPressable: {
    paddingVertical: SPACING.MEDIUM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SMOKE,
    paddingTop: SPACING.SMALL,
    paddingBottom: SPACING.SMALL,
  } as ViewStyle,
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  } as ViewStyle,
  labelText: {
    color: COLORS.OFF_WHITE,
    fontSize: FONT_SIZES.EXTRA_SMALL,
    fontWeight: '500',
  } as TextStyle,
  selectedUserRow: {
    marginTop: SPACING.SMALL,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
    padding: SPACING.SMALL,
    height: SPACING.HUGE,
    borderRadius: SPACING.SMALL,
  } as ViewStyle,
  selectedUserRowHovered: {
    backgroundColor: themes.dark.accentColor,
  },
  avatarView: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.RED_DEEP,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  initialsText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.EXTRA_SMALL,
    fontWeight: FONT_WEIGHT.BOLD,
  } as TextStyle,
  usernameText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
  } as TextStyle,
  panelBase: {
    left: 0,
    minWidth: 200,
  } as ViewStyle,
});

export const SEARCH_ICON_COLOR = '#e4e4e7';

export default styles;
