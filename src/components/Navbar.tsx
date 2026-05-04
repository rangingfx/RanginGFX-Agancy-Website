import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowRight, User as UserIcon, LogOut, ChevronDown, LayoutDashboard, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../lib/AuthContext";

export default function Navbar({ onDashboardToggle, onAdminToggle }: { onDashboardToggle: () => void, onAdminToggle: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { user, loginWithGoogle, logout } = useAuth();

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Reviews", href: "#reviews" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between enterprise-glass px-8 py-3 rounded-2xl pointer-events-auto">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <span className="text-white font-black text-lg italic">R</span>
          </div>
          <span className="font-display text-xl tracking-tighter font-black text-white hover:text-blue-400 transition-colors">RANGINGFX</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-mono font-bold text-white/40 hover:text-blue-400 transition-all uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 bg-white/[0.03] hover:bg-white/[0.08] pl-1 pr-3 py-1 rounded-xl border border-white/10 transition-all active:scale-95"
              >
                <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-lg object-cover" />
                <span className="text-[10px] font-mono font-bold hidden lg:block tracking-widest text-white/70">{user.displayName.split(' ')[0].toUpperCase()}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 enterprise-glass rounded-2xl p-2 border border-white/10 shadow-2xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                       <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Authenticated As</p>
                       <p className="text-xs font-bold truncate text-white">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => { onDashboardToggle(); setShowProfile(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold hover:bg-white/5 rounded-xl transition-colors text-white/70 hover:text-white"
                    >
                      <LayoutDashboard className="w-4 h-4 text-blue-500" />
                      PROJECT_CONTROL
                    </button>
                    {user.role === 'admin' && (
                      <button 
                        onClick={() => { onAdminToggle(); setShowProfile(false); }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold hover:bg-white/5 rounded-xl transition-colors text-white/70 hover:text-white"
                      >
                        <Settings className="w-4 h-4 text-purple-500" />
                        SYSTEM_CORE
                      </button>
                    )}
                    <button 
                      onClick={() => logout()}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      DISCONNECT
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={() => loginWithGoogle()}
              className="shimmer-button flex items-center gap-3 bg-blue-600 text-white px-7 py-3 rounded-xl text-xs font-black hover:bg-blue-700 transition-all group shadow-xl shadow-blue-600/20 active:scale-95"
            >
              INITIALIZE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden text-white/50 hover:text-white transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-3/4 sm:w-1/2 bg-[#0A0A0A] border-l border-white/10 p-8 pt-24 z-50 md:hidden"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-display font-bold tracking-tight hover:text-blue-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                ))}
                
                <div className="pt-6 border-t border-white/10 mt-6">
                  {!user ? (
                    <motion.button 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onClick={() => { loginWithGoogle(); setIsOpen(false); }}
                      className="w-full bg-white text-black p-4 rounded-2xl font-bold text-center"
                    >
                      Get Started
                    </motion.button>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex flex-col gap-4"
                    >
                      <button 
                        onClick={() => { onDashboardToggle(); setIsOpen(false); }}
                        className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl font-bold text-center"
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="w-full text-red-500/50 p-4 rounded-2xl font-semibold text-center"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
