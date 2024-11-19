import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import Log from '@/models/Log';
import { InsertLog } from '@/database/Operations';

const CreateLog = () => {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const db = useSQLiteContext();
    const [title, setTitle] = useState('');

    const onSave = async () => {
        const newLog = new Log(id as string, title, new Date(), []);
        if(title.length > 0) {
            await InsertLog(db, newLog);
            router.back();
        }
    }

  return (
    <View className="flex px-4">
        <View className="h-20 justify-center mb-20">
          <Text className="text-white w-full text-2xl text-center">
            Create New Log
          </Text>
        </View>
            
            <TextInput
                className="mt-2 mb-2 px-2 text-white bg-primary w-full h-16 rounded-lg border-2 border-gray-700"
                placeholder="Log Title"
                value={title}
                onChangeText={setTitle}
            />

            <TouchableOpacity 
                className="bg-blue-600 w-full mt-4 p-4 rounded-lg border-2 border-white-700"
                onPress={onSave}
            >
                <Text className="text-white text-lg text-center">Create Log</Text>
            </TouchableOpacity>
        </View>
  )
}

export default CreateLog;

const styles = StyleSheet.create({})