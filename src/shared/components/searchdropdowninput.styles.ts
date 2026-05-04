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
    backgroundColor: COLORS.BLACK_BLUE,
    borderWidth: 0,
    gap: SPACING.SMALL,
    minWidth: 300,
    padding: SPACING.SMALL,
    borderRadius: SPACING.SMALL,
  },
  label: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  searchInput: {
    backgroundColor: '#1e1f22',
    borderWidth: 1,
    borderColor: '#44474d',
    borderRadius: SPACING.SMALL,
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
    paddingHorizontal: SPACING.SMALL,
    paddingVertical: SPACING.SMALL,
    outlineWidth: 0,
    outlineColor: 'rgba(0,0,0,0)',
  },
  optionList: {
    maxHeight: 220,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.SMALL,
    paddingVertical: SPACING.SMALL,
    borderRadius: SPACING.SMALL,
    height: SPACING.EXTRA_HUGE
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
    flex: 1,
  },
  icon: {
    marginRight: SPACING.SMALL,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: '#6b7280',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.SMALL,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: COLORS.RED_DEEP,
    borderColor: COLORS.RED_DEEP,
  },
  checkmark: {
    color: COLORS.WHITE,
    fontSize: 10,
    lineHeight: 14,
  },
  createLink: {
    paddingHorizontal: SPACING.SMALL,
    paddingVertical: SPACING.SMALL,
  },
  createLinkText: {
    color: COLORS.RED_TOMATO,
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
});

export default styles;
