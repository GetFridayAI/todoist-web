import React from 'react';
import { Text, View } from 'react-native';
import { MENU_ITEMS } from '../../../interfaces/navigation.interface';
import styles from '../../../styles/navigation.styles';
import NavigationItem from './NavigationItem';

const NavigationBar: React.FC = () => {
	const menuItems = Object.values(MENU_ITEMS);
	const activeMenuItem = MENU_ITEMS.Today;

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Menu</Text>
			{menuItems.map((item) => (
				<NavigationItem key={item} label={item} isActive={item === activeMenuItem} />
			))}
		</View>
	);
};

export default NavigationBar;
