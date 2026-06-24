import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../shared/styles/spacing.styles';

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.BLACK_PITCH,
    opacity: 0.3,
  },
  modalCard: {
    width: '92%',
    maxWidth: 850,
    maxHeight: 850,
    backgroundColor: COLORS.GREY_DARK,
    borderWidth: 1,
    borderColor: COLORS.GREY_DARK,
    borderRadius: SPACING.SMALL,
    top: 0,
    height: '90%',
    overflow: 'visible',
  },
  modalCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.MEDIUM,
    backgroundColor: COLORS.BLACK,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SMOKE,
  },
  modalCardContent: {
    flexDirection: 'row',
    height: '100%',
    overflow: 'visible',
  },
  leftPanel: {
    flex: 1,
    paddingHorizontal: SPACING.LARGE,
    paddingVertical: SPACING.MEDIUM,
    gap: SPACING.SMALL,
    backgroundColor: COLORS.BLACK,
    height: '100%',
    overflow: 'auto',
    scrollbarWidth: 'thin' as const,
  scrollbarColor: `${COLORS.BLACK} ${COLORS.BLACK_PITCH}`
  } as any,
  titleMeta: {
    color: COLORS.OFF_WHITE,
    fontSize: FONT_SIZES.SMALL,
    marginBottom: SPACING.EXTRA_SMALL,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: COLORS.GREY_DARK,
    marginVertical: SPACING.SMALL,
  },
  addSubTaskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.EXTRA_SMALL,
    alignSelf: 'flex-start',
  },
  addSubTaskText: {
    color: COLORS.GREY_LIGHT,
    fontSize: FONT_SIZES.SMALL,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  commentRow: {
    marginTop: SPACING.SMALL,
    borderTopWidth: 1,
    borderTopColor: COLORS.GREY_DARK,
    paddingTop: SPACING.SMALL,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
  },
  commentAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.RED_DEEP,
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentAvatarText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.EXTRA_SMALL,
    fontWeight: FONT_WEIGHT.BOLD,
  },
  commentInput: {
    flex: 1,
    height: 34,
    borderWidth: 1,
    borderColor: COLORS.GREY_DARK,
    borderRadius: 999,
    paddingHorizontal: SPACING.MEDIUM,
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.SMALL,
    outlineWidth: 0,
    outlineColor: 'rgba(0,0,0,0)',
  },
  sidebar: {
    width: 260,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.GREY_DARK,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.SMALL,
    height: '100%',
    overflow: 'auto',
    scrollbarWidth: 'thin' as const,
    scrollbarColor: `${COLORS.BLACK} ${COLORS.BLACK_PITCH}`,
  } as any,
  sidebarInputRow: {
    paddingVertical: SPACING.MEDIUM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREY_DARK,
  },
  sidebarInputRowActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  sidebarInputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sidebarInputHeaderText: {
    color: COLORS.GREY_LIGHT,
    fontSize: FONT_SIZES.LARGE,
    fontWeight: FONT_WEIGHT.MEDIUM,
  },
  sidebarInputText: {
    marginTop: SPACING.SMALL,
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.LARGE,
    padding: 0,
    outlineWidth: 0,
    outlineColor: 'rgba(0,0,0,0)',
  },
  sidebarGoalRow: {
    display: 'none',
  }
});

export default styles;
