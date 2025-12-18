# PULSE Admin Accounts Setup

## 📋 Overview

File ini berisi 3 akun admin yang sudah di-setup dengan **semua course 100% complete** untuk keperluan testing dan pengecekan materi.

**Note**: Email menggunakan Gmail untuk kemudahan akses. PULSE mendukung email dari domain apapun (Gmail, Yahoo, Outlook, dll).

## 👥 Admin Accounts

### Account 1
- **Name**: Admin One
- **Email**: `admin1@gmail.com`
- **Password**: `Admin123!`
- **Major**: Software Engineering
- **Status**: All 10 courses completed (100%)

### Account 2
- **Name**: Admin Two
- **Email**: `admin2@gmail.com`
- **Password**: `Admin123!`
- **Major**: Information Technology
- **Status**: All 10 courses completed (100%)

### Account 3
- **Name**: Admin Three
- **Email**: `admin3@gmail.com`
- **Password**: `Admin123!`
- **Major**: Computer Science
- **Status**: All 10 courses completed (100%)

---

## 🚀 How to Setup (RECOMMENDED - Simple Method)

### Step 1: Register Accounts
Register 3 admin accounts manually through the Register page:

1. Go to `/register` page
2. Register these accounts:

**Account 1:**
- Name: Admin One
- Email: `admin1@gmail.com`
- Student ID: `00000000001`
- Major: Software Engineering
- Password: `Admin123!`

**Account 2:**
- Name: Admin Two
- Email: `admin2@gmail.com`
- Student ID: `00000000002`
- Major: Information Technology
- Password: `Admin123!`

**Account 3:**
- Name: Admin Three
- Email: `admin3@gmail.com`
- Student ID: `00000000003`
- Major: Computer Science
- Password: `Admin123!`

### Step 2: Set Progress to 100%
After registering, login with one of the accounts, then:

1. Open browser console (F12)
2. Open file `setup-admin-simple.js`
3. Copy ALL content
4. Paste into console
5. Press Enter
6. Refresh page

### Step 3: Repeat for Other Accounts
Logout, login with the next admin account, and repeat Step 2.

---

## 🚀 Alternative Method (Advanced - May Not Work)

### Step 1: Start the Application
```bash
npm run dev
```

