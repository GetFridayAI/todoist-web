import React from 'react';
import { Text, View } from 'react-native';
import { Routes } from '../../../shared/interfaces/routes.interface';
import { useTheme } from '../../../shared/context/ThemeContext';
import styles from '../../styles/dashboard.styles';
import NavigationBar from './Navbar/NavigationBar';

interface DashboardProps {
  activeRoute?: Routes;
  routeParams?: Record<string, string>;
}

const Dashboard: React.FC<DashboardProps> = ({ activeRoute, routeParams }) => {
  const { styles: themeStyles } = useTheme();

  const getStyles = (styles: object[]) => {
    return [themeStyles, ...styles];
  }

  return (
    <View style={getStyles([styles.container])}>
      <NavigationBar />
      <View style={styles.contentContainer}>
        <Text style={getStyles([styles.title])}>Dashboard</Text>
        <Text style={getStyles([styles.metaText])}>Active route: {activeRoute ?? 'None'}</Text>
        <Text style={getStyles([styles.metaText])}>Route params: {JSON.stringify(routeParams ?? {})}</Text>
      </View>
    </View>
  );
};

export default Dashboard;
