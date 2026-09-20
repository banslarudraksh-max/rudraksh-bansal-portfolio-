import { supabase, isSupabaseConfigured } from './supabase';
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILL_CATEGORIES,
  EDUCATION_DATA,
  HIGHLIGHT_CARDS,
} from '../data/portfolioData';
import {
  ProjectItem,
  ProjectImageRecord,
  HighlightCard,
  EducationMilestone,
  ResumeRecord,
  SocialLinkRecord,
  HeroProfileRecord,
} from '../types';
import {
  ProfileDataAdmin,
  AboutDataAdmin,
  SkillItemAdmin,
  ExperienceItem,
  InternshipItem,
  ContactMessage,
  ContactInfoAdmin,
  SiteSettingsData,
} from '../admin/types';

export const ADMIN_USER_ID = '780ea72d-e169-41fa-b627-9665a5be2d26';

// ==============================================================================
// 1. DEFAULT FALLBACK DATA (Matches Rudraksh Bansal's Portfolio)
// ==============================================================================
export const DEFAULT_PROFILE: ProfileDataAdmin = {
  name: PERSONAL_INFO.name,
  role: 'B.Tech CSE Student & Aspiring Developer',
  headline: 'B.Tech CSE Student & Aspiring Software Developer',
  introduction: PERSONAL_INFO.tagline,
  avatarUrl: '',
  location: PERSONAL_INFO.location,
  degree: 'B.Tech in Computer Science and Engineering',
  university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
  currentSemester: '3rd Semester',
  specialization: 'Artificial Intelligence & Machine Learning',
  careerDirection: 'Software Engineering & AI/ML Applications',
  availabilityStatus: 'Open to Software Development & Web Engineering Internships',
  resumeUrl: '#',
};

export const EXISTING_HERO_PROFILE_ID = '7a6ee60a-1659-4633-996e-99b50dd561f0';

export const DEFAULT_HERO_PROFILE: HeroProfileRecord = {
  id: EXISTING_HERO_PROFILE_ID,
  name: PERSONAL_INFO.name,
  badge: 'Available for Internships',
  headline: 'B.Tech CSE Student & Aspiring Software Developer',
  description: 'Building practical solutions with code, creativity and emerging AI technologies.',
  image_url: null,
  image_alt: 'Rudraksh Bansal - Professional Developer Profile',
  is_active: true,
};

export const DEFAULT_ABOUT: AboutDataAdmin = {
  heading: 'About Me',
  description: PERSONAL_INFO.bio,
  careerObjective:
    'To secure a challenging software engineering or web development internship where I can apply my programming skills, collaborate with experienced engineering mentors, and build impactful, production-grade applications.',
};

export const DEFAULT_HIGHLIGHTS: HighlightCard[] = [
  {
    title: 'Computer Science Undergraduate',
    subtitle: 'AKTU • 2024-2028',
    description: 'Pursuing B.Tech in CSE with focus on software engineering fundamentals and AI-ML.',
    iconName: 'GraduationCap',
    displayOrder: 1,
  },
  {
    title: 'Software & Web Development',
    subtitle: 'Python • JavaScript • React',
    description: 'Building practical utilities, responsive modern interfaces, and algorithmic solutions.',
    iconName: 'CodeXml',
    displayOrder: 2,
  },
  {
    title: 'Emerging AI & Modern Tooling',
    subtitle: 'LLMs • Automation',
    description: 'Leveraging modern AI-assisted workflows and prompt engineering to accelerate software creation.',
    iconName: 'Cpu',
    displayOrder: 3,
  },
];

export const DEFAULT_EDUCATION_LIST: EducationMilestone[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Technology in Computer Science & Engineering (AI-ML)',
    institution: 'Affiliated College, AKTU',
    university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow',
    startYear: '2024',
    endYear: '2028',
    period: '2024 – 2028',
    currentSemester: '3rd Semester',
    specialization: 'Artificial Intelligence & Machine Learning',
    description:
      'Focused on Data Structures, Algorithms, Python Programming, Object-Oriented Software Design, Discrete Mathematics, and Computer Architecture.',
    cgpaGrade: 'Enrolled (In Progress)',
    coursework: [
      'Data Structures & Algorithms',
      'Object Oriented Programming in Python',
      'Discrete Mathematics',
      'Computer Organization & Architecture',
      'Web Technology Basics',
    ],
    displayOrder: 1,
  },
];

export const DEFAULT_SKILLS_LIST: SkillItemAdmin[] = [
  { id: 'sk-1', name: 'Python', category: 'Programming', level: 'Core', description: 'Data structures, scripting, GUI modules, automation', order: 1, isActive: true },
  { id: 'sk-2', name: 'JavaScript', category: 'Programming', level: 'Core', description: 'ES6+ syntax, DOM manipulation, asynchronous flow', order: 2, isActive: true },
  { id: 'sk-3', name: 'HTML5', category: 'Web Development', level: 'Proficient', description: 'Semantic markup, accessibility, SEO structure', order: 3, isActive: true },
  { id: 'sk-4', name: 'CSS3', category: 'Web Development', level: 'Proficient', description: 'Flexbox, Grid, custom styling, transitions', order: 4, isActive: true },
  { id: 'sk-5', name: 'Responsive Design', category: 'Web Development', level: 'Proficient', description: 'Mobile-first layouts, adaptive breakpoints', order: 5, isActive: true },
  { id: 'sk-6', name: 'React', category: 'Web Development', level: 'Intermediate', description: 'Modern functional components, hooks, Tailwind CSS', order: 6, isActive: true },
  { id: 'sk-7', name: 'Git', category: 'Tools & AI', level: 'Core', description: 'Branching, commits, rebasing, versioning', order: 7, isActive: true },
  { id: 'sk-8', name: 'GitHub', category: 'Tools & AI', level: 'Core', description: 'Repositories, pull requests, issue tracking', order: 8, isActive: true },
  { id: 'sk-9', name: 'AI Development Tools', category: 'Tools & AI', level: 'Active User', description: 'AI coding assistants, prompt workflows, prototyping', order: 9, isActive: true },
  { id: 'sk-10', name: 'Problem Solving', category: 'Professional Skills', level: 'Strengths', description: 'Algorithmic approach and structured debugging', order: 10, isActive: true },
  { id: 'sk-11', name: 'Continuous Learning', category: 'Professional Skills', level: 'Strengths', description: 'Quick to adopt new SDKs, libraries & paradigms', order: 11, isActive: true },
  { id: 'sk-12', name: 'Team Collaboration', category: 'Professional Skills', level: 'Strengths', description: 'Clear communication, receptive to code reviews', order: 12, isActive: true },
];

export const DEFAULT_EXPERIENCES_LIST: ExperienceItem[] = [
  {
    id: 'exp-1',
    title: 'Open Source Contributor & Self-Directed Projects',
    company: 'Independent Developer',
    location: 'Remote',
    period: '2024 – Present',
    type: 'Open Source',
    description: 'Designed and built utility desktop applications and modern web tools using Python and React.',
    technologies: ['Python', 'JavaScript', 'React', 'Git', 'Tailwind CSS'],
    responsibilities: [
      'Implemented desktop GUI games and automation scripts in Python',
      'Engineered responsive web applications using React and Tailwind CSS',
      'Practiced Git version control, branching, and GitHub workflows',
    ],
    isCurrent: true,
    order: 1,
  },
  {
    id: 'exp-2',
    title: 'Computer Science & AI Academic Scholar',
    company: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    location: 'Uttar Pradesh, India',
    period: '2024 – 2028',
    type: 'Full-time',
    description: 'Focusing on algorithmic problem-solving, data structures, discrete mathematics, and emerging machine learning frameworks.',
    technologies: ['Data Structures', 'Algorithms', 'Python', 'C++'],
    responsibilities: [
      'Engaged in core computer science coursework and lab work',
      'Solved algorithmic coding challenges in Python and C++',
      'Collaborated on group assignments and engineering projects',
    ],
    isCurrent: true,
    order: 2,
  },
];

