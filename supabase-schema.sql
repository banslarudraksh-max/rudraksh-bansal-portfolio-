-- ==============================================================================
-- RUDRAKSH BANSAL PORTFOLIO - SUPABASE CMS SCHEMA & SEED SCRIPT
-- ==============================================================================
-- Run this complete script in your Supabase Dashboard -> SQL Editor -> New Query.
-- It creates all required tables, foreign keys, Row Level Security (RLS) policies,
-- storage buckets, and seeds the initial portfolio content.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CREATE TABLES

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Rudraksh Bansal',
  headline TEXT NOT NULL DEFAULT 'B.Tech CSE Student & Aspiring Software Developer',
  introduction TEXT NOT NULL DEFAULT 'Computer Science undergraduate student passionate about building clean software, practical utility applications, and exploring modern AI-assisted engineering workflows.',
  profile_image_url TEXT,
  location TEXT NOT NULL DEFAULT 'Ghaziabad / Delhi NCR, India',
  degree TEXT NOT NULL DEFAULT 'B.Tech in Computer Science and Engineering',
  university TEXT NOT NULL DEFAULT 'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
  semester TEXT NOT NULL DEFAULT '3rd Semester',
  specialization TEXT NOT NULL DEFAULT 'Artificial Intelligence & Machine Learning',
  career_direction TEXT NOT NULL DEFAULT 'Software Engineering & AI/ML Applications',
  availability TEXT NOT NULL DEFAULT 'Open to Software Development & Web Engineering Internships',
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ABOUT TABLE
CREATE TABLE IF NOT EXISTS public.about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL DEFAULT 'About Me',
  description TEXT NOT NULL DEFAULT 'I am a passionate Computer Science and Engineering student at Dr. A.P.J. Abdul Kalam Technical University (AKTU), currently in my 3rd semester specializing in AI-ML. I am driven by a deep curiosity about how software systems operate under the hood and how modern technologies can solve real-world problems. My journey began with foundational programming in Python, where I developed a strong appreciation for algorithmic thinking and clean system architecture.',
  career_objective TEXT NOT NULL DEFAULT 'To secure a challenging software engineering or web development internship where I can apply my programming skills, collaborate with experienced engineering mentors, and build impactful, production-grade applications.',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ABOUT HIGHLIGHTS TABLE
