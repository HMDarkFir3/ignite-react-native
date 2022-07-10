import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getTasks = tasks.map((task) => ({ ...task }));

  function handleAddTask(newTaskTitle: string) {
    let findTask = getTasks.find((task) => task.title === newTaskTitle);

    if (findTask) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome."
      );

      return;
    }

    let data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((oldState) => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    let findTask = getTasks.find((task) => task.id === id);

    if (findTask) {
      findTask.done = !findTask.done;
    }

    setTasks(getTasks);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    let findTask = getTasks.find((task) => task.id === id);

    if (findTask) {
      findTask.title = taskNewTitle;
    }

    setTasks(getTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "NÃO", style: "cancel" },
        {
          text: "SIM",
          onPress: () =>
            setTasks((oldState) => [
              ...oldState.filter((task) => task.id !== id),
            ]),
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
