import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

const ProgressContext = createContext({});

export const useProgress = () => useContext(ProgressContext);

export const ProgressProvider = ({ children }) => {
    const { user } = useAuth();
    const [completedCourses, setCompletedCourses] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            loadProgress();
        } else {
            // Guest mode - load from localStorage
            loadLocalProgress();
        }
    }, [user]);

    const loadProgress = async () => {
        // TODO: Load from Supabase
        // For now, load from localStorage
        loadLocalProgress();
    };

    const loadLocalProgress = () => {
        try {
            // Use user email as key for separate progress per user
            const userKey = user?.email || 'guest';
            const savedCourses = localStorage.getItem(`pulse_progress_courses_${userKey}`);
            const savedItems = localStorage.getItem(`pulse_progress_items_${userKey}`);
            
            if (savedCourses) {
                setCompletedCourses(JSON.parse(savedCourses));
            }
            if (savedItems) {
                setCompletedItems(JSON.parse(savedItems));
            }
        } catch (error) {
            console.error('Error loading progress:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveProgress = (courses, items) => {
        try {
            // Use user email as key for separate progress per user
            const userKey = user?.email || 'guest';
            localStorage.setItem(`pulse_progress_courses_${userKey}`, JSON.stringify(courses));
            localStorage.setItem(`pulse_progress_items_${userKey}`, JSON.stringify(items));
            
            // TODO: Save to Supabase if user is logged in
            if (user) {
                // await supabase.from('progress').upsert(...)
            }
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    };

    const markCourseComplete = (courseId) => {
        const updated = [...new Set([...completedCourses, courseId])];
        setCompletedCourses(updated);
        saveProgress(updated, completedItems);
    };

    const markItemComplete = (itemId) => {
        const updated = [...new Set([...completedItems, itemId])];
        setCompletedItems(updated);
        saveProgress(completedCourses, updated);
    };

    const isItemCompleted = (itemId) => {
        return completedItems.includes(itemId);
    };

    const isCourseCompleted = (courseId) => {
        return completedCourses.includes(courseId);
    };

    const getCourseItemsCompleted = (courseId, allItemIds) => {
        return allItemIds.filter(id => completedItems.includes(id)).length;
    };

    const resetProgress = () => {
        setCompletedCourses([]);
        setCompletedItems([]);
        const userKey = user?.email || 'guest';
        localStorage.removeItem(`pulse_progress_courses_${userKey}`);
        localStorage.removeItem(`pulse_progress_items_${userKey}`);
    };

    const value = {
        completedCourses,
        completedItems,
        loading,
        markCourseComplete,
        markItemComplete,
        isItemCompleted,
        isCourseCompleted,
        getCourseItemsCompleted,
        resetProgress
    };

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};
