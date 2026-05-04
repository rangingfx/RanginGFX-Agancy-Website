import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Reviews from "./components/Reviews";
import Work from "./components/Work";
import Contact from "./components/Contact";
import AIChat from "./components/AIChat";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import { motion, AnimatePresence } from "motion/react";
import { useState, lazy, Suspense } from "react";

// Lazy load heavy dashboard components for faster initial paint
const LazyUserDashboard = lazy(() => import("./components/UserDashboard"));
const LazyAdminDashboard = lazy(() => import("./components/AdminDashboard"));

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard' | 'admin'>('landing');

  return (
    <div className="min-h-screen selection:bg-blue-500 selection:text-white bg-[#030303] text-white">
      <Navbar 
        onDashboardToggle={() => setView('dashboard')} 
        onAdminToggle={() => setView('admin')}
      />
      
      <AnimatePresence mode="wait">
        {view === 'admin' ? (
           <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
             <Suspense fallback={<div className="h-screen flex items-center justify-center font-mono opacity-20">LOAD_ADMIN_CONTEXT...</div>}>
               <LazyAdminDashboard />
             </Suspense>
           </motion.div>
        ) : view === 'landing' ? (
          <motion.main
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="overflow-x-hidden pt-10"
          >
            <Hero />
            
            <div className="w-full flex justify-center py-20 pointer-events-none relative overflow-hidden">
               <div className="absolute inset-0 hero-gradient opacity-50" />
               <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent relative z-10"
              />
            </div>

            <Services />
            <Pricing />
            <Reviews />
            <Work />
            <Contact />

            {/* Optimized Partner Marquee */}
            <section className="py-24 border-y border-white/[0.03] bg-white/[0.01] relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/[0.02] animate-pulse-slow" />
              <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
                <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.6em] font-bold">Trusted by Industry Powerhouses</span>
              </div>
              <div className="flex whitespace-nowrap overflow-hidden py-4 relative z-10">
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-16 md:gap-40 px-10"
                  >
                    {[
                      "amazon", "apple", "netflix", "stripe", "shopify", 
                      "cloudflare", "github", "tiktok", "meta", "google"
                    ].map(slug => (
                      <div key={`${slug}-${i}`} className="group flex flex-col items-center gap-3">
                        <img 
                          src={`https://cdn.simpleicons.org/${slug}/white`} 
                          alt={slug}
                          className="h-7 md:h-9 w-auto opacity-10 group-hover:opacity-100 transition-all duration-700 brightness-200"
                        />
                        <span className="text-[8px] font-mono text-white/0 group-hover:text-white/20 transition-all uppercase tracking-tighter">{slug}</span>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Final Conversion CTA */}
            <section className="py-32 md:py-48 px-6 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="max-w-4xl relative z-10"
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.3em] mb-12">Deployment Ready</span>
                <h2 className="text-6xl md:text-[9rem] font-display font-black mb-12 tracking-tighter leading-[0.85] uppercase">
                  PUSH THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">LIMITS</span>
                </h2>
                <p className="text-base md:text-lg text-white/40 mb-16 max-w-xl mx-auto font-medium leading-relaxed">
                  The infrastructure of your success starts here. Transform your digital footprint with serverless-first engineering and pixel-perfect design.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="shimmer-button group px-12 py-6 bg-blue-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-600/20"
                  >
                    Launch Your Project
                  </button>
                  <a 
                    href="#work"
                    className="px-12 py-6 bg-white/[0.03] border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/[0.08] transition-all"
                  >
                    View Our Archive
                  </a>
                </div>
              </motion.div>
            </section>
          </motion.main>
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <Suspense fallback={<div className="h-screen flex items-center justify-center font-mono opacity-20">INITIALIZING_DASHBOARD...</div>}>
              <LazyUserDashboard />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <AIChat />
      <WhatsAppButton />
    </div>
  );
}

