import { Stack, Tabs } from 'expo-router';
import React from 'react';
import "../../global.css";

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className='w-full h-full' edges={['top', 'left', 'right']}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1C2126'
          }
        }}>
        <Tabs.Screen 
          name='index'
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />

          <Tabs.Screen name='(Logs)' 
            options={{
              title: 'Logs',
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabBarIcon name={focused ? 'barbell' : 'barbell-outline'} color={color} />
              ),
            }}
          />

        <Tabs.Screen
          name='Stats'
          options={{
            title: 'Stats',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'stats-chart' : 'stats-chart-outline'} color={color} />
            ),
          }} 
        />

        <Tabs.Screen 
          name='Profile' 
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen name='(modals)'
          options={{
            headerShown: false,
            tabBarVisibilityAnimationConfig: {
              show: {
                animation: 'spring',
              },
              hide: {
                animation: 'spring',
              }
            },
            
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
