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
    <div className="min-h-screen selection:bg-blue-500 selection:text-white bg-[#030303]">
      <Navbar 
        onDashboardToggle={() => setView('dashboard')} 
        onAdminToggle={() => setView('admin')}
      />
      
      <AnimatePresence mode="wait">
        {view === 'admin' ? (
           <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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
            className="overflow-x-hidden"
          >
            <Hero />
            
            <div className="w-full flex justify-center py-12 pointer-events-none overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
              />
            </div>

            <Services />
            <Pricing />
            <Reviews />
            <Work />
            <Contact />

            {/* Optimized Partner Marquee */}
            <section className="py-16 border-y border-white/5 bg-white/[0.01]">
              <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.5em]">Industry Leading Partners</span>
              </div>
              <div className="flex whitespace-nowrap">
                {[1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="flex items-center gap-16 md:gap-32 px-10"
                  >
                    {[
                      "amazon", "apple", "netflix", "stripe", "shopify", 
                      "cloudflare", "cpanel", "tiktok", "meta", "google"
                    ].map(slug => (
                      <img 
                        key={`${slug}-${i}`}
                        src={`https://cdn.simpleicons.org/${slug}/white`} 
                        alt={slug}
                        loading="lazy"
                        className="h-6 md:h-10 w-auto opacity-10 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500"
                      />
                    ))}
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Final Conversion CTA */}
            <section className="py-24 md:py-32 px-6 flex flex-col items-center text-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl relative z-10"
              >
                <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 tracking-tighter leading-none uppercase">
                  READY TO GO <span className="text-glass italic">LEGENDARY</span>?
                </h2>
                <p className="text-lg md:text-xl text-white/50 mb-12 max-w-xl mx-auto">
                  Join industry leaders building the future of the digital landscape with RanginGfx.
                </p>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group relative px-12 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl overflow-hidden"
                >
                  <span className="relative z-10">Get Started Now</span>
                  <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
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

