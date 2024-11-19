import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Log from '../../../models/Log'
import LogEntry from '../../../models/LogEntry'
import LogCard from '@/components/Log/LogCard'
import { useRouter } from 'expo-router'
import { useSQLiteContext } from 'expo-sqlite'
import '@/database/Operations';
import { GetAllExercises, GetAllLogs } from '@/database/Operations'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useIsFocused } from '@react-navigation/native'
const Logs = () => {
  // const log = new Log("1", 'Workout', new Date(), [new LogEntry("1", new Date(), "Bench Press", 3, 100, 100)]);
  // const logs = [log, log, log];
  const router = useRouter();
  const isFocused = useIsFocused();
  const db = useSQLiteContext();
  const [logs, setLogs] = useState<Log[]>([]);

  const onAddLog = () => {
    const newLogId = uuidv4();
    router.push(`/(tabs)/(Logs)/CreateLog/${newLogId}`);
  }

  useEffect(() => {
    GetAllLogs(db).then(setLogs);
  }, [isFocused]);
  return (
    <View>
      <View className='flex p-4'>
        <View className="h-20 justify-center mb-10 flex-row items-center p-4">
          <Text className="text-white w-full text-2xl">
            Daily Logs
          </Text>
          <TouchableOpacity onPress={() => onAddLog()}>
          <TabBarIcon name="add-circle-outline" style={{ width: 40, height: 40, color: 'white' }} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={logs}
          renderItem={({ item }: { item: Log }) => <TouchableOpacity onPress={() => router.push(`/(tabs)/(Logs)/UpdateLog/${item.id}`)}><LogCard log={item} /></TouchableOpacity>}
        />
      </View>
    </View>
  )
}

export default Logs

const styles = StyleSheet.create({})