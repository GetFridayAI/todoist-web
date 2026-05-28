import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../../styles/dashboard.styles';
import { DashboardSectionComponentProps } from '../../../interfaces/dashboard.interface';

const Settings: React.FC<DashboardSectionComponentProps> = ({ routeParams }) => {
  return (
    <View>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.metaText}>Params: {JSON.stringify(routeParams ?? {})}</Text>
    </View>
  );
};

export default Settings;
