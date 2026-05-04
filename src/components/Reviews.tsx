import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { reviewService } from "../services/db";
import { Review } from "../types";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    reviewService.getReviews().then((data) => {
      if (data) setReviews(data);
    });
  }, []);

  const staticReviews = [
    { name: "Sarah Jenkins", role: "CEO, TechFlow", text: "RanginGfx delivered a stunning UI/UX that transformed our conversion rates. Highly professional and creative team.", rating: 5 },
    { name: "Ahmed Raza", role: "Founder, Bloom Digital", text: "The fastest development cycle I've ever experienced. No compromise on quality. Truly the best in Pakistan.", rating: 5 },
    { name: "Michael Chen", role: "Product Manager", text: "Their attention to detail in motion design and React development is world-class. Recommended for serious startups.", rating: 5 },
    { name: "Elena Rodriguez", role: "Creative Director", text: "Bold designs and solid technical execution. They really understand the modern web aesthetic.", rating: 5 },
    { name: "David Wilson", role: "Marketing Head", text: "SEO results were visible within weeks. A complete service that actually cares about ROI.", rating: 5 }
  ];

  const displayedReviews = reviews.length > 0 ? reviews : staticReviews;

  return (
    <section id="reviews" className="py-20 md:py-28 px-6 bg-[#030303] border-y border-white/5 relative overflow-hidden">
      {/* Decorative quotes */}
      <Quote className="absolute top-20 left-20 w-40 h-40 text-blue-500/[0.02] -rotate-12 pointer-events-none" />
      <Quote className="absolute bottom-20 right-20 w-40 h-40 text-purple-500/[0.02] rotate-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-8xl font-bold mb-6 tracking-tighter uppercase leading-none">
              GOOGLE <span className="text-glass">REVIEWS</span>
            </h2>
            
            <div className="flex flex-col items-center gap-4">
              <header className="flex flex-col items-center">
                <p className="text-[10px] font-mono text-blue-500 font-bold tracking-[0.4em] mb-3">EXCELLENT 5.0 RATING</p>
                <div className="flex items-center justify-center gap-1 text-blue-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
              </header>
              <p className="text-white/40 max-w-xl mx-auto italic text-sm md:text-lg px-4 leading-relaxed">
                "Working with RanginGfx was the best decision we made for our digital expansion. High performance meets bold design."
              </p>
              
              <a 
                href="https://maps.app.goo.gl/aQstg7XcMaSqLqGLA" 
                target="_blank" 
                rel="noreferrer"
                className="mt-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Write a review
              </a>
            </div>
          </motion.div>
        </div>

        {/* Custom High-Performance Review Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedReviews.map((review: any, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-[2rem] border-white/5 hover:border-blue-500/20 transition-all group"
            >
              <div className="flex gap-1 text-blue-500 mb-6 group-hover:scale-105 transition-transform origin-left">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-8 italic">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center font-bold text-blue-500">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">{review.name}</p>
                  <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{review.role || "Verified Client"}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Professional Partner Ecosystem */}
        <div className="mt-32 pt-20 border-t border-white/5">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.5em]">Our Verified Partner Ecosystem</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-20 grayscale transition-all duration-700 hover:opacity-60 hover:grayscale-0">
            <img src="https://cdn.simpleicons.org/amazon/white" className="h-6 md:h-8 w-auto" alt="Amazon" title="Amazon Web Services" />
            <img src="https://cdn.simpleicons.org/google/white" className="h-6 md:h-8 w-auto" alt="Google" title="Google Cloud Partner" />
            <img src="https://cdn.simpleicons.org/meta/white" className="h-6 md:h-8 w-auto" alt="Meta" title="Meta Business Partner" />
            <img src="https://cdn.simpleicons.org/tiktok/white" className="h-6 md:h-8 w-auto" alt="TikTok" title="TikTok Ad Partner" />
            <img src="https://cdn.simpleicons.org/cloudflare/white" className="h-6 md:h-8 w-auto" alt="Cloudflare" title="Cloudflare Technical Partner" />
            <img src="https://cdn.simpleicons.org/cpanel/white" className="h-6 md:h-8 w-auto" alt="cPanel" title="cPanel Certified" />
            <img src="https://cdn.simpleicons.org/vercel/white" className="h-6 md:h-8 w-auto" alt="Vercel" title="Vercel Deployment" />
            <img src="https://cdn.simpleicons.org/stripe/white" className="h-6 md:h-8 w-auto" alt="Stripe" title="Stripe Verified" />
          </div>
        </div>
      </div>
    </section>
  );
}
