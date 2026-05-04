import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageCircle, Check } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Form Submitted:", formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-7xl font-bold mb-8 uppercase tracking-tight">
              GET IN <span className="text-glass">TOUCH</span>
            </h2>
            <p className="text-white/50 text-lg mb-12 max-w-md">
              Have a project in mind? Let's talk about how we can help you scale 
              your digital presence.
            </p>

            <div className="space-y-6 mb-12">
              <a href="mailto:info@rangingfx.com" className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Email Us</p>
                  <p className="text-lg font-bold">info@rangingfx.com</p>
                </div>
              </a>

              <a href="https://wa.me/923121700872" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 transition-all">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">WhatsApp</p>
                  <p className="text-lg font-bold">+92 312 1700872</p>
                </div>
              </a>

              <a href="https://maps.app.goo.gl/aQstg7XcMaSqLqGLA" target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Our Studio</p>
                  <p className="text-lg font-bold text-sm">RanginGfx, Islamabad, Pakistan</p>
                </div>
              </a>
            </div>

            <div className="glass-card p-4 rounded-3xl border-white/10 overflow-hidden shadow-2xl relative grayscale hover:grayscale-0 transition-all duration-700">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.5396096509066!2d72.96752117401984!3d33.6949834365131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbd000c9b9725%3A0xc202940e3c6dc592!2sRanginGfx!5e0!3m2!1sen!2sca!4v1777865715247!5m2!1sen!2sca" 
                width="100%" 
                height="300" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 md:p-12 rounded-[3.5rem] border-white/10 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-3xl font-display font-bold mb-8 italic">SEND A MESSAGE</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2 px-1">Full Name</label>
                      <input 
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2 px-1">Email Address</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2 px-1">Subject</label>
                    <input 
                      required
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Web Development Project"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2 px-1">Message</label>
                    <textarea 
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-500/50 transition-colors resize-none"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting || isSuccess}
                    className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                      isSuccess 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white text-primary hover:bg-blue-600 hover:text-white'
                    } disabled:opacity-70`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-primary/20 border-t-primary animate-spin rounded-full" />
                    ) : isSuccess ? (
                      <>
                        <Check className="w-5 h-5" /> MESSAGE SENT
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> SEND MESSAGE
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
