import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../shared/styles/spacing.styles';

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: COLORS.GREY_DARK,
    backgroundColor: COLORS.GREY_DARK,
    paddingHorizontal: SPACING.EXTRA_SMALL,
    paddingVertical: SPACING.MEDIUM,
    gap: SPACING.EXTRA_SMALL,
  },
  heading: {
    fontSize: FONT_SIZES.MEDIUM,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.WHITE,
    marginBottom: SPACING.MEDIUM,
  },
  itemContainer: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.EXTRA_SMALL,
    borderRadius: SPACING.SMALL,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
  },
  itemContainerHover: {
    backgroundColor: COLORS.GREY,
  },
  itemText: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.NORMAL,
    color: COLORS.WHITE,
  },
  activeItemContainer: {
    backgroundColor: COLORS.RED_DEEP,
  },
  activeItemText: {
    color: COLORS.RED_TOMATO,
  },
  avatar: {
    width: SPACING.EXTRA_LARGE,
    height: SPACING.EXTRA_LARGE,
    borderRadius: SPACING.LARGE,
    backgroundColor: COLORS.GREY,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.BOLD,
    color: COLORS.WHITE,
  },
  sideBarHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.SMALL,
    marginBottom: SPACING.MEDIUM,
    color: COLORS.WHITE,
    width: '50%',
  },
  profileContainerHovered: {
    backgroundColor: COLORS.GREY,
    borderRadius: SPACING.SMALL,
  },
  profileName: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.WHITE,
  },
  collapseIconContainer: {
    padding: SPACING.SMALL,
    marginBottom: SPACING.SMALL
  },
  addTaskContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: SPACING.SMALL,
    alignSelf: 'flex-start',
    paddingTop: SPACING.SMALL,
    paddingBottom: SPACING.SMALL,
    paddingLeft: SPACING.MEDIUM,
    paddingRight: SPACING.MEDIUM,
    width: '100%',
    borderRadius: SPACING.SMALL
  },
  addTaskContainerHovered: {
    backgroundColor: COLORS.GREY,
  },
  addTaskIcon: {
    backgroundColor: COLORS.RED_BLOOD,
    width: SPACING.LARGE,
    height: SPACING.LARGE,
    borderRadius: SPACING.LARGE,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  addTaskTextButton: {
    color: COLORS.RED_BLOOD
  },
  addMenuOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  addMenuDropdown: {
    position: 'absolute',
    top: 130,
    left: SPACING.EXTRA_LARGE,
    backgroundColor: COLORS.GREY,
    borderRadius: SPACING.SMALL,
    borderWidth: 1,
    borderColor: COLORS.GREY_LIGHT,
    width: 200,
    zIndex: 1000,
  },
  addMenuItem: {
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY_DARK,
    height: 40
  },
  addMenuItemLast: {
    borderBottomWidth: 0,
  },
  addMenuItemText: {
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.NORMAL,
    color: COLORS.WHITE,
  }
});

export default styles;