### Step 2: Open Browser Console
1. Open your PULSE application in browser (http://localhost:5173)
2. Press `F12` or Right Click → `Inspect` → `Console` tab

### Step 3: Run Setup Script
1. Open file `setup-admin-accounts.js`
2. Copy **ALL** the content (Ctrl+A, Ctrl+C)
3. Paste into browser console (Ctrl+V)
4. Press `Enter` to execute

### Step 4: Verify
You should see output like:
```
🚀 Starting PULSE Admin Account Setup...

✅ Created admin account: admin1@presuniv.ac.id
   Name: Admin One
   Major: Software Engineering
   Password: Admin123!
   All courses: 100% complete

✅ Created admin account: admin2@presuniv.ac.id
   Name: Admin Two
   Major: Information Technology
   Password: Admin123!
   All courses: 100% complete

✅ Created admin account: admin3@presuniv.ac.id
   Name: Admin Three
   Major: Computer Science
   Password: Admin123!
   All courses: 100% complete

🎉 Admin account setup complete!
```

### Step 5: Login
1. Go to login page
2. Use any of the admin credentials above
3. All courses will show 100% complete

---

## 🔧 How to Setup (Method 2: Manual)

If the script doesn't work, you can manually create accounts:

### Step 1: Register Normally
1. Go to Register page
2. Fill in the form with admin credentials
3. Submit

### Step 2: Complete All Courses Manually
- Go through each course and mark as complete
- Or use the browser console to set progress manually

---

## 📊 What's Included

Each admin account has **100% completion** for all courses:

| Course | Units | Status |
|--------|-------|--------|
| HTML5 Fundamentals | 4 | ✅ Complete |
| CSS3 Styling | 5 | ✅ Complete |
| JavaScript Basics | 6 | ✅ Complete |
| Git & GitHub | 4 | ✅ Complete |
| Tailwind CSS | 5 | ✅ Complete |
| DOM Manipulation | 3 | ✅ Complete |
| PHP Fundamentals | 4 | ✅ Complete |
| MySQL (SQL) | 5 | ✅ Complete |
| Python Programming | 5 | ✅ Complete |
| React Development | 5 | ✅ Complete |

### Progress Details
- ✅ All lessons marked as complete
- ✅ All tasks checked off
- ✅ All quizzes scored 100%
- ✅ All projects completed
- ✅ All units unlocked
- ✅ All courses accessible

---

## 🎯 Use Cases

### 1. Content Review
Login as admin to review all course materials without completing tasks:
```
Email: admin1@gmail.com
Password: Admin123!
```

### 2. Testing Navigation
Test course navigation and progress tracking:
```
Email: admin2@gmail.com
Password: Admin123!
```

### 3. Demo/Presentation
Show completed profile for demos:
```
Email: admin3@gmail.com
Password: Admin123!
```

---

## 🔍 Verification Checklist

After setup, verify these features:

### Dashboard
- [ ] All 10 courses show 100% progress
- [ ] All courses are unlocked (no lock icons)
- [ ] Can click any course to view syllabus

### Course Syllabus
- [ ] All units show checkmarks
- [ ] All lessons marked as complete
- [ ] Can navigate to any lesson

### Learning Interface
- [ ] Can view any lesson content
- [ ] All tasks show as completed
- [ ] Can navigate prev/next freely

### Profile Page
- [ ] Shows correct admin name and major
- [ ] Displays all courses with 100% progress
- [ ] Statistics show 10/10 courses completed

---

## 🛠 Troubleshooting

### Script doesn't run
**Problem**: Error in console when running script

**Solution**:
1. Make sure app is fully loaded
2. Check if bcrypt is available: `console.log(window.dcodeIO?.bcrypt)`
3. Try refreshing page and running again

### Accounts already exist
**Problem**: "User already exists" message

**Solution**:
1. Clear localStorage: `localStorage.clear()`
2. Refresh page
3. Run script again

### Progress not showing
**Problem**: Courses show 0% progress

**Solution**:
1. Check localStorage: `localStorage.getItem('pulse_progress_admin1@presuniv.ac.id')`
2. If null, run script again
3. Logout and login again

### Can't login
**Problem**: Invalid credentials error

**Solution**:
1. Check if user exists: `JSON.parse(localStorage.getItem('pulse_users'))`
2. Verify email is exactly: `admin1@gmail.com`
3. Password is case-sensitive: `Admin123!`

---

## 🔐 Security Notes

### For Development Only
⚠️ **Warning**: These accounts are for **development and testing only**!

- Passwords are simple and documented
- All data stored in localStorage (not secure)
- Do NOT use in production
- Do NOT use real student data

### Production Recommendations
When deploying to production:

1. **Remove these accounts** or change passwords
2. **Use backend authentication** (Supabase, Firebase, etc.)
3. **Implement proper admin roles** with permissions
4. **Use environment variables** for admin credentials
5. **Enable 2FA** for admin accounts

---

## 📝 Notes

### localStorage Keys
Admin accounts create these localStorage entries:
```
pulse_users                              // All users array
pulse_progress_admin1@gmail.com         // Admin 1 progress
pulse_progress_admin2@gmail.com         // Admin 2 progress
pulse_progress_admin3@gmail.com         // Admin 3 progress
```

### Clearing Data
To remove admin accounts:
```javascript
// Remove all users
localStorage.removeItem('pulse_users');

// Remove admin progress
localStorage.removeItem('pulse_progress_admin1@gmail.com');
localStorage.removeItem('pulse_progress_admin2@gmail.com');
localStorage.removeItem('pulse_progress_admin3@gmail.com');

// Or clear everything
localStorage.clear();
```

### Re-running Script
You can run the script multiple times:
- Existing accounts will be skipped
- Only new accounts will be created
- Progress will be regenerated

---

## 🎓 Quick Reference

### Login Credentials (Copy-Paste Ready)

**Admin 1:**
```
Email: admin1@gmail.com
Password: Admin123!
```

**Admin 2:**
```
Email: admin2@gmail.com
Password: Admin123!
```

**Admin 3:**
```
Email: admin3@gmail.com
Password: Admin123!
```

---

## 📞 Support

If you encounter issues:

1. Check browser console for errors
2. Verify app is running (`npm run dev`)
3. Try clearing localStorage and re-running script
4. Check if bcrypt is loaded in the app

---

## ✅ Success Indicators

You'll know setup worked when:

- ✅ Console shows "Admin account setup complete!"
- ✅ Can login with admin credentials
- ✅ Dashboard shows all courses at 100%
- ✅ Profile shows 10/10 courses completed
- ✅ Can access any lesson in any course

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Purpose**: Development & Testing Only
