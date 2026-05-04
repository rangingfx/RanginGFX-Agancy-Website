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
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-card px-6 py-3 rounded-full">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="font-display text-2xl tracking-tighter rainbow-logo">RanginGFX</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
              >
                <img src={user.photoURL} alt={user.displayName} className="w-6 h-6 rounded-full" />
                <span className="text-xs font-semibold hidden lg:block">{user.displayName.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 glass-card rounded-2xl p-2 border border-white/10 shadow-2xl"
                  >
                    <button 
                      onClick={() => { onDashboardToggle(); setShowProfile(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                    {user.role === 'admin' && (
                      <button 
                        onClick={() => { onAdminToggle(); setShowProfile(false); }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Admin Panel
                      </button>
                    )}
                    <button 
                      onClick={() => logout()}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/5 rounded-xl transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={() => loginWithGoogle()}
              className="flex items-center gap-2 bg-white text-primary px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-500 hover:text-white transition-all group"
            >
              Sign In
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
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
