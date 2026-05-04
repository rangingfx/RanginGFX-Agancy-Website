import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden px-6">
      {/* Abstract Background elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/[0.05] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <header>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-mono mb-6 tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                TOP RATED DIGITAL AGENCY
              </div>
              
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.95] md:leading-[0.85] mb-8 tracking-tighter uppercase text-balance">
                SCALING <span className="text-glass italic">BRANDS</span> THROUGH CODE
              </h1>
              
              <p className="text-base md:text-lg text-white/50 max-w-lg mb-10 leading-relaxed font-medium">
                Premier creative agency engineering high-performance digital experiences. 
                Optimized, accessible, and conversion-focused.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#services" className="px-8 py-4 bg-accent text-primary rounded-2xl font-bold text-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all flex items-center gap-2">
                  Our Services
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <a href="#work" className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors">
                  View Work
                </a>
              </div>
            </motion.div>
          </header>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 aspect-square glass-card rounded-[4rem] overflow-hidden group border-white/5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-500/10 group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3 border border-white/10 rounded-full animate-[spin_25s_linear_infinite] opacity-30" />
                <div className="absolute w-1/2 h-1/2 border border-blue-500/20 rounded-full animate-[spin_20s_linear_infinite_reverse] opacity-30" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
