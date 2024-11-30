import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import LogEntry from '@/models/LogEntry';
import { GetAllLogEntriesByLogId, InsertLogEntry, UpdateLogEntry } from '@/database/Operations';
import LogEntryCard from '@/components/Log/LogEntryCard';
import { FlatList } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import Log from '@/models/Log';
import { v4 as uuidv4 } from 'uuid';


const UpdateLog = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const db = useSQLiteContext();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("updating..");
      try{
      getLogEntries();
      }catch(error){
        console.log(error);
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const onUpdate = async (logEntry: LogEntry) => {
    try{
    await UpdateLogEntry(db, logEntry);
    }catch(error){
      console.log("update error is:", error);
    }
  }
  const addNewLogEntry = async ():Promise<void> => {
    const newLogEntry:LogEntry = new LogEntry(uuidv4(), id as string, new Date(), id as string, 1, 1, 1);
    debugger;
    console.log("i AM HERE");
    console.log("log id :", id);
    setLogEntries((prevEntries) => [...prevEntries, newLogEntry]);
    try{
      await InsertLogEntry(db, newLogEntry);
    }catch(error)
    {
      console.log("new entry errors is : ", error);
    }

  }

  const getLogEntries = () => {
    try{
    GetAllLogEntriesByLogId(db, id as string).then(setLogEntries).catch(error => console.log(error));
    }catch(error){
      console.log(error);
    }
}

//   const logEntry1 = new LogEntry('1', new Date(), 'Bench Press', 3, 10, 100);
//   const logEntry2 = new LogEntry('2', new Date(), 'Squat', 3, 10, 100);
//   const logEntry3 = new LogEntry('3', new Date(), 'Deadlift', 3, 10, 100);
//   const logEntry4 = new LogEntry('4', new Date(), 'Pull-Up', 3, 10, 100);
//   const dummyLogEntries = [logEntry1, logEntry2, logEntry3, logEntry4];

  // useEffect(() => {
  //   GetAllLogEntriesByLogId(db, id as string).then((data) => setLogEntries(data));
  // }, [logEntries]);

  return (
    <ScrollView nestedScrollEnabled={true}>
    <View className='flex-1'>
      <View className="flex px-4">
        <View className=" justify-center mb-20 w-full px-6 flex-row">
          <TouchableOpacity onPress={() => router.back()}><AntDesign name='arrowleft' color='white' size={25}/></TouchableOpacity>
          <Text className="text-white w-full text-2xl text-center">
            It's Hero Time 💪
          </Text>
          <TouchableOpacity onPress={addNewLogEntry}><AntDesign name='plus' color='white' size={25} /></TouchableOpacity>
        </View>
        <LogEntryCard logEntries={logEntries} onUpdate={onUpdate} />
      </View>
    </View>
    </ScrollView>
  )
}

export default UpdateLog;

const styles = StyleSheet.create({})