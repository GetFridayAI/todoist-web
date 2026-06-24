import React from 'react';
import { Text, View } from 'react-native';
import { DashboardSectionComponentProps } from '../../../interfaces/dashboard.interface';
import styles from '../../../styles/dashboard.styles';

const Upcoming: React.FC<DashboardSectionComponentProps> = ({ routeParams }) => {
  return (
    <View>
      <Text style={styles.title}>Upcoming</Text>
      <Text style={styles.metaText}>Params: {JSON.stringify(routeParams ?? {})}</Text>
    </View>
  );
};

export default Upcoming;
