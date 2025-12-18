# Database Status - PULSE

## 🔴 Current Status: localStorage Only

PULSE currently uses **browser localStorage** for all data storage. There is **NO backend database** yet.

---

## 📦 What's Stored in localStorage

### 1. User Accounts
- **Key**: `pulse_users`
- **Type**: Array of user objects
- **Contains**: 
  - name
  - email
  - major
  - studentId
  - passwordHash (bcrypt)
  - joinedDate
  - isAdmin (optional)

### 2. Current Session
- **Key**: `pulse_user`
- **Type**: Single user object
- **Contains**: Current logged-in user (without passwordHash)

### 3. Progress Data (Per User)
- **Key**: `pulse_progress_courses_{email}`
- **Type**: Array of completed course IDs
- **Example**: `["html5", "css3", "js-basics"]`

- **Key**: `pulse_progress_items_{email}`
- **Type**: Array of completed item IDs
- **Example**: `["html5-1-1", "html5-1-2", "html5-1-quiz", ...]`

---

## ⚠️ Limitations of localStorage

### Security Issues
- ❌ Data is NOT encrypted
- ❌ Accessible via browser DevTools
- ❌ Vulnerable to XSS attacks
- ❌ Password hashes visible in localStorage

### Functionality Issues
- ❌ No sync across devices
- ❌ No sync across browsers
- ❌ Data lost if browser cache cleared
- ❌ 5-10MB storage limit
- ❌ No real-time updates
- ❌ No backup/recovery

### Multi-user Issues
- ❌ All data stored on client
- ❌ No centralized user management
- ❌ No admin dashboard
- ❌ No analytics/reporting

---

## ✅ What Works

Despite using localStorage, these features work:
- ✅ User registration and login
- ✅ Password encryption (bcrypt)
- ✅ Progress tracking per user
- ✅ Course completion tracking
- ✅ Multiple user accounts
- ✅ Session persistence (until logout)

---

## 🚀 Future: Supabase Integration (TODO)

### Planned Features

#### Phase 1: Basic Backend
- [ ] Supabase project setup
- [ ] User authentication (Supabase Auth)
- [ ] User profiles table
- [ ] Progress tracking table
- [ ] Migrate localStorage data to Supabase

#### Phase 2: Enhanced Features
- [ ] Real-time progress sync
- [ ] Cross-device sync
- [ ] OAuth login (Google, GitHub)
- [ ] Password reset via email
- [ ] Email verification

#### Phase 3: Admin Features
- [ ] Admin dashboard
- [ ] User management
- [ ] Analytics and reporting
- [ ] Course management
- [ ] Content updates

#### Phase 4: Advanced Features
- [ ] Discussion forums
- [ ] Code sharing
- [ ] Peer review
- [ ] Leaderboards
- [ ] Certificates

---

## 🔧 Migration Plan

### Step 1: Setup Supabase
```bash
# Install Supabase client
npm install @supabase/supabase-js

# Create .env file
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 2: Create Tables
```sql
-- Users table (handled by Supabase Auth)
-- Additional user_profiles table
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  major TEXT,
  student_id TEXT,
  joined_date TIMESTAMP DEFAULT NOW()
);

-- Progress table
CREATE TABLE progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  course_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP,
  UNIQUE(user_id, item_id)
);

-- Course completions
CREATE TABLE course_completions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  course_id TEXT NOT NULL,
  completed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);
```

### Step 3: Update Contexts
- Update `AuthProvider.jsx` to use Supabase Auth
- Update `ProgressProvider.jsx` to use Supabase tables
- Keep localStorage as fallback for offline mode

### Step 4: Data Migration
- Create migration script to move localStorage data to Supabase
- Provide UI for users to migrate their data
- Keep both systems running during transition

---

## 📝 Current Workarounds

### For Development/Testing
1. **Admin Accounts**: Use `admin1@gmail.com`, `admin2@gmail.com`, `admin3@gmail.com`
2. **Admin Bypass**: Admin emails automatically unlock all courses
3. **Progress Script**: Use `setup-admin-progress.js` to set 100% completion

### For Production (When Ready)
1. **Backup Data**: Export localStorage to JSON before clearing
2. **User Migration**: Provide migration tool for existing users
3. **Gradual Rollout**: Test with small group first

---

## 🎯 Why localStorage for Now?

### Pros
- ✅ Zero setup required
- ✅ No hosting costs
- ✅ Fast development
- ✅ Works offline
- ✅ No API calls needed
- ✅ Perfect for prototyping

### Cons
- ❌ Not production-ready
- ❌ No real database features
- ❌ Limited scalability
- ❌ Security concerns

---

## 🔐 Admin Account Detection

Admin accounts are detected by email pattern:
```javascript
// In curriculumStructure.js
if (userEmail && userEmail.startsWith('admin') && userEmail.includes('@gmail.com')) {
    return true; // Unlock all courses
}
```

**Admin emails that work:**
- `admin1@gmail.com`
- `admin2@gmail.com`
- `admin3@gmail.com`
- `admin{anything}@gmail.com`

---

## 📊 Storage Usage

Typical storage per user:
- User account: ~500 bytes
- Progress data: ~2-5 KB (depends on completion)
- Session data: ~300 bytes

**Total for 100 users**: ~500 KB (well within 5MB limit)

---

## 🚨 Important Notes

### For Students
- ⚠️ Don't clear browser cache or you'll lose progress
- ⚠️ Use same browser and device
- ⚠️ Bookmark the site for easy access
- ⚠️ Complete courses in one sitting if possible

### For Developers
- ⚠️ This is NOT production-ready
- ⚠️ Migrate to Supabase before deploying
- ⚠️ Don't store sensitive data in localStorage
- ⚠️ Always hash passwords (we use bcrypt)

### For Admins
- ⚠️ No centralized user management
- ⚠️ No way to reset user passwords
- ⚠️ No analytics or reporting
- ⚠️ Manual user support required

---

## 📞 Questions?

**Q: When will Supabase be integrated?**
A: It's on the roadmap but no ETA yet. localStorage works fine for development and small-scale testing.

**Q: Will my data be lost when migrating to Supabase?**
A: No, we'll provide a migration tool to transfer your localStorage data to Supabase.

**Q: Can I use this in production?**
A: Not recommended. localStorage is fine for prototypes and small-scale testing, but use a real database for production.

**Q: How do I backup my data?**
A: Open browser console and run:
```javascript
const backup = {
  users: localStorage.getItem('pulse_users'),
  currentUser: localStorage.getItem('pulse_user'),
  progress: {}
};
// Get all progress keys
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('pulse_progress_')) {
    backup.progress[key] = localStorage.getItem(key);
  }
});
console.log(JSON.stringify(backup));
// Copy the output and save to a file
```

---

**Last Updated**: December 2024
**Status**: Development / Prototype
**Database**: localStorage (Supabase TODO)
