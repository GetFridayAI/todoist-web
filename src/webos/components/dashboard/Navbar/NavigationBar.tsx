import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { MENU_ITEMS } from '../../../interfaces/navigation.interface';
import styles from '../../../styles/navigation.styles';
import NavigationItem from './NavigationItem';
import Projects from './Projects';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/styles/colors.styles';
import { FONT_SIZES, SPACING } from '../../../../shared/styles/spacing.styles';
import { useLabelsStore, useProjectsStore, useUsersStore } from '../../../../shared/context/AppStoreContext';
import AddTask from '../../tasks/AddTask';
import MaterialIcons from '@react-native-vector-icons/material-icons';

interface NavigationBarProps {
    isProjectsLoading?: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
    isProjectsLoading = false,
}) => {
	const projects = useProjectsStore();
	const collaborators = useUsersStore();
	const labels = useLabelsStore();
	const menuItems = Object.values(MENU_ITEMS);
	const [activeMenuItem, setActiveMenuItem] = React.useState<MENU_ITEMS>(MENU_ITEMS.Today);
    const [isProfileHovered, setIsProfileHovered] = React.useState(false);
    const [isAddTaskHovered, setIsAddTaskHovered] = React.useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false);

    const handleCancelAddTask = () => {
        setIsAddTaskModalOpen(false);
    };

    const handleCloseAddTask = () => {
        setIsAddTaskModalOpen(false);
    };

    const handleAddTask = () => {
        setIsAddTaskModalOpen(false);
    };

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
                onHoverOut={() => {setIsAddTaskHovered(false);}}
                onPress={() => setIsAddTaskModalOpen(true)}>
                <MaterialIcons name="add-task" size={FONT_SIZES.EXTRA_LARGE} color={COLORS.RED_BLOOD} style={styles.addTaskIcon} />
                <Text style={styles.addTaskTextButton}>Add Task</Text>
            </Pressable>
            

			{menuItems.map((item) => (
				<NavigationItem 
                    key={item} 
                    label={item} 
                    isActive={item === activeMenuItem}
                    updateActiveTab={setActiveMenuItem} />
			))}
            
            <Projects projects={projects} isLoading={isProjectsLoading} />

            <AddTask
                visible={isAddTaskModalOpen}
                onClose={handleCloseAddTask}
                onCancel={handleCancelAddTask}
            />
		</View>
	);
};

export default NavigationBar;
