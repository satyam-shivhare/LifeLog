import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { GetAllLogEntriesByLogId, InsertLog } from '@/database/Operations';
import Log from '@/models/Log';
import LogEntry from '@/models/LogEntry';

const LogDetails = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const db = useSQLiteContext();

    const [logEntries, setLogEntries] = useState<LogEntry[]>([]);

    useEffect(() => {
        GetAllLogEntriesByLogId(db, id as string)
        .then(setLogEntries)
        .then(() => {
            if(logEntries.length === 0) {
                InsertLog(db, new Log(id as string, new Date().toString(), new Date(), []))
                .catch((error) => {
                    console.error(error);
                });
            }
        });
    }, []);
  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default LogDetails

const styles = StyleSheet.create({})