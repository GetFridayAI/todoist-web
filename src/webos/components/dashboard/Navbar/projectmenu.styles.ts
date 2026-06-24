import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../../shared/styles/spacing.styles';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    minWidth: 180,
    backgroundColor: COLORS.GREY_DARK,
    borderRadius: SPACING.SMALL,
    borderWidth: 1,
    borderColor: COLORS.GREY,
    paddingVertical: SPACING.EXTRA_SMALL,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
  },
  menuItemHovered: {
    backgroundColor: COLORS.GREY,
  },
  menuItemText: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.NORMAL,
  },
});

export default styles;
