import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import LogEntry from '@/models/LogEntry';
import { useSQLiteContext } from 'expo-sqlite';
import DropdownComponent from '../../../../../components/DropDown';
import Exercise from '@/models/Exercises';
import { GetAllExercises, GetLogEntryById, UpdateLogEntry } from '@/database/Operations';

const EntryUpdate = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [logEntry, setLogEntry] = useState<LogEntry>();
  const db = useSQLiteContext();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("updating..");
      try{
        GetLogEntryById(db, id as string).then((entries) => {
          setLogEntry(entries[0]);
          console.log("Fetched the log entry");
          console.log(`reps: ${logEntry?.reps} sets: ${logEntry?.sets} Weights: ${logEntry?.weight}`);
          console.log(entries);
          console.log(id as string);
      });
      }catch(error){
        console.log(error);
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | undefined>();
  const exerciseListDummy = [
    new Exercise("1", "pushups"),
    new Exercise("2", "situps"),
    new Exercise("3", "dumbbell curls"),
    new Exercise("4", "Squats"),
    new Exercise("5", "Leg Press"),
    new Exercise("6", "Bench Press"),
    new Exercise("7", "Planche pushups"),
  ];
  const selectedItem = (label: string, value: string): void => 
    {
      setSelectedExercise(new Exercise(value, label));
      if (logEntry) {
        logEntry.exercise = value;
      }
    }

  const updateLogEntry = async (logEntry: LogEntry) => {
    try{
    var result = await UpdateLogEntry(db, logEntry);
    console.log("updation of log entry: ", result);
    }catch(error){
      console.log("update error is:", error);
    }
  }

  useEffect(() => {
    GetAllExercises(db).then((exercises) => {
      setExercises(exerciseListDummy);
    });
  }, []);
  
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
                value={logEntry?.id?.toString()}
                onChangeText={(text) => {
                    if (logEntry) {
                        logEntry.reps = parseInt(text);
                        updateLogEntry(logEntry).then((data) => console.log("we have updated log entry")).catch((error)=> console.log(error));
                    }
                }}
                className="mt-2 mb-2 px-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
              <TextInput
                placeholder="Sets"
                value={logEntry?.sets?.toString()}
                onChangeText={(text) => {
                    if (logEntry) {
                        logEntry.reps = parseInt(text);
                        updateLogEntry(logEntry).then((data) => console.log("we have updated log entry")).catch((error)=> console.log(error));
                    }
                }}
                className="mt-2 mb-2 px-2 mx-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
              <TextInput
                placeholder="Weight"
                value={logEntry?.weight?.toString()}
                onChangeText={(text) => {
                    if (logEntry) {
                        logEntry.reps = parseFloat(text);
                        updateLogEntry(logEntry).then((data) => console.log("we have updated log entry")).catch((error)=> console.log(error));
                    }
                }}
                className="mt-2 mb-2 px-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
            </View>
          </View>
  )
}

export default EntryUpdate

const styles = StyleSheet.create({})