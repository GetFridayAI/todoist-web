import { StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/styles/colors.styles';
import { FONT_SIZES, FONT_WEIGHT, SPACING } from '../../../shared/styles/spacing.styles';

const styles = StyleSheet.create({
    container: {
        marginTop: SPACING.MEDIUM,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.MEDIUM,
        paddingVertical: SPACING.EXTRA_SMALL,
        borderRadius: SPACING.SMALL,
        height: SPACING.EXTRA_LARGE,
        width: '100%',
    },
    headerHovered: {
        backgroundColor: COLORS.GREY,
    },
    title: {
        fontSize: FONT_SIZES.SMALL,
        fontWeight: FONT_WEIGHT.SEMIBOLD,
        color: COLORS.OFF_WHITE,
        flex: 1,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.EXTRA_SMALL,
    },
    toggleIconButton: {
        width: 24,
        height: 24,
        borderRadius: SPACING.SMALL,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleIconButtonHovered: {
        backgroundColor: COLORS.WHITE,
        opacity: 0.5,
    },
    plusWrapper: {
        position: 'relative',
        alignItems: 'center',
    },
    plusButton: {
        width: 24,
        height: 24,
        padding: 2,
    },
    tooltip: {
        position: 'absolute',
        bottom: SPACING.LARGE,
        right: 0,
        backgroundColor: COLORS.GREY_DARK,
        borderWidth: 1,
        borderColor: COLORS.GREY,
        borderRadius: 4,
        paddingHorizontal: SPACING.SMALL,
        paddingVertical: 4,
        zIndex: 100,
    },
    tooltipText: {
        fontSize: FONT_SIZES.EXTRA_SMALL,
        color: COLORS.OFF_WHITE,
    },
    projectList: {
        marginTop: SPACING.SMALL,
        gap: SPACING.SMALL,
    },
    projectItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.MEDIUM,
        paddingVertical: SPACING.EXTRA_SMALL,
        borderRadius: SPACING.SMALL,
    },
    projectItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.SMALL,
        flex: 1,
    },
    projectItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.EXTRA_SMALL,
    },
    projectTaskCount: {
        minWidth: 20,
        textAlign: 'right',
        fontSize: FONT_SIZES.EXTRA_SMALL,
        fontWeight: FONT_WEIGHT.MEDIUM,
        color: COLORS.OFF_WHITE,
    },
    projectSubProjectsToggle: {
        width: 22,
        height: 22,
        borderRadius: SPACING.SMALL,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectMenuTrigger: {
        width: 22,
        height: 22,
        borderRadius: SPACING.SMALL,
        alignItems: 'center',
        justifyContent: 'center',
    },
    projectItemHovered: {
        backgroundColor: COLORS.GREY,
    },
    projectName: {
        fontSize: FONT_SIZES.SMALL,
        fontWeight: FONT_WEIGHT.NORMAL,
        color: COLORS.WHITE,
    },
    projectIcon: {
        fontSize: 20,
        fontWeight: FONT_WEIGHT.EXTRA_LIGHT
    }
});

export default styles;