import { auth } from "../lib/firebase";

const API_BASE = "/api/v1";

interface RequestOptions extends RequestInit {
  authRequired?: boolean;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { authRequired = true, ...fetchOptions } = options;
  
  const headers = new Headers(fetchOptions.headers || {});
  headers.set("Content-Type", "application/json");

  if (authRequired) {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API Error: ${response.status}`);
  }

  return response.json();
}

export const apiService = {
  getHealth: () => request("/health", { authRequired: false }),
  
  createOrder: (orderData: any, paymentMethod: string) => 
    request("/orders", {
      method: "POST",
      body: JSON.stringify({ orderData, paymentMethod }),
    }),
    
  verifyPayment: (paymentId: string) =>
    request(`/payments/verify/${paymentId}`, {
      method: "POST",
    }),
};
