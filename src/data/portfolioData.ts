import { HighlightCard, ProjectItem, SkillCategory, ValueCard, EducationMilestone } from '../types';

export const PERSONAL_INFO = {
  name: 'Rudraksh Bansal',
  role: 'B.Tech CSE (AI-ML) Student',
  tagline: 'Building practical solutions with code, creativity and emerging AI technologies.',
  university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
  degree: 'B.Tech in Computer Science & Engineering (AI-ML)',
  currentSemester: '3rd Semester',
  location: 'Uttar Pradesh, India',
  status: 'Open to AI & Web Development Internships',
  bio: 'I am a Computer Science and Engineering student passionate about software development, web technologies, Python programming, and emerging AI tools. I enjoy building practical projects, learning new technologies, and continuously improving my technical skills. My goal is to develop real-world solutions and grow as a professional software developer.',
  links: {
    github: 'https://github.com/banslarudraksh-max',
    githubDisplay: 'https://github.com/banslarudraksh-max',
    linkedin: 'https://www.linkedin.com/in/rudraksh-bansal-989251386?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    linkedinDisplay: 'https://www.linkedin.com/in/rudraksh-bansal-989251386?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    email: 'bansalrudrakshkumar@gmail.com',
  },
};

export const HIGHLIGHT_CARDS: HighlightCard[] = [
  {
    title: 'Computer Science Student',
    subtitle: 'B.Tech CSE (AI-ML)',
    description: 'Enrolled in 3rd semester at AKTU with solid foundation in data structures, algorithms, and computational logic.',
    iconName: 'GraduationCap',
  },
  {
    title: 'Software Development',
    subtitle: 'Core Focus',
    description: 'Writing clean, modular Python and web applications with strong emphasis on maintainability, readability, and functionality.',
    iconName: 'CodeXml',
  },
  {
    title: 'AI & Technology',
    subtitle: 'Emerging Tools',
    description: 'Active explorer of AI-assisted engineering tools, modern frameworks, and machine learning principles to accelerate development.',
    iconName: 'Cpu',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming',
    description: 'Core logic, algorithmic reasoning, and object-oriented foundations.',
    icon: 'Terminal',
    skills: [
      { name: 'Python', level: 'Core', note: 'Data structures, scripting, GUI modules, automation' },
      { name: 'JavaScript', level: 'Core', note: 'ES6+ syntax, DOM manipulation, asynchronous flow' },
    ],
  },
  {
    title: 'Web Development',
    description: 'Building accessible, semantic, and fully responsive user interfaces.',
    icon: 'Layout',
    skills: [
      { name: 'HTML5', level: 'Proficient', note: 'Semantic markup, accessibility, SEO structure' },
      { name: 'CSS3', level: 'Proficient', note: 'Flexbox, Grid, custom styling, transitions' },
      { name: 'Responsive Design', level: 'Proficient', note: 'Mobile-first layouts, adaptive breakpoints' },
    ],
  },
  {
    title: 'Tools & AI Platforms',
    description: 'Modern version control, collaborative workflows, and AI tooling.',
    icon: 'Wrench',
    skills: [
      { name: 'Git', level: 'Familiar', note: 'Branching, commits, rebasing, versioning' },
      { name: 'GitHub', level: 'Familiar', note: 'Repositories, pull requests, issue tracking' },
      { name: 'AI Development Tools', level: 'Active User', note: 'AI coding assistants, prompt workflows, prototyping' },
    ],
  },
  {
    title: 'Professional',
    description: 'Essential analytical and interpersonal skills for engineering environments.',
    icon: 'Briefcase',
    skills: [
      { name: 'Problem Solving', level: 'Strengths', note: 'Algorithmic approach and structured debugging' },
      { name: 'Continuous Learning', level: 'Strengths', note: 'Quick to adopt new SDKs, libraries & paradigms' },
      { name: 'Team Collaboration', level: 'Strengths', note: 'Clear communication, receptive to code reviews' },
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'calendar-reminder-app',
    title: 'Calendar & Reminder App',
    category: 'Desktop Application / Python',
    description: 'A Python-based application designed to display calendars and manage reminders efficiently.',
    fullDescription: 'An intuitive calendar utility that allows users to organize day-to-day schedules, view interactive calendar dates, log upcoming tasks with timestamps, and receive persistent notifications for deadlines.',
    keyFeatures: [
      'Interactive month and day calendar navigation',
      'Task creation, editing, and timestamp-based scheduling',
      'Persistent local data storage for scheduled events',
      'Visual indicator for days with pending reminders',
    ],
    technologies: ['Python', 'Tkinter GUI', 'Datetime Logic', 'JSON File Storage'],
    githubPlaceholder: 'https://github.com/your-username/calendar-reminder-app',
    demoPlaceholder: '#',
    codeSnippetPreview: {
      language: 'python',
      filename: 'calendar_app.py',
      code: `import datetime
import calendar
import json

class ReminderManager:
    def __init__(self, storage_path="reminders.json"):
        self.storage_path = storage_path
        self.reminders = self._load()

    def add_reminder(self, date_str, title, priority="normal"):
        entry = {"title": title, "priority": priority, "timestamp": datetime.datetime.now().isoformat()}
        self.reminders.setdefault(date_str, []).append(entry)
        self._save()
        print(f"Reminder registered for {date_str}: {title}")`,
    },
  },
  {
    id: 'alarm-clock',
    title: 'Alarm Clock',
    category: 'Python Utility',
    description: 'A Python application with customizable alarms and snooze functionality.',
    fullDescription: 'A multithreaded desktop alarm utility built in Python that runs accurate background time checks without freezing the UI, supporting custom audio ringtones, multiple alarm queues, and snooze intervals.',
    keyFeatures: [
      'Multi-alarm scheduling with precise 24-hour and 12-hour format support',
      'Customizable snooze duration (3, 5, or 10-minute intervals)',
      'Background threading to prevent UI latency during time polling',
      'Audio alert system with customizable sound frequencies',
    ],
    technologies: ['Python', 'Threading', 'Time / Datetime', 'Audio Playback'],
    githubPlaceholder: 'https://github.com/your-username/python-alarm-clock',
    demoPlaceholder: '#',
    codeSnippetPreview: {
      language: 'python',
      filename: 'alarm_clock.py',
      code: `import time
import threading
from datetime import datetime

class AlarmEngine:
    def __init__(self):
        self.alarms = []
        self._active = True

    def set_alarm(self, target_time: str, label: str):
        self.alarms.append({"time": target_time, "label": label, "triggered": False})

    def run_polling_worker(self):
        while self._active:
            now = datetime.now().strftime("%H:%M")
            for item in self.alarms:
                if item["time"] == now and not item["triggered"]:
                    self.trigger_alarm(item)
            time.sleep(1) # Threaded background monitor`,
    },
  },
  {
    id: 'personal-blog-website',
    title: 'Personal Blog Website',
    category: 'Web Development',
    description: 'A clean blog platform designed for creating, editing and publishing posts.',
    fullDescription: 'A lightweight, modern publishing layout engineered with semantic HTML5, modular CSS, and vanilla JavaScript. Features reading time estimators, category tagging, search filtering, and full responsive design across smartphones and large monitors.',
    keyFeatures: [
      'Responsive reading layout optimized for typographic legibility',
      'Article categorization and real-time client-side search filtering',
      'Local draft creation and post preview mechanism',
      'Zero external bloat—pure HTML, CSS and modular JavaScript',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design'],
    githubPlaceholder: 'https://github.com/your-username/personal-blog-website',
    demoPlaceholder: '#',
    codeSnippetPreview: {
      language: 'javascript',
      filename: 'blog-engine.js',
      code: `// Dynamic post filter & reading estimator
export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function filterArticles(articles, query) {
  const q = query.toLowerCase();
  return articles.filter(post => 
    post.title.toLowerCase().includes(q) || 
    post.tags.some(t => t.toLowerCase().includes(q))
  );
}`,
    },
  },
  {
    id: 'basic-calculator',
    title: 'Basic Calculator',
    category: 'Interactive Web Utility',
    description: 'A simple and user-friendly calculator application built to perform common mathematical operations.',
    fullDescription: 'A focused, distraction-free digital calculator with an intuitive key matrix, keyboard input listener, decimal handling, chaining operations, and a calculation history strip.',
    keyFeatures: [
      'Complete basic arithmetic support (+, -, ×, ÷, %, exponents)',
      'Keyboard binding support (numpad and standard keyboard)',
      'Safe calculation parser preventing syntax errors or unexpected inputs',
      'Clean tactile button interactions with instant visual feedback',
    ],
    technologies: ['JavaScript', 'HTML5 Semantic UI', 'CSS Grid & Flexbox', 'Event Handling'],
    githubPlaceholder: 'https://github.com/your-username/basic-calculator',
    demoPlaceholder: '#',
    codeSnippetPreview: {
      language: 'javascript',
      filename: 'calculator.js',
      code: `class Calculator {
  constructor(displayElement) {
    this.display = displayElement;
    this.current = '0';
    this.prev = null;
    this.operator = null;
  }

  appendDigit(digit) {
    if (this.current === '0' && digit !== '.') {
      this.current = digit;
    } else {
      if (digit === '.' && this.current.includes('.')) return;
      this.current += digit;
    }
    this.updateDisplay();
  }
}`,
    },
  },
];

export const EDUCATION_DATA: EducationMilestone = {
  degree: 'Bachelor of Technology (B.Tech)',
  specialization: 'Computer Science & Engineering (AI-ML)',
  institution: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
  currentSemester: '3rd Semester (Current)',
  period: '2024 – 2028',
  description: 'Pursuing comprehensive undergraduate coursework with dedicated focus on computer science foundations, algorithms, object-oriented software design, and artificial intelligence/machine learning fundamentals.',
  coursework: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming (Python)',
    'Discrete Mathematics',
    'Computer Organization & Architecture',
    'Web Fundamentals & Technologies',
    'Applied Artificial Intelligence Basics',
  ],
};

export const WHAT_I_BRING: ValueCard[] = [
  {
    title: 'Strong Willingness to Learn',
    description: 'Eager to absorb feedback, master emerging software stacks, and take on challenging engineering problems with humility and dedication.',
    iconName: 'Sparkles',
  },
  {
    title: 'Interest in Real-World Development',
    description: 'Deeply driven by creating functional, user-centric software rather than theoretical exercises, delivering dependable working code.',
    iconName: 'Rocket',
  },
  {
    title: 'Practical Project Experience',
    description: 'Hands-on background building standalone Python utilities, desktop tools, and responsive web platforms with structured repositories.',
    iconName: 'Layers',
  },
  {
    title: 'Curiosity About AI & Modern Tech',
    description: 'Actively exploring artificial intelligence capabilities, prompt optimization, modern developer tooling, and machine learning applications.',
    iconName: 'Bot',
  },
  {
    title: 'Consistent Improvement Mindset',
    description: 'Dedicated to iterative self-improvement, clean code hygiene, continuous version-control habits, and disciplined technical study.',
    iconName: 'TrendingUp',
  },
];
