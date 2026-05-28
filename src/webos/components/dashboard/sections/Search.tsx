import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../../styles/dashboard.styles';
import { DashboardSectionComponentProps } from '../../../interfaces/dashboard.interface';

const Search: React.FC<DashboardSectionComponentProps> = ({ routeParams }) => {
  return (
    <View>
      <Text style={styles.title}>Search</Text>
      <Text style={styles.metaText}>Params: {JSON.stringify(routeParams ?? {})}</Text>
    </View>
  );
};

export default Search;
