import React, { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "styled-components/native";
import { translationFirebaseErrorsPTBR } from "react-translation-firebase-errors";

//Services
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";

//Components
import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import Input from "@components/Input";
import { InputPrice } from "@components/InputPrice";
import { Button } from "@components/Button";

//Styles
import {
  Container,
  Header,
  LoadContainer,
  Load,
  Scroller,
  Title,
  DeleteButton,
  DeleteLabel,
  Upload,
  PickImageButton,
  Form,
  InputGroup,
  InputGroupHeader,
  FormLabel,
  MaxCharacters,
} from "./styles";

//Interfaces
import { ProductNavigationProps } from "@src/@types/react-navigation";
import { ProductData } from "@components/ProductCard";

export type PizzaResponse = ProductData & {
  photo_path: string;
  prices_sizes: {
    p: string;
    m: string;
    g: string;
  };
};

export const Product: React.FC = () => {
  const { goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as ProductNavigationProps;
  const { COLORS } = useTheme();

  const [photoPath, setPhotoPath] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priceSizeP, setPriceSizeP] = useState<string>("");
  const [priceSizeM, setPriceSizeM] = useState<string>("");
  const [priceSizeG, setPriceSizeG] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleBack() {
    goBack();
  }

  async function handleImagePicker() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 4],
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  async function handleAdd() {
    if (!image) {
      return Alert.alert("Cadastro!", "Selecione a imagem da pizza.");
    }

    if (!name.trim()) {
      return Alert.alert("Cadastro!", "Informe o nome da pizza.");
    }

    if (!description.trim()) {
      return Alert.alert("Cadastro!", "Informe a descrição da pizza.");
    }

    if (!priceSizeP.trim() || !priceSizeM.trim() || !priceSizeG.trim()) {
      return Alert.alert(
        "Cadastro!",
        "Informe o preço de todos os tamanhos da pizza."
      );
    }

    setIsLoading(true);

    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);
    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .add({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
      })
      .then(() => {
        Alert.alert("Cadastro!", "Pizza cadastrada com successo.");
        setImage("");
        setName("");
        setDescription("");
        setPriceSizeP("");
        setPriceSizeM("");
        setPriceSizeG("");
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleUpdate() {
    if (!image) {
      return Alert.alert("Atualizar!", "Selecione a imagem da pizza.");
    }

    if (!name.trim()) {
      return Alert.alert("Atualizar!", "Informe o nome da pizza.");
    }

    if (!description.trim()) {
      return Alert.alert("Atualizar!", "Informe a descrição da pizza.");
    }

    if (!priceSizeP.trim() || !priceSizeM.trim() || !priceSizeG.trim()) {
      return Alert.alert(
        "Atualizar!",
        "Informe o preço de todos os tamanhos da pizza."
      );
    }

    setIsLoading(true);

    storage().ref(photoPath).delete();
    const fileName = new Date().getTime();
    const reference = storage().ref(`/pizzas/${fileName}.png`);
    await reference.putFile(image);
    const photo_url = await reference.getDownloadURL();

    firestore()
      .collection("pizzas")
      .doc(id)
      .update({
        name,
        name_insensitive: name.toLowerCase().trim(),
        description,
        prices_sizes: {
          p: priceSizeP,
          m: priceSizeM,
          g: priceSizeG,
        },
        photo_url,
        photo_path: reference.fullPath,
        updated_at: new Date(),
      })
      .then(() => {
        Alert.alert("Atualizar!", "Pizza modificada com successo.");
        setImage("");
        setName("");
        setDescription("");
        setPriceSizeP("");
        setPriceSizeM("");
        setPriceSizeG("");
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleDelete() {
    Alert.alert("Atenção!", "Deseja realmente deletar este produto?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          storage().ref(photoPath).delete();
          firestore()
            .collection("pizzas")
            .doc(id)
            .delete()
            .then(() => {
              Alert.alert("Deletada!", "Pizza excluída com successo.");
              handleBack();
            })
            .catch((err) => {
              const error = translationFirebaseErrorsPTBR(err.code);
              Alert.alert(error);
            });
        },
      },
    ]);
  }

  async function fetchPizza() {
    setIsLoading(true);

    if (id) {
      await firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          const product = response.data() as PizzaResponse;

          setPhotoPath(product.photo_path);
          setImage(product.photo_url);
          setName(product.name);
          setDescription(product.description);
          setPriceSizeP(product.prices_sizes.p);
          setPriceSizeM(product.prices_sizes.m);
          setPriceSizeG(product.prices_sizes.g);
        })
        .catch((err) => {
          const error = translationFirebaseErrorsPTBR(err.code);
          Alert.alert(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    fetchPizza();
  }, [id]);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header>
        <ButtonBack onPress={handleBack} />

        <Title>Cadastrar</Title>

        <DeleteButton onPress={handleDelete}>
          <DeleteLabel>Deletar</DeleteLabel>
        </DeleteButton>
      </Header>

      {isLoading && id ? (
        <LoadContainer>
          <Load />
        </LoadContainer>
      ) : (
        <Scroller>
          <Upload>
            <Photo uri={image} />
            <PickImageButton
              type="secondary"
              title="Carregar"
              onPress={handleImagePicker}
            />
          </Upload>

          <Form>
            <InputGroup>
              <FormLabel>Nome</FormLabel>

              <Input color={COLORS.TITLE} value={name} onChangeText={setName} />
            </InputGroup>

            <InputGroup>
              <InputGroupHeader>
                <FormLabel>Descrição</FormLabel>
                <MaxCharacters>
                  {description.length} de 60 caracteres
                </MaxCharacters>
              </InputGroupHeader>

              <Input
                color={COLORS.TITLE}
                multiline={true}
                maxLength={60}
                style={{ height: 100 }}
                value={description}
                onChangeText={setDescription}
              />
            </InputGroup>

            <InputGroup>
              <FormLabel>Tamanhos e Preços</FormLabel>

              <InputPrice
                size="P"
                value={priceSizeP}
                onChangeText={setPriceSizeP}
              />

              <InputPrice
                size="M"
                value={priceSizeM}
                onChangeText={setPriceSizeM}
              />

              <InputPrice
                size="G"
                value={priceSizeG}
                onChangeText={setPriceSizeG}
              />
            </InputGroup>

            <Button
              title={id ? "Modificar Pizza" : "Cadastrar Pizza"}
              isLoading={isLoading}
              style={{ marginBottom: 24 }}
              onPress={id ? handleUpdate : handleAdd}
            />
          </Form>
        </Scroller>
      )}
    </Container>
  );
};
