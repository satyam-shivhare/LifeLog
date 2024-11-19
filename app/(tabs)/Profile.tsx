import { Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

const profile = () => {
  return (
    <ScrollView automaticallyAdjustKeyboardInsets={true}>
      <View className="flex px-4">
        <View className="h-20 justify-center mb-20">
          <Text className="text-white w-full text-2xl text-center">
            Personalise your Experience
          </Text>
        </View>
        <View>
          <View className="h-min-20">
            <Text className="text-white text-lg mt-2 mb-2">Date of Birth</Text>

            <TextInput
              placeholder="DD/MM/YYYY"
              className="mt-2 mb-2 px-2 text-white bg-primary w-full h-16 rounded-lg border-2 border-gray-700"
            />
          </View>
          <View className="h-min-20">
            <Text className="text-white text-lg mt-2 mb-2">Sex</Text>

            <TextInput
              placeholder="Enter your weight in kg"
              className="mt-2 mb-2 px-2 text-white bg-primary w-full h-16 rounded-lg border-2 border-gray-700"
            />
          </View>
          <View className="h-min-20">
            <Text className="text-white text-lg mt-2 mb-2">Height</Text>

            <TextInput
              placeholder="Enter your height in cm"
              className="mt-2 mb-2 px-2 text-white bg-primary w-full h-16 rounded-lg border-2 border-gray-700"
            />
          </View>
          <View className="h-min-20">
            <Text className="text-white text-lg mt-2 mb-2">Weight</Text>

            <TextInput
              placeholder="Enter your weight in kg"
              className="mt-2 mb-2 px-2 text-white bg-primary w-full h-16 rounded-lg border-2 border-gray-700"
            />
          </View>
          <View className="h-min-20 mt-6 items-end">
            <TouchableOpacity className="bg-blue-600 w-40 p-4 rounded-lg border-2 border-white-700">
              <Text className="text-white text-lg text-center">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default profile;
