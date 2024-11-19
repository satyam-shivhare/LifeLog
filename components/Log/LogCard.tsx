import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Log from '@/models/Log'

const LogCard = ({ log }: { log: Log }) => {
  const date = new Date(log.date);
  return (
    <View className='bg-primary rounded-lg p-4 w-full border border-gray-700 mb-4'>
      <Text className='text-white text-lg font-bold mb-2'>{log.name}</Text>
      <Text className='text-white text-sm'>{date.toLocaleDateString()}</Text>
    </View>
  )
}

export default LogCard
