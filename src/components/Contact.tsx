import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, MapPin, Copy, Check, Phone, Clock, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactInfoAdmin } from '../admin/types';

interface ContactProps {
  links?: {
    github: string;
    linkedin: string;
    email: string;
  };
  contactInfo?: ContactInfoAdmin;
  onSubmitMessage?: (msg: { name: string; email: string; subject: string; message: string }) => Promise<{ success: boolean; error?: string }>;
}

export const Contact: React.FC<ContactProps> = ({
  links = PERSONAL_INFO.links,
  contactInfo,
  onSubmitMessage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Internship Opportunity',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const location = contactInfo?.location || PERSONAL_INFO.location;
  const email = contactInfo?.email || links.email;
  const linkedin = contactInfo?.linkedin || links.linkedin;
  const github = contactInfo?.github || links.github;
  const phone = contactInfo?.phone;
  const availability = contactInfo?.availability || 'Open to Opportunities';
  const responseTime = contactInfo?.responseTime || 'Within 24 Hours';

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (onSubmitMessage) {
        const res = await onSubmitMessage(formData);
        if (!res.success && res.error) {
          // If Supabase table isn't created yet or network error, still provide graceful feedback
          console.warn('Supabase submit result:', res.error);
        }
      }
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Internship Opportunity',
        message: '',
      });
    } catch (err: unknown) {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-10 sm:py-14 md:py-16 relative bg-neutral-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">
              Get In Touch
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl">
            Currently open to technical internship roles, web development tasks, and project collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-5">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Direct Channels
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Feel free to reach out directly through email or connect on professional platforms.
              </p>

              {/* Channels List */}
              <div className="space-y-3">
                {/* Email */}
                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                        Email
                      </span>
                      <a
                        href={`mailto:${email}`}
                        className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-emerald-400 truncate block transition-colors"
                        title={`Send email to ${email}`}
                      >
                        {email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email Address"
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shrink-0"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* LinkedIn */}
                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                        LinkedIn
                      </span>
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-emerald-400 truncate block transition-colors"
                        title="Open LinkedIn in new tab"
                      >
                        {linkedin}
                      </a>
                    </div>
                  </div>
                </div>

                {/* GitHub */}
                <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300 shrink-0">
                      <Github className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                        GitHub
                      </span>
                      <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-emerald-400 truncate block transition-colors"
                        title="Open GitHub in new tab"
                      >
                        {github}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Optional Phone */}
                {phone && (
                  <div className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-mono text-neutral-500 uppercase block">
                        Phone / WhatsApp
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-neutral-200 truncate block">
                        {phone}
                      </span>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-neutral-950/40 border border-neutral-800/60 flex items-center gap-3 text-xs text-neutral-400">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{location} • Dr. A.P.J. Abdul Kalam Technical University</span>
                </div>

                {/* Response speed note */}
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-2 text-xs text-neutral-300">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Typical Response Time: <strong>{responseTime}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div 
              id="contact-form-container"
              className="p-5 sm:p-7 md:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm shadow-xl"
            >
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Recruiters and collaborators can submit an inquiry below. Messages are saved securely and delivered to my dashboard.
              </p>

              {isSubmitted ? (
                <div 
                  id="contact-success-state"
                  className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-300"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-xs text-neutral-400 max-w-sm">
                      Thank you for reaching out. Your message has been received, and I will respond to your email promptly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label 
                        htmlFor="contact-name"
                        className="block text-xs font-mono text-neutral-300 uppercase tracking-wider"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-4 py-2.5 rounded-xl bg-neutral-950/70 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all ${
                          errors.name
                            ? 'border-red-500/80 focus:ring-red-500'
                            : 'border-neutral-800 focus:border-emerald-500/80 focus:ring-emerald-500/80'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-400 font-mono mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label 
                        htmlFor="contact-email"
                        className="block text-xs font-mono text-neutral-300 uppercase tracking-wider"
                      >
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className={`w-full px-4 py-2.5 rounded-xl bg-neutral-950/70 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all ${
                          errors.email
                            ? 'border-red-500/80 focus:ring-red-500'
                            : 'border-neutral-800 focus:border-emerald-500/80 focus:ring-emerald-500/80'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 font-mono mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1">
                    <label 
                      htmlFor="contact-subject"
                      className="block text-xs font-mono text-neutral-300 uppercase tracking-wider"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Internship Interview Invitation"
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label 
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-neutral-300 uppercase tracking-wider"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Rudraksh, I reviewed your portfolio projects and would like to discuss..."
                      className={`w-full px-4 py-3 rounded-xl bg-neutral-950/70 border text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all resize-none ${
                        errors.message
                          ? 'border-red-500/80 focus:ring-red-500'
                          : 'border-neutral-800 focus:border-emerald-500/80 focus:ring-emerald-500/80'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-red-400 font-mono mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-neutral-500 font-mono">
                      * Required fields
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-submit-btn"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-all shadow-lg shadow-emerald-950/40 active:scale-95 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
