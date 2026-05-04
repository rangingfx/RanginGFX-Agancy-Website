import { motion } from "motion/react";
import * as Icons from "lucide-react";
import { Service } from "../types";
import { useAuth } from "../lib/AuthContext";
import { useState } from "react";
import { orderService } from "../services/db";
import CheckoutModal from "./CheckoutModal";

const services: Service[] = [
  {
    id: "web-dev",
    title: "Web Development",
    description: "High-performance business sites, eCommerce stores, and custom dashboards built with Next.js & React.",
    category: "Development",
    price: 50,
    icon: "Code",
    features: ["SEO Optimized", "Responsive", "Admin Panel"]
  },
  {
    id: "seo-expert",
    title: "SEO Services",
    description: "Data-driven strategies to boost your organic reach. Technical audits, keyword research, and backlinking.",
    category: "Marketing",
    price: 50,
    icon: "TrendingUp",
    features: ["Weekly Reports", "Competitor Analysis", "On-Page Fixes"]
  },
  {
    id: "gfx-design",
    title: "Graphic Design",
    description: "Stunning brand identities, logos, and UI/UX designs that capture your audience's attention.",
    category: "Design",
    price: 50,
    icon: "Palette",
    features: ["Unlimited Revisions", "Source Files", "Fast Delivery"]
  },
  {
    id: "paid-ads",
    title: "Paid Marketing",
    description: "Conversion-focused Facebook, Instagram, and Google Ads campaigns to scale your sales rapidly.",
    category: "Growth",
    price: 50,
    icon: "Megaphone",
    features: ["Ad Creative", "Targeting Setup", "Optimization"]
  },
];

export default function Services() {
  const { user, loginWithGoogle } = useAuth();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleOrderInit = async (service: Service) => {
    if (!user) {
      await loginWithGoogle();
      return;
    }
    setSelectedService(service);
  };

  return (
    <section id="services" className="py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tighter uppercase">
            SERVICE <span className="text-glass italic">SOLUTIONS</span>
          </h2>
          <p className="text-white/50 max-w-lg text-lg">
            High-performance digital services tailored for startups and scale-ups 
            looking for a definitive edge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => {
            const IconComponent = (Icons as any)[item.icon];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-[2rem] hover:border-blue-500/40 transition-all group flex flex-col h-full"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:-translate-y-1">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">
                  {item.description}
                </p>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Starting from</p>
                    <p className="text-2xl font-bold font-display">${item.price}</p>
                  </div>
                  <button 
                    onClick={() => handleOrderInit(item)}
                    className="w-10 h-10 bg-white/5 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all"
                  >
                    <Icons.Plus className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {selectedService && (
        <CheckoutModal 
          service={selectedService} 
          isOpen={!!selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
}
