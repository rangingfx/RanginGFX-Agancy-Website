import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden px-6 lg:px-12">
      {/* Dynamic Background */}
      <div className="absolute inset-0 hero-gradient opacity-30 pointer-events-none" />
      <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] animate-pulse-slow delay-1000 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <header className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-blue-400 text-[10px] font-mono mb-10 tracking-[0.3em] uppercase backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
                Engineering the Edge
              </div>
              
              <h1 className="font-display text-6xl sm:text-8xl md:text-[8rem] lg:text-[9.5rem] font-black leading-[0.8] mb-12 tracking-tighter uppercase text-white">
                WE BUILD <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/90 to-white/20 italic">DIGITAL</span> CORE
              </h1>
              
              <p className="text-lg md:text-xl text-white/40 max-w-lg mb-14 leading-relaxed font-medium mx-auto lg:mx-0">
                A specialized design and development studio purpose-built for the next era of web performance and serverless architecture.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-6">
                <a href="#pricing" className="shimmer-button px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:shadow-[0_0_50px_rgba(59,130,246,0.25)] transition-all flex items-center justify-center gap-3">
                  Start Your Project
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <a href="#work" className="px-10 py-5 bg-white/[0.02] border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/[0.08] transition-all flex items-center justify-center">
                  Explore Systems
                </a>
              </div>

              <div className="mt-16 flex items-center justify-center lg:justify-start gap-8 opacity-40">
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-neutral-800" />
                    ))}
                 </div>
                 <p className="text-xs font-mono tracking-widest uppercase">+200 PROJECTS SHIPPED</p>
              </div>
            </motion.div>
          </header>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full aspect-square max-w-lg">
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full animate-float" />
              <div className="absolute inset-0 enterprise-glass rounded-[4rem] flex items-center justify-center group overflow-hidden border-white/[0.03]">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent group-hover:opacity-100 transition-opacity" />
                 <pre className="text-[10px] font-mono text-blue-500/30 leading-tight select-none pointer-events-none group-hover:text-blue-500/50 transition-colors">
                    {`
_deploy: {
  status: "active",
  latency: "ms",
  edge: true,
  systems: [
    "design",
    "devops",
    "growth"
  ]
}

rangingfx_studio_2026
                    `}
                 </pre>
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[300px] h-[300px] border border-white/5 rounded-full animate-[spin_40s_linear_infinite] opacity-20" />
                    <div className="absolute w-[200px] h-[200px] border border-blue-500/10 rounded-full animate-[spin_25s_linear_infinite_reverse] opacity-20" />
                 </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
