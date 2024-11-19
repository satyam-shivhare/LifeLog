import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import LogEntry from '@/models/LogEntry';
import { GetAllLogEntriesByLogId, UpdateLogEntry } from '@/database/Operations';
import LogEntryCard from '@/components/Log/LogEntryCard';
import { FlatList } from 'react-native-gesture-handler';

const UpdateLog = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const db = useSQLiteContext();
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

  const onUpdate = async (logEntry: LogEntry) => {
    await UpdateLogEntry(db, logEntry);
  }

  const logEntry1 = new LogEntry('1', new Date(), 'Bench Press', 3, 10, 100);
  const logEntry2 = new LogEntry('2', new Date(), 'Squat', 3, 10, 100);
  const logEntry3 = new LogEntry('3', new Date(), 'Deadlift', 3, 10, 100);
  const logEntry4 = new LogEntry('4', new Date(), 'Pull-Up', 3, 10, 100);
  const dummyLogEntries = [logEntry1, logEntry2, logEntry3, logEntry4];

  useEffect(() => {
    //GetAllLogEntriesByLogId(db, id as string).then(setLogEntries);
    setLogEntries(dummyLogEntries);
  }, []);

  return (
    <View className='flex-1'>
      <View className="flex px-4">
        <View className="h-20 justify-center mb-20">
          <Text className="text-white w-full text-2xl text-center">
            It's Hero Time 💪
          </Text>
        </View>
        <LogEntryCard logEntries={logEntries} onUpdate={onUpdate} />
      </View>
    </View>
  )
}

export default UpdateLog;

const styles = StyleSheet.create({})