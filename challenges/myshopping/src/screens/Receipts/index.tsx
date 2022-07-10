import React, { useState, useEffect } from "react";
import { FlatList, Alert } from "react-native";
import storage from "@react-native-firebase/storage";

import { Container, PhotoInfo } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File, FileProps } from "../../components/File";

export function Receipts() {
  const [photos, setPhotos] = useState<FileProps[]>([]);
  const [photoSelected, setPhotoSelected] = useState<string>("");
  const [photoInfo, setPhotoInfo] = useState<string>("");

  async function handleShowPhoto(imagePath: string) {
    const imageUrl = await storage().ref(imagePath).getDownloadURL();
    setPhotoSelected(imageUrl);

    const imageInfo = await storage().ref(imagePath).getMetadata();
    setPhotoInfo(`Upload realizada em ${imageInfo.timeCreated}`);
  }

  async function handleDeletePhoto(imagePath: string) {
    const imageInfo = await storage().ref(imagePath).getMetadata();
    setPhotoInfo(`Upload realizada em ${imageInfo.timeCreated}`);

    if (imageInfo) {
      Alert.alert("Atenção!", `Deseja remover:\n${imageInfo.name}`, [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            await storage()
              .ref(imagePath)
              .delete()
              .then(() => {
                Alert.alert("Foto excluída com sucesso!");
                fetchImage();
              })
              .catch((err) => {
                console.error(err.code);
              });
          },
        },
      ]);
    }
  }

  async function fetchImage() {
    await storage()
      .ref("images")
      .list()
      .then((result) => {
        const files: FileProps[] = [];

        result.items.forEach((file) => {
          files.push({
            name: file.name,
            path: file.fullPath,
          });
        });

        setPhotos(files);
      });
  }

  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <Container>
      <Header title="Comprovantes" showLogoutButton={true} />

      <Photo uri={photoSelected} />

      <PhotoInfo>{photoInfo}</PhotoInfo>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleShowPhoto(item.path)}
            onDelete={() => handleDeletePhoto(item.path)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
