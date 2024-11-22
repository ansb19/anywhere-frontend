import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet, Dimensions, Text } from "react-native";

interface InfiniteLoopingTextProps {
  text: string;
}

const InfiniteLoopingText: React.FC<InfiniteLoopingTextProps> = ({ text }) => {
  const screenWidth = Dimensions.get("window").width;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 10000, // Adjust speed of the scrolling
          useNativeDriver: true,
        })
      ).start();
    };

    startAnimation();
  }, [animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -screenWidth], // Move left continuously
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.scrollingContainer,
          { transform: [{ translateX }] },
        ]}
      >
        <Text style={styles.text}>{text  ? text : "주소가 없습니다."}</Text>
        <Text style={styles.text}>{text  ? text : "주소가 없습니다."}</Text> {/* Duplicate for seamless scroll */}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Prevent overflow
    width: "100%", // Ensure full width
  },
  scrollingContainer: {
    flexDirection: "row", // Texts side by side
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 10, // Add space between duplicate texts
    whiteSpace: "nowrap", // Prevent text wrapping
  },
});

export default InfiniteLoopingText;
