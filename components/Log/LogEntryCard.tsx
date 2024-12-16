import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import LogEntry from "@/models/LogEntry";
import { GetAllExercises, UpdateLogEntry } from "@/database/Operations";
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
  const [selectedExercise, setSelectedExercise] = useState<
    Exercise | undefined
  >();
  const [selectedLogEntry, setSelectedLogEntry] = useState<
    LogEntry | undefined
  >();
  const exerciseListDummy = [
    new Exercise("1", "pushups"),
    new Exercise("2", "pushups"),
    new Exercise("3", "pushups"),
    new Exercise("4", "pushups"),
    new Exercise("5", "situps"),
    new Exercise("6", "pushups"),
    new Exercise("7", "pushups"),
  ];

  const updateLogEntry = async (logEntry: LogEntry) => {
    try {
      await UpdateLogEntry(db, logEntry);
    } catch (error) {
      console.log("update error is:", error);
    }
  };

  const selectedItem = (label: string, value: string): void => {
    setSelectedExercise(new Exercise(value, label));
  };
  useEffect(() => {
    GetAllExercises(db).then((exercises) => {
      setExercises(exerciseListDummy);
    });
  }, [logEntries]);
  return (
    <View>
      <FlatList
        scrollEnabled={false}
        nestedScrollEnabled={true}
        keyExtractor={(item) => item.id.toString()}
        className="bg-primary rounded-lg p-4 w-full border border-gray-500"
        data={logEntries}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => onUpdate(item)}>
              <View className="bg-primary rounded-lg p-4 w-full border border-gray-700 my-4">
                <Text>
                  {exercises.find((ex) => ex.id == item.exercise)?.name}
                </Text>
                <View className="flex flex-row">
                  <Text className="text-white">Reps: {item.reps}</Text>
                  <Text className="text-white">Sets: {item.sets}</Text>
                  <Text className="text-white">Weight: {item.weight}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default LogEntryCard;

const styles = StyleSheet.create({});
