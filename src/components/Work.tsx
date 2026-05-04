import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const works = [
  {
    id: 1,
    title: "EcoSphere Dashboard",
    category: "SaaS Platform",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    cols: "md:col-span-8",
    tags: ["React", "UI/UX", "Data Viz"]
  },
  {
    id: 2,
    title: "Luxe Marketplace",
    category: "eCommerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1200&fit=crop",
    cols: "md:col-span-4",
    tags: ["Next.js", "Shopify"]
  },
  {
    id: 3,
    title: "Nexus Branding",
    category: "Visual Identity",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop",
    cols: "md:col-span-4",
    tags: ["Logo", "Brand Guide"]
  },
  {
    id: 4,
    title: "Quantum SEO",
    category: "Optimization",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?w=1200&h=800&fit=crop",
    cols: "md:col-span-8",
    tags: ["Google Ads", "Ranking"]
  },
];

export default function Work() {
  return (
    <section id="work" className="py-20 md:py-28 px-6 bg-[#030303] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/[0.02] -skew-x-12 transform origin-top pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <h2 className="font-display text-5xl md:text-8xl font-bold mb-6 tracking-tighter leading-none uppercase">
                SELECTED <span className="text-glass">WORKS</span>
              </h2>
              <p className="text-lg text-white/50 leading-relaxed font-medium">
                High-impact digital experiences engineered for world-class brands.
              </p>
            </motion.div>
          </div>
          <button className="group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl transition-all duration-300">
            <span className="font-bold text-sm uppercase tracking-widest">All Case Studies</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300">
              <ArrowUpRight className="w-4 h-4 text-black group-hover:text-white transition-colors" />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {works.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 cursor-pointer aspect-square md:aspect-auto ${work.cols}`}
              style={{ minHeight: '400px' }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={work.image} 
                  alt={work.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {work.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <span className="block text-blue-500 font-mono text-xs mb-2 uppercase tracking-[0.3em]">
                    {work.category}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-display font-bold leading-none mb-4 group-hover:text-blue-400 transition-colors">
                    {work.title}
                  </h3>
                </div>
              </div>

              {/* Floating Action */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none bg-gradient-to-tr from-transparent via-white to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
