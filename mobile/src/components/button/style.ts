import { StyleSheet } from "react-native";
import { colors, fontFamily } from "@/styles/theme";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green.base,
        height: 56,
        maxHeight: 56,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 14,
        borderRadius: 10,
    },
    title: {
        fontSize: 16,
        fontFamily: fontFamily.semiBold,
        color: colors.gray[100],
    },
});