//React
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Keyboard,
  Alert,
  FlatList,
} from "react-native";

//Components
import Button from "../../components/Button";

//Styles
import { styles } from "./styles";
import colors from "../../global/colors";

//Types
type MySkillsData = {
  id: string;
  name: string;
};

export default function Home() {
  const [newSkill, setNewSkill] = useState<string>("");
  const [mySkills, setMySkills] = useState<MySkillsData[]>([]);
  const [greeting, setGreeting] = useState<string>("");

  function handleAddNewSkill() {
    if (newSkill === "") {
      Alert.alert("Blank Field.");
      return;
    }

    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills((oldState) => [...oldState, data]);
    setNewSkill("");

    Keyboard.dismiss();
  }

  function handleRemoveNewSkill(id: string, name: string) {
    Alert.alert(
      "You want to remove a skill?",
      `Skill that will be removed - ${name}`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () =>
            setMySkills((oldState) =>
              oldState.filter((skill) => skill.id !== id)
            ),
        },
      ]
    );
  }

  function getCurrentHour() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      setGreeting("Good Morning!");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Night!");
    }
  }

  useEffect(() => {
    getCurrentHour();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text testID="welcome" style={styles.title}>
        Welcome, Henrique
      </Text>

      <Text style={styles.greetings}>{greeting}</Text>

      <TextInput
        testID="input-new-skill"
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor="#555555"
        onChangeText={(t) => setNewSkill(t)}
        value={newSkill}
      />

      <Button
        testID="button-add-skill"
        title="Add"
        backgroundColor={colors.purple}
        borderRadius={7}
        onPress={handleAddNewSkill}
      />

      <Text
        testID="myskills"
        style={[styles.title, { marginTop: 50, marginBottom: 30 }]}
      >
        My Skills
      </Text>

      {mySkills && (
        <FlatList
          testID="flat-list-skills"
          data={mySkills}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="never"
          renderItem={({ item }) => (
            <Button
              title={item.name}
              backgroundColor={colors.lightGray}
              borderRadius={50}
              cardStyle={true}
              onLongPress={() => handleRemoveNewSkill(item.id, item.name)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
