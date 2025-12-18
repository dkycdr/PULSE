// JavaScript Basics - Complete Course Content
import { CONTENT_TYPES } from '../curriculumStructure';

export const jsBasicsCourse = {
    id: 'js-basics',
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of programming with JavaScript - the language of the web.',
    
    units: [
        // ============================================
        // UNIT 1: Introduction to JavaScript
        // ============================================
        {
            id: 'js-unit-1',
            title: 'Introduction to JavaScript',
            description: 'Understand what JavaScript is and write your first code',
            items: [
                {
                    id: 'js-1-1',
                    type: CONTENT_TYPES.INFORMATIONAL,
                    title: 'What is JavaScript?',
                    duration: '5 min read',
                    content: `
# What is JavaScript?

JavaScript is the **programming language of the web**. It makes websites interactive and dynamic.

## The Web Trinity

| Technology | Role | Analogy |
|------------|------|---------|
| HTML | Structure | Skeleton |
| CSS | Styling | Skin & Clothes |
| JavaScript | Behavior | Brain & Muscles |

## What Can JavaScript Do?

- 🖱️ Respond to user clicks, typing, scrolling
- 🔄 Update content without reloading the page
- ✅ Validate forms before submission
- 🎮 Create games and animations
- 📱 Build mobile apps (React Native)
- 🖥️ Build servers (Node.js)

## JavaScript vs Java

Despite the similar names, they are **completely different languages**!

| JavaScript | Java |
|------------|------|
| Runs in browser | Runs on JVM |
| Dynamic typing | Static typing |
| Prototype-based | Class-based |
| Created in 10 days | Years of development |

> 💡 Fun Fact: JavaScript was created by Brendan Eich in just 10 days in 1995!
                    `
                },
                {
                    id: 'js-1-2',
                    type: CONTENT_TYPES.LESSON,
                    title: 'Your First JavaScript',
                    duration: '15 min',
                    content: `
# Your First JavaScript Code

## The Console

The **console** is where JavaScript outputs messages. It's your best friend for debugging!

\`\`\`javascript
console.log("Hello, World!");
console.log(42);
console.log(true);
\`\`\`

## Where to Write JavaScript

### 1. Inline (in HTML)
\`\`\`html
<button onclick="alert('Clicked!')">Click Me</button>
\`\`\`

### 2. Internal (in \`<script>\` tag)
\`\`\`html
<script>
    console.log("Hello from script tag!");
</script>
\`\`\`

### 3. External (separate .js file) ✅ Best Practice
\`\`\`html
<script src="script.js"></script>
\`\`\`

## Comments

\`\`\`javascript
// This is a single-line comment

/* This is a
   multi-line comment */
\`\`\`

---

## Your Mission
Write your first JavaScript code using console.log()
                    `,
                    tasks: [
                        { id: 1, description: 'Use console.log() to print "Hello, PULSE!"', completed: false, regex: /console\.log\s*\(\s*["']Hello,?\s*PULSE!?["']\s*\)/i },
                        { id: 2, description: 'Print your student ID as a number', completed: false, regex: /console\.log\s*\(\s*\d+\s*\)/ },
                        { id: 3, description: 'Print true or false (boolean)', completed: false, regex: /console\.log\s*\(\s*(true|false)\s*\)/ },
                        { id: 4, description: 'Add a comment explaining your code', completed: false, regex: /\/\/.*|\/\*[\s\S]*?\*\// }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html>
<head><title>First JS</title></head>
<body>
    <h1>Check the Console!</h1>
    <p>Press F12 or right-click > Inspect > Console</p>
    <script src="script.js"></script>
</body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: 'Courier New', monospace; background: #1a1a2e; color: #eee; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
h1 { color: #00ff88; }` },
                        { name: 'script.js', language: 'javascript', content: `// Welcome to JavaScript!
// Write your code below:

` }
                    ]
                },
                {
                    id: 'js-1-quiz',
                    type: CONTENT_TYPES.QUIZ,
                    title: 'JavaScript Intro Quiz',
                    duration: '3 min',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the best practice for including JavaScript in HTML?',
                            options: ['Inline onclick', 'Internal <script>', 'External .js file', 'All are equal'],
                            correctIndex: 2,
                            explanation: 'External files keep code organized, cacheable, and reusable across pages.'
                        },
                        {
                            id: 'q2',
                            question: 'Which method outputs to the browser console?',
                            options: ['print()', 'echo()', 'console.log()', 'output()'],
                            correctIndex: 2,
                            explanation: 'console.log() is the standard way to output debug information in JavaScript.'
                        }
                    ]
                }
            ]
        },

        // ============================================
        // UNIT 2: Variables & Data Types
        // ============================================
        {
            id: 'js-unit-2',
            title: 'Variables & Data Types',
            description: 'Store and manipulate different types of data',
            items: [
                {
                    id: 'js-2-1',
                    type: CONTENT_TYPES.INFORMATIONAL,
                    title: 'Understanding Variables',
                    duration: '5 min read',
                    content: `
# Understanding Variables

A **variable** is a container for storing data. Think of it as a labeled box.

## Declaring Variables

JavaScript has 3 ways to declare variables:

\`\`\`javascript
var name = "Alice";    // Old way (avoid!)
let age = 21;          // Modern, can be reassigned
const PI = 3.14159;    // Constant, cannot change
\`\`\`

## let vs const

| Keyword | Can Reassign? | Use When |
|---------|---------------|----------|
| \`let\` | ✅ Yes | Value will change |
| \`const\` | ❌ No | Value stays the same |

### Examples
\`\`\`javascript
let score = 0;
score = 10;        // ✅ OK

const MAX = 100;
MAX = 200;         // ❌ Error!
\`\`\`

## Naming Rules

✅ Valid: \`userName\`, \`user_name\`, \`_private\`, \`$price\`, \`camelCase\`
❌ Invalid: \`2fast\`, \`my-var\`, \`class\`, \`for\`

> 💡 Convention: Use **camelCase** for variables (\`firstName\`, \`totalPrice\`)
                    `
                },
                {
                    id: 'js-2-2',
                    type: CONTENT_TYPES.LESSON,
                    title: 'Data Types',
                    duration: '20 min',
                    content: `
# JavaScript Data Types

## Primitive Types

### 1. String (Text)
\`\`\`javascript
let name = "Alice";
let greeting = 'Hello';
let template = \`Hi, \${name}!\`;  // Template literal
\`\`\`

### 2. Number
\`\`\`javascript
let age = 21;
let price = 99.99;
let negative = -50;
\`\`\`

### 3. Boolean
\`\`\`javascript
let isStudent = true;
let hasGraduated = false;
\`\`\`

### 4. Undefined & Null
\`\`\`javascript
let x;              // undefined (not assigned)
let y = null;       // null (intentionally empty)
\`\`\`

## Checking Types

\`\`\`javascript
typeof "Hello"     // "string"
typeof 42          // "number"
typeof true        // "boolean"
typeof undefined   // "undefined"
\`\`\`

---

## Your Mission
Create variables of different types for a student profile.
                    `,
                    tasks: [
                        { id: 1, description: 'Create a string variable for student name', completed: false, regex: /(let|const)\s+\w+\s*=\s*["'][^"']+["']/ },
                        { id: 2, description: 'Create a number variable for age', completed: false, regex: /(let|const)\s+\w*[Aa]ge\w*\s*=\s*\d+/ },
                        { id: 3, description: 'Create a number variable for GPA (decimal)', completed: false, regex: /(let|const)\s+\w*[Gg][Pp][Aa]\w*\s*=\s*\d+\.\d+/ },
                        { id: 4, description: 'Create a boolean for isActive', completed: false, regex: /(let|const)\s+\w*[Aa]ctive\w*\s*=\s*(true|false)/ },
                        { id: 5, description: 'Use console.log with typeof to check a type', completed: false, regex: /console\.log\s*\(\s*typeof\s+\w+\s*\)/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Variables</title></head>
<body>
    <h1>Student Profile Variables</h1>
    <p>Check console for output</p>
    <script src="script.js"></script>
</body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; background: #f5f5f5; }` },
                        { name: 'script.js', language: 'javascript', content: `// Create student profile variables

// 1. Student name (string)


// 2. Age (number)


// 3. GPA (decimal number)


// 4. Is active student? (boolean)


// 5. Check type of one variable
` }
                    ]
                },
                {
                    id: 'js-2-3',
                    type: CONTENT_TYPES.LESSON,
                    title: 'String Operations',
                    duration: '15 min',
                    content: `
# String Operations

## String Concatenation

\`\`\`javascript
let first = "John";
let last = "Doe";

// Old way
let full1 = first + " " + last;

// Modern way (Template Literals) ✅
let full2 = \`\${first} \${last}\`;
\`\`\`

## String Properties & Methods

\`\`\`javascript
let text = "President University";

text.length           // 20
text.toUpperCase()    // "PRESIDENT UNIVERSITY"
text.toLowerCase()    // "president university"
text.includes("Uni")  // true
text.startsWith("Pre") // true
text.slice(0, 9)      // "President"
text.replace("University", "Univ")  // "President Univ"
\`\`\`

---

## Your Mission
Practice string manipulation with student data.
                    `,
                    tasks: [
                        { id: 1, description: 'Create firstName and lastName variables', completed: false, regex: /(let|const)\s+firstName\s*=[\s\S]*(let|const)\s+lastName\s*=/ },
                        { id: 2, description: 'Combine them using template literal', completed: false, regex: /`[^`]*\$\{[^}]+\}[^`]*\$\{[^}]+\}[^`]*`/ },
                        { id: 3, description: 'Use .toUpperCase() on a string', completed: false, regex: /\.toUpperCase\s*\(\s*\)/ },
                        { id: 4, description: 'Check string length with .length', completed: false, regex: /\.length/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Strings</title></head>
<body><h1>String Operations</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; }` },
                        { name: 'script.js', language: 'javascript', content: `// String Operations Practice

// 1. Create firstName and lastName


// 2. Combine using template literal
let fullName = 

// 3. Convert to uppercase


// 4. Get the length

console.log(fullName);
` }
                    ]
                },
                {
                    id: 'js-2-quiz',
                    type: CONTENT_TYPES.QUIZ,
                    title: 'Variables Quiz',
                    duration: '5 min',
                    questions: [
                        {
                            id: 'q1',
                            question: 'Which keyword creates a variable that cannot be reassigned?',
                            options: ['var', 'let', 'const', 'static'],
                            correctIndex: 2,
                            explanation: 'const creates a constant that cannot be reassigned after initialization.'
                        },
                        {
                            id: 'q2',
                            question: 'What is the result of typeof "42"?',
                            options: ['"number"', '"string"', '"integer"', '"text"'],
                            correctIndex: 1,
                            explanation: 'Anything in quotes is a string, even if it looks like a number.'
                        },
                        {
                            id: 'q3',
                            question: 'Which is the modern way to combine strings?',
                            options: ['str1 + str2', 'str1.concat(str2)', '`${str1} ${str2}`', 'str1 & str2'],
                            correctIndex: 2,
                            explanation: 'Template literals (backticks with ${}) are the modern, readable way.'
                        },
                        {
                            id: 'q4',
                            question: 'What value does an uninitialized variable have?',
                            options: ['null', '0', 'undefined', '""'],
                            correctIndex: 2,
                            explanation: 'Variables declared but not assigned have the value undefined.'
                        }
                    ]
                }
            ]
        },

        // ============================================
        // UNIT 3: Operators & Expressions
        // ============================================
        {
            id: 'js-unit-3',
            title: 'Operators & Expressions',
            description: 'Perform calculations and comparisons',
            items: [
                {
                    id: 'js-3-1',
                    type: CONTENT_TYPES.LESSON,
                    title: 'Arithmetic Operators',
                    duration: '15 min',
                    content: `
# Arithmetic Operators

## Basic Math

\`\`\`javascript
let a = 10, b = 3;

a + b    // 13 (Addition)
a - b    // 7  (Subtraction)
a * b    // 30 (Multiplication)
a / b    // 3.333... (Division)
a % b    // 1  (Modulo - remainder)
a ** b   // 1000 (Exponent - 10³)
\`\`\`

## Increment & Decrement

\`\`\`javascript
let x = 5;
x++;     // x is now 6
x--;     // x is now 5

// Shorthand
x += 10;  // x = x + 10
x -= 3;   // x = x - 3
x *= 2;   // x = x * 2
\`\`\`

## Order of Operations (PEMDAS)

\`\`\`javascript
2 + 3 * 4      // 14 (not 20!)
(2 + 3) * 4    // 20
\`\`\`

---

## Your Mission
Build a simple GPA calculator.
                    `,
                    tasks: [
                        { id: 1, description: 'Create variables for 3 course grades', completed: false, regex: /(let|const)\s+\w+\s*=\s*\d[\s\S]*(let|const)\s+\w+\s*=\s*\d[\s\S]*(let|const)\s+\w+\s*=\s*\d/ },
                        { id: 2, description: 'Calculate the sum of grades', completed: false, regex: /(let|const)\s+\w*[Ss]um\w*\s*=.*\+.*\+/ },
                        { id: 3, description: 'Calculate average (sum / 3)', completed: false, regex: /(let|const)\s+\w*[Aa]vg\w*\s*=.*\/\s*3/ },
                        { id: 4, description: 'Log the average to console', completed: false, regex: /console\.log\s*\(.*[Aa]vg/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>GPA Calculator</title></head>
<body><h1>GPA Calculator</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; }` },
                        { name: 'script.js', language: 'javascript', content: `// GPA Calculator

// 1. Create 3 course grades (0-4 scale)


// 2. Calculate sum


// 3. Calculate average


// 4. Display result
` }
                    ]
                },
                {
                    id: 'js-3-2',
                    type: CONTENT_TYPES.LESSON,
                    title: 'Comparison Operators',
                    duration: '15 min',
                    content: `
# Comparison Operators

Comparisons return **boolean** values (true/false).

## Equality

\`\`\`javascript
5 == "5"     // true  (loose equality - converts types)
5 === "5"    // false (strict equality - checks type too)
5 != "5"     // false
5 !== "5"    // true
\`\`\`

> ⚠️ **Always use === and !==** to avoid unexpected type conversion!

## Relational

\`\`\`javascript
10 > 5       // true
10 < 5       // false
10 >= 10     // true
10 <= 9      // false
\`\`\`

## Logical Operators

\`\`\`javascript
true && true    // true (AND - both must be true)
true || false   // true (OR - at least one true)
!true           // false (NOT - inverts)
\`\`\`

### Real Example
\`\`\`javascript
let age = 20;
let hasID = true;

let canEnter = age >= 18 && hasID;  // true
\`\`\`

---

## Your Mission
Create eligibility checks for a scholarship.
                    `,
                    tasks: [
                        { id: 1, description: 'Create a gpa variable', completed: false, regex: /(let|const)\s+gpa\s*=\s*\d/ },
                        { id: 2, description: 'Check if GPA >= 3.5 using comparison', completed: false, regex: /gpa\s*>=\s*3\.5/ },
                        { id: 3, description: 'Use && (AND) operator', completed: false, regex: /&&/ },
                        { id: 4, description: 'Use === for strict equality check', completed: false, regex: /===/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Comparisons</title></head>
<body><h1>Scholarship Eligibility</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; }` },
                        { name: 'script.js', language: 'javascript', content: `// Scholarship Eligibility Checker

// Student data
let gpa = 3.7;
let semester = 4;
let major = "Software Engineering";

// Check 1: GPA must be >= 3.5


// Check 2: Must be semester 3 or higher


// Check 3: Must be SE major (use ===)


// Combined check: All conditions must be true


console.log("Eligible for scholarship:", /* your variable */);
` }
                    ]
                },
                {
                    id: 'js-3-quiz',
                    type: CONTENT_TYPES.QUIZ,
                    title: 'Operators Quiz',
                    duration: '5 min',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What is the result of 10 % 3?',
                            options: ['3', '3.33', '1', '0'],
                            correctIndex: 2,
                            explanation: 'Modulo (%) returns the remainder. 10 ÷ 3 = 3 remainder 1.'
                        },
                        {
                            id: 'q2',
                            question: 'What is the result of 5 === "5"?',
                            options: ['true', 'false', 'undefined', 'error'],
                            correctIndex: 1,
                            explanation: 'Strict equality (===) checks both value AND type. Number !== String.'
                        },
                        {
                            id: 'q3',
                            question: 'What does && mean?',
                            options: ['OR', 'AND', 'NOT', 'XOR'],
                            correctIndex: 1,
                            explanation: '&& is the AND operator. Both sides must be true for result to be true.'
                        }
                    ]
                }
            ]
        },

        // ============================================
        // UNIT 4: Conditionals
        // ============================================
        {
            id: 'js-unit-4',
            title: 'Conditionals',
            description: 'Make decisions in your code',
            items: [
                {
                    id: 'js-4-1',
                    type: CONTENT_TYPES.LESSON,
                    title: 'If/Else Statements',
                    duration: '20 min',
                    content: `
# If/Else Statements

Conditionals let your code make decisions!

## Basic If

\`\`\`javascript
let grade = 85;

if (grade >= 60) {
    console.log("You passed!");
}
\`\`\`

## If/Else

\`\`\`javascript
if (grade >= 60) {
    console.log("Passed");
} else {
    console.log("Failed");
}
\`\`\`

## If/Else If/Else

\`\`\`javascript
if (grade >= 90) {
    console.log("A");
} else if (grade >= 80) {
    console.log("B");
} else if (grade >= 70) {
    console.log("C");
} else {
    console.log("F");
}
\`\`\`

## Ternary Operator (Shorthand)

\`\`\`javascript
let result = grade >= 60 ? "Pass" : "Fail";
\`\`\`

---

## Your Mission
Build a grade classifier for PresUniv grading system.
                    `,
                    tasks: [
                        { id: 1, description: 'Create a score variable', completed: false, regex: /(let|const)\s+score\s*=\s*\d+/ },
                        { id: 2, description: 'Write an if statement checking score >= 85', completed: false, regex: /if\s*\(\s*score\s*>=\s*85\s*\)/ },
                        { id: 3, description: 'Add else if for score >= 70', completed: false, regex: /else\s+if\s*\(\s*score\s*>=\s*70\s*\)/ },
                        { id: 4, description: 'Add a final else block', completed: false, regex: /}\s*else\s*{/ },
                        { id: 5, description: 'Use console.log inside each block', completed: false, regex: /if[\s\S]*console\.log[\s\S]*else[\s\S]*console\.log/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Grade Classifier</title></head>
<body><h1>PresUniv Grade Classifier</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; }` },
                        { name: 'script.js', language: 'javascript', content: `// PresUniv Grade Classifier
// A: 85-100, B: 70-84, C: 55-69, D: 40-54, E: <40

// 1. Create score variable


// 2-4. Write if/else if/else chain


` }
                    ]
                },
                {
                    id: 'js-4-2',
                    type: CONTENT_TYPES.LESSON,
                    title: 'Switch Statements',
                    duration: '15 min',
                    content: `
# Switch Statements

When you have many conditions checking the same variable, use switch!

## Syntax

\`\`\`javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of week");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Regular day");
}
\`\`\`

## Important: break

Without \`break\`, code "falls through" to next case!

\`\`\`javascript
switch (grade) {
    case "A":
        console.log("Excellent");
        // Missing break! Falls through...
    case "B":
        console.log("Good");
        break;
}
// If grade is "A", prints BOTH "Excellent" AND "Good"!
\`\`\`

---

## Your Mission
Create a course recommender based on major.
                    `,
                    tasks: [
                        { id: 1, description: 'Create a major variable', completed: false, regex: /(let|const)\s+major\s*=/ },
                        { id: 2, description: 'Write a switch statement on major', completed: false, regex: /switch\s*\(\s*major\s*\)/ },
                        { id: 3, description: 'Add at least 2 case blocks', completed: false, regex: /case\s+["'][^"']+["']\s*:[\s\S]*case\s+["'][^"']+["']\s*:/ },
                        { id: 4, description: 'Add break after each case', completed: false, regex: /break\s*;[\s\S]*break\s*;/ },
                        { id: 5, description: 'Add a default case', completed: false, regex: /default\s*:/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Course Recommender</title></head>
<body><h1>Course Recommender</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; }` },
                        { name: 'script.js', language: 'javascript', content: `// Course Recommender by Major

// 1. Create major variable


// 2. Switch statement to recommend courses
// SE -> "Take Web Development"
// IT -> "Take Network Security"
// CS -> "Take Algorithms"
// default -> "See academic advisor"


` }
                    ]
                },
                {
                    id: 'js-4-quiz',
                    type: CONTENT_TYPES.QUIZ,
                    title: 'Conditionals Quiz',
                    duration: '5 min',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What happens if you forget "break" in a switch case?',
                            options: ['Error', 'Code falls through to next case', 'Nothing', 'Loop forever'],
                            correctIndex: 1,
                            explanation: 'Without break, execution continues to the next case (fall-through behavior).'
                        },
                        {
                            id: 'q2',
                            question: 'What is the ternary operator syntax?',
                            options: ['if ? then : else', 'condition ? true : false', 'check ? yes ? no', 'test : true : false'],
                            correctIndex: 1,
                            explanation: 'Ternary syntax: condition ? valueIfTrue : valueIfFalse'
                        }
                    ]
                }
            ]
        },

        // ============================================
        // UNIT 5: Loops
        // ============================================
        {
            id: 'js-unit-5',
            title: 'Loops',
            description: 'Repeat actions efficiently',
            items: [
                {
                    id: 'js-5-1',
                    type: CONTENT_TYPES.LESSON,
                    title: 'For Loops',
                    duration: '20 min',
                    content: `
# For Loops

Loops repeat code a specific number of times.

## Basic For Loop

\`\`\`javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}
\`\`\`

### Anatomy
\`\`\`javascript
for (initialization; condition; update) {
    // code to repeat
}
\`\`\`

## Looping Through Arrays

\`\`\`javascript
let students = ["Alice", "Bob", "Charlie"];

for (let i = 0; i < students.length; i++) {
    console.log(students[i]);
}
\`\`\`

## For...of (Modern Way)

\`\`\`javascript
for (let student of students) {
    console.log(student);
}
\`\`\`

---

## Your Mission
Print a multiplication table.
                    `,
                    tasks: [
                        { id: 1, description: 'Create a for loop starting at 1', completed: false, regex: /for\s*\(\s*(let|var)\s+\w+\s*=\s*1/ },
                        { id: 2, description: 'Loop should run 10 times (i <= 10)', completed: false, regex: /\w+\s*<=\s*10/ },
                        { id: 3, description: 'Use i++ to increment', completed: false, regex: /\w+\+\+/ },
                        { id: 4, description: 'Console.log inside the loop', completed: false, regex: /for[\s\S]*{[\s\S]*console\.log[\s\S]*}/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Loops</title></head>
<body><h1>Multiplication Table</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; }` },
                        { name: 'script.js', language: 'javascript', content: `// Multiplication Table for 7

let number = 7;

// Create a for loop from 1 to 10
// Print: "7 x 1 = 7", "7 x 2 = 14", etc.


` }
                    ]
                },
                {
                    id: 'js-5-2',
                    type: CONTENT_TYPES.LESSON,
                    title: 'While Loops',
                    duration: '15 min',
                    content: `
# While Loops

While loops repeat as long as a condition is true.

## Basic While

\`\`\`javascript
let count = 0;

while (count < 5) {
    console.log(count);
    count++;
}
\`\`\`

## Do...While

Runs at least once, then checks condition:

\`\`\`javascript
let num = 10;

do {
    console.log(num);  // Runs once even though condition is false
    num++;
} while (num < 5);
\`\`\`

## When to Use Which?

| Loop | Use When |
|------|----------|
| for | Know exact number of iterations |
| while | Don't know when to stop |
| do...while | Must run at least once |

## ⚠️ Infinite Loop Warning!

\`\`\`javascript
// DON'T DO THIS!
while (true) {
    console.log("Forever...");
}
\`\`\`

---

## Your Mission
Create a countdown timer.
                    `,
                    tasks: [
                        { id: 1, description: 'Create a countdown variable starting at 10', completed: false, regex: /(let|var)\s+countdown\s*=\s*10/ },
                        { id: 2, description: 'Write a while loop with condition countdown > 0', completed: false, regex: /while\s*\(\s*countdown\s*>\s*0\s*\)/ },
                        { id: 3, description: 'Decrement countdown inside loop (countdown--)', completed: false, regex: /countdown\s*--/ },
                        { id: 4, description: 'Log "Liftoff!" after the loop', completed: false, regex: /console\.log\s*\(\s*["']Liftoff!?["']\s*\)/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Countdown</title></head>
<body><h1>🚀 Rocket Countdown</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; background: #0a192f; color: white; }` },
                        { name: 'script.js', language: 'javascript', content: `// Rocket Countdown

// 1. Start at 10


// 2. While countdown > 0, log the number and decrement


// 3. After loop, log "Liftoff!"

` }
                    ]
                },
                {
                    id: 'js-5-quiz',
                    type: CONTENT_TYPES.QUIZ,
                    title: 'Loops Quiz',
                    duration: '5 min',
                    questions: [
                        {
                            id: 'q1',
                            question: 'How many times does this loop run? for(let i=0; i<3; i++)',
                            options: ['2', '3', '4', 'Infinite'],
                            correctIndex: 1,
                            explanation: 'i starts at 0, runs while < 3, so: 0, 1, 2 = 3 times.'
                        },
                        {
                            id: 'q2',
                            question: 'Which loop always runs at least once?',
                            options: ['for', 'while', 'do...while', 'for...of'],
                            correctIndex: 2,
                            explanation: 'do...while checks the condition AFTER running, so it always executes at least once.'
                        }
                    ]
                }
            ]
        },

        // ============================================
        // UNIT 6: Functions & Final Project
        // ============================================
        {
            id: 'js-unit-6',
            title: 'Functions',
            description: 'Create reusable blocks of code',
            items: [
                {
                    id: 'js-6-1',
                    type: CONTENT_TYPES.LESSON,
                    title: 'Function Basics',
                    duration: '20 min',
                    content: `
# Functions

Functions are reusable blocks of code.

## Declaring Functions

\`\`\`javascript
// Function Declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Function Expression
const greet2 = function(name) {
    return "Hi, " + name;
};

// Arrow Function (Modern)
const greet3 = (name) => "Hey, " + name;
\`\`\`

## Parameters & Arguments

\`\`\`javascript
function add(a, b) {    // a, b are parameters
    return a + b;
}

add(5, 3);              // 5, 3 are arguments
\`\`\`

## Default Parameters

\`\`\`javascript
function greet(name = "Student") {
    return "Hello, " + name;
}

greet();        // "Hello, Student"
greet("Alice"); // "Hello, Alice"
\`\`\`

## Return Values

\`\`\`javascript
function square(n) {
    return n * n;
}

let result = square(5);  // 25
\`\`\`

---

## Your Mission
Create utility functions for a student system.
                    `,
                    tasks: [
                        { id: 1, description: 'Create a function called calculateGPA', completed: false, regex: /function\s+calculateGPA\s*\(/ },
                        { id: 2, description: 'Function should accept a grades parameter', completed: false, regex: /calculateGPA\s*\(\s*grades\s*\)/ },
                        { id: 3, description: 'Use return to return a value', completed: false, regex: /return\s+[^;]+;/ },
                        { id: 4, description: 'Call the function and log the result', completed: false, regex: /console\.log\s*\([\s\S]*calculateGPA\s*\(/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Functions</title></head>
<body><h1>Student Functions</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; }` },
                        { name: 'script.js', language: 'javascript', content: `// Student Utility Functions

// 1. Create calculateGPA function
// It should take an array of grades and return the average


// 2. Test data
let myGrades = [3.5, 3.8, 4.0, 3.2];

// 3. Call function and log result

` }
                    ]
                },
                {
                    id: 'js-6-2',
                    type: CONTENT_TYPES.LESSON,
                    title: 'Arrays & Array Methods',
                    duration: '20 min',
                    content: `
# Arrays

Arrays store multiple values in a single variable.

## Creating Arrays

\`\`\`javascript
let fruits = ["Apple", "Banana", "Orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = ["text", 42, true, null];
\`\`\`

## Accessing Elements

\`\`\`javascript
fruits[0]    // "Apple" (first)
fruits[2]    // "Orange" (third)
fruits.length // 3
\`\`\`

## Common Methods

\`\`\`javascript
// Add/Remove
fruits.push("Mango");     // Add to end
fruits.pop();             // Remove from end
fruits.unshift("Grape");  // Add to start
fruits.shift();           // Remove from start

// Find
fruits.indexOf("Banana"); // 1
fruits.includes("Apple"); // true

// Transform
fruits.join(", ");        // "Apple, Banana, Orange"
fruits.reverse();         // Reverses array
fruits.slice(0, 2);       // ["Apple", "Banana"]
\`\`\`

---

## Your Mission
Manage a student roster.
                    `,
                    tasks: [
                        { id: 1, description: 'Create an array called students', completed: false, regex: /(let|const)\s+students\s*=\s*\[/ },
                        { id: 2, description: 'Add a student using push()', completed: false, regex: /students\.push\s*\(/ },
                        { id: 3, description: 'Access the first student with [0]', completed: false, regex: /students\s*\[\s*0\s*\]/ },
                        { id: 4, description: 'Log the array length', completed: false, regex: /students\.length/ }
                    ],
                    files: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html><head><title>Arrays</title></head>
<body><h1>Student Roster</h1><script src="script.js"></script></body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: sans-serif; padding: 40px; }` },
                        { name: 'script.js', language: 'javascript', content: `// Student Roster Management

// 1. Create students array with 3 names


// 2. Add a new student


// 3. Get the first student


// 4. Log total count

` }
                    ]
                },
                {
                    id: 'js-6-quiz',
                    type: CONTENT_TYPES.QUIZ,
                    title: 'Functions & Arrays Quiz',
                    duration: '5 min',
                    questions: [
                        {
                            id: 'q1',
                            question: 'What does a function return if there is no return statement?',
                            options: ['null', '0', 'undefined', 'error'],
                            correctIndex: 2,
                            explanation: 'Functions without a return statement return undefined by default.'
                        },
                        {
                            id: 'q2',
                            question: 'What is the index of the first element in an array?',
                            options: ['1', '0', '-1', 'first'],
                            correctIndex: 1,
                            explanation: 'Arrays are zero-indexed. The first element is at index 0.'
                        },
                        {
                            id: 'q3',
                            question: 'Which method adds an element to the END of an array?',
                            options: ['unshift()', 'push()', 'add()', 'append()'],
                            correctIndex: 1,
                            explanation: 'push() adds to end, unshift() adds to beginning.'
                        }
                    ]
                },
                {
                    id: 'js-6-project',
                    type: CONTENT_TYPES.PROJECT,
                    title: 'Build a GPA Calculator',
                    duration: '45 min',
                    difficulty: 'Beginner',
                    description: 'Create a complete GPA calculator using everything you learned.',
                    content: `
# 🎯 Project: GPA Calculator

## Overview
Build a GPA calculator for President University students that:
- Stores course grades
- Calculates semester GPA
- Determines academic standing

## Requirements

### Variables & Data
- [ ] Array to store course objects (name, credits, grade)
- [ ] Variables for student info

### Functions
- [ ] \`addCourse(name, credits, grade)\` - adds a course
- [ ] \`calculateGPA()\` - returns GPA
- [ ] \`getStanding(gpa)\` - returns academic standing

### Logic
- [ ] GPA = sum(grade × credits) / total credits
- [ ] Standing: ≥3.5 = "Dean's List", ≥2.75 = "Good", ≥2.0 = "Warning", <2.0 = "Probation"

### Output
- [ ] Display all courses
- [ ] Display calculated GPA
- [ ] Display academic standing
                    `,
                    tasks: [
                        { id: 1, description: 'Create a courses array', completed: false, regex: /(let|const)\s+courses\s*=\s*\[/ },
                        { id: 2, description: 'Create addCourse function', completed: false, regex: /function\s+addCourse\s*\(/ },
                        { id: 3, description: 'Create calculateGPA function', completed: false, regex: /function\s+calculateGPA\s*\(/ },
                        { id: 4, description: 'Create getStanding function', completed: false, regex: /function\s+getStanding\s*\(/ },
                        { id: 5, description: 'Use a loop to iterate courses', completed: false, regex: /(for|while|forEach)/ },
                        { id: 6, description: 'Use if/else for standing logic', completed: false, regex: /if[\s\S]*else/ },
                        { id: 7, description: 'Call all functions and display results', completed: false, regex: /console\.log[\s\S]*calculateGPA\s*\(/ }
                    ],
                    starterFiles: [
                        { name: 'index.html', language: 'html', content: `<!DOCTYPE html>
<html>
<head>
    <title>GPA Calculator</title>
</head>
<body>
    <h1>🎓 PresUniv GPA Calculator</h1>
    <p>Check console for results</p>
    <script src="script.js"></script>
</body>
</html>` },
                        { name: 'style.css', language: 'css', content: `body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: linear-gradient(135deg, #0a192f, #112240); color: white; min-height: 100vh; }
h1 { color: #64ffda; }` },
                        { name: 'script.js', language: 'javascript', content: `// PresUniv GPA Calculator
// Build your calculator here!

// 1. Create courses array


// 2. addCourse function


// 3. calculateGPA function


// 4. getStanding function


// 5. Add some test courses


// 6. Calculate and display results

` }
                    ]
                },
                {
                    id: 'js-6-summary',
                    type: CONTENT_TYPES.INFORMATIONAL,
                    title: 'Course Complete!',
                    duration: '3 min read',
                    content: `
# 🎉 JavaScript Basics Complete!

## What You Mastered

✅ Variables & Data Types (string, number, boolean)
✅ Operators (arithmetic, comparison, logical)
✅ Conditionals (if/else, switch, ternary)
✅ Loops (for, while, for...of)
✅ Functions (declaration, parameters, return)
✅ Arrays (create, access, methods)

## Key Concepts

1. **Variables**: Use \`const\` by default, \`let\` when reassignment needed
2. **Comparisons**: Always use \`===\` for strict equality
3. **Functions**: Keep them small and focused on one task
4. **Arrays**: Zero-indexed, use methods like \`push\`, \`pop\`, \`map\`

## What's Next?

Continue with **DOM Manipulation** to make your JavaScript interact with web pages!

> "Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler
                    `
                }
            ]
        }
    ]
};

export default jsBasicsCourse;
