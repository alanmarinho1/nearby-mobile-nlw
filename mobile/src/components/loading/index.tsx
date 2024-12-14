import { ActivityIndicator } from "react-native";
import { styles } from "./styles";
import React from "react";
import { colors } from "@/styles/theme";

export default function Loading() {
  return (
    <ActivityIndicator
      size="large"
      color={colors.green.base}
      style={styles.container}
    />
  );
}
