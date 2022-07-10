import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";

interface TaskItemProps {
  task: {
    id: number;
    title: string;
    done: boolean;
  };
  index: number;
  toggleTaskDone: (id: number) => void;
  editTask: (id: number, taskNewTitle: string) => void;
  removeTask: (id: number) => void;
}

export function TaskItem(props: TaskItemProps) {
  const { task, index, toggleTaskDone, editTask, removeTask } = props;

  const [editTextInput, setEditTextInput] = useState(false);
  const [edit, setEdit] = useState(task.title);

  const inputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setEditTextInput(true);
    inputRef.current?.focus();
  }

  function handleCancelEditing() {
    setEditTextInput(false);

    let oldTaskTitle = task.title;

    setEdit(oldTaskTitle);
  }

  function handleSubmitEditing() {
    setEditTextInput(false);
    editTask(task.id, edit);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            value={edit}
            onChangeText={(t) => setEdit(t)}
            style={task.done ? styles.taskTextDone : styles.taskText}
            returnKeyType="send"
            onSubmitEditing={handleSubmitEditing}
            editable={editTextInput}
            ref={inputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonArea}>
        {editTextInput ? (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{
              paddingRight: 12,
            }}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={22} color="#b2b2b290" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{
              paddingRight: 12,
            }}
            onPress={handleStartEditing}
          >
            <Icon name="edit-3" size={22} color="#b2b2b290" />
          </TouchableOpacity>
        )}

        <View style={{ width: 1, height: 24, backgroundColor: "#C4C4C4" }} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{
            paddingRight: 24,
            paddingLeft: 12,
            opacity: editTextInput ? 0.2 : 1,
          }}
          disabled={editTextInput}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 5,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  buttonArea: {
    flexDirection: "row",
  },
});
