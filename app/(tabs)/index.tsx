import { StyleSheet, Text, View, Button } from 'react-native'
import { Link, useRouter } from 'expo-router';

import React from 'react'

const Home = () => {
  const router = useRouter();

  return (
    <View>
      <Text className='text-white'>Home</Text>
      <Link className='text-white' href="/(tabs)/(Logs)">Open Modal</Link>
      <Button title="Close" onPress={() => router.push('/(tabs)/(modals)/newModal')} />

    </View>
  )
}

export default Home

const styles = StyleSheet.create({})