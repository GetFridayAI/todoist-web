import React from 'react';
import { ActivityIndicator, Animated, Easing, GestureResponderEvent, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRequest } from '../../../../api/request';
import { TaskProject } from '../../../../shared/interfaces/tasks.interface';
import { COLORS } from '../../../../shared/styles/colors.styles';
import styles from '../../../styles/navigation/project.styles';
import ProjectMenu, { ProjectMenuOption } from './ProjectMenu';

const PROJECT_MENU_OPTIONS: ProjectMenuOption[] = [
    { key: 'favorite', label: 'Add to Favorites', icon: 'star-outline' },
    { key: 'edit', label: 'Edit', icon: 'create-outline' },
    { key: 'archive', label: 'Archive', icon: 'archive-outline' },
    { key: 'move', label: 'Move', icon: 'move-outline' },
    { key: 'share', label: 'Share', icon: 'share-social-outline' },
    { key: 'delete', label: 'Delete', icon: 'trash-outline', isDestructive: true },
];

const ROOT_PARENT_ID = null;

const Projects: React.FC = () => {
    const [projects, setProjects] = React.useState<TaskProject[]>([]);
    const [isExpanded, setIsExpanded] = React.useState(true);
    const [isHeaderHovered, setIsHeaderHovered] = React.useState(false);
    const [isToggleHovered, setIsToggleHovered] = React.useState(false);
    const [hoveredProjectId, setHoveredProjectId] = React.useState<number | null>(null);
    const [expandedProjectsMap, setExpandedProjectsMap] = React.useState<Record<number, boolean>>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [projectListHeight, setProjectListHeight] = React.useState(0);
    const [activeProjectMenuId, setActiveProjectMenuId] = React.useState<number | null>(null);
    const [projectMenuPosition, setProjectMenuPosition] = React.useState({ top: 0, left: 0 });
    const animatedMaxHeight = React.useRef(new Animated.Value(0)).current;
    const animatedOpacity = React.useRef(new Animated.Value(0)).current;

    const handleProjectMenuOpen = (projectId: number, event: GestureResponderEvent) => {
        const { pageX, pageY } = event.nativeEvent;

        setProjectMenuPosition({
            top: Math.max(8, pageY - 210),
            left: Math.max(8, pageX - 170),
        });
        setActiveProjectMenuId(projectId);
    };

    const childrenByParentId = React.useMemo(() => {
        const parentMap = new Map<number | null, TaskProject[]>();

        projects.forEach((project) => {
            const parentId = project.parentProjectId;
            const parentProjects = parentMap.get(parentId) ?? [];
            parentProjects.push(project);
            parentMap.set(parentId, parentProjects);
        });

        return parentMap;
    }, [projects]);

    const toggleProjectExpansion = (projectId: number) => {
        setExpandedProjectsMap((prevState) => ({
            ...prevState,
            [projectId]: !prevState[projectId],
        }));
    };

    const getTotalTaskCount = React.useCallback((projectId: number, visited = new Set<number>()): number => {
        if (visited.has(projectId)) {
            return 0;
        }

        const nextVisited = new Set(visited);
        nextVisited.add(projectId);

        const project = projects.find(p => p.projectId === projectId);
        const ownCount = project?.openTasksCount ?? 0;
        const children = childrenByParentId.get(projectId) ?? [];
        const childCount = children.reduce((sum, child) => sum + getTotalTaskCount(child.projectId, nextVisited), 0);

        return ownCount + childCount;
    }, [projects, childrenByParentId]);

    const renderProjectTree = (parentId: number | null, depth = 0, visited = new Set<number>()) => {
        const childProjects = childrenByParentId.get(parentId) ?? [];

        return childProjects.map((project) => {
            if (visited.has(project.projectId)) {
                return null;
            }

            const nextVisited = new Set(visited);
            nextVisited.add(project.projectId);

            const isHovered = hoveredProjectId === project.projectId;
            const isMenuOpen = activeProjectMenuId === project.projectId;
            const showActions = isHovered || isMenuOpen;
            const isProjectExpanded = Boolean(expandedProjectsMap[project.projectId]);
            const hasChildrenFlag = Boolean(project.hasSubProjects);
            const totalTaskCount = getTotalTaskCount(project.projectId);

            return (
                <View key={project.projectId}>
                    <Pressable
                        style={[
                            styles.projectItem,
                            isHovered && styles.projectItemHovered,
                            { paddingLeft: 16 + depth * 16 },
                        ]}
                        onHoverIn={() => setHoveredProjectId(project.projectId)}
                        onHoverOut={() => setHoveredProjectId(null)}
                    >
                        <View style={styles.projectItemLeft}>
                            <Text style={[styles.projectIcon, { color: project.projectIconColor ?? COLORS.RED_BLOOD }]}>#</Text>
                            <Text style={styles.projectName}>{project.projectname}</Text>
                        </View>

                        <View style={styles.projectItemRight}>
                            {!showActions && (
                                <Pressable
                                    onHoverIn={() => setHoveredProjectId(project.projectId)}
                                    onHoverOut={() => setHoveredProjectId(null)}
                                >
                                    <Text style={styles.projectTaskCount}>{totalTaskCount}</Text>
                                </Pressable>
                            )}

                            {showActions && hasChildrenFlag && (
                                <Pressable
                                    style={styles.projectSubProjectsToggle}
                                    onHoverIn={() => setHoveredProjectId(project.projectId)}
                                    onHoverOut={() => setHoveredProjectId(null)}
                                    onPress={(event) => {
                                        event.stopPropagation();
                                        toggleProjectExpansion(project.projectId);
                                    }}
                                >
                                    <Ionicons
                                        name={isProjectExpanded ? 'chevron-down-outline' : 'chevron-forward-outline'}
                                        size={14}
                                        color={COLORS.OFF_WHITE}
                                    />
                                </Pressable>
                            )}

                            {showActions && (
                                <Pressable
                                    style={styles.projectMenuTrigger}
                                    onHoverIn={() => setHoveredProjectId(project.projectId)}
                                    onHoverOut={() => setHoveredProjectId(null)}
                                    onPress={(event) => {
                                        event.stopPropagation();
                                        handleProjectMenuOpen(project.projectId, event);
                                    }}
                                >
                                    <Ionicons name="ellipsis-horizontal" size={16} color={COLORS.OFF_WHITE} />
                                </Pressable>
                            )}
                        </View>
                    </Pressable>

                    {hasChildrenFlag && isProjectExpanded && renderProjectTree(project.projectId, depth + 1, nextVisited)}
                </View>
            );
        });
    };

    React.useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            try {
                const response = await getRequest<TaskProject[]>('/fetch/projects/all');
                setProjects(response);
            } catch (e) {
                // silently fail
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    React.useEffect(() => {
        const targetMaxHeight = isExpanded ? 4000 : 0;
        const targetOpacity = isExpanded ? 1 : 0;

        Animated.parallel([
            Animated.timing(animatedMaxHeight, {
                toValue: targetMaxHeight,
                duration: 220,
                easing: isExpanded ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
                useNativeDriver: false,
            }),
            Animated.timing(animatedOpacity, {
                toValue: targetOpacity,
                duration: 180,
                useNativeDriver: false,
            }),
        ]).start();
    }, [animatedMaxHeight, animatedOpacity, isExpanded, projectListHeight]);

    return (
        <View style={styles.container}>
            <Pressable
                style={[styles.header, isHeaderHovered && styles.headerHovered]}
                onHoverIn={() => setIsHeaderHovered(true)}
                onHoverOut={() => setIsHeaderHovered(false)}
                onPress={() => setIsExpanded(prev => !prev)}
            >
                <Text style={styles.title}>My Projects</Text>
                <View style={styles.headerActions}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={COLORS.OFF_WHITE} />
                    ) : (
                        <Pressable
                            style={[styles.toggleIconButton, isToggleHovered && styles.toggleIconButtonHovered]}
                            onHoverIn={() => setIsToggleHovered(true)}
                            onHoverOut={() => setIsToggleHovered(false)}
                            onPress={(event) => event.stopPropagation()}
                        >
                            <Ionicons
                                name={isExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                                size={16}
                                color={COLORS.OFF_WHITE}
                            />
                        </Pressable>
                    )}
                </View>
            </Pressable>

            <Animated.View
                style={{
                    maxHeight: animatedMaxHeight,
                    opacity: animatedOpacity,
                    overflow: 'hidden',
                }}
            >
                <View
                    style={styles.projectList}
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        if (height !== projectListHeight) {
                            setProjectListHeight(height + 50);
                        }
                    }}>
                    {renderProjectTree(ROOT_PARENT_ID)}
                </View>
            </Animated.View>
            <ProjectMenu
                visible={activeProjectMenuId !== null}
                top={projectMenuPosition.top}
                left={projectMenuPosition.left}
                options={PROJECT_MENU_OPTIONS}
                onClose={() => setActiveProjectMenuId(null)}
                onSelect={() => setActiveProjectMenuId(null)}
            />
        </View>
    );
};

export default Projects;
