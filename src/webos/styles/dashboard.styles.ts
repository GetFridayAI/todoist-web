import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/styles/colors.styles';
import { FONT_WEIGHT, SPACING } from '../../shared/styles/spacing.styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  sectionContainer: {
    flex: 1,
    width: '100%',
    alignSelf: 'stretch',
    paddingHorizontal: SPACING.MEDIUM,
    paddingTop: SPACING.MEDIUM,
  },
  taskList: {
    flex: 1,
    marginTop: SPACING.MEDIUM,
  },
  title: {
    fontSize: 24,
    fontWeight: FONT_WEIGHT.BOLD,
    height: SPACING.EXTRA_HUGE
  },
  metaText: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.LIGHT,
  },
  errorText: {
    fontSize: 14,
    fontWeight: FONT_WEIGHT.MEDIUM,
    color: COLORS.RED_BLOOD,
  },
});

export default styles;
