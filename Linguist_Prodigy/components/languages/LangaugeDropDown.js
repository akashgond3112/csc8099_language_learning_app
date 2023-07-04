import { Picker } from "@react-native-picker/picker";
import { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";

const PickerContainer = () => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    height: 10,
    color: "#333",
    fontSize: 15,
  },
});

export default PickerContainer;
