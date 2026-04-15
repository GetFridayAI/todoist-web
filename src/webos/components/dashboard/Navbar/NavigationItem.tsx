import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MENU_ITEMS } from '../../../interfaces/navigation.interface';
import styles from '../../../styles/navigation.styles';

interface NavigationItemProps {
	label: MENU_ITEMS;
	isActive?: boolean;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ label, isActive = false }) => {
	return (
		<Pressable>
			<View style={[styles.itemContainer, isActive ? styles.activeItemContainer : null]}>
				<Text style={[styles.itemText, isActive ? styles.activeItemText : null]}>{label}</Text>
			</View>
		</Pressable>
	);
};

export default NavigationItem;
