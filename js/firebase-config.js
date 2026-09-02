/* ═══════════════════════════════════════════════
   FIREBASE-CONFIG.JS — shared Firebase app init
   Imported (as a module) by home.js and spots.js
═══════════════════════════════════════════════ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAByg3jsVShPDFIN9izqZMemBbtt_OpnIo",
  authDomain:        "discover-casiguran.firebaseapp.com",
  databaseURL:       "https://discover-casiguran-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "discover-casiguran",
  storageBucket:     "discover-casiguran.firebasestorage.app",
  messagingSenderId: "1000904859540",
  appId:             "1:1000904859540:web:611265ead53c40f18c3981"
};

export const app = initializeApp(firebaseConfig);
export const db  = getDatabase(app);
