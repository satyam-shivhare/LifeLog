import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import LogEntry from "@/models/LogEntry";
import { GetAllExercises } from "@/database/Operations";
import Exercise from "@/models/Exercises";
import { useSQLiteContext } from "expo-sqlite";

// Third party imports
import { Dropdown } from "react-native-element-dropdown";
import { TabBarIcon } from "../navigation/TabBarIcon";
import DropdownComponent from "../DropDown";

interface LogEntryCardProps {
  logEntries: LogEntry[];
  onUpdate: (logEntry: LogEntry) => Promise<void>;
}

const LogEntryCard: React.FC<LogEntryCardProps> = ({
  logEntries,
  onUpdate,
}) => {
  const db = useSQLiteContext();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const exerciseListDummy = [
    new Exercise("1", "pushups"),
    new Exercise("2", "pushups"),
    new Exercise("3", "pushups"),
    new Exercise("4", "pushups"),
    new Exercise("5", "pushups"),
    new Exercise("6", "pushups"),
    new Exercise("7", "pushups"),
  ];

  const selectedItem = (label: string, value: string): void => 
  {
    setSelectedExercise(new Exercise(value, label));
  }
  useEffect(() => {
    GetAllExercises(db).then((exercises) => {
      setExercises(exerciseListDummy);
    });
  }, [logEntries]);
  return (
    <FlatList
      className="bg-primary rounded-lg p-4 w-full border border-gray-500"
      data={logEntries}
      renderItem={({ item: logEntry }) => {
        return (
          <View className="bg-primary rounded-lg p-4 w-full border border-gray-700 my-4">
            <DropdownComponent
              label="Exercise"
              items={exercises.map((exercise) => ({
                label: exercise.name,
                value: exercise.id,
              }))}
              selectedItem={selectedItem}
            />
            <View className="flex flex-row">
              <TextInput
                placeholder="Reps"
                value={logEntry.reps.toString()}
                onChangeText={(text) => {
                  logEntry.reps = parseInt(text);
                  onUpdate(logEntry);
                }}
                className="mt-2 mb-2 px-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
              <TextInput
                placeholder="Sets"
                value={logEntry.sets.toString()}
                onChangeText={(text) => {
                  logEntry.sets = parseInt(text);
                  onUpdate(logEntry);
                }}
                className="mt-2 mb-2 px-2 mx-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
              <TextInput
                placeholder="Weight"
                value={logEntry.weight?.toString()}
                onChangeText={(text) => {
                  logEntry.weight = parseFloat(text);
                  onUpdate(logEntry);
                }}
                className="mt-2 mb-2 px-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
            </View>
          </View>
        );
      }}
    />
  );
};

export default LogEntryCard;

const styles = StyleSheet.create({});
