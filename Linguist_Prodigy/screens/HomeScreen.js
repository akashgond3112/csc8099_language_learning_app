import {
  StyleSheet,
  TextInput,
  Pressable,
  View,
  Alert,
  Text,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Colors from "../constants/color";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import LanguageDropDown from "../components/languages/LangaugeDropDown";

function HomeScreen() {

  return (
    <View style={styles.rootContainer}>
      <Title>Welcome</Title>
      <LanguageDropDown/>
      <Card>
        <InstructionText style={styles.instructionText}>
          Take Quiz
        </InstructionText>
      </Card>
      <Card>
        <InstructionText style={styles.instructionText}>
          Play With FlashCards
        </InstructionText>
      </Card>
      <Card>
        <InstructionText style={styles.instructionText}>
          Engage with your peers
        </InstructionText>
      </Card>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },
  instructionText: {
    color: Colors.tertiary[500],
    fontSize: 24,
  },
  numberInput: {
    height: 50,
    width: 70,
    fontSize: 32,
    borderBottomColor: Colors.secondary[400],
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
});
