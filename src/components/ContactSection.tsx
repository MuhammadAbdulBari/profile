import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, Github, Linkedin, CheckCircle2, User, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { Magnet } from './Magnet';

gsap.registerPlugin(ScrollTrigger);

interface FormState {
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field as the user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Name is required';
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!form.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!form.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (form.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.send(
        'service_sq6ca6l',
        'template_ktk37n5',
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        'rytm5JPPKzhe9gIA-'
      );
      setSubmitStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entire contact content fades and slides up when 30% in viewport
      gsap.fromTo('.contact-container',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-container',
            start: 'top 70%', // 30% in viewport
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 overflow-hidden z-20"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#B600A8]/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-[#7621B0]/10 rounded-full blur-[90px] sm:blur-[130px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="contact-container max-w-6xl mx-auto w-full relative" style={{ opacity: 0 }}>
        {/* Section Title */}
        <div className="w-full flex flex-col items-center mb-16 sm:mb-20 md:mb-24">
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.8rem, 10vw, 140px)' }}
          >
            Get In Touch
          </h2>
          <div className="max-w-xl text-center mt-4 sm:mt-6">
            <p
              className="text-[#D7E2EA]/60 font-light leading-relaxed"
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.2rem)' }}
            >
              Have a project in mind or want to collaborate? Drop a message and let's construct something extraordinary together.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Info & Socials */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              <h3 className="text-xl sm:text-2xl font-semibold uppercase tracking-widest text-[#D7E2EA]/90 border-b border-[#D7E2EA]/10 pb-4">
                Contact Info
              </h3>

              <div className="flex flex-col gap-6">
                {/* Email Item */}
                <a
                  href="mailto:nizamabdulbari13@gmail.com"
                  className="flex items-start gap-4 group p-4 rounded-2xl border border-[#D7E2EA]/5 bg-[#D7E2EA]/[0.02] hover:bg-[#D7E2EA]/[0.05] hover:border-[#D7E2EA]/15 transition-all duration-300"
                >
                  <div className="p-3 bg-[#B600A8]/10 rounded-xl text-[#B600A8] group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#D7E2EA]/40 mb-1">Email Me</h4>
                    <p className="text-sm sm:text-base font-medium text-[#D7E2EA] group-hover:text-[#B600A8] transition-colors duration-300 break-all">
                      nizamabdulbari13@gmail.com
                    </p>
                  </div>
                </a>