export const DEFAULT_INTERNSHIPS_LIST: InternshipItem[] = [
  {
    id: 'int-1',
    roleTitle: 'Software Engineering / Web Development Intern',
    organization: 'Tech Startups & Product Teams',
    targetCompanyType: 'Tech Startups & Product Teams',
    status: 'Open to Offers',
    preferredDomain: 'Frontend Development / Full Stack / AI Applications',
    period: 'Summer 2026 / Immediate Availability',
    description: 'Seeking practical internship opportunities to contribute high-quality code, collaborate with engineering mentors, and build real-world products.',
    technologies: ['React', 'TypeScript', 'Python', 'Node.js', 'Tailwind CSS'],
    responsibilities: [
      'Build modern, high-performance web interfaces in React and TypeScript',
      'Develop backend automation and API endpoints in Python or Node.js',
      'Participate actively in sprint planning, code reviews, and pair programming',
    ],
    notes: 'Available for both remote and on-site internships.',
  },
];

export const DEFAULT_SOCIAL_LINKS: SocialLinkRecord[] = [
  { id: 'sl-1', platform: 'github', url: PERSONAL_INFO.links.github, displayText: 'github.com/RudrakshBansal7', isActive: true, displayOrder: 1 },
  { id: 'sl-2', platform: 'linkedin', url: PERSONAL_INFO.links.linkedin, displayText: 'linkedin.com/in/rudraksh-bansal-855589308', isActive: true, displayOrder: 2 },
  { id: 'sl-3', platform: 'email', url: `mailto:${PERSONAL_INFO.links.email}`, displayText: PERSONAL_INFO.links.email, isActive: true, displayOrder: 3 },
  { id: 'sl-4', platform: 'twitter', url: 'https://twitter.com', displayText: 'x.com/rudraksh', isActive: false, displayOrder: 4 },
];

export const DEFAULT_CONTACT_INFO: ContactInfoAdmin = {
  email: PERSONAL_INFO.links.email,
  phone: '+91 98765 43210',
  location: PERSONAL_INFO.location,
  linkedin: PERSONAL_INFO.links.linkedin,
  github: PERSONAL_INFO.links.github,
  availability: 'Available for Summer 2026 Internships & Part-time Roles',
  timeZone: 'IST (UTC +5:30)',
  responseTime: 'Within 24 Hours',
  preferredContactMethod: 'Email',
};

