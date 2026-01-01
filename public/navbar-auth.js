import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, doc, getDoc } 
from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

/* Firebase config */
const firebaseConfig = {
    apiKey: "AIzaSyDzphuLvs9hmQec6B38J-W01MdPtoIauYY",
    authDomain: "voter-eligiblity-system.firebaseapp.com",
    projectId: "voter-eligiblity-system",
    appId: "1:564125568994:web:fb6734e28da979f85473bb"
};

/* Init once per page */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* Navbar elements */
const dashboard = document.getElementById("navDashboard");
const flagged = document.getElementById("navFlagged");
const verify = document.getElementById("navVerify");
const privacy = document.getElementById("navPrivacy");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");

/* Default UI (IMPORTANT) */
if (dashboard) dashboard.style.display = "none";
if (flagged) flagged.style.display = "none";
if (verify) verify.style.display = "none";
if (logoutBtn) logoutBtn.style.display = "none";
if (loginBtn) loginBtn.style.display = "inline-block";
if (privacy) privacy.style.display = "inline-block";

/* Auth state sync */
onAuthStateChanged(auth, async (user) => {

    // Not logged in
    if (!user) {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "none";
        return;
    }

    // Logged in
    if (loginBtn) loginBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";

    const snap = await getDoc(doc(db, "users", user.uid));
    const role = snap.exists() ? snap.data().role : "";

    if (role === "Election Authority") {
        if (dashboard) dashboard.style.display = "inline-block";
        if (flagged) flagged.style.display = "inline-block";
        if (verify) verify.style.display = "inline-block";
    }

    if (role === "Technical Staff") {
        if (dashboard) dashboard.style.display = "inline-block";
    }

    // Citizen → no sensitive tabs
});

/* Logout */
if (logoutBtn) {
    logoutBtn.onclick = () => {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        });
    };
}
