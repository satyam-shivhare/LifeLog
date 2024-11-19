import React from 'react';
import { View, Text, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function LogEntryModal() {
  const router = useRouter();

  return (
    <>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className=' bg-gray-900 border-5 border-white w-1/2 m-28'>
      <Text>This is the Log Entry Modal!</Text>
      <Button title="Close" onPress={() => router.push('/(tabs)/(modals)/newModal')} />
      <Button title="Close" onPress={() => router.back()} />
    </View>
    </>
  );
}