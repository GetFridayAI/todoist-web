import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MENU_ITEMS } from '../../../interfaces/navigation.interface';
import styles from '../../../styles/navigation.styles';
import NavigationItem from './NavigationItem';
import Projects from './Projects';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { SPACING } from '../../../../shared/styles/spacing.styles';

interface NavigationBarProps {
    isAddMenuOpen: boolean;
    setIsAddMenuOpen: (open: boolean) => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ isAddMenuOpen, setIsAddMenuOpen }) => {
	const menuItems = Object.values(MENU_ITEMS);
	const [activeMenuItem, setActiveMenuItem] = React.useState<MENU_ITEMS>(MENU_ITEMS.Today);
    const [isProfileHovered, setIsProfileHovered] = React.useState(false);
    const [isAddTaskHovered, setIsAddTaskHovered] = React.useState(false);

	return (
		<View style={styles.container}>
            <View style={styles.sideBarHeader}>
                <Pressable 
                    style={[styles.profileContainer, isProfileHovered && styles.profileContainerHovered]}
                    onHoverIn={() => setIsProfileHovered(true)}
                    onHoverOut={() => setIsProfileHovered(false)}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>A</Text>
                    </View>
                    <Text style={styles.profileName}>Amit Rai</Text>
                    <Ionicons name="chevron-down-outline" size={16} color={COLORS.OFF_WHITE} />
                </Pressable>
                <Pressable style={styles.collapseIconContainer}>
                    <Ionicons name='tv-outline' color={COLORS.OFF_WHITE} size={SPACING.MEDIUM}></Ionicons>
                </Pressable>
            </View>
            <Pressable 
                style={[styles.addTaskContainer, isAddTaskHovered && styles.addTaskContainerHovered]}
                onHoverIn={() => setIsAddTaskHovered(true)}
                onHoverOut={() => {
                    if (!isAddMenuOpen) {
                        setIsAddTaskHovered(false);
                    }
                }}
                onPress={() => setIsAddMenuOpen(!isAddMenuOpen)}>
                <Ionicons 
                    name='add' 
                    color={COLORS.BLACK} 
                    size={SPACING.LARGE}
                    style={styles.addTaskIcon}></Ionicons>
                <Text style={styles.addTaskTextButton}>Add</Text>
            </Pressable>
            

			{menuItems.map((item) => (
				<NavigationItem 
                    key={item} 
                    label={item} 
                    isActive={item === activeMenuItem}
                    updateActiveTab={setActiveMenuItem} />
			))}
            <Projects />
		</View>
	);
};

export default NavigationBar;
