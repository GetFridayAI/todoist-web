import { StyleSheet } from 'react-native';
import { COLORS } from './colors.styles';

const styles = StyleSheet.create({
  light: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: '100%',
    color: COLORS.BLACK,
  },
  dark: {
    backgroundColor: COLORS.BLACK,
    width: '100%',
    height: '100%',
    color: COLORS.WHITE,
  },
});

export default styles;
