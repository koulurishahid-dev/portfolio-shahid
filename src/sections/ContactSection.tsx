import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Globe,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon } from '../components/SocialIcons';
import { Magnetic } from '../animations/Magnetic';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const epilogueRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)', true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ['start 96%', 'start 62%'],
  });

  const { scrollYProgress: epilogueProgress } = useScroll({
    target: epilogueRef,
    offset: ['start 96%', 'start 70%'],
  });

  const watermarkX = useTransform(scrollYProgress, [0, 1], [-120, 140]);
  const headerY = useTransform(scrollYProgress, [0, 1], isDesktop ? [35, -35] : [16, -16]);

  const leftColX = useTransform(gridProgress, [0, 1], [isDesktop ? -55 : 0, 0]);
  const rightColX = useTransform(gridProgress, [0, 1], [isDesktop ? 55 : 0, 0]);
  const colsScale = useTransform(gridProgress, [0, 1], [isDesktop ? 0.94 : 0.97, 1]);
  const colsOpacity = useTransform(gridProgress, [0, 0.45, 1], [0.45, 0.92, 1]);

  const epilogueScale = useTransform(epilogueProgress, [0, 1], [isDesktop ? 0.88 : 0.94, 1]);
  const epilogueY = useTransform(epilogueProgress, [0, 1], [40, 0]);
  const epilogueOpacity = useTransform(epilogueProgress, [0, 0.45, 1], [0.45, 0.9, 1]);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Please provide a subject.';
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide your message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `[Portfolio] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.open(mailtoUrl, '_blank');
    }, 500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-32 bg-[#09090B] border-t border-white/10 relative overflow-hidden text-white"
    >
      {/* Horizontal Scrubbing Watermark */}
      <motion.div
        style={{ x: shouldReduceMotion ? 0 : watermarkX }}
        className="absolute top-12 sm:top-16 left-0 whitespace-nowrap font-black text-[15vw] sm:text-[11vw] leading-none uppercase tracking-tighter text-transparent opacity-[0.03] pointer-events-none select-none will-change-transform"
      >
        <span style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}>
          COLLABORATE · BUILD · CONNECT
        </span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : headerY }}
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-20 will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-mono font-semibold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>CHAPTER 07 · THE HORIZON</span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-zinc-300 font-sans hidden sm:inline">Direct Connection &amp; Collaboration</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Have an Idea? Let&apos;s Build Something.
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
              I&apos;m always interested in connecting with people who are passionate about technology, innovation, entrepreneurship, and building meaningful products.
            </p>
          </motion.div>
        </motion.div>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 max-w-5xl mx-auto items-start">
          {/* Left Column: Slides inward from left on scroll */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : leftColX,
              scale: shouldReduceMotion ? 1 : colsScale,
              opacity: shouldReduceMotion ? 1 : colsOpacity,
            }}
            className="lg:col-span-5 space-y-6 will-change-transform"
          >
            <div className="rounded-3xl bg-[#141418] p-5 sm:p-8 border border-white/10 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-2">
                Get in Touch Directly
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed font-normal">
                Whether you have an inquiry for SLRJ Digital, want to discuss software engineering, or explore an AI concept, my inbox is open.
              </p>

              {/* Email Card with Copy Action */}
              <div className="p-4 rounded-2xl bg-[#18181B] border border-white/10 mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                  Direct Email
                </div>
                <div className="text-sm font-semibold text-white break-all mb-3 font-mono">
                  {PERSONAL_INFO.email}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Magnetic strength={0.2}>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      data-cursor="pointer"
                      data-cursor-text="MAIL"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium text-xs transition-colors cursor-pointer shadow-sm shadow-red-600/30"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Email</span>
                    </a>
                  </Magnetic>

                  <Magnetic strength={0.2}>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      data-cursor="pointer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#24242A] hover:bg-[#2E2E36] text-zinc-200 border border-white/15 font-medium text-xs transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-red-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </Magnetic>
                </div>
              </div>

              {/* Social and Web Links with Hover Animation */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Online Profiles &amp; Venture
                </div>

                <a
                  href={PERSONAL_INFO.social.slrjDigital}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  data-cursor-text="VISIT"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#18181B] hover:bg-[#202026] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white hover:border-red-500/40 transition-all duration-200 cursor-pointer group"
                >
                  <span className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-red-500" />
                    <span>SLRJ Digital Official Website</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_INFO.social.slrjFounder}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  data-cursor-text="FOUNDER"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#18181B] hover:bg-[#202026] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white hover:border-red-500/40 transition-all duration-200 cursor-pointer group"
                >
                  <span className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-red-500" />
                    <span>SLRJ Founder Page</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  data-cursor-text="CONNECT"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#18181B] hover:bg-[#202026] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white hover:border-red-500/40 transition-all duration-200 cursor-pointer group"
                >
                  <span className="flex items-center gap-2.5">
                    <LinkedinIcon className="w-4 h-4 text-red-500" />
                    <span>LinkedIn Network</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_INFO.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  data-cursor-text="CODE"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#18181B] hover:bg-[#202026] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white hover:border-red-500/40 transition-all duration-200 cursor-pointer group"
                >
                  <span className="flex items-center gap-2.5">
                    <GithubIcon className="w-4 h-4 text-zinc-300" />
                    <span>GitHub Profile</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={PERSONAL_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  data-cursor-text="INSTA"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#18181B] hover:bg-[#202026] border border-white/10 text-xs font-semibold text-zinc-200 hover:text-white hover:border-red-500/40 transition-all duration-200 cursor-pointer group"
                >
                  <span className="flex items-center gap-2.5">
                    <InstagramIcon className="w-4 h-4 text-red-500" />
                    <span>Instagram Profile</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Slides inward from right on scroll */}
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : rightColX,
              scale: shouldReduceMotion ? 1 : colsScale,
              opacity: shouldReduceMotion ? 1 : colsOpacity,
            }}
            className="lg:col-span-7 will-change-transform"
          >
            <div className="rounded-3xl bg-[#141418] p-5 sm:p-9 border border-white/10 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 font-normal">
                Fill out the details below. All fields are validated.
              </p>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-2xl bg-red-950/40 border border-red-500/40 text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      Message Formatted &amp; Dispatched!
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      Thank you for reaching out, <span className="font-semibold text-white">{formData.name}</span>. Your default mail client has been opened with your message. I typically respond within 24–48 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="inline-flex items-center px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-colors cursor-pointer mt-3 shadow-md shadow-red-600/30"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
                      >
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Johnson"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-[#18181B] placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-red-500 focus:ring-red-500/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. alex@example.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-[#18181B] placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-red-500 focus:ring-red-500/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
                      >
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Collaboration Opportunity / Web Development Project"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-[#18181B] placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                          errors.subject
                            ? 'border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-red-500 focus:ring-red-500/20'
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.subject}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5"
                      >
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share your ideas, project requirements, or opportunity details..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-white bg-[#18181B] placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all resize-y ${
                          errors.message
                            ? 'border-red-500 focus:ring-red-500/30'
                            : 'border-white/10 focus:border-red-500 focus:ring-red-500/20'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button with Magnetic Effect */}
                    <Magnetic strength={0.2} className="w-full">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        data-cursor="pointer"
                        data-cursor-text="SEND"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-900/50 text-white font-semibold text-sm shadow-md shadow-red-600/30 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98]"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Cinematic Horizon Ending Callout (Chapter 07 Epilogue) expanding on scroll */}
        <motion.div
          ref={epilogueRef}
          style={{
            scale: shouldReduceMotion ? 1 : epilogueScale,
            y: shouldReduceMotion ? 0 : epilogueY,
            opacity: shouldReduceMotion ? 1 : epilogueOpacity,
          }}
          className="mt-14 sm:mt-20 max-w-5xl mx-auto rounded-3xl p-6 sm:p-14 bg-gradient-to-r from-black via-zinc-950 to-black text-white border border-red-500/40 shadow-2xl relative overflow-hidden text-center will-change-transform"
        >
          {/* Ambient Glowing Horizon Beam */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_20px_#EF4444]" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-red-600/20 blur-[100px] pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <div className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
              THE HORIZON · EPILOGUE
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
              SHAHID KOULURI
            </h3>
            <p className="text-lg sm:text-xl font-light text-zinc-300 italic">
              &ldquo;Building today. Thinking about tomorrow.&rdquo;
            </p>
            <div className="pt-2 text-sm sm:text-base font-extrabold tracking-widest text-red-500 uppercase font-mono">
              LEARN · BUILD · GROW
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
