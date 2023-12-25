const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, deleteObject } = require("firebase/storage");



const firebaseConfig = {
    apiKey : "AIzaSyDL2TeISnLIyUXnJr0jTBDZQnQ_R8ze58Y",
    authDomain : "adsoftware-c4c01.firebaseapp.com",
    projectId : "adsoftware-c4c01",
    storageBucket : "adsoftware-c4c01.appspot.com",
    messagingSenderId : "129124201982",
    appId : "1:129124201982:web:c69f6d29f927c4a93ffcaf",
    measurementId : "G-4YTYKWYX6R"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = storage;
