import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: '#cbd2d9',
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 12,
    paddingVertical: 20,
    gap: 8,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#102a43',
    marginBottom: 8,
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334e68',
  },
  activeItemContainer: {
    backgroundColor: '#d9e2ec',
  },
  activeItemText: {
    color: '#102a43',
  },
});

export default styles;
