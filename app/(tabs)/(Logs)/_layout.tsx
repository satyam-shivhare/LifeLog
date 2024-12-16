import { Stack } from 'expo-router';

export default function LogsLayout() {
  return (
    <Stack>
      <Stack.Screen name='Logs' options={{
        headerShown: false
      }} />
      <Stack.Screen name='LogEntryModal' options={{
        presentation: 'modal'
      }} />
      <Stack.Screen name='[id]' options={{
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name='CreateLog/[id]' options={{
        headerShown: false,
        presentation: 'modal'
      }} />
      <Stack.Screen name='UpdateLog/[logId]' options={{
        headerShown: false,
      }} />
      <Stack.Screen name='UpdateLog/UpdateLogEntry/[id]' options={{
        headerShown: false,
        presentation: "modal"
      }} />
    </Stack>
  );
}