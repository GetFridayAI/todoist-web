import { StyleSheet } from 'react-native';
import { COLORS } from '../../shared/styles/colors.styles';
import { SPACING } from '../../shared/styles/spacing.styles';

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
    fontWeight: '600',
    height: 50
  },
  metaText: {
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.RED_BLOOD,
  },
});

export default styles;
