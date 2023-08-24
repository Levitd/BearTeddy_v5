import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@firebase/storage';
import { initializeApp } from 'firebase/app';
import configFile from "../config.json";
import { uploadImageActiveProductEnd, uploadOneImageActiveProduct } from '../services/localStorage.service';
import { nanoid } from "nanoid";

const app = initializeApp(configFile.firebaseConfig);
const metadata = {
    contentType: 'image/jpeg'
};
const storage = getStorage(app);

const UpLoadFileToFBS = (file, i, all, path) => {
    const fileName = nanoid(10) + "_" + file.name;
    const storageRef = ref(storage, path + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + path + fileName + " " + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default:
                    break
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
                default:
                    break;
            }
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // console.log(i, all, { name: fileName, token: downloadURL.slice(downloadURL.indexOf('token') + 6) });
                if (i === (all - 1)) {
                    uploadImageActiveProductEnd();
                }
                uploadOneImageActiveProduct({ name: fileName, token: downloadURL.slice(downloadURL.indexOf('token') + 6) });
            });
        }
    );
};

export const UploadFileToFireBaseStorage = (files, path) => {
    for (let i = 0; i < files.length; i++) {
        UpLoadFileToFBS(files[i], i, files.length, configFile[path]);
    };
}

export function DeleteFileInFireBaseStorage(fileName, path) {
    console.log("DeleteFileInFireBaseStorage", fileName, configFile[path]);
    const desertRef = ref(storage, configFile[path] + fileName);
    // return true;
    deleteObject(desertRef).then(() => {
        return true;
    }).catch((error) => {
        return false;
    });
}

