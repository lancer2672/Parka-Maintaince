import { FontAwesome5 } from "@expo/vector-icons";
import { UploadHelper } from "@src/utils";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { PencilIcon } from "react-native-heroicons/solid";

const AvatarUpload = () => {
  const [imgURI, setImageURI] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [remoteURL, setRemoteURL] = useState("");

  const handleLocalImageUpload = async () => {
    setIsUploading(true);
    const fileURI = await UploadHelper.uploadImageFromDevice();

    if (fileURI) {
      setImageURI(fileURI);
      setIsUploading(false);
    }
  };

  const onStart = () => {
    setIsUploading(true);
  };

  const onProgress = (progress: React.SetStateAction<number>) => {
    setProgress(progress);
  };
  const onComplete = (fileUrl: React.SetStateAction<string>) => {
    setRemoteURL(fileUrl);
    setIsUploading(false);
    setImageURI(null);
  };

  const onFail = (error: any) => {
    alert(error);
    setIsUploading(false);
  };

  const handleCloudImageUpload = async () => {
    if (!imgURI) return;

    const blob = await UploadHelper.getBlobFromUri(imgURI);

    await UploadHelper.manageFileUpload(blob, {
      onStart,
      onProgress,
      onComplete,
      onFail,
    });
  };

  const render = () => {
    if (imgURI) {
      return (
        <Image
          source={{ uri: imgURI }}
          resizeMode="contain"
          style={styles.image}
        />
      );
    } else if (isUploading) {
      return <ActivityIndicator />;
    } else {
      return (
        <FontAwesome5 name="user-alt" size={36} style={{ color: "#fff" }} />
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageSkeleton}>
        {render()}
        <TouchableOpacity
          style={styles.upload}
          onPress={handleLocalImageUpload}>
          <PencilIcon color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvatarUpload;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  imageSkeleton: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#C1C1C1",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  upload: {
    backgroundColor: "#fff",
    width: 38,
    height: 38,
    position: "absolute",
    bottom: 0,
    right: -10,
    borderRadius: 100,
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    alignItems: "center",
    justifyContent: "center",
  },
});
