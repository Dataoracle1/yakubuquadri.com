// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// interface FormData {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// }

// interface FormErrors {
//   name?: string;
//   email?: string;
//   subject?: string;
//   message?: string;
// }

// const ContactSection: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
  
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.subject.trim()) {
//       newErrors.subject = 'Subject is required';
//     }
    
//     if (!formData.message.trim()) {
//       newErrors.message = 'Message is required';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
    
//     if (errors[name as keyof FormErrors]) {
//       setErrors({
//         ...errors,
//         [name]: undefined
//       });
//     }
//   };

//   const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
    
//     if (validateForm()) {
//       setIsSubmitting(true);
      
//       const formPayload = new FormData();
//       formPayload.append("access_key", "d4c7caea-f1fc-48f7-a133-e2706dd0be1a");
//       formPayload.append("name", formData.name);
//       formPayload.append("email", formData.email);
//       formPayload.append("subject", formData.subject);
//       formPayload.append("message", formData.message);

//       try {
//         const response = await fetch("https://api.web3forms.com/submit", {
//           method: "POST",
//           body: formPayload
//         });

//         const data = await response.json();

//         if (data.success) {
//           setSubmitStatus('success');
//           setFormData({ name: '', email: '', subject: '', message: '' });
//           setTimeout(() => setSubmitStatus('idle'), 5000);
//         } else {
//           setSubmitStatus('error');
//           setTimeout(() => setSubmitStatus('idle'), 5000);
//         }
//       } catch (error) {
//         console.error('Error submitting form:', error);
//         setSubmitStatus('error');
//         setTimeout(() => setSubmitStatus('idle'), 5000);
//       } finally {
//         setIsSubmitting(false);
//       }
//     }
//   };

//   return (
//     <section id="contact" className="py-20 bg-white">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-16">
//           <motion.h2 
//             className="text-3xl font-bold relative inline-block pb-3"
//             initial={{ opacity: 0, y: -20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             Have An Awesome Project Idea? Let's Discuss
//             <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-orange"></span>
//           </motion.h2>
//         </div>
        
//         <motion.div 
//           className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           {submitStatus === 'success' ? (
//             <motion.div 
//               className="text-center py-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="text-5xl mb-4 text-green-500">✓</div>
//               <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
//               <p className="text-text-gray">Your message has been sent successfully. I'll get back to you soon!</p>
//             </motion.div>
//           ) : submitStatus === 'error' ? (
//             <motion.div 
//               className="text-center py-8"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4 }}
//             >
//               <div className="text-5xl mb-4 text-red-500">✗</div>
//               <h3 className="text-2xl font-bold mb-2">Oops!</h3>
//               <p className="text-text-gray mb-4">Something went wrong. Please try again or email me directly.</p>
//               <button
//                 onClick={() => setSubmitStatus('idle')}
//                 className="bg-orange text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
//               >
//                 Try Again
//               </button>
//             </motion.div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Your Name"
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     errors.name ? 'border-red-500' : 'border-gray-300'
//                   } focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent`}
//                 />
//                 {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//               </div>
              
//               <div className="space-y-2">
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Your Email"
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     errors.email ? 'border-red-500' : 'border-gray-300'
//                   } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
//               </div>
              
//               <div className="space-y-2 md:col-span-2">
//                 <input
//                   type="text"
//                   name="subject"
//                   value={formData.subject}
//                   onChange={handleChange}
//                   placeholder="Subject"
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     errors.subject ? 'border-red-500' : 'border-gray-300'
//                   } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
//                 />
//                 {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
//               </div>
              
//               <div className="space-y-2 md:col-span-2">
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Your Message"
//                   rows={6}
//                   className={`w-full px-4 py-3 rounded-lg border ${
//                     errors.message ? 'border-red-500' : 'border-gray-300'
//                   } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none`}
//                 ></textarea>
//                 {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
//               </div>
              
//               <div className="md:col-span-2 text-center">
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting}
//                   className="bg-orange text-white px-10 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
//                 >
//                   {isSubmitting ? (
//                     <span className="flex items-center justify-center">
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Sending...
//                     </span>
//                   ) : (
//                     'Send Message'
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;





