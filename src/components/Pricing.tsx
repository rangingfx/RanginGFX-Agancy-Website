import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { orderService } from "../services/db";
import { useAuth } from "../lib/AuthContext";

export default function Pricing() {
  const { user } = useAuth();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const handleOrder = async (method: 'paypal' | 'qr' = 'qr') => {
    if (!user) {
      alert("Please sign in first to start a project.");
      return;
    }

    setIsCreatingOrder(true);
    try {
      await orderService.createOrder({
        userId: user.uid,
        serviceId: "agency-retainer",
        serviceTitle: "Agency Retainer",
        amount: 50,
        status: "pending",
        paymentStatus: "unpaid",
        paymentMethod: method
      });
      window.location.href = "/dashboard";
      alert(`Order initialized for ${method.toUpperCase()}! Please submit your payment reference in the dashboard.`);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 relative overflow-hidden bg-[#030303]">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-blue-600/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-5xl md:text-8xl font-bold mb-6 tracking-tighter uppercase leading-none">
              TRANSPARENT <span className="text-glass italic">PRICING</span>
            </h2>
            <p className="text-white/40 max-w-xl mx-auto text-lg md:text-xl">
              World-class design and development support with a single, clear monthly retainer.
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl glass-card rounded-[3rem] p-8 md:p-12 border-blue-500/20 relative"
          >
            {/* Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-bold font-mono tracking-widest flex items-center gap-2 shadow-xl shadow-blue-600/20 z-20">
              <Zap className="w-3 h-3 fill-white" /> MOST POPULAR
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Features Column */}
              <div className="lg:col-span-12 xl:col-span-5 border-b xl:border-b-0 xl:border-r border-white/10 pb-8 xl:pb-0 xl:pr-12">
                <div className="mb-8">
                  <h3 className="text-3xl font-display font-bold mb-4">Agency Retainer</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-5xl font-display font-black">$50</span>
                    <span className="text-white/30 font-mono text-sm">/STARTING</span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    The ultimate scaling package for startups including UI/UX, 
                    React Dev, and SEO optimization.
                  </p>
                </div>
                
                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                  {[
                    "Custom Web App Development",
                    "Premium UI/UX Design",
                    "Advanced SEO Strategy",
                    "Weekly Growth Reports",
                    "24/7 Priority Support"
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                      <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-blue-500" />
                      </div>
                      <span className="text-white/70">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Section */}
              <div className="lg:col-span-12 xl:col-span-7">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* PayPal Column */}
                  <div className="flex flex-col">
                    <div className="mb-6 text-center md:text-left">
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2">Method 01</p>
                      <h4 className="text-xl font-display font-bold uppercase tracking-tight text-white">International / PayPal</h4>
                    </div>
                    
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 mb-6 flex flex-col items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img src="https://cdn.simpleicons.org/paypal/003087" alt="PayPal" className="h-8 w-auto mb-6 relative z-10" />
                      
                      <a 
                        href="https://paypal.me/pirpahtan" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full py-4 bg-[#0070ba] text-white rounded-xl text-xs font-black hover:bg-[#005ea6] transition-all flex items-center justify-center gap-2 group/btn shadow-lg shadow-blue-600/10 relative z-10"
                      >
                        PAY VIA PAYPAL.ME
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>

                      <button 
                        onClick={() => handleOrder('paypal')}
                        disabled={isCreatingOrder}
                        className="w-full mt-4 py-3 bg-white/5 border border-white/10 text-white rounded-lg text-[10px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest relative z-10"
                      >
                        {isCreatingOrder ? "Registering..." : "I've Paid — Start Now"}
                      </button>
                    </div>
                  </div>

                  {/* Local QR Column */}
                  <div className="flex flex-col md:border-l md:border-white/10 md:pl-8">
                    <div className="mb-6 text-center md:text-left">
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2">Method 02</p>
                      <h4 className="text-xl font-display font-bold uppercase tracking-tight text-white mb-1">Pakistan Local / Raast</h4>
                      <p className="text-[9px] text-emerald-500/60 font-mono uppercase tracking-widest">Instant Activation</p>
                    </div>

                    <div className="bg-white rounded-[2rem] p-6 mb-6 flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group shadow-2xl shadow-emerald-500/5">
                      <div className="w-full flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                           <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                             <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                           </div>
                           <span className="text-[10px] font-black text-black tracking-tight">RanginGfx</span>
                        </div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Raast_Logo.png" alt="Raast" className="h-4 w-auto grayscale brightness-0" />
                      </div>

                      <div className="bg-white p-2 rounded-xl mb-4">
                        <img 
                          src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=990554169&color=000000&bgcolor=ffffff" 
                          alt="QR" 
                          className="w-32 h-32" 
                        />
                      </div>

                      <div className="text-center">
                        <p className="text-[10px] font-mono text-black/40 uppercase tracking-[0.2em] mb-1">Till ID</p>
                        <h5 className="text-xl font-display font-black text-black tracking-tighter">990554169</h5>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleOrder('qr')}
                      disabled={isCreatingOrder}
                      className="w-full py-4 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-600/20"
                    >
                      {isCreatingOrder ? "Processing..." : "I'VE PAID VIA QR"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-[9px] text-white/30 mt-4 leading-relaxed text-center italic">
                      Scan via EasyPaisa, JazzCash, or any Bank App using Raast.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* FAQ Mini */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          {[
            { q: "Can I cancel anytime?", a: "Yes, our retainer is rolling month-to-month with no long-term lock-ins." },
            { q: "What's the turnaround?", a: "Most design updates take 48-72 hours. Large dev features take longer." },
            { q: "Is maintenance included?", a: "Absolutely. Security updates and site speed audits are standard." }
          ].map((faq, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border-white/5">
              <h4 className="font-bold mb-2 text-sm uppercase tracking-tight text-blue-400">{faq.q}</h4>
              <p className="text-xs text-white/50 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
