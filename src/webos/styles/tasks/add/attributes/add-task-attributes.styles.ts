import baseStyles from '../../addtask.styles';

const styles = {
  chipsAnchor: baseStyles.chipsAnchor,
  chipsRow: baseStyles.chipsRow,
  createScroll: {
    overflow: 'visible' as const,
  },
  createScrollContent: {
    ...baseStyles.chipsRow,
    overflow: 'visible' as const,
  },
  chipsColumn: {
    flexDirection: 'column' as const,
    width: '100%' as const,
    overflow: 'visible' as const,
  },
  panelContainer: baseStyles.panelContainer,
};

export default styles;
