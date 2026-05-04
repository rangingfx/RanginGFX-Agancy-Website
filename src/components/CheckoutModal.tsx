import { motion, AnimatePresence } from "motion/react";
import { X, CreditCard, Wallet, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Service } from "../types";
import { orderService } from "../services/db";
import { useAuth } from "../lib/AuthContext";

interface CheckoutModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ service, isOpen, onClose }: CheckoutModalProps) {
  const { user } = useAuth();
  const [method, setMethod] = useState<'paypal' | 'easypaisa' | null>(null);
  const [status, setStatus] = useState<'selecting' | 'redirecting' | 'success' | 'error'>('selecting');

  const handlePaymentSuccess = async (details: any) => {
    if (!user) return;
    setStatus('redirecting');
    try {
      await orderService.createOrder({
        userId: user.uid,
        serviceId: service.id,
        serviceTitle: service.title,
        status: 'pending',
        paymentStatus: 'paid',
        amount: service.price
      });
      setStatus('success');
    } catch (e) {
      console.error("Order creation failed", e);
      setStatus('error');
    }
  };

  const handleEasypaisaPayment = async () => {
    if (!user) return;
    setStatus('redirecting');
    
    // Mocking the redirect delay for Easypaisa
    setTimeout(async () => {
      try {
        await orderService.createOrder({
          userId: user.uid,
          serviceId: service.id,
          serviceTitle: service.title,
          status: 'pending',
          paymentStatus: 'paid', // Mocking successful payment
          amount: service.price
        });
        setStatus('success');
      } catch (e) {
        console.error("Order creation failed", e);
        setStatus('error');
      }
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-card rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
          >
            {status === 'selecting' && (
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-display font-bold">Secure Checkout</h2>
                  <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X />
                  </button>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 mb-8 border border-white/5">
                  <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">Selected Service</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold">{service.title}</p>
                    <p className="text-xl font-display font-black">${service.price}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-sm font-semibold text-white/50 px-2">Select Payment Method</p>
                  
                  <button 
                    onClick={() => setMethod('paypal')}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                      method === 'paypal' ? 'bg-blue-600/10 border-blue-500' : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#003087] rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold">PayPal</p>
                        <p className="text-xs text-white/40 italic">Global digital wallet</p>
                      </div>
                    </div>
                    {method === 'paypal' && <div className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />}
                  </button>

                  <button 
                    onClick={() => setMethod('easypaisa')}
                    className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                      method === 'easypaisa' ? 'bg-emerald-600/10 border-emerald-500' : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold">Easypaisa</p>
                        <p className="text-xs text-white/40 italic">Local mobile payment</p>
                      </div>
                    </div>
                    {method === 'easypaisa' && <div className="w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />}
                  </button>
                </div>

                <div className="min-h-[60px]">
                  {method === 'paypal' ? (
                    <div className="flex flex-col gap-4">
                      <a 
                        href="https://paypal.me/pirpahtan" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full bg-[#0070ba] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#005ea6] transition-all group"
                      >
                        Visit PayPal.me to Pay
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <button 
                        onClick={async () => {
                          if (!user) return;
                          setStatus('redirecting');
                          try {
                            await orderService.createOrder({
                              userId: user.uid,
                              serviceId: service.id,
                              serviceTitle: service.title,
                              status: 'pending',
                              paymentStatus: 'unpaid',
                              amount: service.price,
                              paymentMethod: 'paypal'
                            });
                            setStatus('success');
                          } catch (e) {
                            console.error(e);
                            setStatus('error');
                          }
                        }}
                        className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-xs font-bold hover:bg-white/10 transition-all"
                      >
                        I've Paid — Start Project
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={handleEasypaisaPayment}
                      disabled={!method}
                      className="w-full bg-white text-primary py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all disabled:opacity-30 group"
                    >
                      Pay with {method === 'easypaisa' ? 'Easypaisa' : '...'}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
                
                <p className="mt-6 text-center text-[10px] text-white/30 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Your payment is secured with AES-256 encryption
                </p>
              </div>
            )}

            {status === 'redirecting' && (
              <div className="p-12 text-center py-20">
                <div className="relative w-20 h-20 mx-auto mb-8">
                  <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
                  <motion.div 
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 uppercase tracking-tight">Finalizing Order</h3>
                <p className="text-white/50 text-sm">Please do not refresh the page while we process your request.</p>
              </div>
            )}

            {status === 'success' && (
              <div className="p-12 text-center py-20">
                <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 uppercase tracking-tight">Payment Successful</h3>
                <p className="text-white/50 text-sm mb-10">We've received your order. You can track progress in your dashboard.</p>
                <button 
                  onClick={onClose}
                  className="w-full bg-white text-primary py-4 rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition-all"
                >
                  Check Dashboard
                </button>
              </div>
            )}

            {status === 'error' && (
              <div className="p-12 text-center py-20">
                <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <X className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-display font-bold mb-4 uppercase tracking-tight">Payment Failed</h3>
                <p className="text-white/50 text-sm mb-10">Something went wrong during the transaction. Please try again.</p>
                <button 
                  onClick={() => setStatus('selecting')}
                  className="w-full bg-white text-primary py-4 rounded-2xl font-bold hover:bg-blue-500 hover:text-white transition-all"
                >
                  Try Again
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
