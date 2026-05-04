import { motion } from "motion/react";
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  ExternalLink, 
  MessageSquare,
  FileText,
  Globe,
  PlusCircle,
  Copy,
  ChevronRight,
  Camera,
  QrCode
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { orderService } from "../services/db";
import { Order } from "../types";

export default function UserDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderForDomain, setSelectedOrderForDomain] = useState<Order | null>(null);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<Order | null>(null);
  const [newDomain, setNewDomain] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isSubmittingProof, setIsSubmittingProof] = useState(false);

  useEffect(() => {
    if (user) {
      const unsub = orderService.getUserOrders(user.uid, (data) => {
        setOrders(data);
      });
      return () => unsub();
    }
  }, [user]);

  const handleUpdateDomain = async () => {
    if (!selectedOrderForDomain || !newDomain) return;
    await orderService.updateOrderDomain(selectedOrderForDomain.id, newDomain);
    setSelectedOrderForDomain(null);
    setNewDomain("");
  };

  const handleSubmitPaymentProof = async () => {
    if (!selectedOrderForPayment || !transactionId) return;
    setIsSubmittingProof(true);
    await orderService.submitPaymentProof(selectedOrderForPayment.id, transactionId);
    setIsSubmittingProof(false);
    setSelectedOrderForPayment(null);
    setTransactionId("");
  };

  const stats = [
    { label: "Active Projects", value: orders.filter(o => o.status === 'processing').length, icon: Clock },
    { label: "Completed", value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle2 },
    { label: "Pending Payment", value: orders.filter(o => o.paymentStatus === 'unpaid').length, icon: CreditCard },
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto text-white">
        <header className="mb-12">
          <h1 className="text-4xl font-display font-bold mb-2">Welcome back, {user?.displayName.split(' ')[0]}</h1>
          <p className="text-white/50">Manage your projects and track progress in real-time.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-white/50 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions / Domain Management */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            {/* Orders Table */}
            <div className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10">
              <div className="p-8 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold font-display">My Orders</h2>
              </div>
              
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                {orders.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/5 border-b border-white/5">
                        <th className="px-8 py-4 text-xs font-mono text-white/30 uppercase tracking-widest">Service</th>
                        <th className="px-8 py-4 text-xs font-mono text-white/30 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-xs font-mono text-white/30 uppercase tracking-widest">Domain</th>
                        <th className="px-8 py-4 text-xs font-mono text-white/30 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-500" />
                              </div>
                              <div>
                                <p className="font-bold text-sm">{order.serviceTitle || "Custom Project"}</p>
                                <p className="text-white/40 text-[10px] font-mono tracking-tighter uppercase">{order.id.slice(0, 8)}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                              order.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-amber-500/10 text-amber-500'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            {order.domain ? (
                              <div className="flex items-center gap-2 text-xs font-mono text-blue-400">
                                <Globe className="w-3 h-3" />
                                {order.domain}
                              </div>
                            ) : (
                              <span className="text-xs text-white/20 italic">No domain set</span>
                            )}
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2">
                               {order.paymentStatus === 'unpaid' && (
                                 <button 
                                   onClick={() => setSelectedOrderForPayment(order)}
                                   className="p-2 hover:bg-white/10 rounded-lg text-emerald-500" 
                                   title="Submit Payment Proof"
                                 >
                                   <CreditCard className="w-4 h-4" />
                                 </button>
                               )}
                               <button 
                                 onClick={() => setSelectedOrderForDomain(order)}
                                 className="p-2 hover:bg-white/10 rounded-lg text-white/50" 
                                 title="Manage Domain"
                               >
                                 <Globe className="w-4 h-4" />
                               </button>
                               <button className="p-2 hover:bg-white/10 rounded-lg text-white/50" title="Chat">
                                 <MessageSquare className="w-4 h-4" />
                               </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-20 text-center">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="w-8 h-8 text-white/20" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No active projects</h3>
                    <p className="text-white/40 mb-6">Start your digital journey by exploring our services.</p>
                  </div>
                )}
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden">
                {orders.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                              <Package className="w-5 h-5 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-bold text-sm tracking-tight">{order.serviceTitle || "Custom Project"}</p>
                              <p className="text-white/40 text-[9px] font-mono tracking-tighter uppercase">{order.id.slice(0, 8)}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                            order.status === 'processing' ? 'bg-blue-500/10 text-blue-500' :
                            'bg-amber-500/10 text-amber-500'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                          <div className="text-xs font-mono text-white/30 uppercase tracking-widest">Domain:</div>
                          <div className="text-xs font-medium">
                            {order.domain ? (
                              <span className="text-blue-400 flex items-center gap-1">
                                <Globe className="w-3 h-3" /> {order.domain}
                              </span>
                            ) : (
                              <span className="text-white/20 italic">Not set</span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {order.paymentStatus === 'unpaid' && (
                            <button 
                              onClick={() => setSelectedOrderForPayment(order)}
                              className="flex-1 bg-emerald-600/20 text-emerald-400 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                            >
                              <CreditCard className="w-4 h-4" /> Pay
                            </button>
                          )}
                          <button 
                            onClick={() => setSelectedOrderForDomain(order)}
                            className="flex-1 bg-blue-600/20 text-blue-400 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                          >
                            <Globe className="w-4 h-4" /> Domain
                          </button>
                          <button className="flex-1 bg-white/5 text-white/50 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                            <MessageSquare className="w-4 h-4" /> Chat
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Package className="w-12 h-12 text-white/10 mx-auto mb-4" />
                    <p className="text-sm text-white/40 uppercase tracking-widest font-mono">No Orders</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Payment Proof Panel */}
            <div className="glass-card rounded-[2.5rem] p-8 border border-white/10 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-600/10 rounded-xl flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-emerald-500" />
                </div>
                <h2 className="text-lg font-bold">Payment Proof</h2>
              </div>

              {selectedOrderForPayment ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Target Order: {selectedOrderForPayment.serviceTitle}</p>
                    
                    {selectedOrderForPayment.paymentMethod === 'paypal' ? (
                      <a 
                        href="https://paypal.me/pirpahtan" 
                        target="_blank" 
                        rel="noreferrer"
                        className="w-full mb-6 bg-[#0070ba] text-white py-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#005ea6] transition-all shadow-lg shadow-blue-600/10"
                      >
                        <CreditCard className="w-4 h-4" /> PAY VIA PAYPAL.ME
                      </a>
                    ) : (
                      <div className="bg-emerald-600/5 border border-emerald-500/20 rounded-2xl p-6 mb-6 text-center">
                        <p className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest mb-4">Local Payment Method</p>
                        <div className="flex flex-col items-center gap-2">
                          <p className="text-white/40 text-[10px] uppercase font-mono">Scan Till ID / Raast</p>
                          <h4 className="text-2xl font-display font-black text-white tracking-tighter">990554169</h4>
                          <div className="mt-4 bg-white p-2 rounded-lg">
                            <img 
                              src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=990554169" 
                              alt="QR" 
                              className="w-24 h-24" 
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    <label className="block text-sm font-medium text-white/50 mb-2">Enter Transaction ID / Reference</label>
                    <input 
                      type="text" 
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. 1234567890"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500/50"
                    />
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-2 uppercase tracking-widest">
                      <Camera className="w-3 h-3" /> Screenshot Upload
                    </p>
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-4 text-center cursor-pointer hover:border-emerald-500/50 transition-colors">
                      <p className="text-[10px] text-white/30">Drag & drop or click to upload screenshot proof</p>
                      <p className="text-[8px] text-white/20 mt-1">(Image will be stored with your order)</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleSubmitPaymentProof}
                    disabled={isSubmittingProof || !transactionId}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-emerald-500 transition-colors disabled:opacity-50"
                  >
                    {isSubmittingProof ? "Submitting..." : "Submit Proof"}
                  </button>
                  <button 
                    onClick={() => { setSelectedOrderForPayment(null); setTransactionId(""); }}
                    className="w-full text-white/30 text-xs hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="text-center py-10">
                  <CreditCard className="w-12 h-12 text-white/5 mx-auto mb-4" />
                  <p className="text-sm text-white/40">Select an unpaid project from the table to submit transaction details.</p>
                </div>
              )}
            </div>

            {/* Domain Setup Panel */}
            <div className="glass-card rounded-[2.5rem] p-8 border border-white/10 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-500" />
              </div>
              <h2 className="text-lg font-bold">Domain Setup</h2>
            </div>

            {selectedOrderForDomain ? (
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-4">Target Order: {selectedOrderForDomain.serviceTitle}</p>
                  <label className="block text-sm font-medium text-white/50 mb-2">Enter your domain</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value)}
                      placeholder="example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm outline-none focus:border-blue-500/50"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3" /> REQUIRED DNS RECORDS
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/30">TYPE: A</span>
                      <div className="flex items-center gap-2 cursor-pointer hover:text-white" onClick={() => navigator.clipboard.writeText("76.76.21.21")}>
                        76.76.21.21 <Copy className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/30">TYPE: CNAME</span>
                      <div className="flex items-center gap-2 cursor-pointer hover:text-white" onClick={() => navigator.clipboard.writeText("cname.rangingfx.com")}>
                        cname.rangingfx.com <Copy className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleUpdateDomain}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-colors"
                >
                  Save & Connect
                </button>
                <button 
                  onClick={() => { setSelectedOrderForDomain(null); setNewDomain(""); }}
                  className="w-full text-white/30 text-xs hover:text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="text-center py-10">
                <PlusCircle className="w-12 h-12 text-white/5 mx-auto mb-4" />
                <p className="text-sm text-white/40">Select a project from the table to begin custom domain setup.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}
