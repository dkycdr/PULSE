# PULSE Course Structure

## Overview

PULSE menggunakan struktur learning yang mirip Codecademy dengan 4 tipe konten berbeda.

## Content Types

### 1. **LESSON** - Interactive Coding
- 3-panel layout: Instructions | Code Editor | Live Preview
- Task validation dengan regex
- Real-time code execution
- Console output
- Progress tracking

### 2. **QUIZ** - Multiple Choice
- Multiple choice questions
- Instant feedback dengan explanation
- Scoring system (passing grade: 70%)
- Retry option jika gagal

### 3. **PROJECT** - Hands-on Project
- Larger coding challenge
- Multiple tasks to complete
- Starter files provided
- Real-world application

### 4. **INFORMATIONAL** - Reading Material
- Markdown-based content
- Concepts & theory
- No coding required
- "Mark as complete" button

## Course Structure

```
Course
├── Unit 1
│   ├── Informational (intro)
│   ├── Lesson 1
│   ├── Lesson 2
│   └── Quiz
├── Unit 2
│   ├── Informational
│   ├── Lesson 1
│   ├── Lesson 2
│   └── Quiz
└── Unit 3 (Final)
    ├── Project
    └── Informational (summary)
```

## Flow

```
Dashboard
    ↓
Course Syllabus (expandable units)
    ↓
Individual Item (Lesson/Quiz/Project/Info)
    ↓
Next Item → ... → Course Complete
```

## Adding a New Course

### 1. Create Course File

```javascript
// src/data/courses/yourCourse.js
import { CONTENT_TYPES } from '../curriculumStructure';

export const yourCourse = {
    id: 'your-course',
    title: 'Your Course Title',
    description: 'Course description',
    
    units: [
        {
            id: 'your-course-unit-1',
            title: 'Unit Title',
            description: 'Unit description',
            items: [
                {
                    id: 'your-course-1-1',
                    type: CONTENT_TYPES.INFORMATIONAL,
                    title: 'Item Title',
                    duration: '5 min read',
                    content: `# Markdown content here`
                },
                {
                    id: 'your-course-1-2',
                    type: CONTENT_TYPES.LESSON,
                    title: 'Lesson Title',
                    duration: '20 min',
                    content: `# Lesson content`,
                    tasks: [
                        {
                            id: 1,
                            description: 'Task description',
                            completed: false,
                            regex: /validation-regex/
                        }
                    ],
                    files: [
                        {
                            name: 'index.html',
                            language: 'html',
                            content: '<!-- starter code -->'
                        },
                        {
                            name: 'style.css',
                            language: 'css',
                            content: '/* styles */'
                        },
                        {
                            name: 'script.js',
                            language: 'javascript',
                            content: '// JavaScript'
                        }
                    ]
                },
                {
                    id: 'your-course-1-3',
                    type: CONTENT_TYPES.QUIZ,
                    title: 'Quiz Title',
                    duration: '5 min',
                    questions: [
                        {
                            id: 'q1',
                            question: 'Question text?',
                            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
                            correctIndex: 0,
                            explanation: 'Explanation why this is correct'
                        }
                    ]
                },
                {
                    id: 'your-course-1-4',
                    type: CONTENT_TYPES.PROJECT,
                    title: 'Project Title',
                    duration: '60 min',
                    difficulty: 'Beginner',
                    description: 'Project description',
                    content: `# Project requirements`,
                    tasks: [/* same as lesson */],
                    starterFiles: [/* same as lesson files */]
                }
            ]
        }
    ]
};

export default yourCourse;
```

### 2. Add to curriculumStructure.js

```javascript
export const courses = {
    // ... existing courses
    'your-course': {
        id: 'your-course',
        title: 'Your Course Title',
        level: 'beginner', // or 'intermediate', 'advanced'
        order: 17,
        duration: '8 hours',
        prerequisites: ['html5', 'css3'],
        shortDesc: 'Short description',
        icon: 'your-course',
        totalUnits: 4
    }
};
```

### 3. Import in index.js

```javascript
import yourCourse from './yourCourse';

export const courseContent = {
    // ... existing
    'your-course': yourCourse
};
```

### 4. Add Icon to Dashboard

```javascript
// src/pages/Dashboard.jsx
const COURSE_ICONS = {
    // ... existing
    'your-course': <YourIcon size={24} className="text-color" />
};
```

## Task Validation

Tasks menggunakan regex untuk validasi:

```javascript
{
    id: 1,
    description: 'Create a function called greet',
    completed: false,
    regex: /function\s+greet\s*\(/
}
```

Tips:
- Test regex di https://regex101.com
- Use `[\s\S]*` untuk match anything including newlines
- Use `[^>]*` untuk match attributes
- Case insensitive: add `i` flag → `/pattern/i`

## Current Courses

1. **HTML5 Fundamentals** (4 units, 12 items)
   - Introduction to HTML
   - Semantic HTML
   - HTML Forms
   - Final Project

2. **CSS3 Styling** (5 units, ~15 items)
   - CSS Fundamentals
   - Box Model
   - Flexbox Layout
   - Colors & Typography
   - Final Project

3. **JavaScript Basics** (6 units, ~20 items)
   - Introduction
   - Variables & Data Types
   - Operators & Expressions
   - Conditionals
   - Loops
   - Functions & Final Project

4. **React.js Fundamentals** (4 units, ~15 items)
   - Introduction to React
   - Props
   - State with useState
   - useEffect & Final Project

## TODO

- [ ] Add remaining courses (Git, Tailwind, DOM, PHP, MySQL, Python, TypeScript, Node.js, MongoDB, Next.js, CI/CD)
- [ ] Integrate Supabase for progress tracking
- [ ] Add user authentication flow
- [ ] Implement certificate generation
- [ ] Add code hints/autocomplete
- [ ] Add video tutorials
- [ ] Community forum integration
