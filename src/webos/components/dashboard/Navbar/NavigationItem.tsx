import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { MENU_ICONS, MENU_ITEMS } from '../../../interfaces/navigation.interface';
import styles from '../../../styles/navigation.styles';
import { Ionicons } from '@expo/vector-icons';
import { FONT_SIZES } from '../../../../shared/styles/spacing.styles';
import { COLORS } from '../../../../shared/styles/colors.styles';

interface NavigationItemProps {
	label: MENU_ITEMS;
	isActive?: boolean;
    updateActiveTab: (menuItem: MENU_ITEMS) => void;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ label, isActive = false, updateActiveTab }) => {
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();

	const handlePress = () => {
		navigate(`/dashboard/${label.toLowerCase()}`);
        updateActiveTab(label);
	};

	return (
		<Pressable
			onPress={handlePress}
			onHoverIn={() => setIsHovered(true)}
			onHoverOut={() => setIsHovered(false)}
			style={[styles.itemContainer, isHovered && styles.itemContainerHover, isActive && styles.activeItemContainer]}
		>
            <Ionicons name={MENU_ICONS[label]} size={FONT_SIZES.LARGE} color={isActive ? COLORS.RED_BLOOD : COLORS.WHITE} />
			<View>
				<Text style={[styles.itemText, isActive ? styles.activeItemText : null]}>{label}</Text>
			</View>
		</Pressable>
	);
};

export default NavigationItem;
