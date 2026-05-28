import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { MENU_ICONS, MENU_ITEMS, NavigationIconName } from '../../../interfaces/navigation.interface';
import styles from '../../../styles/navigation.styles';
import { FONT_SIZES } from '../../../../shared/styles/spacing.styles';
import { COLORS } from '../../../../shared/styles/colors.styles';

interface NavigationItemProps {
	label: MENU_ITEMS;
	isActive?: boolean;
    updateActiveTab: (menuItem: MENU_ITEMS) => void;
}

const ICON_ASSETS: Record<NavigationIconName, number> = {
	search: require('../../../../../assets/icons/search.svg'),
	inbox: require('../../../../../assets/icons/inbox.svg'),
	today: require('../../../../../assets/icons/today.svg'),
	upcoming: require('../../../../../assets/icons/upcoming.svg'),
	completed: require('../../../../../assets/icons/completed.svg'),
};

const NavigationItem: React.FC<NavigationItemProps> = ({ label, isActive = false, updateActiveTab }) => {
	const [isHovered, setIsHovered] = useState(false);
	const navigate = useNavigate();
	const iconName = MENU_ICONS[label];
	const iconAsset = ICON_ASSETS[iconName];
	const iconColor = isActive ? COLORS.RED_BLOOD : COLORS.WHITE;

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
			<Image
				source={iconAsset}
				style={{ width: FONT_SIZES.LARGE, height: FONT_SIZES.LARGE, tintColor: iconColor }}
				resizeMode="contain"
			/>
			<View>
				<Text style={[styles.itemText, isActive ? styles.activeItemText : null]}>{label}</Text>
			</View>
		</Pressable>
	);
};

export default NavigationItem;
