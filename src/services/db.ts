import { 
  OperationType, 
  handleFirestoreError 
} from "../lib/errorHandlers";
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  onSnapshot,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { User, Service, Order, Project, Review } from "../types";

export const userService = {
  async createUserProfile(user: User) {
    const path = `users/${user.uid}`;
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...user,
        createdAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, path);
    }
  },
  async getUserProfile(uid: string) {
    const path = `users/${uid}`;
    try {
      const snap = await getDoc(doc(db, "users", uid));
      return snap.exists() ? snap.data() as User : null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, path);
    }
  }
};

export const agencyService = {
  async getServices() {
    const path = "services";
    try {
      const snap = await getDocs(collection(db, "services"));
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Service));
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, path);
    }
  },
  async getPortfolio() {
    const path = "portfolio";
    try {
      const snap = await getDocs(collection(db, "portfolio"));
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Project));
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, path);
    }
  }
};

export const orderService = {
  async createOrder(order: Omit<Order, "id" | "createdAt">) {
    const path = "orders";
    try {
      const newOrderRef = doc(collection(db, "orders"));
      const data = {
        ...order,
        createdAt: serverTimestamp()
      };
      await setDoc(newOrderRef, data);
      return { id: newOrderRef.id, ...data };
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  },
  getUserOrders(userId: string, callback: (orders: Order[]) => void) {
    const path = "orders";
    const q = query(
      collection(db, "orders"), 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map(d => ({ id: d.id, ...d.data() } as Order)));
    }, (e) => {
      handleFirestoreError(e, OperationType.GET, path);
    });
  },
  async updateOrderDomain(orderId: string, domain: string) {
    const path = `orders/${orderId}`;
    try {
      await updateDoc(doc(db, "orders", orderId), { 
        domain,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  },
  async submitPaymentProof(orderId: string, transactionId: string, screenshotUrl?: string) {
    const path = `orders/${orderId}`;
    try {
      await updateDoc(doc(db, "orders", orderId), { 
        transactionId, 
        paymentScreenshot: screenshotUrl || "",
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, path);
    }
  }
};

export const reviewService = {
  async getReviews() {
    const path = "reviews";
    try {
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Review));
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, path);
    }
  },
  async createReview(review: Omit<Review, "id" | "createdAt">) {
    const path = "reviews";
    try {
      const data = { ...review, createdAt: serverTimestamp() };
      await setDoc(doc(collection(db, "reviews")), data);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  },
  async deleteReview(reviewId: string) {
    const path = `reviews/${reviewId}`;
    try {
      await updateDoc(doc(db, "reviews", reviewId), { 
        deleted: true,
        updatedAt: serverTimestamp()
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, path);
    }
  }
};
