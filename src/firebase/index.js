import {initializeApp} from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


    const firebaseConfig = {
    apiKey: "AIzaSyB8cRxVAgdZZigzbZjBLrZnVD30UpXM4lY",
    authDomain: "trackjobs-27c7b.firebaseapp.com",
    databaseURL: "gs://trackjobs-27c7b.appspot.com",
    projectId: "trackjobs-27c7b",
    storageBucket: "trackjobs-27c7b.appspot.com",
    messagingSenderId: "927584869370",
    appId: "1:927584869370:web:db71a85410bd0bf6e1a243",
    measurementId: "G-KSHTRH3J41"
  };


    var app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    export { storage,  ref, uploadBytesResumable, getDownloadURL };