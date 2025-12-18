import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthProvider';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, GraduationCap, Hash } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentId: '',
        major: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const majors = [
        'Software Engineering',
        'Information Technology',
        'Computer Science',
        'Information Systems',
        'Data Science'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validation
        if (!formData.name || !formData.email || !formData.studentId || !formData.major || !formData.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            setIsLoading(false);
            return;
        }

        // Register with hashed password
        try {
            const result = await register({
                name: formData.name,
                email: formData.email,
                major: formData.major,
                studentId: formData.studentId,
                joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
            }, formData.password);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error || 'Registration failed');
            }
        } catch (err) {
            setError('An error occurred during registration');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex overflow-hidden">
            {/* Left Side - Hero */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:flex flex-1 bg-gradient-to-br from-presuniv-maroon via-red-900 to-presuniv-navy p-6 items-start justify-center relative overflow-hidden pt-20"
            >
                {/* Decorative Elements */}
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                />
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.7 }}
                    className="relative z-10 text-white max-w-md"
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm mb-3"
                    >
                        <GraduationCap size={24} />
                    </motion.div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                        Start Your Learning Journey Today
                    </h2>
                    <p className="text-sm lg:text-base text-red-100 mb-4 leading-relaxed">
                        Join thousands of President University students mastering web development with PULSE.
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 lg:gap-3">
                        {[
                            { value: '16', label: 'Courses' },
                            { value: '100+', label: 'Lessons' },
                            { value: '1000+', label: 'Students' }
                        ].map((stat, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                className="text-center p-2 lg:p-2.5 bg-white/10 backdrop-blur-sm rounded-lg"
                            >
                                <div className="text-lg lg:text-xl font-bold mb-0.5">{stat.value}</div>
                                <div className="text-xs text-red-100">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-1 bg-white overflow-y-auto"
            >
                <div className="h-full flex items-start justify-center p-6 py-8">
                    <div className="w-full max-w-md my-auto">
                        {/* Logo */}
                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-center mb-4"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-presuniv-maroon to-presuniv-navy mb-2">
                                <span className="text-lg font-bold text-white">P</span>
                            </div>
                            <h1 className="text-xl font-bold text-slate-900 mb-1">Create Account</h1>
                            <p className="text-xs text-slate-600">Join PULSE and start learning today</p>
                        </motion.div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <motion.form 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        onSubmit={handleSubmit} 
                        className="space-y-3"
                    >
                        {/* Full Name */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                    placeholder="your.email@gmail.com"
                                />
                            </div>
                        </div>

                        {/* Student ID */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Student ID
                            </label>
                            <div className="relative">
                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    value={formData.studentId}
                                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                    placeholder="00000012345"
                                />
                            </div>
                        </div>

                        {/* Major */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Major
                            </label>
                            <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <select
                                    value={formData.major}
                                    onChange={(e) => setFormData({...formData, major: e.target.value})}
                                    className="w-full pl-9 pr-3 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors appearance-none bg-white text-sm"
                                >
                                    <option value="">Select your major</option>
                                    {majors.map(major => (
                                        <option key={major} value={major}>{major}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full pl-9 pr-9 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    className="w-full pl-9 pr-9 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" required className="w-4 h-4 mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm text-slate-600">
                                I agree to the <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                            </span>
                        </label>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2 bg-gradient-to-r from-presuniv-maroon to-presuniv-navy text-white rounded-lg font-bold hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={20} />
                                    Create Account
                                </>
                            )}
                        </button>
                    </motion.form>

                        {/* Sign In Link */}
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="mt-3 text-center text-xs text-slate-600"
                        >
                            Already have an account?{' '}
                            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
                                Sign in
                            </Link>
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
