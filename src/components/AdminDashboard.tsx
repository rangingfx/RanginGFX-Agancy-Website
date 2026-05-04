import { useEffect, useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Order } from "../types";
import { LayoutDashboard, Users, CreditCard, Settings, Search, Star, Plus, Trash2, MessageSquareQuote } from "lucide-react";
import { reviewService } from "../services/db";
import { Review } from "../types";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'reviews' | 'users'>('orders');
  
  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    authorName: "",
    authorRole: "",
    content: "",
    rating: 5,
    photoURL: ""
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const unsubOrders = onSnapshot(q, (snap) => {
        setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() } as Order)));
      });

      const qReviews = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const unsubReviews = onSnapshot(qReviews, (snap) => {
        setReviews(snap.docs.map(d => ({ id: d.id, ...d.data() } as Review)));
      });

      return () => {
        unsubOrders();
        unsubReviews();
      };
    }
  }, [user]);

  const handleAddReview = async () => {
    await reviewService.createReview(newReview);
    setShowReviewForm(false);
    setNewReview({ authorName: "", authorRole: "", content: "", rating: 5, photoURL: "" });
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    await updateDoc(doc(db, "orders", orderId), { status });
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: Order['paymentStatus']) => {
    await updateDoc(doc(db, "orders", orderId), { paymentStatus });
  };

  if (user?.role !== 'admin') {
    return <div className="pt-40 text-center">Unauthorized Access</div>;
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-black flex gap-8">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:block space-y-2">
        <div className="glass-card p-4 rounded-2xl border-blue-500/20 mb-8">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
               <Settings className="w-5 h-5" />
             </div>
             <div>
               <p className="font-bold text-sm">Admin Hub</p>
               <p className="text-[10px] text-white/30 truncate">bubbly-access-462110-c9</p>
             </div>
          </div>
        </div>
        
        <button 
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-white/50 hover:bg-white/5'}`}
        >
          <LayoutDashboard className="w-4 h-4" /> Orders
        </button>
        <button 
          onClick={() => setActiveTab('reviews')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'reviews' ? 'bg-blue-600 text-white' : 'text-white/50 hover:bg-white/5'}`}
        >
          <MessageSquareQuote className="w-4 h-4" /> Reviews
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/50 hover:bg-white/5 rounded-xl text-sm font-semibold transition-colors">
          <Users className="w-4 h-4" /> Users
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {activeTab === 'orders' ? (
          <>
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-display font-bold uppercase tracking-tight">Order Management</h1>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-blue-500/50 outline-none"
                />
              </div>
            </header>

            <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase">Order ID</th>
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase">Service</th>
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase">Payment</th>
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map(order => (
                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-white/50">{order.id.slice(0, 8)}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold">{order.serviceTitle}</p>
                        <p className="text-[10px] text-white/30">User: {order.userId.slice(0, 6)}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                          className="bg-black border border-white/10 rounded-lg text-[10px] p-1 font-bold outline-none"
                        >
                          <option value="pending">PENDING</option>
                          <option value="in-progress">IN PROGRESS</option>
                          <option value="completed">COMPLETED</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={order.paymentStatus}
                          onChange={(e) => updatePaymentStatus(order.id, e.target.value as any)}
                          className="bg-black border border-white/10 rounded-lg text-[10px] p-1 font-bold outline-none"
                        >
                          <option value="unpaid">UNPAID</option>
                          <option value="paid">PAID</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-500 hover:underline text-xs font-bold">Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : activeTab === 'reviews' ? (
          <>
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white">Review Management</h1>
              <button 
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-500 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Review
              </button>
            </header>

            {showReviewForm && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
                <div className="glass-card w-full max-w-lg p-8 rounded-3xl border border-white/10">
                  <h3 className="text-2xl font-bold mb-6">New Review</h3>
                  <div className="space-y-4 mb-8">
                    <input 
                      type="text" 
                      placeholder="Author Name" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                      value={newReview.authorName}
                      onChange={(e) => setNewReview({...newReview, authorName: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Author Role (e.g. CEO, Founder)" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                      value={newReview.authorRole}
                      onChange={(e) => setNewReview({...newReview, authorRole: e.target.value})}
                    />
                    <textarea 
                      placeholder="Review Content" 
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none"
                      value={newReview.content}
                      onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                    />
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">Rating:</span>
                      {[1,2,3,4,5].map(star => (
                        <button 
                          key={star}
                          onClick={() => setNewReview({...newReview, rating: star})}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${newReview.rating >= star ? 'bg-blue-500 text-white' : 'bg-white/5'}`}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={handleAddReview}
                      className="flex-1 bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors"
                    >
                      Save Review
                    </button>
                    <button 
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1 bg-white/5 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/5 border-b border-white/5">
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase">Author</th>
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase">Content</th>
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase">Rating</th>
                    <th className="px-6 py-4 text-xs font-mono text-white/30 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reviews.map(review => (
                    <tr key={review.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-white">{review.authorName}</p>
                        <p className="text-[10px] text-white/30">{review.authorRole}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-white/60 truncate max-w-xs">{review.content}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-0.5 text-blue-500">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-red-500 hover:bg-red-500/5 p-2 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {reviews.length === 0 && (
                <div className="p-20 text-center text-white/20">
                  No reviews added yet.
                </div>
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
