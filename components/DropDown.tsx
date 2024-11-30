import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Exercise from "@/models/Exercises";
import { GetAllExercises } from "@/database/Operations";

const DropDown = ({
  label,
  items,
  selectedItem,
}: {
  label: string;
  items: { label: string; value: string }[];
  selectedItem: (label: string, value: string) => void;
}) => {
  const [isDropdownListVisible, setIsDropdownListVisible] = useState<
    boolean | undefined
  >(false);

  const [visibleLabel, setVisibleLabel] = useState<string>(`Select ${label}`);

  return (
    <>
      <View className="w-full h-10 border-gray-300 rounded-lg flex-row justify-between">
        <Text className="text-white">{visibleLabel}</Text>
        <TouchableOpacity onPress={() => setIsDropdownListVisible(true)}>
          <AntDesign name="down" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={isDropdownListVisible}
        transparent
        onRequestClose={() => setIsDropdownListVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer]}>
            <View className="text-right items-end w-full pb-2">
                <TouchableOpacity onPress={() => setIsDropdownListVisible(false)}>
                <AntDesign name="close" color='black' size={22} />
                </TouchableOpacity>
            </View>
            <FlatList
              data={items}
              renderItem={({
                item,
              }: {
                item: { label: string; value: string };
              }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      selectedItem(item.label, item.value);
                      setVisibleLabel(item.label);
                      setIsDropdownListVisible(false);
                    }}
                  >
                    <Text className="text-center text-xl my-3 ">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});
