
const firebaseConfig = {
  apiKey: "AIzaSyCVIcUtIJPPdCvG32Z0DNgleFWhgY8dp2c",
  authDomain: "meianoite-fadaf.firebaseapp.com",
  projectId: "meianoite-fadaf",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const storage = firebase.storage();