import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData { name: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; email?: string; subject?: string; message?: string; }

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Email is invalid';
    if (!formData.subject.trim()) e.subject = 'Subject is required';
    if (!formData.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name as keyof FormErrors]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const payload = new FormData();
    payload.append('access_key', 'd4c7caea-f1fc-48f7-a133-e2706dd0be1a');
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('subject', formData.subject);
    payload.append('message', formData.message);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: payload });
      const data = await res.json();
      setSubmitStatus(data.success ? 'success' : 'error');
      if (data.success) setFormData({ name: '', email: '', subject: '', message: '' });
    } catch { setSubmitStatus('error'); }
    finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
    .ct-section{font-family:'DM Sans',sans-serif;background:#0a0a0a;color:#f5f0eb;padding:7rem 0 8rem;position:relative;overflow:hidden}
    .ct-blob{position:absolute;border-radius:50%;filter:blur(130px);pointer-events:none}
    .ct-blob-1{width:600px;height:600px;background:radial-gradient(circle,rgba(255,107,53,.11) 0%,transparent 70%);top:-200px;left:-200px}
    .ct-blob-2{width:400px;height:400px;background:radial-gradient(circle,rgba(255,160,70,.07) 0%,transparent 70%);bottom:-80px;right:-80px}
    .ct-ghost{position:absolute;bottom:-.1em;right:-.04em;font-family:'Playfair Display',serif;font-size:clamp(130px,20vw,300px);font-weight:900;color:transparent;-webkit-text-stroke:1px rgba(255,107,53,.04);pointer-events:none;user-select:none;letter-spacing:-.04em;line-height:1}
    .ct-inner{max-width:1100px;margin:0 auto;padding:0 2rem;position:relative;z-index:1}
    .ct-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#ff9a6c;margin-bottom:1.25rem}
    .ct-eyebrow-line{width:32px;height:1px;background:#ff6b35}
    .ct-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:900;line-height:1.08;letter-spacing:-.03em;color:#f5f0eb;max-width:640px;margin-bottom:4rem}
    .ct-title em{font-style:italic;background:linear-gradient(135deg,#ff6b35 0%,#ffaa70 60%,#ff6b35 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:ct-shimmer 4s linear infinite}
    @keyframes ct-shimmer{0%{background-position:0% center}100%{background-position:200% center}}
    .ct-body{display:grid;grid-template-columns:1fr 1.6fr;gap:5rem;align-items:start}
    .ct-info-title{font-family:'Playfair Display',serif;font-size:1.35rem;font-weight:700;color:#f5f0eb;margin-bottom:1rem;letter-spacing:-.02em}
    .ct-info-desc{font-size:.92rem;line-height:1.8;color:rgba(245,240,235,.45);font-weight:300;margin-bottom:2.5rem}
    .ct-items{display:flex;flex-direction:column;gap:1.25rem}
    .ct-item{display:flex;align-items:center;gap:1rem;cursor:default}
    .ct-item-icon{width:44px;height:44px;flex-shrink:0;border-radius:12px;background:rgba(255,107,53,.08);border:1px solid rgba(255,107,53,.18);display:flex;align-items:center;justify-content:center;transition:background .3s,border-color .3s}
    .ct-item:hover .ct-item-icon{background:rgba(255,107,53,.16);border-color:rgba(255,107,53,.4)}
    .ct-item-label{font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:rgba(245,240,235,.35);font-weight:500;margin-bottom:2px}
    .ct-item-value{font-size:.9rem;color:rgba(245,240,235,.7);transition:color .3s}
    .ct-item:hover .ct-item-value{color:#f5f0eb}
    .ct-socials{display:flex;gap:.75rem;margin-top:2.5rem}
    .ct-social-btn{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,107,53,.18);background:transparent;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .3s cubic-bezier(.34,1.56,.64,1);color:rgba(245,240,235,.45);text-decoration:none}
    .ct-social-btn:hover{background:#ff6b35;border-color:#ff6b35;color:#fff;transform:translateY(-3px);box-shadow:0 8px 24px rgba(255,107,53,.35)}
    .ct-form-card{background:#ffffff;border-radius:28px;padding:3rem;position:relative;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.5),0 0 0 1px rgba(255,107,53,.15),inset 0 1px 0 #fff}
    .ct-form-card::before{content:'';position:absolute;top:0;left:2.5rem;right:2.5rem;height:3px;background:linear-gradient(90deg,#ff6b35,#ffaa70,#ff6b35);background-size:200% auto;border-radius:0 0 4px 4px;animation:ct-shimmer 3s linear infinite}
    .ct-form-card::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 80% 0%,rgba(255,107,53,.04) 0%,transparent 50%),radial-gradient(ellipse at 20% 100%,rgba(255,180,100,.03) 0%,transparent 50%);pointer-events:none;border-radius:28px}
    .ct-form-inner{position:relative;z-index:1}
    .ct-form-heading{font-family:'Playfair Display',serif;font-size:1.3rem;font-weight:700;color:#1a1a1a;margin-bottom:.4rem;letter-spacing:-.02em}
    .ct-form-sub{font-size:.85rem;color:rgba(30,30,30,.45);font-weight:300;margin-bottom:2rem}
    .ct-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
    .ct-field{display:flex;flex-direction:column;gap:5px}
    .ct-field.full{grid-column:1/-1}
    .ct-field-label{font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(30,30,30,.4);transition:color .3s}
    .ct-field.is-focused .ct-field-label{color:#ff6b35}
    .ct-input{font-family:'DM Sans',sans-serif;font-size:.9rem;color:#1a1a1a;background:#f8f7f5;border:1.5px solid #e8e4de;border-radius:12px;padding:13px 16px;width:100%;outline:none;transition:border-color .3s,box-shadow .3s,background .3s;resize:none;box-sizing:border-box;-webkit-appearance:none}
    .ct-input::placeholder{color:rgba(30,30,30,.35)}
    .ct-input:focus{border-color:#ff6b35;background:#fff;box-shadow:0 0 0 3px rgba(255,107,53,.12)}
    .ct-input.has-error{border-color:#e55;box-shadow:0 0 0 3px rgba(220,50,50,.1)}
    .ct-field-error{font-size:11px;color:#e55}
    .ct-submit{font-family:'DM Sans',sans-serif;display:inline-flex;align-items:center;justify-content:center;gap:10px;background:#ff6b35;color:#fff;padding:14px 36px;border-radius:100px;font-size:14px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;border:none;outline:none;transition:all .35s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden;margin-top:.5rem;width:100%}
    .ct-submit::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.18),transparent);opacity:0;transition:opacity .3s}
    .ct-submit:hover:not(:disabled){transform:translateY(-3px);box-shadow:0 20px 50px rgba(255,107,53,.4)}
    .ct-submit:hover::before{opacity:1}
    .ct-submit:disabled{opacity:.6;cursor:not-allowed}
    .ct-status{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 1rem;text-align:center;min-height:280px}
    .ct-status-icon{width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.8rem;margin-bottom:1.5rem}
    .ct-status-icon.success{background:rgba(34,197,94,.12);border:1.5px solid rgba(34,197,94,.3);color:#22c55e}
    .ct-status-icon.error{background:rgba(239,68,68,.1);border:1.5px solid rgba(239,68,68,.25);color:#ef4444}
    .ct-status-title{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:#1a1a1a;margin-bottom:.5rem}
    .ct-status-msg{font-size:.9rem;color:rgba(30,30,30,.5);line-height:1.6;max-width:280px;margin-bottom:1.5rem}
    .ct-retry-btn{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;background:#1a1a1a;color:#fff;border:none;padding:10px 24px;border-radius:100px;cursor:pointer;transition:opacity .2s}
    .ct-retry-btn:hover{opacity:.75}
    .ct-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,107,53,.2),transparent)}
    @media(max-width:900px){.ct-body{grid-template-columns:1fr;gap:3rem}.ct-title{margin-bottom:2.5rem}}
    @media(max-width:768px){.ct-section{padding:5rem 0 6rem}.ct-inner{padding:0 1.25rem}.ct-title{font-size:clamp(1.75rem,7.5vw,2.4rem)}.ct-ghost{display:none}.ct-form-card{padding:2rem 1.5rem;border-radius:20px}.ct-form-grid{grid-template-columns:1fr}.ct-field.full{grid-column:1}}
    @media(max-width:380px){.ct-form-card{padding:1.75rem 1.25rem}.ct-form-heading{font-size:1.15rem}}
  `;

  const socials = [
    { label: 'GitHub',   d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
    { label: 'LinkedIn', d: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
    { label: 'Twitter',  d: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
  ];

  const contactItems = [
    { label: 'Email', value: 'yakubuquadri@email.com', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg> },
    { label: 'Location', value: 'Lagos, Nigeria', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg> },
    { label: 'Availability', value: 'Open to opportunities', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="ct-divider" />
      <section id="contact" className="ct-section">
        <div className="ct-blob ct-blob-1" />
        <div className="ct-blob ct-blob-2" />
        <div className="ct-ghost">TALK</div>
        <div className="ct-inner">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }} viewport={{ once: true }}>
            <div className="ct-eyebrow"><span className="ct-eyebrow-line" />Let's connect</div>
            <h2 className="ct-title">Have an Awesome Project <em>Idea?</em> Let's Discuss</h2>
          </motion.div>
          <div className="ct-body">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }} viewport={{ once: true }}>
              <div className="ct-info-title">Don't be shy, say hello.</div>
              <p className="ct-info-desc">Whether you have a project in mind, a question to ask, or just want to say hi — my inbox is always open. I'll get back to you as soon as possible.</p>
              <div className="ct-items">
                {contactItems.map((item, i) => (
                  <motion.div key={i} className="ct-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} viewport={{ once: true }}>
                    <div className="ct-item-icon">{item.icon}</div>
                    <div><div className="ct-item-label">{item.label}</div><div className="ct-item-value">{item.value}</div></div>
                  </motion.div>
                ))}
              </div>
              <div className="ct-socials">
                {socials.map((s, i) => (
                  <a key={i} href="#" className="ct-social-btn" aria-label={s.label}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.d}/></svg>
                  </a>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1], delay: 0.15 }} viewport={{ once: true }}>
              <div className="ct-form-card">
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div key="success" className="ct-status" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                      <div className="ct-status-icon success">✓</div>
                      <div className="ct-status-title">Message Sent!</div>
                      <p className="ct-status-msg">Thank you! I'll get back to you as soon as possible.</p>
                    </motion.div>
                  ) : submitStatus === 'error' ? (
                    <motion.div key="error" className="ct-status" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                      <div className="ct-status-icon error">✗</div>
                      <div className="ct-status-title">Oops!</div>
                      <p className="ct-status-msg">Something went wrong. Please try again or reach out directly.</p>
                      <button className="ct-retry-btn" onClick={() => setSubmitStatus('idle')}>Try Again</button>
                    </motion.div>
                  ) : (
                    <motion.div key="form" className="ct-form-inner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                      <div className="ct-form-heading">Send a message</div>
                      <div className="ct-form-sub">I typically reply within 24 hours.</div>
                      <div className="ct-form-grid">
                        <div className={`ct-field${focused === 'name' ? ' is-focused' : ''}`}>
                          <label className="ct-field-label">Your Name</label>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} placeholder="Yakubu Quadri" className={`ct-input${errors.name ? ' has-error' : ''}`} />
                          {errors.name && <span className="ct-field-error">{errors.name}</span>}
                        </div>
                        <div className={`ct-field${focused === 'email' ? ' is-focused' : ''}`}>
                          <label className="ct-field-label">Email Address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} placeholder="hello@email.com" className={`ct-input${errors.email ? ' has-error' : ''}`} />
                          {errors.email && <span className="ct-field-error">{errors.email}</span>}
                        </div>
                        <div className={`ct-field full${focused === 'subject' ? ' is-focused' : ''}`}>
                          <label className="ct-field-label">Subject</label>
                          <input type="text" name="subject" value={formData.subject} onChange={handleChange} onFocus={() => setFocused('subject')} onBlur={() => setFocused(null)} placeholder="Project Inquiry" className={`ct-input${errors.subject ? ' has-error' : ''}`} />
                          {errors.subject && <span className="ct-field-error">{errors.subject}</span>}
                        </div>
                        <div className={`ct-field full${focused === 'message' ? ' is-focused' : ''}`}>
                          <label className="ct-field-label">Message</label>
                          <textarea name="message" value={formData.message} onChange={handleChange} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} placeholder="Tell me about your project…" rows={5} className={`ct-input${errors.message ? ' has-error' : ''}`} />
                          {errors.message && <span className="ct-field-error">{errors.message}</span>}
                        </div>
                        <div className="ct-field full">
                          <button className="ct-submit" onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? (
                              <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/><path d="M12 2a10 10 0 0110 10" stroke="#fff" strokeWidth="3" strokeLinecap="round"/></svg>Sending…</>
                            ) : (
                              <>Send Message<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></>
                            )}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;