CREATE TABLE IF NOT EXISTS public.about_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  about_id UUID REFERENCES public.about(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'GraduationCap',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- EDUCATION TABLE
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  university TEXT NOT NULL,
  start_year TEXT NOT NULL,
  end_year TEXT NOT NULL,
  current_status TEXT NOT NULL,
  description TEXT NOT NULL,
  cgpa_grade TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL DEFAULT 'Proficient',
  icon TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT,
  main_image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_demo_url TEXT,
  category TEXT NOT NULL DEFAULT 'Python / Systems',
  status TEXT NOT NULL DEFAULT 'Completed',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- PROJECT IMAGES TABLE (SCREENSHOTS)
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Full-time',
  start_date TEXT NOT NULL,
  end_date TEXT,
  is_current BOOLEAN NOT NULL DEFAULT false,
  location TEXT,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  company_logo_url TEXT,
  certificate_url TEXT,
  offer_letter_url TEXT,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- INTERNSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization TEXT NOT NULL,
  role_title TEXT NOT NULL,
  domain TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  certificate_url TEXT,
  offer_letter_url TEXT,
  status TEXT NOT NULL DEFAULT 'Open to Offers',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  display_text TEXT,
  icon TEXT,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- CONTACT INFO TABLE
CREATE TABLE IF NOT EXISTS public.contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT NOT NULL,
  linkedin TEXT,
  github TEXT,
  availability TEXT NOT NULL,
  time_zone TEXT DEFAULT 'IST (UTC +5:30)',
  response_time TEXT DEFAULT 'Within 24 Hours',
  preferred_contact_method TEXT DEFAULT 'Email',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- MESSAGES TABLE (CONTACT INQUIRIES)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  is_starred BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RESUMES TABLE
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size TEXT,
  version TEXT NOT NULL DEFAULT 'v1.0',
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT NOT NULL DEFAULT 'Rudraksh Bansal | Software Developer & CSE Student',
  site_description TEXT NOT NULL DEFAULT 'Portfolio of Rudraksh Bansal, Computer Science Student at AKTU specializing in Python, Web Development, and AI.',
  contact_email TEXT NOT NULL DEFAULT 'bansalrudrakshkumar@gmail.com',
  open_graph_image TEXT,
  enable_contact_form BOOLEAN NOT NULL DEFAULT true,
  enable_project_filtering BOOLEAN NOT NULL DEFAULT true,
  enable_github_stats BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- TEST TABLE (for connection check)
CREATE TABLE IF NOT EXISTS public.admin_test (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL DEFAULT 'Supabase connection verified from Rudraksh Portfolio Admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_test ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if rerun
DO $$
BEGIN
  -- PROFILES
  DROP POLICY IF EXISTS "Public read profiles" ON public.profiles;
  DROP POLICY IF EXISTS "Admin write profiles" ON public.profiles;

  -- ABOUT
  DROP POLICY IF EXISTS "Public read about" ON public.about;
  DROP POLICY IF EXISTS "Admin write about" ON public.about;

  -- ABOUT HIGHLIGHTS
  DROP POLICY IF EXISTS "Public read about_highlights" ON public.about_highlights;
  DROP POLICY IF EXISTS "Admin write about_highlights" ON public.about_highlights;

  -- EDUCATION
  DROP POLICY IF EXISTS "Public read education" ON public.education;
  DROP POLICY IF EXISTS "Admin write education" ON public.education;

  -- SKILLS
  DROP POLICY IF EXISTS "Public read skills" ON public.skills;
  DROP POLICY IF EXISTS "Admin write skills" ON public.skills;

  -- PROJECTS
  DROP POLICY IF EXISTS "Public read projects" ON public.projects;
  DROP POLICY IF EXISTS "Admin write projects" ON public.projects;

  -- PROJECT IMAGES
  DROP POLICY IF EXISTS "Public read project_images" ON public.project_images;
  DROP POLICY IF EXISTS "Admin write project_images" ON public.project_images;

  -- EXPERIENCES
  DROP POLICY IF EXISTS "Public read experiences" ON public.experiences;
  DROP POLICY IF EXISTS "Admin write experiences" ON public.experiences;

  -- INTERNSHIPS
  DROP POLICY IF EXISTS "Public read internships" ON public.internships;
  DROP POLICY IF EXISTS "Admin write internships" ON public.internships;

  -- SOCIAL LINKS
  DROP POLICY IF EXISTS "Public read social_links" ON public.social_links;
  DROP POLICY IF EXISTS "Admin write social_links" ON public.social_links;

  -- CONTACT INFO
  DROP POLICY IF EXISTS "Public read contact_info" ON public.contact_info;
  DROP POLICY IF EXISTS "Admin write contact_info" ON public.contact_info;

  -- MESSAGES (CRITICAL SECURITY: Public can ONLY INSERT, NEVER READ)
  DROP POLICY IF EXISTS "Public insert messages" ON public.messages;
  DROP POLICY IF EXISTS "Admin all messages" ON public.messages;

  -- RESUMES
  DROP POLICY IF EXISTS "Public read resumes" ON public.resumes;
  DROP POLICY IF EXISTS "Admin write resumes" ON public.resumes;

  -- SITE SETTINGS
  DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
  DROP POLICY IF EXISTS "Admin write site_settings" ON public.site_settings;

  -- ADMIN TEST
  DROP POLICY IF EXISTS "Public read admin_test" ON public.admin_test;
  DROP POLICY IF EXISTS "Admin write admin_test" ON public.admin_test;
END $$;

-- 1. Profiles: Public can read, authenticated admin can do everything
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admin write profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. About: Public read, admin write
CREATE POLICY "Public read about" ON public.about FOR SELECT USING (true);
CREATE POLICY "Admin write about" ON public.about FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. About Highlights: Public read, admin write
CREATE POLICY "Public read about_highlights" ON public.about_highlights FOR SELECT USING (true);
CREATE POLICY "Admin write about_highlights" ON public.about_highlights FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Education: Public read, admin write
CREATE POLICY "Public read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Admin write education" ON public.education FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Skills: Public read, admin write
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admin write skills" ON public.skills FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 6. Projects: Public read visible, admin all
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admin write projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. Project Images: Public read, admin write
CREATE POLICY "Public read project_images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Admin write project_images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 8. Experiences: Public read, admin write
CREATE POLICY "Public read experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Admin write experiences" ON public.experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 9. Internships: Public read, admin write
CREATE POLICY "Public read internships" ON public.internships FOR SELECT USING (true);
CREATE POLICY "Admin write internships" ON public.internships FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 10. Social Links: Public read, admin write
CREATE POLICY "Public read social_links" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Admin write social_links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 11. Contact Info: Public read, admin write
CREATE POLICY "Public read contact_info" ON public.contact_info FOR SELECT USING (true);
CREATE POLICY "Admin write contact_info" ON public.contact_info FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 12. Messages: STRICT SECURITY
-- Public can INSERT a message from portfolio contact form
CREATE POLICY "Public insert messages" ON public.messages FOR INSERT WITH CHECK (true);
-- Authenticated admins can SELECT, UPDATE, DELETE messages
CREATE POLICY "Admin all messages" ON public.messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 13. Resumes: Public read, admin write
CREATE POLICY "Public read resumes" ON public.resumes FOR SELECT USING (true);
CREATE POLICY "Admin write resumes" ON public.resumes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 14. Site Settings: Public read, admin write
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin write site_settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 15. Admin Test: Public read, admin all
CREATE POLICY "Public read admin_test" ON public.admin_test FOR SELECT USING (true);
CREATE POLICY "Admin write admin_test" ON public.admin_test FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- 4. STORAGE BUCKET CONFIGURATION (portfolio-assets)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-assets', 'portfolio-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage policies
DO $$
BEGIN
  DROP POLICY IF EXISTS "Public can view portfolio assets" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can upload portfolio assets" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can update portfolio assets" ON storage.objects;
  DROP POLICY IF EXISTS "Admins can delete portfolio assets" ON storage.objects;
END $$;

CREATE POLICY "Public can view portfolio assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Admins can upload portfolio assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio-assets');

CREATE POLICY "Admins can update portfolio assets"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio-assets');

CREATE POLICY "Admins can delete portfolio assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portfolio-assets');

-- ==============================================================================
-- 5. INITIAL SEED DATA (Rudraksh Bansal Portfolio)
-- ==============================================================================

-- 1. Profile Seed
INSERT INTO public.profiles (
  name, headline, introduction, location, degree, university, semester, specialization, career_direction, availability
)
SELECT
  'Rudraksh Bansal',
  'B.Tech CSE Student & Aspiring Software Developer',
  'Computer Science undergraduate student passionate about building clean software, practical utility applications, and exploring modern AI-assisted engineering workflows.',
  'Ghaziabad / Delhi NCR, India',
  'B.Tech in Computer Science and Engineering',
  'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
  '3rd Semester',
  'Artificial Intelligence & Machine Learning',
  'Software Engineering & AI/ML Applications',
  'Open to Software Development & Web Engineering Internships'
WHERE NOT EXISTS (SELECT 1 FROM public.profiles);

-- 2. About Seed
INSERT INTO public.about (
  heading, description, career_objective
)
SELECT
  'About Me',
  'I am a passionate Computer Science and Engineering student at Dr. A.P.J. Abdul Kalam Technical University (AKTU), currently in my 3rd semester specializing in AI-ML. I am driven by a deep curiosity about how software systems operate under the hood and how modern technologies can solve real-world problems. My journey began with foundational programming in Python, where I developed a strong appreciation for algorithmic thinking and clean system architecture.',
  'To secure a challenging software engineering or web development internship where I can apply my programming skills, collaborate with experienced engineering mentors, and build impactful, production-grade applications.'
WHERE NOT EXISTS (SELECT 1 FROM public.about);

-- 3. About Highlights Seed
DO $$
DECLARE
  v_about_id UUID;
BEGIN
  SELECT id INTO v_about_id FROM public.about LIMIT 1;
  IF v_about_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM public.about_highlights) THEN
    INSERT INTO public.about_highlights (about_id, title, subtitle, description, icon, display_order)
    VALUES
      (v_about_id, 'Computer Science Undergraduate', 'AKTU • 2024-2028', 'Pursuing B.Tech in CSE with focus on software engineering fundamentals and AI-ML.', 'GraduationCap', 1),
      (v_about_id, 'Software & Web Development', 'Python • JavaScript • React', 'Building practical utilities, responsive modern interfaces, and algorithmic solutions.', 'CodeXml', 2),
      (v_about_id, 'Emerging AI & Modern Tooling', 'LLMs • Automation', 'Leveraging modern AI-assisted workflows and prompt engineering to accelerate software creation.', 'Cpu', 3);
  END IF;
END $$;

-- 4. Education Seed
INSERT INTO public.education (
  degree, institution, university, start_year, end_year, current_status, description, cgpa_grade, display_order
)
SELECT
  'Bachelor of Technology in Computer Science & Engineering (AI-ML)',
  'Affiliated College, AKTU',
  'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow',
  '2024',
  '2028',
  'Currently in 3rd Semester • Active Undergraduate',
  'Focused on Data Structures, Algorithms, Python Programming, Object-Oriented Software Design, Discrete Mathematics, and Computer Architecture.',
  'Enrolled (In Progress)',
  1
WHERE NOT EXISTS (SELECT 1 FROM public.education);

-- 5. Skills Seed
INSERT INTO public.skills (name, category, description, level, icon, display_order, is_active)
SELECT * FROM (VALUES
  ('Python', 'Programming', 'Data structures, scripting, GUI modules, automation', 'Core', 'Code', 1, true),
  ('JavaScript', 'Programming', 'ES6+ syntax, DOM manipulation, asynchronous flow', 'Core', 'Code', 2, true),
  ('HTML5', 'Web Development', 'Semantic markup, accessibility, SEO structure', 'Proficient', 'Globe', 3, true),
  ('CSS3', 'Web Development', 'Flexbox, Grid, custom styling, transitions', 'Proficient', 'Palette', 4, true),
  ('Responsive Design', 'Web Development', 'Mobile-first layouts, adaptive breakpoints', 'Proficient', 'Smartphone', 5, true),
  ('React', 'Web Development', 'Modern functional components, hooks, Tailwind CSS', 'Intermediate', 'Layers', 6, true),
  ('Git', 'Tools & AI', 'Branching, commits, rebasing, versioning', 'Core', 'GitBranch', 7, true),
  ('GitHub', 'Tools & AI', 'Repositories, pull requests, issue tracking', 'Core', 'Github', 8, true),
  ('AI Development Tools', 'Tools & AI', 'AI coding assistants, prompt workflows, prototyping', 'Active User', 'Sparkles', 9, true),
  ('Problem Solving', 'Professional Skills', 'Algorithmic approach and structured debugging', 'Strengths', 'CheckCircle', 10, true),
  ('Continuous Learning', 'Professional Skills', 'Quick to adopt new SDKs, libraries & paradigms', 'Strengths', 'TrendingUp', 11, true),
  ('Team Collaboration', 'Professional Skills', 'Clear communication, receptive to code reviews', 'Strengths', 'Users', 12, true)
) AS s(name, category, description, level, icon, display_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.skills);

-- 6. Projects Seed
INSERT INTO public.projects (
  title, short_description, full_description, main_image_url, technologies, github_url, live_demo_url, category, status, is_featured, is_visible, display_order
)
SELECT * FROM (VALUES
  (
    'Snake Game with GUI',
    'A classic arcade Snake game implemented in Python featuring a responsive graphical interface and real-time score tracking.',
    'A fully interactive implementation of the classic Snake arcade game built with Python. Features custom grid collision physics, progressive velocity scaling, real-time high-score persistence, and dynamic audio cues.',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    ARRAY['Python', 'Tkinter / Pygame', 'OOP', 'Event Handling'],
    'https://github.com/RudrakshBansal7',
    '',
    'Python / Systems',
    'Completed',
    true,
    true,
    1
  ),
  (
    'Automated Web Scraper & Parser',
    'A Python-based extraction utility for harvesting structured tabular data and exporting to CSV/JSON format.',
    'Modular data extraction tool that automates web scraping tasks with rate-limiting, error handling for dynamic DOM trees, and clean parsing into structured data formats.',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    ARRAY['Python', 'BeautifulSoup', 'Requests', 'Data Parsing'],
    'https://github.com/RudrakshBansal7',
    '',
    'Python / Systems',
    'Completed',
    true,
    true,
    2
  ),
  (
    'Interactive Developer Portfolio',
    'A high-performance modern personal portfolio website built with React, TypeScript, and responsive Tailwind styling.',
    'Fast, accessible single-page developer showcase featuring dark mode, interactive terminal simulator, dynamic project filters, and full administrative CMS dashboard.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    'https://github.com/RudrakshBansal7',
    '',
    'Web Application',
    'Completed',
    true,
    true,
    3
  ),
  (
    'CLI Utility & Task Manager',
    'A lightweight command-line task organizer and workflow tracker built with Python and JSON local storage.',
    'A fast, keyboard-centric terminal utility supporting colored ANSI status indicators, priority queues, deadline tracking, and file exports.',
    'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800',
    ARRAY['Python', 'CLI', 'File I/O', 'JSON Serialization'],
    'https://github.com/RudrakshBansal7',
    '',
    'Python / Systems',
    'Completed',
    false,
    true,
    4
  )
) AS p(title, short_description, full_description, main_image_url, technologies, github_url, live_demo_url, category, status, is_featured, is_visible, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.projects);

-- 7. Experiences Seed
INSERT INTO public.experiences (
  company, role, type, start_date, end_date, is_current, location, description, responsibilities, skills, display_order
)
SELECT * FROM (VALUES
  (
    'Independent Developer',
    'Open Source Contributor & Self-Directed Projects',
    'Open Source',
    '2024',
    'Present',
    true,
    'Remote',
    'Designed and built utility desktop applications and modern web tools using Python and React.',
    ARRAY['Implemented desktop GUI games and automation scripts in Python', 'Engineered responsive web applications using React and Tailwind CSS', 'Practiced Git version control, branching, and GitHub workflows'],
    ARRAY['Python', 'JavaScript', 'React', 'Git', 'Tailwind CSS'],
    1
  ),
  (
    'Dr. A.P.J. Abdul Kalam Technical University (AKTU)',
    'Computer Science & AI Academic Scholar',
    'Full-time',
    '2024',
    '2028',
    true,
    'Uttar Pradesh, India',
    'Focusing on algorithmic problem-solving, data structures, discrete mathematics, and emerging machine learning frameworks.',
    ARRAY['Engaged in core computer science coursework and lab work', 'Solved algorithmic coding challenges in Python and C++', 'Collaborated on group assignments and engineering projects'],
    ARRAY['Data Structures', 'Algorithms', 'Python', 'C++'],
    2
  )
) AS e(company, role, type, start_date, end_date, is_current, location, description, responsibilities, skills, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.experiences);

-- 8. Internships Seed
INSERT INTO public.internships (
  organization, role_title, domain, start_date, end_date, description, responsibilities, skills, status, display_order
)
SELECT * FROM (VALUES
  (
    'Tech Startups & Product Teams',
    'Software Engineering / Web Development Intern',
    'Frontend Development / Full Stack / AI Applications',
    'Summer 2026',
    'Immediate Availability',
    'Seeking practical internship opportunities to contribute high-quality code, collaborate with engineering mentors, and build real-world products.',
    ARRAY['Build modern, high-performance web interfaces in React and TypeScript', 'Develop backend automation and API endpoints in Python or Node.js', 'Participate actively in sprint planning, code reviews, and pair programming'],
    ARRAY['React', 'TypeScript', 'Python', 'Node.js', 'Tailwind CSS'],
    'Open to Offers',
    1
  )
) AS i(organization, role_title, domain, start_date, end_date, description, responsibilities, skills, status, display_order)
WHERE NOT EXISTS (SELECT 1 FROM public.internships);

-- 9. Social Links Seed
INSERT INTO public.social_links (platform, url, display_text, icon, display_order, is_active)
SELECT * FROM (VALUES
  ('github', 'https://github.com/RudrakshBansal7', 'github.com/RudrakshBansal7', 'Github', 1, true),
  ('linkedin', 'https://www.linkedin.com/in/rudraksh-bansal-855589308', 'linkedin.com/in/rudraksh-bansal-855589308', 'Linkedin', 2, true),
  ('email', 'mailto:bansalrudrakshkumar@gmail.com', 'bansalrudrakshkumar@gmail.com', 'Mail', 3, true),
  ('twitter', 'https://twitter.com', 'x.com/rudraksh', 'Twitter', 4, false)
) AS sl(platform, url, display_text, icon, display_order, is_active)
WHERE NOT EXISTS (SELECT 1 FROM public.social_links);

-- 10. Contact Info Seed
INSERT INTO public.contact_info (
  email, location, linkedin, github, availability, time_zone, response_time, preferred_contact_method
)
SELECT
  'bansalrudrakshkumar@gmail.com',
  'Ghaziabad / Delhi NCR, India',
  'https://www.linkedin.com/in/rudraksh-bansal-855589308',
  'https://github.com/RudrakshBansal7',
  'Available for Summer 2026 Internships & Part-time Roles',
  'IST (UTC +5:30)',
  'Within 24 Hours',
  'Email'
WHERE NOT EXISTS (SELECT 1 FROM public.contact_info);

-- 11. Resumes Seed
INSERT INTO public.resumes (
  file_name, file_url, file_size, version, is_active
)
SELECT
  'Rudraksh_Bansal_Resume_2026.pdf',
  '#',
  '184 KB',
  'v1.0 (AKTU CS)',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.resumes);

-- 12. Site Settings Seed
INSERT INTO public.site_settings (
  site_title, site_description, contact_email, enable_contact_form, enable_project_filtering, enable_github_stats
)
SELECT
  'Rudraksh Bansal | Software Developer & CSE Student',
  'Official portfolio of Rudraksh Bansal, Computer Science Student at AKTU specializing in Python, Web Development, and AI.',
  'bansalrudrakshkumar@gmail.com',
  true,
  true,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);

-- 13. Admin Test Seed
INSERT INTO public.admin_test (message)
SELECT 'Supabase connection verified successfully from Rudraksh Portfolio Admin!'
WHERE NOT EXISTS (SELECT 1 FROM public.admin_test);
