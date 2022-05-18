import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const UploadHelper = {
  hasMediaLibraryPermissionGranted: async () => {
    let granted = false;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.canAskAgain || permission.status === "denied") {
      granted = false;
    }

    if (permission.granted) {
      granted = true;
    }

    return granted;
  },
  uploadImageFromDevice: async () => {
    let imgURI = null;
    const storagePermissionGranted =
      await UploadHelper.hasMediaLibraryPermissionGranted();

    // Discard execution when  media library permission denied
    if (!storagePermissionGranted) return imgURI;

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const result = pickerResult as ImagePicker.ImageInfo;
      imgURI = result.uri;
    }

    return imgURI;
  },
  getBlobFromUri: async (uri: string) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  },
  manageFileUpload: async (
    fileBlob: any,
    { onStart, onProgress, onComplete, onFail }: any,
  ) => {
    const imgName = "img-" + new Date().getTime();

    const storageRef = ref(storage, `images/${imgName}.jpg`);

    console.log("uploading file", imgName);

    // Create file metadata including the content type
    // const metadata = {
    //   contentType: "image/jpeg",
    // };

    // Trigger file upload start event
    onStart && onStart();
    const uploadTask = uploadBytesResumable(storageRef, fileBlob);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot: { bytesTransferred: number; totalBytes: number }) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // Monitor uploading progress
        onProgress && onProgress(Math.fround(progress).toFixed(2));
      },
      (error: any) => {
        // Something went wrong - dispatch onFail event with error  response
        onFail && onFail(error);
      },
      () => {
        // Upload completed successfully, now we can get the download URL

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
          // dispatch on complete event
          onComplete && onComplete(downloadURL);

          console.log("File available at", downloadURL);
        });
      },
    );
  },
};

export default UploadHelper;
