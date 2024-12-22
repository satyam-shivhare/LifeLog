import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import LogEntry from '@/models/LogEntry';
import { useSQLiteContext } from 'expo-sqlite';
import DropdownComponent from '../../../../../components/DropDown';
import Exercise from '@/models/Exercises';
import { GetAllExercises, GetLogEntryById, UpdateLogEntry } from '@/database/Operations';

const EntryUpdate = () => {
  const router = useRouter();
  const allParams = useLocalSearchParams();
  const { id } = useLocalSearchParams();
  const [logEntry, setLogEntry] = useState<LogEntry>();
  const [reps, setReps] = useState<number | undefined>();
  const [sets, setSets] = useState<number | undefined>();
  const [weight, setWeight] = useState<number | undefined>();
  const db = useSQLiteContext();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("updating..");
      try{
        GetLogEntryById(db, id as string).then((entry) => {
          setLogEntry(entry);
          console.log("Fetched the log entry");
          console.log(`reps: ${logEntry?.reps} sets: ${logEntry?.sets} Weights: ${logEntry?.weight}`);
          console.log(entry);
          console.log(id as string);
          setReps(logEntry?.reps);
          setSets(logEntry?.sets);
          setWeight(logEntry?.weight);
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
      if(logEntry){
        logEntry.reps = reps ?? logEntry.reps;
        logEntry.sets = sets ?? logEntry.sets;
        logEntry.weight = weight ?? logEntry.weight;
      }
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
                value={reps?.toString()}
                onChangeText={(text) => {
                        setReps(parseInt(text));
                }}
                className="mt-2 mb-2 px-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
              <TextInput
                placeholder="Sets"
                value={sets?.toString()}
                onChangeText={(text) => {
                        setSets(parseFloat(text));
                }}
                className="mt-2 mb-2 px-2 mx-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
              <TextInput
                placeholder="Weight"
                value={weight?.toString()}
                onChangeText={(text) => {
                        setWeight(parseFloat(text));
                        //updateLogEntry(logEntry).then((data) => console.log("we have updated log entry")).catch((error)=> console.log(error));
                }}
                className="mt-2 mb-2 px-2 text-white bg-primary w-1/3 h-16 rounded-lg border-2 border-gray-700"
              />
            </View>
            <View className="h-min-20 mt-6 items-end">
            <TouchableOpacity className="bg-blue-600 w-40 p-4 rounded-lg border-2 border-white-700" onPress={() => {if(logEntry) updateLogEntry(logEntry).then((data) => console.log("we have updated log entry")).catch((error)=> console.log(error));}}>
              <Text className="text-white text-lg text-center">Save</Text>
            </TouchableOpacity>
            </View>
          </View>
  )
}

export default EntryUpdate

const styles = StyleSheet.create({})