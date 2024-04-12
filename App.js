import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Scoresheet from "./components/Scoresheet";
import GameSummary from "./components/GameSummary";
import { SafeAreaView } from "react-native";
// import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={{ flex: 1 }}>
                <Stack.Navigator
                    initialRouteName="Scoresheet"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Scoresheet" component={Scoresheet} />
                    <Stack.Screen
                        name="GameSummary"
                        component={GameSummary}
                        options={{ title: "Game Summary" }}
                    />
                </Stack.Navigator>
            </SafeAreaView>
        </NavigationContainer>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Theme.primary,
//     },
// });