                {/* Location Item */}
                <div className="flex items-start gap-4 p-4 rounded-2xl border border-[#D7E2EA]/5 bg-[#D7E2EA]/[0.02]">
                  <div className="p-3 bg-[#7621B0]/10 rounded-xl text-[#7621B0]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#D7E2EA]/40 mb-1">Location</h4>
                    <p className="text-sm sm:text-base font-medium text-[#D7E2EA]">
                      Karachi, Pakistan
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-full border border-[#B600A8]/20 bg-[#B600A8]/5 w-fit">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-[#D7E2EA]/85">
                    Available for Projects &amp; Hiring
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-6">
              <h4 className="text-xs uppercase tracking-wider text-[#D7E2EA]/40">
                Connect on Socials
              </h4>
              <div className="flex flex-wrap gap-4">
                {[
                  {
                    icon: <Github className="w-5 h-5" />,
                    url: 'https://github.com/MuhammadAbdulBari',
                    name: 'GitHub',
                  },
                  {
                    icon: <Linkedin className="w-5 h-5" />,
                    url: 'www.linkedin.com/in/abdulbari-dev',
                    name: 'LinkedIn',
                  },
                  {
                    icon: <Mail className="w-5 h-5" />,
                    url: 'mailto:nizamabdulbari13@gmail.com',
                    name: 'Email',
                  },
                ].map((social) => (
                  <Magnet key={social.name} padding={30} strength={4}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-full border border-[#D7E2EA]/15 text-[#D7E2EA] bg-[#0C0C0C] hover:border-white transition-all duration-300 relative group"
                      aria-label={social.name}
                    >
                      {/* Gradient Hover Effect */}
                      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                        style={{
                          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        }}
                      />
                      {social.icon}
                    </a>
                  </Magnet>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[32px] border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.01] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md">
              <AnimatePresence mode="wait">
                {submitStatus === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                      <CheckCircle2 className="w-10 h-10 animate-bounce" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-white mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-[#D7E2EA]/60 max-w-md mb-8">
                      Thank you for reaching out. Your message has been received successfully. I will get back to you shortly!
                    </p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2.5 rounded-full border border-[#D7E2EA]/20 hover:border-white transition-all text-xs uppercase tracking-widest text-[#D7E2EA]"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                    noValidate
                  >
                    {/* Name Field */}
                    <div className="relative w-full group">
                      <User className="absolute left-0 top-3.5 w-5 h-5 text-[#D7E2EA]/30 group-focus-within:text-[#B600A8] transition-colors" />
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        className="block w-full pl-8 py-3 text-sm text-[#D7E2EA] bg-transparent border-0 border-b border-[#D7E2EA]/20 focus:border-[#B600A8] focus:ring-0 focus:outline-none appearance-none transition-colors duration-300 peer"
                        placeholder=" "
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="name"
                        className="absolute text-sm text-[#D7E2EA]/40 pl-8 duration-300 transform -translate-y-6 scale-75 top-3.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:pl-8 peer-focus:text-[#B600A8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Your Name
                      </label>
                      {errors.name && (
                        <span className="text-xs text-rose-500 font-light mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative w-full group">
                      <Mail className="absolute left-0 top-3.5 w-5 h-5 text-[#D7E2EA]/30 group-focus-within:text-[#B600A8] transition-colors" />
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        className="block w-full pl-8 py-3 text-sm text-[#D7E2EA] bg-transparent border-0 border-b border-[#D7E2EA]/20 focus:border-[#B600A8] focus:ring-0 focus:outline-none appearance-none transition-colors duration-300 peer"
                        placeholder=" "
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="email"
                        className="absolute text-sm text-[#D7E2EA]/40 pl-8 duration-300 transform -translate-y-6 scale-75 top-3.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:pl-8 peer-focus:text-[#B600A8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email Address
                      </label>
                      {errors.email && (
                        <span className="text-xs text-rose-500 font-light mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    {/* Subject Field */}
                    <div className="relative w-full group">
                      <FileText className="absolute left-0 top-3.5 w-5 h-5 text-[#D7E2EA]/30 group-focus-within:text-[#B600A8] transition-colors" />
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="block w-full pl-8 py-3 text-sm text-[#D7E2EA] bg-transparent border-0 border-b border-[#D7E2EA]/20 focus:border-[#B600A8] focus:ring-0 focus:outline-none appearance-none transition-colors duration-300 peer"
                        placeholder=" "
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="subject"
                        className="absolute text-sm text-[#D7E2EA]/40 pl-8 duration-300 transform -translate-y-6 scale-75 top-3.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:pl-8 peer-focus:text-[#B600A8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Subject
                      </label>
                      {errors.subject && (
                        <span className="text-xs text-rose-500 font-light mt-1 block">
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message Field */}
                    <div className="relative w-full group">
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        className="block w-full py-3 text-sm text-[#D7E2EA] bg-transparent border-0 border-b border-[#D7E2EA]/20 focus:border-[#B600A8] focus:ring-0 focus:outline-none appearance-none transition-colors duration-300 peer resize-none"
                        placeholder=" "
                        disabled={isSubmitting}
                      />
                      <label
                        htmlFor="message"
                        className="absolute text-sm text-[#D7E2EA]/40 duration-300 transform -translate-y-6 scale-75 top-3.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#B600A8] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Your Message
                      </label>
                      {errors.message && (
                        <span className="text-xs text-rose-500 font-light mt-1 block">
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full text-white font-medium uppercase tracking-widest transition-all duration-300 focus:outline-none relative overflow-hidden group/btn py-4 mt-4"
                      style={{
                        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
                        outline: '2px solid white',
                        outlineOffset: '-3px',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>

                    {submitStatus === 'error' && (
                      <span className="text-xs text-rose-500 font-light text-center mt-2 block">
                        Oops! Something went wrong. Please try again.
                      </span>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
