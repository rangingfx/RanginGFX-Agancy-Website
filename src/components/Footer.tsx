export default function Footer() {
  return (
    <footer id="contact" className="py-20 px-6 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <span className="font-display text-3xl tracking-tighter rainbow-logo">RanginGFX</span>
            </div>
            <h2 className="text-4xl font-display font-bold max-w-sm mb-8 uppercase leading-tight">
              READY TO LAUNCH YOUR NEXT <span className="text-blue-500 italic">BIG</span> THING?
            </h2>
            <div className="flex gap-4">
              <a href="https://wa.me/923121700872" target="_blank" rel="noreferrer" className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2">
                 WhatsApp Us
              </a>
              <a href="mailto:info@rangingfx.com" className="px-8 py-4 glass-card text-white rounded-2xl font-bold hover:bg-white/10 transition-colors">
                Email
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-sm text-blue-500 mb-6 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: "Work", href: "#work" },
                { name: "Services", href: "#services" },
                { name: "Pricing", href: "#pricing" },
                { name: "Reviews", href: "#reviews" },
                { name: "Contact", href: "#contact" }
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} className="text-white/50 hover:text-white transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-sm text-blue-500 mb-6 uppercase tracking-widest">Connect</h4>
            <ul className="space-y-4">
              {[
                { name: "LinkedIn", href: "https://www.linkedin.com/company/rangingfx" },
                { name: "Facebook", href: "https://www.facebook.com/RanginGfx/" },
                { name: "TikTok", href: "https://www.tiktok.com/@RanginGfx" },
                { name: "Instagram", href: "https://www.instagram.com/rangingfx" } // Inferred
              ].map(item => (
                <li key={item.name}>
                  <a href={item.href} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between py-12 border-t border-white/5 gap-10">
          <div className="flex flex-col gap-6 w-full lg:w-auto text-center lg:text-left">
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em]">Verified Secure Payment Systems</span>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 md:gap-10">
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <img src="https://cdn.simpleicons.org/paypal/003087" className="h-6 w-auto transition-transform group-hover:scale-110" alt="PayPal" />
                <span className="text-[8px] font-black tracking-widest text-white/40 group-hover:text-white transition-colors">PAYPAL</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <img src="https://cdn.simpleicons.org/payoneer/FF4800" className="h-6 w-auto transition-transform group-hover:scale-110" alt="Payoneer" />
                <span className="text-[8px] font-black tracking-widest text-white/40 group-hover:text-white transition-colors">PAYONEER</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <img src="https://cdn.simpleicons.org/binance/F3BA2F" className="h-6 w-auto transition-transform group-hover:scale-110" alt="Binance" />
                <span className="text-[8px] font-black tracking-widest text-white/40 group-hover:text-white transition-colors">BINANCE</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <img src="https://cdn.simpleicons.org/mastercard/EB001B" className="h-8 w-auto transition-transform group-hover:scale-110" alt="Mastercard" />
                <span className="text-[8px] font-black tracking-widest text-white/40 group-hover:text-white transition-colors">MASTERCARD</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-[#24AA3E] flex items-center justify-center p-1.5 transition-transform group-hover:rotate-12">
                  <span className="text-white text-[10px] font-black font-display italic">eP</span>
                </div>
                <span className="text-[8px] font-black tracking-widest text-white/40 group-hover:text-white transition-colors">EASYPAISA</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 py-4 px-8 bg-white/5 rounded-[2rem] border border-white/10 group hover:border-blue-500/40 transition-all shadow-2xl shadow-blue-500/10">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping" />
              <svg className="w-6 h-6 text-blue-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-widest mb-0.5">End-to-End Secure</p>
              <p className="text-sm font-black text-white uppercase tracking-tighter">SSL 256-BIT ENCRYPTION</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between pt-12 border-t border-white/5 text-white/30 text-xs font-mono uppercase tracking-widest gap-6">
          <p>© 2024 Ranging GFX. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
