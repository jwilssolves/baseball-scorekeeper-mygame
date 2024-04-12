import { Pressable, StyleSheet, Text } from "react-native";

/**
 * @param {object} props
 * @param {string} props.title
 * @param {function} props.onPress
 * @param {import("react-native").StyleProp<import("react-native").ViewStyle>} props.buttonStyle
 * @param {import("react-native").StyleProp<import("react-native").ViewStyle>} props.textStyle
 * @param {import("react-native").StyleProp<import("react-native").ViewStyle>} props.onPressButtonStyle
 * @returns
 */
export default function SolidButton(props) {
    return (
        <Pressable
            style={({ pressed }) => ({
                ...styles.button,
                ...(pressed ? props.onPressButtonStyle : props.buttonStyle),
            })}
            onPress={props.onPress}
        >
            <Text style={{ ...styles.text, ...props.textStyle }}>
                {props.title}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: "black",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },
});
