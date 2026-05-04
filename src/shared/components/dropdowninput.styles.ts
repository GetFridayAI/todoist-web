import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../styles/spacing.styles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    zIndex: 200,
    padding: 0
  },
  backdrop: {
    position: 'absolute',
    top: -9999,
    left: -9999,
    right: -9999,
    bottom: -9999,
  },
  dropdown: {
    backgroundColor: COLORS.BLACK_BLUE,
    borderRadius: SPACING.SMALL,
    overflow: 'hidden',
    maxHeight: 220,
    zIndex: 201,
    elevation: 20,
  },
  label: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
    paddingHorizontal: SPACING.MEDIUM,
    paddingTop: SPACING.SMALL,
    paddingBottom: SPACING.EXTRA_SMALL,
  },
  optionList: {
    maxHeight: 180,
  },
  option: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY,
  },
  optionHovered: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  optionSelected: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  optionText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
  },
});

export default styles;
