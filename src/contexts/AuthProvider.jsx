import { createContext, useContext, useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for existing user
        const storedUser = localStorage.getItem('pulse_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const register = async (userData, password) => {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Store user with hashed password
        const userWithAuth = {
            ...userData,
            passwordHash: hashedPassword,
        };
        
        // Store in localStorage (in production, this would be sent to backend)
        const users = JSON.parse(localStorage.getItem('pulse_users') || '[]');
        users.push(userWithAuth);
        localStorage.setItem('pulse_users', JSON.stringify(users));
        
        // Login user (don't store password hash in session)
        const { passwordHash, ...userSession } = userWithAuth;
        setUser(userSession);
        localStorage.setItem('pulse_user', JSON.stringify(userSession));
        
        return { success: true };
    };

    const login = async (email, password) => {
        // Get all users
        const users = JSON.parse(localStorage.getItem('pulse_users') || '[]');
        const foundUser = users.find(u => u.email === email);
        
        if (!foundUser) {
            return { success: false, error: 'User not found' };
        }
        
        // Verify password
        const isValid = await bcrypt.compare(password, foundUser.passwordHash);
        
        if (!isValid) {
            return { success: false, error: 'Invalid password' };
        }
        
        // Login user (don't store password hash in session)
        const { passwordHash, ...userSession } = foundUser;
        setUser(userSession);
        localStorage.setItem('pulse_user', JSON.stringify(userSession));
        
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('pulse_user');
    };

    const updateUser = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('pulse_user', JSON.stringify(updatedUser));
        
        // Also update in users list
        const users = JSON.parse(localStorage.getItem('pulse_users') || '[]');
        const userIndex = users.findIndex(u => u.email === user.email);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updates };
            localStorage.setItem('pulse_users', JSON.stringify(users));
        }
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        updateUser,
        // Legacy support
        signOut: logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
