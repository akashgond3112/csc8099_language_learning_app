import { Text, StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Colors from "./constants/color";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const [fontLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary[100], Colors.primary[500]]}
      style={styles.rootScreen}
    >
      <ImageBackground
        // source={require("./assets/images/multiLanguage.jpg")}
        source={require("./assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImageStyle}
      >
        <SafeAreaView style={styles.rootScreen}>
          <HomeScreen />
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImageStyle: {
    opacity: 0.15,
  },
});
