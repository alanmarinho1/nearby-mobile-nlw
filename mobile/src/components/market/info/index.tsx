import { View, Text } from "react-native";
import { Icon, IconProps } from "@tabler/icons-react-native";
import React from "react";

import { styles } from "./styles";
import { colors } from "@/styles/theme";

type Props = {
  icon: React.ComponentType<IconProps>;
  description: string;
};

export function Info({ icon: Icon, description }: Props) {
  return (
    <View style={styles.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={styles.text}>{description}</Text>
    </View>
  );
}
