import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  initializeFirestore, 
  doc, 
  getDocFromServer 
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Firestore with settings to handle potential network restrictions
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, firebaseConfig.firestoreDatabaseId);

// Test connection
async function testConnection() {
  try {
    const testDoc = await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firebase Connection: Success", testDoc.exists() ? "(Doc found)" : "(Connected)");
  } catch (error) {
    console.error("Firebase Connection Failed:", error);
    if (error instanceof Error && error.message.includes("the client is offline")) {
      console.error("DEBUG: SDK considers client offline. Check network or experimental settings.");
    }
  }
}

testConnection();
