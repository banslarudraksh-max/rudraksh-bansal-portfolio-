import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, MapPin, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  links?: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export const Contact: React.FC<ContactProps> = ({
  links = PERSONAL_INFO.links,
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
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Internship Opportunity',
        message: '',
      });
    }, 900);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(links.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative bg-neutral-950/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-5">
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
                        href={`mailto:${links.email}`}
                        className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-emerald-400 truncate block transition-colors"
                        title={`Send email to ${links.email}`}
                      >
                        {links.email}
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
                        href={links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-emerald-400 truncate block transition-colors"
                        title="Open LinkedIn in new tab"
                      >
                        {links.linkedin}
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
                        href={links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-emerald-400 truncate block transition-colors"
                        title="Open GitHub in new tab"
                      >
                        {links.github}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-neutral-950/40 border border-neutral-800/60 flex items-center gap-3 text-xs text-neutral-400">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{PERSONAL_INFO.location} • Dr. A.P.J. Abdul Kalam Technical University</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div 
              id="contact-form-container"
              className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm shadow-xl"
            >
              <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Have a question or looking to offer an internship role? Send a note directly below.
              </p>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-semibold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Rudraksh will review your note and respond promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-4 py-2 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/40 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Your Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: '' });
                        }}
                        placeholder="e.g. Alex Sharma"
                        className={`w-full px-3.5 py-2.5 bg-neutral-950/80 border rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-neutral-800 focus:border-emerald-500/60 focus:ring-emerald-500/40'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                        placeholder="alex@company.com"
                        className={`w-full px-3.5 py-2.5 bg-neutral-950/80 border rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-neutral-800 focus:border-emerald-500/60 focus:ring-emerald-500/40'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Subject / Purpose
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-colors"
                    >
                      <option value="Internship Opportunity">Internship Opportunity / Review</option>
                      <option value="Project Collaboration">Project Collaboration</option>
                      <option value="Technical Inquiry">Technical Inquiry</option>
                      <option value="General Networking">General Networking</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      placeholder="Hi Rudraksh, we reviewed your projects and would like to discuss..."
                      className={`w-full px-3.5 py-2.5 bg-neutral-950/80 border rounded-xl text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:ring-1 transition-colors resize-none ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-neutral-800 focus:border-emerald-500/60 focus:ring-emerald-500/40'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      id="contact-submit-btn"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold text-white transition-all shadow-md shadow-emerald-950/40 active:scale-95 disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
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
