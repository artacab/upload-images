import firebase from 'firebase/app';
import {upload} from './upload.js'
import 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyBoC_tObkvKlDEa0775MOGbiBm8Jwctxjk",
    authDomain: "upload-images-3990a.firebaseapp.com",
    projectId: "upload-images-3990a",
    storageBucket: "upload-images-3990a.appspot.com",
    messagingSenderId: "153364675460",
    appId: "1:153364675460:web:ce3a8038b411c0b291bbd1"
  };
  
  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

upload('#file', {
    multi: true,
    accept: ['.png','.jpg','.jpeg','.gif'],
    onUpload(files, blocks) {
        files.forEach((file, index) => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)+'%'
                const block = blocks[index].querySelector('.preview-info-progress')
                block.textContent = percentage
                block.style.width = percentage
            }, error => {
                console.log(error)
            }, () => {
                task.snapshot.ref.getDownloadURL().then(url => {
                    console.log(url)
                })
            })
        })
    }
})