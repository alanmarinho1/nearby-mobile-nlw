import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
    container: {
        maxHeight: 36,
        position: "absolute",
        top: 64,
        zIndex: 1,
    },
    content: {
        gap: 8,
        paddingHorizontal: 24,
    },
});