export const DEFAULT_RESUMES: ResumeRecord[] = [
  {
    id: 'res-1',
    fileName: 'Rudraksh_Bansal_Resume_2026.pdf',
    fileUrl: '#',
    fileSize: '184 KB',
    version: 'v1.0 (AKTU CS)',
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  siteTitle: 'Rudraksh Bansal | Software Developer & CSE Student',
  metaDescription: 'Official portfolio of Rudraksh Bansal, Computer Science Student at AKTU specializing in Python, Web Development, and AI.',
  maintenanceMode: false,
  searchEngineIndexing: true,
  analyticsId: '',
  publicEmail: PERSONAL_INFO.links.email,
  allowPublicContact: true,
  enableDownloadResume: true,
  supabaseConfigStatus: isSupabaseConfigured ? 'connected' : 'unconfigured',
};

// ==============================================================================
// 2. SUPABASE PORTFOLIO SERVICE
// ==============================================================================

export const portfolioService = {
  // ----------------------------------------------------------------------------
  // PROFILE
  // ----------------------------------------------------------------------------
  async getProfile(): Promise<ProfileDataAdmin> {
    if (!isSupabaseConfigured) return DEFAULT_PROFILE;
    try {
      const { data, error } = await supabase.from('profiles').select('*').limit(1).maybeSingle();
      if (error || !data) return DEFAULT_PROFILE;

      return {
        id: data.id,
        name: data.name || DEFAULT_PROFILE.name,
        role: data.headline || DEFAULT_PROFILE.role,
        headline: data.headline || DEFAULT_PROFILE.headline,
        introduction: data.introduction || DEFAULT_PROFILE.introduction,
        avatarUrl: data.profile_image_url || '',
        location: data.location || DEFAULT_PROFILE.location,
        degree: data.degree || DEFAULT_PROFILE.degree,
        university: data.university || DEFAULT_PROFILE.university,
        currentSemester: data.semester || DEFAULT_PROFILE.currentSemester,
        specialization: data.specialization || DEFAULT_PROFILE.specialization,
        careerDirection: data.career_direction || DEFAULT_PROFILE.careerDirection,
        availabilityStatus: data.availability || DEFAULT_PROFILE.availabilityStatus,
        resumeUrl: data.resume_url || DEFAULT_PROFILE.resumeUrl,
      };
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  async updateProfile(profile: Partial<ProfileDataAdmin>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase credentials not configured' };
    try {
      // Find existing profile row or insert new
      const { data: existing } = await supabase.from('profiles').select('id').limit(1).maybeSingle();

      const payload: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };
      if (profile.name !== undefined) payload.name = profile.name;
      if (profile.headline !== undefined) payload.headline = profile.headline;
      if (profile.introduction !== undefined) payload.introduction = profile.introduction;
      if (profile.avatarUrl !== undefined) payload.profile_image_url = profile.avatarUrl;
      if (profile.location !== undefined) payload.location = profile.location;
      if (profile.degree !== undefined) payload.degree = profile.degree;
      if (profile.university !== undefined) payload.university = profile.university;
      if (profile.currentSemester !== undefined) payload.semester = profile.currentSemester;
      if (profile.specialization !== undefined) payload.specialization = profile.specialization;
      if (profile.careerDirection !== undefined) payload.career_direction = profile.careerDirection;
      if (profile.availabilityStatus !== undefined) payload.availability = profile.availabilityStatus;
      if (profile.resumeUrl !== undefined) payload.resume_url = profile.resumeUrl;

      if (existing?.id) {
        const { error } = await supabase.from('profiles').update(payload).eq('id', existing.id);
        if (error) return { success: false, error: error.message };
      } else {
        const { error } = await supabase.from('profiles').insert(payload);
        if (error) return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Failed to update profile' };
    }
  },

  // ----------------------------------------------------------------------------
  // ABOUT & HIGHLIGHTS
  // ----------------------------------------------------------------------------
  async getAbout(): Promise<AboutDataAdmin> {
    if (!isSupabaseConfigured) return DEFAULT_ABOUT;
    try {
      const { data, error } = await supabase.from('about').select('*').limit(1).maybeSingle();
      if (error || !data) return DEFAULT_ABOUT;
      return {
        id: data.id,
        heading: data.heading || DEFAULT_ABOUT.heading,
        description: data.description || DEFAULT_ABOUT.description,
        careerObjective: data.career_objective || DEFAULT_ABOUT.careerObjective,
      };
    } catch {
      return DEFAULT_ABOUT;
    }
  },

  async updateAbout(about: Partial<AboutDataAdmin>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase credentials not configured' };
    try {
      const { data: existing } = await supabase.from('about').select('id').limit(1).maybeSingle();
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (about.heading !== undefined) payload.heading = about.heading;
      if (about.description !== undefined) payload.description = about.description;
      if (about.careerObjective !== undefined) payload.career_objective = about.careerObjective;

      if (existing?.id) {
        const { error } = await supabase.from('about').update(payload).eq('id', existing.id);
        if (error) return { success: false, error: error.message };
      } else {
        const { error } = await supabase.from('about').insert(payload);
        if (error) return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Failed to update about' };
    }
  },

  async getHighlights(): Promise<HighlightCard[]> {
    if (!isSupabaseConfigured) return DEFAULT_HIGHLIGHTS;
    try {
      const { data, error } = await supabase
        .from('about_highlights')
        .select('*')
        .order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return DEFAULT_HIGHLIGHTS;
      return data.map((d) => ({
        id: d.id,
        title: d.title,
        subtitle: d.subtitle,
        description: d.description,
        iconName: d.icon || 'GraduationCap',
        displayOrder: d.display_order,
      }));
    } catch {
      return DEFAULT_HIGHLIGHTS;
    }
  },

  async saveHighlights(cards: HighlightCard[]): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase credentials not configured' };
    try {
      // Find about id
      let { data: aboutRow } = await supabase.from('about').select('id').limit(1).maybeSingle();
      if (!aboutRow) {
        const { data: newAbout } = await supabase.from('about').insert({ heading: 'About Me', description: DEFAULT_ABOUT.description, career_objective: DEFAULT_ABOUT.careerObjective }).select('id').single();
        aboutRow = newAbout;
      }

      // Delete existing highlights and insert clean set
      await supabase.from('about_highlights').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      const rows = cards.map((c, idx) => ({
        about_id: aboutRow?.id,
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        icon: c.iconName,
        display_order: idx + 1,
      }));

      const { error } = await supabase.from('about_highlights').insert(rows);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Failed to save highlights' };
    }
  },

  async addHighlight(card: Omit<HighlightCard, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase credentials not configured' };
    try {
      let { data: aboutRow } = await supabase.from('about').select('id').limit(1).maybeSingle();
      if (!aboutRow) {
        const { data: newAbout } = await supabase.from('about').insert({
          heading: 'About Me',
          description: DEFAULT_ABOUT.description,
          career_objective: DEFAULT_ABOUT.careerObjective,
        }).select('id').single();
        aboutRow = newAbout;
      }

      const { data, error } = await supabase
        .from('about_highlights')
        .insert({
          about_id: aboutRow?.id,
          title: card.title,
          subtitle: card.subtitle,
          description: card.description,
          icon: card.iconName || 'GraduationCap',
          display_order: card.displayOrder || 1,
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };
      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Failed to add highlight' };
    }
  },

  async deleteHighlight(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase credentials not configured' };
    try {
      const { error } = await supabase.from('about_highlights').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Failed to delete highlight' };
    }
  },

  // ----------------------------------------------------------------------------
  // EDUCATION
  // ----------------------------------------------------------------------------
  async getEducation(): Promise<EducationMilestone[]> {
    if (!isSupabaseConfigured) return DEFAULT_EDUCATION_LIST;
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return DEFAULT_EDUCATION_LIST;
      return data.map((d) => ({
        id: d.id,
        degree: d.degree,
        institution: d.institution,
        university: d.university,
        currentSemester: d.current_status,
        period: `${d.start_year} – ${d.end_year}`,
        startYear: d.start_year,
        endYear: d.end_year,
        specialization: 'Artificial Intelligence & Machine Learning',
        description: d.description,
        cgpaGrade: d.cgpa_grade || '',
        displayOrder: d.display_order,
      }));
    } catch {
      return DEFAULT_EDUCATION_LIST;
    }
  },

  async addEducation(edu: Omit<EducationMilestone, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data, error } = await supabase
        .from('education')
        .insert({
          degree: edu.degree,
          institution: edu.institution,
          university: edu.university || 'AKTU',
          start_year: edu.startYear || '2024',
          end_year: edu.endYear || '2028',
          current_status: edu.currentSemester || 'In Progress',
          description: edu.description,
          cgpa_grade: edu.cgpaGrade || '',
          display_order: edu.displayOrder || 1,
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };
      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error adding education' };
    }
  },

  async updateEducation(id: string, edu: Partial<EducationMilestone>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (edu.degree !== undefined) payload.degree = edu.degree;
      if (edu.institution !== undefined) payload.institution = edu.institution;
      if (edu.university !== undefined) payload.university = edu.university;
      if (edu.startYear !== undefined) payload.start_year = edu.startYear;
      if (edu.endYear !== undefined) payload.end_year = edu.endYear;
      if (edu.currentSemester !== undefined) payload.current_status = edu.currentSemester;
      if (edu.description !== undefined) payload.description = edu.description;
      if (edu.cgpaGrade !== undefined) payload.cgpa_grade = edu.cgpaGrade;

      const { error } = await supabase.from('education').update(payload).eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating education' };
    }
  },

  async deleteEducation(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('education').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error deleting education' };
    }
  },

  // ----------------------------------------------------------------------------
  // SKILLS
  // ----------------------------------------------------------------------------
  async getSkills(): Promise<SkillItemAdmin[]> {
    if (!isSupabaseConfigured) return DEFAULT_SKILLS_LIST;
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return DEFAULT_SKILLS_LIST;
      return data.map((d) => ({
        id: d.id,
        name: d.name,
        category: d.category as SkillItemAdmin['category'],
        level: (d.level || 'Proficient') as SkillItemAdmin['level'],
        description: d.description || '',
        order: d.display_order,
        isActive: d.is_active,
        icon: d.icon,
      }));
    } catch {
      return DEFAULT_SKILLS_LIST;
    }
  },

  async addSkill(skill: Omit<SkillItemAdmin, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data, error } = await supabase
        .from('skills')
        .insert({
          name: skill.name,
          category: skill.category,
          level: skill.level,
          description: skill.description,
          display_order: skill.order,
          is_active: skill.isActive ?? true,
          icon: skill.icon || '',
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };
      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error adding skill' };
    }
  },

  async updateSkill(id: string, skill: Partial<SkillItemAdmin>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (skill.name !== undefined) payload.name = skill.name;
      if (skill.category !== undefined) payload.category = skill.category;
      if (skill.level !== undefined) payload.level = skill.level;
      if (skill.description !== undefined) payload.description = skill.description;
      if (skill.order !== undefined) payload.display_order = skill.order;
      if (skill.isActive !== undefined) payload.is_active = skill.isActive;
      if (skill.icon !== undefined) payload.icon = skill.icon;

      const { error } = await supabase.from('skills').update(payload).eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating skill' };
    }
  },

  async deleteSkill(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('skills').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error deleting skill' };
    }
  },

  async reorderSkills(orderedIds: string[]): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured) return { success: true };
    try {
      for (let i = 0; i < orderedIds.length; i++) {
        await supabase.from('skills').update({ display_order: i + 1 }).eq('id', orderedIds[i]);
      }
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  // ----------------------------------------------------------------------------
  // PROJECTS
  // ----------------------------------------------------------------------------
  async getProjects(includeHidden = true): Promise<ProjectItem[]> {
    if (!isSupabaseConfigured) return PROJECTS;
    try {
      let query = supabase.from('projects').select('*').order('display_order', { ascending: true });
      if (!includeHidden) {
        query = query.eq('is_visible', true);
      }
      const { data, error } = await query;
      if (error || !data || data.length === 0) return PROJECTS;

      // Query screenshots from project_images
      const { data: imagesData } = await supabase
        .from('project_images')
        .select('*')
        .order('display_order', { ascending: true });

      const imagesByProject: Record<string, string[]> = {};
      if (imagesData) {
        imagesData.forEach((img) => {
          if (!imagesByProject[img.project_id]) imagesByProject[img.project_id] = [];
          imagesByProject[img.project_id].push(img.image_url);
        });
      }

      return data.map((d) => {
        const itemScreenshots = imagesByProject[d.id] && imagesByProject[d.id].length > 0
          ? imagesByProject[d.id]
          : (d.main_image_url ? [d.main_image_url] : []);

        return {
          id: d.id,
          title: d.title,
          category: d.category || 'Python / Systems',
          description: d.short_description,
          fullDescription: d.full_description || d.short_description,
          technologies: Array.isArray(d.technologies) ? d.technologies : [],
          githubPlaceholder: d.github_url || 'https://github.com/banslarudraksh-max',
          demoPlaceholder: d.live_demo_url || '',
          mainImageUrl: d.main_image_url || '',
          imageUrl: d.main_image_url || '',
          screenshots: itemScreenshots,
          status: d.status || 'Completed',
          isFeatured: d.is_featured ?? false,
          isVisible: d.is_visible ?? true,
          displayOrder: d.display_order ?? 0,
          keyFeatures: [
            'Modular architecture with clean separation of concerns',
            'Optimized event loop and user interaction feedback',
            'Production-tested error boundaries and responsive styling',
          ],
        };
      });
    } catch {
      return PROJECTS;
    }
  },

  async addProject(project: Omit<ProjectItem, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const mainImg = project.mainImageUrl || project.imageUrl || '';
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: project.title,
          short_description: project.description,
          full_description: project.fullDescription || project.description,
          main_image_url: mainImg,
          technologies: project.technologies || [],
          github_url: project.githubPlaceholder || 'https://github.com/banslarudraksh-max',
          live_demo_url: project.demoPlaceholder || '',
          category: project.category || 'Python / Systems',
          status: project.status || 'Completed',
          is_featured: project.isFeatured ?? false,
          is_visible: project.isVisible ?? true,
          display_order: project.displayOrder || 1,
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };

      // If additional screenshots provided, also insert into project_images
      if (project.screenshots && project.screenshots.length > 0) {
        const imageRows = project.screenshots.map((url, idx) => ({
          project_id: data.id,
          image_url: url,
          caption: `${project.title} screenshot ${idx + 1}`,
          display_order: idx + 1,
        }));
        await supabase.from('project_images').insert(imageRows);
      }

      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error adding project' };
    }
  },

  async updateProject(id: string, project: Partial<ProjectItem>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (project.title !== undefined) payload.title = project.title;
      if (project.description !== undefined) payload.short_description = project.description;
      if (project.fullDescription !== undefined) payload.full_description = project.fullDescription;
      if (project.mainImageUrl !== undefined) payload.main_image_url = project.mainImageUrl;
      if (project.imageUrl !== undefined && project.mainImageUrl === undefined) payload.main_image_url = project.imageUrl;
      if (project.technologies !== undefined) payload.technologies = project.technologies;
      if (project.githubPlaceholder !== undefined) payload.github_url = project.githubPlaceholder;
      if (project.demoPlaceholder !== undefined) payload.live_demo_url = project.demoPlaceholder;
      if (project.category !== undefined) payload.category = project.category;
      if (project.status !== undefined) payload.status = project.status;
      if (project.isFeatured !== undefined) payload.is_featured = project.isFeatured;
      if (project.isVisible !== undefined) payload.is_visible = project.isVisible;
      if (project.displayOrder !== undefined) payload.display_order = project.displayOrder;

      const { error } = await supabase.from('projects').update(payload).eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating project' };
    }
  },

  async deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error deleting project' };
    }
  },

  async duplicateProject(id: string): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data: orig, error: fetchErr } = await supabase.from('projects').select('*').eq('id', id).single();
      if (fetchErr || !orig) return { success: false, error: 'Project not found' };

      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: `${orig.title} (Copy)`,
          short_description: orig.short_description,
          full_description: orig.full_description,
          main_image_url: orig.main_image_url,
          technologies: orig.technologies,
          github_url: orig.github_url,
          live_demo_url: orig.live_demo_url,
          category: orig.category,
          status: orig.status,
          is_featured: false,
          is_visible: true,
          display_order: (orig.display_order || 0) + 1,
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };
      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error duplicating project' };
    }
  },

  // ----------------------------------------------------------------------------
  // PROJECT IMAGES (public.project_images)
  // ----------------------------------------------------------------------------
  async getProjectImages(projectId?: string): Promise<ProjectImageRecord[]> {
    if (!isSupabaseConfigured) return [];
    try {
      let query = supabase.from('project_images').select('*').order('display_order', { ascending: true });
      if (projectId) {
        query = query.eq('project_id', projectId);
      }
      const { data, error } = await query;
      if (error || !data) return [];
      return data.map((d) => ({
        id: d.id,
        projectId: d.project_id,
        imageUrl: d.image_url,
        caption: d.caption || '',
        displayOrder: d.display_order || 0,
        createdAt: d.created_at,
      }));
    } catch {
      return [];
    }
  },

  async addProjectImage(img: Omit<ProjectImageRecord, 'id' | 'createdAt'>): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data, error } = await supabase
        .from('project_images')
        .insert({
          project_id: img.projectId,
          image_url: img.imageUrl,
          caption: img.caption || '',
          display_order: img.displayOrder || 0,
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };
      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error adding project image' };
    }
  },

  async updateProjectImage(id: string, img: Partial<ProjectImageRecord>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const payload: Record<string, unknown> = {};
      if (img.imageUrl !== undefined) payload.image_url = img.imageUrl;
      if (img.caption !== undefined) payload.caption = img.caption;
      if (img.displayOrder !== undefined) payload.display_order = img.displayOrder;

      const { error } = await supabase.from('project_images').update(payload).eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating project image' };
    }
  },

  async deleteProjectImage(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('project_images').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error deleting project image' };
    }
  },

  // ----------------------------------------------------------------------------
  // EXPERIENCES
  // ----------------------------------------------------------------------------
  async getExperiences(): Promise<ExperienceItem[]> {
    if (!isSupabaseConfigured) return DEFAULT_EXPERIENCES_LIST;
    try {
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return DEFAULT_EXPERIENCES_LIST;
      return data.map((d) => ({
        id: d.id,
        title: d.role,
        company: d.company,
        location: d.location || 'Remote',
        period: `${d.start_date} – ${d.is_current ? 'Present' : d.end_date || ''}`,
        type: (d.type || 'Full-time') as ExperienceItem['type'],
        description: d.description || '',
        technologies: Array.isArray(d.skills) ? d.skills : [],
        responsibilities: Array.isArray(d.responsibilities) ? d.responsibilities : [],
        companyLogoUrl: d.company_logo_url,
        certificateUrl: d.certificate_url,
        offerLetterUrl: d.offer_letter_url,
        isCurrent: d.is_current ?? false,
        order: d.display_order,
      }));
    } catch {
      return DEFAULT_EXPERIENCES_LIST;
    }
  },

  async addExperience(exp: Omit<ExperienceItem, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data, error } = await supabase
        .from('experiences')
        .insert({
          company: exp.company,
          role: exp.title,
          type: exp.type,
          start_date: exp.period.split('–')[0]?.trim() || '2024',
          end_date: exp.isCurrent ? 'Present' : exp.period.split('–')[1]?.trim() || '',
          is_current: exp.isCurrent,
          location: exp.location,
          description: exp.description,
          responsibilities: exp.responsibilities || [],
          skills: exp.technologies || [],
          company_logo_url: exp.companyLogoUrl || '',
          certificate_url: exp.certificateUrl || '',
          offer_letter_url: exp.offerLetterUrl || '',
          display_order: exp.order || 1,
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };
      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error adding experience' };
    }
  },

  async updateExperience(id: string, exp: Partial<ExperienceItem>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (exp.company !== undefined) payload.company = exp.company;
      if (exp.title !== undefined) payload.role = exp.title;
      if (exp.type !== undefined) payload.type = exp.type;
      if (exp.location !== undefined) payload.location = exp.location;
      if (exp.description !== undefined) payload.description = exp.description;
      if (exp.technologies !== undefined) payload.skills = exp.technologies;
      if (exp.responsibilities !== undefined) payload.responsibilities = exp.responsibilities;
      if (exp.isCurrent !== undefined) payload.is_current = exp.isCurrent;
      if (exp.companyLogoUrl !== undefined) payload.company_logo_url = exp.companyLogoUrl;
      if (exp.certificateUrl !== undefined) payload.certificate_url = exp.certificateUrl;
      if (exp.offerLetterUrl !== undefined) payload.offer_letter_url = exp.offerLetterUrl;
      if (exp.order !== undefined) payload.display_order = exp.order;

      const { error } = await supabase.from('experiences').update(payload).eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating experience' };
    }
  },

  async deleteExperience(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('experiences').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error deleting experience' };
    }
  },

  // ----------------------------------------------------------------------------
  // INTERNSHIPS
  // ----------------------------------------------------------------------------
  async getInternships(): Promise<InternshipItem[]> {
    if (!isSupabaseConfigured) return DEFAULT_INTERNSHIPS_LIST;
    try {
      const { data, error } = await supabase
        .from('internships')
        .select('*')
        .order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return DEFAULT_INTERNSHIPS_LIST;
      return data.map((d) => ({
        id: d.id,
        roleTitle: d.role_title,
        organization: d.organization,
        targetCompanyType: d.organization || 'Tech Startups & Product Teams',
        status: (d.status || 'Open to Offers') as InternshipItem['status'],
        preferredDomain: d.domain || 'Software Engineering',
        period: `${d.start_date} – ${d.end_date || ''}`,
        description: d.description || '',
        technologies: Array.isArray(d.skills) ? d.skills : [],
        responsibilities: Array.isArray(d.responsibilities) ? d.responsibilities : [],
        certificateUrl: d.certificate_url,
        offerLetterUrl: d.offer_letter_url,
      }));
    } catch {
      return DEFAULT_INTERNSHIPS_LIST;
    }
  },

  async addInternship(item: Omit<InternshipItem, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data, error } = await supabase
        .from('internships')
        .insert({
          organization: item.organization || item.targetCompanyType,
          role_title: item.roleTitle,
          domain: item.preferredDomain,
          start_date: item.period.split('–')[0]?.trim() || 'Summer 2026',
          end_date: item.period.split('–')[1]?.trim() || 'Immediate Availability',
          description: item.description,
          responsibilities: item.responsibilities || [],
          skills: item.technologies || [],
          status: item.status,
          certificate_url: item.certificateUrl || '',
          offer_letter_url: item.offerLetterUrl || '',
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };
      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error adding internship' };
    }
  },

  async updateInternship(id: string, item: Partial<InternshipItem>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (item.roleTitle !== undefined) payload.role_title = item.roleTitle;
      if (item.organization !== undefined) payload.organization = item.organization;
      if (item.targetCompanyType !== undefined) payload.organization = item.targetCompanyType;
      if (item.preferredDomain !== undefined) payload.domain = item.preferredDomain;
      if (item.description !== undefined) payload.description = item.description;
      if (item.technologies !== undefined) payload.skills = item.technologies;
      if (item.responsibilities !== undefined) payload.responsibilities = item.responsibilities;
      if (item.status !== undefined) payload.status = item.status;
      if (item.certificateUrl !== undefined) payload.certificate_url = item.certificateUrl;
      if (item.offerLetterUrl !== undefined) payload.offer_letter_url = item.offerLetterUrl;

      const { error } = await supabase.from('internships').update(payload).eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating internship' };
    }
  },

  async deleteInternship(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('internships').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error deleting internship' };
    }
  },

  // ----------------------------------------------------------------------------
  // RESUMES & ACTIVE RESUME
  // ----------------------------------------------------------------------------
  async getResumes(): Promise<ResumeRecord[]> {
    if (!isSupabaseConfigured) return DEFAULT_RESUMES;
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false });
      if (error || !data || data.length === 0) return DEFAULT_RESUMES;
      return data.map((d) => ({
        id: d.id,
        fileName: d.file_name,
        fileUrl: d.file_url,
        fileSize: d.file_size || '184 KB',
        version: d.version || 'v1.0',
        isActive: d.is_active ?? false,
        createdAt: d.created_at,
      }));
    } catch {
      return DEFAULT_RESUMES;
    }
  },

  async getActiveResume(): Promise<ResumeRecord> {
    const list = await this.getResumes();
    const active = list.find((r) => r.isActive);
    return active || list[0] || DEFAULT_RESUMES[0];
  },

  async addResume(resume: Omit<ResumeRecord, 'id'>): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      // If setting as active, first set other resumes to inactive
      if (resume.isActive) {
        await supabase.from('resumes').update({ is_active: false }).neq('id', '00000000-0000-0000-0000-000000000000');
      }

      const { data, error } = await supabase
        .from('resumes')
        .insert({
          file_name: resume.fileName,
          file_url: resume.fileUrl,
          file_size: resume.fileSize || '184 KB',
          version: resume.version || 'v1.0',
          is_active: resume.isActive ?? true,
        })
        .select('id')
        .single();
      if (error) return { success: false, error: error.message };

      // Also update profiles.resume_url if active
      if (resume.isActive && resume.fileUrl) {
        await this.updateProfile({ resumeUrl: resume.fileUrl });
      }

      return { success: true, id: data.id };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error adding resume' };
    }
  },

  async setActiveResume(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      await supabase.from('resumes').update({ is_active: false }).neq('id', id);
      const { data, error } = await supabase.from('resumes').update({ is_active: true }).eq('id', id).select('file_url').single();
      if (error) return { success: false, error: error.message };

      if (data?.file_url) {
        await this.updateProfile({ resumeUrl: data.file_url });
      }
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error setting active resume' };
    }
  },

  async deleteResume(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('resumes').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error deleting resume' };
    }
  },

  // ----------------------------------------------------------------------------
  // SOCIAL LINKS
  // ----------------------------------------------------------------------------
  async getSocialLinks(): Promise<SocialLinkRecord[]> {
    if (!isSupabaseConfigured) return DEFAULT_SOCIAL_LINKS;
    try {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return DEFAULT_SOCIAL_LINKS;
      return data.map((d) => ({
        id: d.id,
        platform: d.platform,
        url: d.url,
        displayText: d.display_text || d.url,
        icon: d.icon,
        displayOrder: d.display_order,
        isActive: d.is_active,
      }));
    } catch {
      return DEFAULT_SOCIAL_LINKS;
    }
  },

  async updateSocialLinks(links: SocialLinkRecord[]): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      for (const link of links) {
        if (link.id && !link.id.startsWith('sl-')) {
          await supabase
            .from('social_links')
            .update({
              url: link.url,
              display_text: link.displayText || link.url,
              is_active: link.isActive,
              updated_at: new Date().toISOString(),
            })
            .eq('id', link.id);
        } else {
          await supabase.from('social_links').insert({
            platform: link.platform,
            url: link.url,
            display_text: link.displayText || link.url,
            is_active: link.isActive,
            display_order: link.displayOrder || 1,
          });
        }
      }
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating social links' };
    }
  },

  // ----------------------------------------------------------------------------
  // CONTACT INFO
  // ----------------------------------------------------------------------------
  async getContactInfo(): Promise<ContactInfoAdmin> {
    if (!isSupabaseConfigured) return DEFAULT_CONTACT_INFO;
    try {
      const { data, error } = await supabase.from('contact_info').select('*').limit(1).maybeSingle();
      if (error || !data) return DEFAULT_CONTACT_INFO;
      return {
        id: data.id,
        email: data.email || DEFAULT_CONTACT_INFO.email,
        phone: data.phone || DEFAULT_CONTACT_INFO.phone,
        location: data.location || DEFAULT_CONTACT_INFO.location,
        linkedin: data.linkedin || DEFAULT_CONTACT_INFO.linkedin,
        github: data.github || DEFAULT_CONTACT_INFO.github,
        availability: data.availability || DEFAULT_CONTACT_INFO.availability,
        timeZone: data.time_zone || DEFAULT_CONTACT_INFO.timeZone,
        responseTime: data.response_time || DEFAULT_CONTACT_INFO.responseTime,
        preferredContactMethod: data.preferred_contact_method || DEFAULT_CONTACT_INFO.preferredContactMethod,
      };
    } catch {
      return DEFAULT_CONTACT_INFO;
    }
  },

  async updateContactInfo(info: Partial<ContactInfoAdmin>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data: existing } = await supabase.from('contact_info').select('id').limit(1).maybeSingle();
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (info.email !== undefined) payload.email = info.email;
      if (info.phone !== undefined) payload.phone = info.phone;
      if (info.location !== undefined) payload.location = info.location;
      if (info.linkedin !== undefined) payload.linkedin = info.linkedin;
      if (info.github !== undefined) payload.github = info.github;
      if (info.availability !== undefined) payload.availability = info.availability;
      if (info.timeZone !== undefined) payload.time_zone = info.timeZone;
      if (info.responseTime !== undefined) payload.response_time = info.responseTime;
      if (info.preferredContactMethod !== undefined) payload.preferred_contact_method = info.preferredContactMethod;

      if (existing?.id) {
        const { error } = await supabase.from('contact_info').update(payload).eq('id', existing.id);
        if (error) return { success: false, error: error.message };
      } else {
        const { error } = await supabase.from('contact_info').insert(payload);
        if (error) return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating contact info' };
    }
  },

  // ----------------------------------------------------------------------------
  // MESSAGES (INQUIRIES)
  // ----------------------------------------------------------------------------
  async getMessages(): Promise<ContactMessage[]> {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error || !data) return [];
      return data.map((d) => ({
        id: d.id,
        name: d.name,
        email: d.email,
        subject: d.subject,
        message: d.message,
        receivedAt: d.created_at,
        isRead: d.is_read ?? false,
        isStarred: d.is_starred ?? false,
      }));
    } catch {
      return [];
    }
  },

  async submitContactMessage(msg: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Database service is currently initializing. Please try again soon.' };
    }
    try {
      const { error } = await supabase.from('messages').insert({
        name: msg.name.trim(),
        email: msg.email.trim(),
        subject: msg.subject.trim(),
        message: msg.message.trim(),
        is_read: false,
        is_starred: false,
      });
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Failed to send message' };
    }
  },

  async markMessageRead(id: string, isRead = true): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured) return { success: true };
    try {
      await supabase.from('messages').update({ is_read: isRead }).eq('id', id);
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async toggleStarMessage(id: string, isStarred: boolean): Promise<{ success: boolean }> {
    if (!isSupabaseConfigured) return { success: true };
    try {
      await supabase.from('messages').update({ is_starred: isStarred }).eq('id', id);
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async deleteMessage(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { error } = await supabase.from('messages').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error deleting message' };
    }
  },

  // ----------------------------------------------------------------------------
  // SITE SETTINGS
  // ----------------------------------------------------------------------------
  async getSiteSettings(): Promise<SiteSettingsData> {
    if (!isSupabaseConfigured) return DEFAULT_SITE_SETTINGS;
    try {
      const { data, error } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
      if (error || !data) return DEFAULT_SITE_SETTINGS;
      return {
        id: data.id,
        siteTitle: data.site_title || DEFAULT_SITE_SETTINGS.siteTitle,
        metaDescription: data.site_description || DEFAULT_SITE_SETTINGS.metaDescription,
        maintenanceMode: false,
        searchEngineIndexing: true,
        analyticsId: '',
        publicEmail: data.contact_email || DEFAULT_SITE_SETTINGS.publicEmail,
        allowPublicContact: data.enable_contact_form ?? true,
        enableDownloadResume: true,
        supabaseConfigStatus: 'connected',
      };
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  },

  async updateSiteSettings(settings: Partial<SiteSettingsData>): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) return { success: false, error: 'Supabase not configured' };
    try {
      const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();
      const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (settings.siteTitle !== undefined) payload.site_title = settings.siteTitle;
      if (settings.metaDescription !== undefined) payload.site_description = settings.metaDescription;
      if (settings.publicEmail !== undefined) payload.contact_email = settings.publicEmail;
      if (settings.allowPublicContact !== undefined) payload.enable_contact_form = settings.allowPublicContact;

      if (existing?.id) {
        const { error } = await supabase.from('site_settings').update(payload).eq('id', existing.id);
        if (error) return { success: false, error: error.message };
      } else {
        const { error } = await supabase.from('site_settings').insert(payload);
        if (error) return { success: false, error: error.message };
      }
      return { success: true };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Error updating site settings' };
    }
  },

  // ----------------------------------------------------------------------------
  // STORAGE (portfolio-assets)
  // ----------------------------------------------------------------------------
  async uploadFile(file: File, folder = 'general'): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase credentials not configured' };
    }
    try {
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const timestamp = Date.now();

      // Retrieve current authenticated session to verify user token and admin user ID
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUserId = sessionData?.session?.user?.id || ADMIN_USER_ID;

      // Candidate paths in case storage RLS policy requires specific folder structure
      const candidatePaths = [
        `${folder}/${timestamp}_${cleanFileName}`,
        `${currentUserId}/${timestamp}_${cleanFileName}`,
        `public/${timestamp}_${cleanFileName}`,
        `${timestamp}_${cleanFileName}`,
      ];

      let lastError: string | null = null;
      let uploadedPath: string | null = null;

      for (const targetPath of candidatePaths) {
        // IMPORTANT: Do NOT use upsert: true. 
        // With upsert: true, PostgreSQL executes ON CONFLICT DO UPDATE, which evaluates UPDATE RLS policies.
        // If an UPDATE policy is not defined or fails, it throws "new row violates row-level security policy".
        const { data, error } = await supabase.storage
          .from('portfolio-assets')
          .upload(targetPath, file, {
            cacheControl: '3600',
            upsert: false,
            contentType: file.type || 'application/octet-stream',
          });

        if (!error && data?.path) {
          uploadedPath = data.path;
          break;
        }

        if (error) {
          lastError = error.message;
          // If error is not related to RLS policy, stop trying other paths
          if (
            !error.message.toLowerCase().includes('row-level security') &&
            !error.message.toLowerCase().includes('policy') &&
            !error.message.toLowerCase().includes('unauthorized') &&
            !error.message.toLowerCase().includes('permission')
          ) {
            break;
          }
        }
      }

      if (!uploadedPath) {
        return { success: false, error: lastError || 'Upload failed' };
      }

      // Retrieve public URL
      const { data: urlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(uploadedPath);

      return { success: true, url: urlData.publicUrl };
    } catch (e: unknown) {
      return { success: false, error: e instanceof Error ? e.message : 'Upload failed' };
    }
  },

  // ----------------------------------------------------------------------------
  // HERO PROFILE (public.hero_profile)
  // ----------------------------------------------------------------------------
  async getHeroProfile(activeOnly = true): Promise<HeroProfileRecord | null> {
    if (!isSupabaseConfigured) {
      return DEFAULT_HERO_PROFILE;
    }
    try {
      // 2. Load the existing hero_profile row first:
      //    SELECT * FROM public.hero_profile WHERE is_active = true LIMIT 1
      let query = supabase.from('hero_profile').select('*');
      if (activeOnly) {
        query = query.eq('is_active', true);
      }
      const { data, error } = await query
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.warn('Error querying hero_profile table:', error.message);
        // Fallback: try loading by the known existing row id
        const { data: byId } = await supabase
          .from('hero_profile')
          .select('*')
          .eq('id', EXISTING_HERO_PROFILE_ID)
          .maybeSingle();

        if (byId) {
          return {
            id: byId.id,
            name: byId.name ?? DEFAULT_HERO_PROFILE.name,
            badge: byId.badge ?? DEFAULT_HERO_PROFILE.badge,
            headline: byId.headline ?? DEFAULT_HERO_PROFILE.headline,
            description: byId.description ?? DEFAULT_HERO_PROFILE.description,
            image_url: byId.image_url ?? null,
            image_alt: byId.image_alt ?? DEFAULT_HERO_PROFILE.image_alt,
            is_active: byId.is_active ?? true,
            updated_at: byId.updated_at,
            created_at: byId.created_at,
          };
        }

        return DEFAULT_HERO_PROFILE;
      }

      if (!data) {
        // Check by the known existing id: 7a6ee60a-1659-4633-996e-99b50dd561f0
        const { data: byId } = await supabase
          .from('hero_profile')
          .select('*')
          .eq('id', EXISTING_HERO_PROFILE_ID)
          .maybeSingle();

        if (byId) {
          return {
            id: byId.id,
            name: byId.name ?? DEFAULT_HERO_PROFILE.name,
            badge: byId.badge ?? DEFAULT_HERO_PROFILE.badge,
            headline: byId.headline ?? DEFAULT_HERO_PROFILE.headline,
            description: byId.description ?? DEFAULT_HERO_PROFILE.description,
            image_url: byId.image_url ?? null,
            image_alt: byId.image_alt ?? DEFAULT_HERO_PROFILE.image_alt,
            is_active: byId.is_active ?? true,
            updated_at: byId.updated_at,
            created_at: byId.created_at,
          };
        }

        return activeOnly ? null : DEFAULT_HERO_PROFILE;
      }

      return {
        id: data.id,
        name: data.name ?? DEFAULT_HERO_PROFILE.name,
        badge: data.badge ?? DEFAULT_HERO_PROFILE.badge,
        headline: data.headline ?? DEFAULT_HERO_PROFILE.headline,
        description: data.description ?? DEFAULT_HERO_PROFILE.description,
        image_url: data.image_url ?? null,
        image_alt: data.image_alt ?? DEFAULT_HERO_PROFILE.image_alt,
        is_active: data.is_active ?? true,
        updated_at: data.updated_at,
        created_at: data.created_at,
      };
    } catch (e) {
      console.warn('hero_profile get error:', e);
      return DEFAULT_HERO_PROFILE;
    }
  },

  // ----------------------------------------------------------------------------
  // ADMIN AUTH & HERO PROFILE (public.hero_profile)
  // ----------------------------------------------------------------------------
  async verifyAdminSession(): Promise<{ valid: boolean; userId?: string; error?: string }> {
    if (!isSupabaseConfigured) {
      return { valid: false, error: 'Supabase credentials not configured' };
    }
    try {
      // 1. Get current authenticated session using the EXISTING Supabase client
      const { data, error } = await supabase.auth.getSession();
      let session = data?.session;

      // Check if session token is close to expiry (< 60 seconds)
      const nowSeconds = Math.floor(Date.now() / 1000);
      const isExpiringSoon = Boolean(session?.expires_at && session.expires_at <= nowSeconds + 60);

      // 2. If the session is missing, errored, or expiring soon, call: supabase.auth.refreshSession()
      if (!session || error || isExpiringSoon) {
        try {
          const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
          if (!refreshError && refreshData?.session) {
            session = refreshData.session;
          }
        } catch (refEx) {
          console.warn('verifyAdminSession refreshSession exception:', refEx);
        }
      }

      // If still no session after refresh
      if (!session || !session.user) {
        console.warn('No active admin session detected after refreshSession()');
        return { valid: false, error: 'Please login again' };
      }

      return { valid: true, userId: session.user.id };
    } catch (err) {
      console.error('Session verification exception:', err);
      return { valid: false, error: 'Please login again' };
    }
  },

  async updateHeroProfile(
    profileData: Partial<HeroProfileRecord>
  ): Promise<{ success: boolean; data?: HeroProfileRecord; error?: string }> {
    if (!isSupabaseConfigured) {
      return { success: false, error: 'Supabase credentials not configured' };
    }

    // 8. Use the currently authenticated Supabase session
    // 9. Before saving, verify: const { data: { session } } = await supabase.auth.getSession();
    const { data: { session } } = await supabase.auth.getSession();
    let currentSession = session;

    if (!currentSession) {
      try {
        const { data: refreshData, error: refreshErr } = await supabase.auth.refreshSession();
        if (!refreshErr && refreshData?.session) {
          currentSession = refreshData.session;
        }
      } catch (err) {
        console.warn('refreshSession attempt failed:', err);
      }
    }

    // 10. If there is no session, show "Please login again".
    if (!currentSession) {
      return { success: false, error: 'Please login again' };
    }

    try {
      // 2. Load the existing hero_profile row first:
      //    SELECT * FROM public.hero_profile
      //    WHERE is_active = true
      //    LIMIT 1
      // 3. Store its id: 7a6ee60a-1659-4633-996e-99b50dd561f0
      let existingHeroId: string = EXISTING_HERO_PROFILE_ID;

      const { data: activeRows, error: activeErr } = await supabase
        .from('hero_profile')
        .select('id')
        .eq('is_active', true)
        .limit(1);

      if (activeErr) {
        console.error('Supabase error querying active hero_profile row:', activeErr);
      }

      if (activeRows && activeRows.length > 0 && activeRows[0].id) {
        existingHeroId = activeRows[0].id;
      } else {
        // Fallback: check if ANY row exists in public.hero_profile
        const { data: anyRows } = await supabase
          .from('hero_profile')
          .select('id')
          .limit(1);

        if (anyRows && anyRows.length > 0 && anyRows[0].id) {
          existingHeroId = anyRows[0].id;
        }
      }

      // If profileData explicitly passed a valid uuid (e.g. from existing row)
      if (profileData.id && profileData.id.includes('-') && profileData.id !== 'hero-profile-1') {
        existingHeroId = profileData.id;
      }

      // 4. When saving text/content, use:
      //    supabase
      //      .from('hero_profile')
      //      .update({
      //        name,
      //        badge,
      //        headline,
      //        description,
      //        image_url,
      //        image_alt,
      //        is_active,
      //        updated_at: new Date().toISOString()
      //      })
      //      .eq('id', existingHeroId)
      // 5. NEVER use: .insert(...) for Hero Profile saving.
      // 6. NEVER use: .upsert(...) for Hero Profile saving.
      const { data: updatedRecord, error: updateError } = await supabase
        .from('hero_profile')
        .update({
          name: profileData.name !== undefined ? profileData.name.trim() : DEFAULT_HERO_PROFILE.name,
          badge: profileData.badge !== undefined ? profileData.badge.trim() : DEFAULT_HERO_PROFILE.badge,
          headline: profileData.headline !== undefined ? profileData.headline.trim() : DEFAULT_HERO_PROFILE.headline,
          description: profileData.description !== undefined ? profileData.description.trim() : DEFAULT_HERO_PROFILE.description,
          image_url: profileData.image_url !== undefined ? profileData.image_url : null,
          image_alt: profileData.image_alt !== undefined ? profileData.image_alt : DEFAULT_HERO_PROFILE.image_alt,
          is_active: profileData.is_active !== undefined ? profileData.is_active : true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingHeroId)
        .select('*')
        .single();

      if (updateError) {
        console.error('Supabase error updating hero_profile row:', updateError);
        const formattedErr = [
          updateError.message,
          updateError.code ? `Code: ${updateError.code}` : null,
          updateError.details ? `Details: ${updateError.details}` : null,
          updateError.hint ? `Hint: ${updateError.hint}` : null,
        ].filter(Boolean).join(' | ');
        return { success: false, error: formattedErr || updateError.message };
      }

      return {
        success: true,
        data: {
          id: updatedRecord.id,
          name: updatedRecord.name ?? DEFAULT_HERO_PROFILE.name,
          badge: updatedRecord.badge ?? DEFAULT_HERO_PROFILE.badge,
          headline: updatedRecord.headline ?? DEFAULT_HERO_PROFILE.headline,
          description: updatedRecord.description ?? DEFAULT_HERO_PROFILE.description,
          image_url: updatedRecord.image_url ?? null,
          image_alt: updatedRecord.image_alt ?? DEFAULT_HERO_PROFILE.image_alt,
          is_active: updatedRecord.is_active ?? true,
          updated_at: updatedRecord.updated_at,
          created_at: updatedRecord.created_at,
        },
      };
    } catch (e: unknown) {
      console.error('Exception in updateHeroProfile:', e);
      const errObj = e as any;
      const formattedErr = [
        errObj?.message || 'Error updating hero profile',
        errObj?.code ? `Code: ${errObj.code}` : null,
        errObj?.details ? `Details: ${errObj.details}` : null,
        errObj?.hint ? `Hint: ${errObj.hint}` : null,
      ].filter(Boolean).join(' | ');
      return {
        success: false,
        error: formattedErr,
      };
    }
  },

  async uploadHeroImage(file: File): Promise<{
    success: boolean;
    url?: string;
    stage?: 'storage_upload' | 'hero_profile_update' | 'auth';
    error?: string;
  }> {
    if (!isSupabaseConfigured) {
      return { success: false, stage: 'auth', error: 'Supabase credentials not configured' };
    }

    // AUTH:
    // Before upload:
    // const { data: { session }, error } = await supabase.auth.getSession();
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    let currentSession = session;

    if (!currentSession || sessionError) {
      try {
        const { data: refreshData, error: refreshErr } = await supabase.auth.refreshSession();
        if (!refreshErr && refreshData?.session) {
          currentSession = refreshData.session;
        }
      } catch (err) {
        console.warn('refreshSession attempt failed:', err);
      }
    }

    // If session is missing, stop and show:
    // "Admin session expired. Please login again."
    if (!currentSession) {
      console.warn('HERO UPLOAD: Admin session expired. Please login again.');
      return {
        success: false,
        stage: 'auth',
        error: 'Admin session expired. Please login again.',
      };
    }

    try {
      // STORAGE UPLOAD:
      // Use the existing bucket: portfolio-assets
      // Use a UNIQUE file path for every new upload, for example:
      // hero/<timestamp>-<sanitized-filename>
      // Do NOT use a path that already exists.
      // Do NOT use upsert unless absolutely necessary.
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = `hero/${Date.now()}-${sanitizedFileName}`;

      console.log("HERO UPLOAD: starting storage upload");
      console.log("HERO UPLOAD: session", currentSession?.user?.id);
      console.log("HERO UPLOAD: bucket", "portfolio-assets");
      console.log("HERO UPLOAD: file path", filePath);

      const { data: { session: debugSession }, error: sessionErrorDiag } =
        await supabase.auth.getSession();

      console.log("=== HERO AUTH DEBUG ===");
      console.log("Session exists:", !!debugSession);
      console.log("User ID:", debugSession?.user?.id);
      console.log("Email:", debugSession?.user?.email);
      console.log("Access token exists:", !!debugSession?.access_token);
      console.log("Session error:", sessionErrorDiag);

      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      console.log("getUser ID:", userData?.user?.id);
      console.log("getUser error:", userError);

      console.log("=== END HERO AUTH DEBUG ===");

      const { data: uploadData, error: storageError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type || 'image/jpeg',
        });

      if (storageError) {
        console.error("HERO UPLOAD: storage upload failed", storageError);
        const errObj = storageError as any;
        const formattedErr = [
          errObj.message,
          errObj.code ? `Code: ${errObj.code}` : null,
          errObj.details ? `Details: ${errObj.details}` : null,
          errObj.hint ? `Hint: ${errObj.hint}` : null,
        ].filter(Boolean).join(' | ');

        return {
          success: false,
          stage: 'storage_upload',
          error: formattedErr || storageError.message,
        };
      }

      // If Storage upload succeeds, log:
      console.log("HERO UPLOAD: storage upload successful");

      // 1. Get the public URL.
      const { data: urlData } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // Then log before the database update:
      console.log("HERO UPLOAD: updating hero_profile");

      // 2. UPDATE the existing hero_profile row:
      //    .from('hero_profile')
      //    .update({ image_url: publicUrl, updated_at: new Date().toISOString() })
      //    .eq('id', '7a6ee60a-1659-4633-996e-99b50dd561f0')
      // Never INSERT into hero_profile.
      // Never UPSERT hero_profile.
      const { error: dbError } = await supabase
        .from('hero_profile')
        .update({
          image_url: publicUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', '7a6ee60a-1659-4633-996e-99b50dd561f0');

      if (dbError) {
        console.error("HERO UPLOAD: hero_profile update failed", dbError);
        const formattedErr = [
          dbError.message,
          dbError.code ? `Code: ${dbError.code}` : null,
          dbError.details ? `Details: ${dbError.details}` : null,
          dbError.hint ? `Hint: ${dbError.hint}` : null,
        ].filter(Boolean).join(' | ');

        return {
          success: false,
          stage: 'hero_profile_update',
          url: publicUrl,
          error: formattedErr || dbError.message,
        };
      }

      console.log("HERO UPLOAD: hero_profile update successful");
      return { success: true, url: publicUrl };
    } catch (e: unknown) {
      console.error("HERO UPLOAD: unexpected exception", e);
      const errObj = e as any;
      const formattedErr = [
        errObj?.message || 'Hero image upload failed',
        errObj?.code ? `Code: ${errObj.code}` : null,
        errObj?.details ? `Details: ${errObj.details}` : null,
        errObj?.hint ? `Hint: ${errObj.hint}` : null,
      ].filter(Boolean).join(' | ');

      return {
        success: false,
        stage: 'storage_upload',
        error: formattedErr,
      };
    }
  },
};
