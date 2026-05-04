import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, ShieldCheck, Zap, ArrowRight } from "lucide-react";
import { orderService } from "../services/db";
import { useAuth } from "../lib/AuthContext";

export default function Pricing() {
  const { user } = useAuth();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const handleOrder = async (method: 'paypal' | 'qr') => {
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
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-8 lg:pb-0 lg:pr-12">
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
                
                <ul className="space-y-4">
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

              {/* Payment Split */}
              <div className="lg:col-span-8">
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  {/* PayPal Column (Left) */}
                  <div className="flex flex-col">
                    <div className="mb-6 text-center md:text-left">
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2">Method 01</p>
                      <h4 className="text-xl font-display font-bold uppercase tracking-tight">International / PayPal</h4>
                    </div>
                    
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 mb-6 flex flex-col items-center justify-center relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <img src="https://cdn.simpleicons.org/paypal/003087" alt="PayPal" className="h-8 w-auto mb-6 relative z-10" />
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-6 relative z-10">Global Fast Checkout</p>
                      
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
                    
                    <p className="text-[10px] text-white/30 flex items-center gap-2 mt-auto">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" />
                      Verified International Merchant
                    </p>
                  </div>

                  {/* Local QR Column (Right) */}
                  <div className="flex flex-col md:border-l md:border-white/10 md:pl-12">
                    <div className="mb-6 text-center md:text-left">
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2">Method 02</p>
                      <h4 className="text-xl font-display font-bold uppercase tracking-tight">Pakistan Local / QR</h4>
                    </div>

                    <div className="bg-white/5 p-6 rounded-3xl flex flex-col items-center justify-center mb-8 border border-white/10 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-4 relative z-10">Use this Till ID to Pay</p>
                      <div className="text-center relative z-10">
                        <h5 className="text-5xl font-display font-black text-blue-500 mb-2 tracking-tighter">990554169</h5>
                        <p className="text-white/70 font-display font-bold uppercase tracking-tight">RanginGfx</p>
                      </div>
                      <div className="mt-6 flex gap-2 relative z-10">
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-lg border border-emerald-500/20 uppercase">EasyPaisa</span>
                        <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-[10px] font-black rounded-lg border border-purple-500/20 uppercase">Raast</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleOrder('qr')}
                      disabled={isCreatingOrder}
                      className="w-full py-4 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20"
                    >
                      {isCreatingOrder ? "Processing..." : "I'VE PAID VIA QR — START"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-[9px] text-white/30 mt-4 leading-relaxed text-center italic">
                      Scan QR or use Raast ID. Submit receipt in dashboard after payment.
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
