import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Button,
    SafeAreaView,
    Alert,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import SolidButton from "./SolidButton";
import { useNavigation } from "@react-navigation/native";

const batterList = [
    { id: 1, name: "Batter 1" },
    { id: 2, name: "Batter 2" },
];

const pitcherList = [
    { id: 1, name: "Pitcher 1" },
    { id: 2, name: "Pitcher 2" },
];

export default function Scoresheet() {
    const navigation = useNavigation();

    const [inning, setInning] = useState(1);

    const [batters, setBatters] = useState([]);
    const [currentBatter, setCurrentBatter] = useState(null);

    const [pitchers, setPitchers] = useState([]);
    const [currentPitcher, setCurrentPitcher] = useState(null);
    /** @type {[{ inning, pitcherId, pitcherName, outcome }[], import("react").Dispatch<import("react").SetStateAction<any>>]} */
    const [pitchData, setPitchData] = useState([]);

    const [outs, setOuts] = useState(0);
    /** @type {[{ inning, batterId, batterName, outcome }[], import("react").Dispatch<import("react").SetStateAction<any>>]} */
    const [outData, setOutData] = useState([]);
    const [currentAtBatOutcome, setCurrentAtBatOutcome] = useState(null);

    useEffect(() => {
        setBatters(batterList);
        setPitchers(pitcherList);
    }, []);

    useEffect(() => {
        if (inning < 1) {
            setInning(1);
        }
    }, [inning]);

    const handleCompleteGame = () => {
        Alert.alert(
            "Complete Game",
            "Are you sure you want to complete the game?",
            [
                {
                    text: "No",
                    style: "cancel",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        navigation.navigate("GameSummary", {
                            pitchData,
                            outData,
                        });
                    },
                },
            ],
        );
    };

    return (
        <View
            style={{
                justifyContent: "space-between",
                flex: 1,
                flexDirection: "column",
            }}
        >
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <SolidButton
                        buttonStyle={{
                            backgroundColor: "#0E7AFE",
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                        }}
                        onPressButtonStyle={{
                            backgroundColor: "#0a62ce",
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                        }}
                        title="<"
                        onPress={() => setInning(inning - 1)}
                    />
                    <Text style={{ fontSize: 20 }}>Inning: {inning}</Text>
                    <SolidButton
                        buttonStyle={{
                            backgroundColor: "#0E7AFE",
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                        }}
                        onPressButtonStyle={{
                            backgroundColor: "#0a62ce",
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                        }}
                        title=">"
                        onPress={() => setInning(inning + 1)}
                    />
                </View>
                <View style={{ ...styles.fullContainer, paddingVertical: 0 }}>
                    <SelectList
                        setSelected={setCurrentBatter}
                        data={batters.map((batter, i) => ({
                            index: i,
                            key: batter.id,
                            value: batter.name,
                        }))}
                        placeholder="Select a Batter"
                    />
                </View>

                <View style={{ ...styles.fullContainer, gap: 20 }}>
                    <RadioButtonGroup
                        onSelected={(value) => setCurrentAtBatOutcome(value)}
                        selected={currentAtBatOutcome}
                        containerStyle={{ flexDirection: "column", gap: 10 }}
                    >
                        <RadioButtonItem value={"single"} label={"Single"} />
                        <RadioButtonItem value={"double"} label={"Double"} />
                        <RadioButtonItem value={"triple"} label={"Triple"} />
                        <RadioButtonItem value={"homerun"} label={"Homerun"} />
                        <RadioButtonItem value={"out"} label={"Out"} />
                        <RadioButtonItem value={"walk"} label={"Walk"} />
                        <RadioButtonItem
                            value={"hit-by-pitch"}
                            label={"Hit by Pitch"}
                        />
                    </RadioButtonGroup>

                    <SolidButton
                        buttonStyle={{
                            backgroundColor: "#0E7AFE",
                        }}
                        onPressButtonStyle={{
                            backgroundColor: "#0a62ce",
                        }}
                        title={"+ Add Out (" + outData.filter((x) => x.batterId === currentBatter).length  + ")"}
                        onPress={() => {
                            // console.log(currentAtBatOutcome);
                            if (!currentAtBatOutcome) return;
                            if (!currentBatter) return;
                            
                            const batterName = batterList.find((x) => x.id === currentBatter).name;
                            setCurrentAtBatOutcome(null);
                            setOutData([
                                ...outData,
                                {
                                    inning,
                                    batterId: currentBatter,
                                    batterName,
                                    outcome: currentAtBatOutcome,
                                },
                            ]);
                            setOuts(outs + 1);
                        }}
                    />
                </View>

                <View style={styles.fullContainer}>
                    <SelectList
                        setSelected={setCurrentPitcher}
                        data={pitcherList.map((batter, i) => ({
                            index: i,
                            key: batter.id,
                            value: batter.name,
                        }))}
                        placeholder="Select a Batter"
                    />
                    <View
                        style={{
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <SolidButton
                            buttonStyle={{
                                backgroundColor: "#0E7AFE",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                width: "50%",
                            }}
                            onPressButtonStyle={{
                                backgroundColor: "#0a62ce",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                width: "50%",
                            }}
                            title="+ Add Ball"
                            onPress={() => {
                                // console.log(currentPitcher);
                                if (!currentPitcher) return;

                                const pitcherName = pitcherList.find((x) => x.id === currentPitcher).name;
                                setPitchData([
                                    ...pitchData,
                                    {
                                        inning,
                                        pitcherId: currentPitcher,
                                        pitcherName,
                                        outcome: "ball",
                                    },
                                ]);
                            }}
                        />
                        <SolidButton
                            buttonStyle={{
                                backgroundColor: "#0E7AFE",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                width: "50%",
                            }}
                            onPressButtonStyle={{
                                backgroundColor: "#0a62ce",
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                width: "50%",
                            }}
                            title="+ Add Strike"
                            onPress={() => {
                                if (!currentPitcher) return;

                                const pitcherName = pitcherList.find((x) => x.id === currentPitcher).name;
                                setPitchData([
                                    ...pitchData,
                                    {
                                        inning,
                                        pitcherId: currentPitcher,
                                        pitcherName,
                                        outcome: "strike",
                                    },
                                ]);
                            }}
                        />
                    </View>
                </View>

                <View>
                    <Text>
                        Pitch Total:{" "}
                        {
                            pitchData.filter(
                                (x) =>
                                    x.inning === inning &&
                                    x.pitcherId === currentPitcher,
                            ).length
                        }
                    </Text>
                    <Text>
                        Strike Total:{" "}
                        {
                            pitchData.filter(
                                (x) =>
                                    x.inning === inning &&
                                    x.outcome === "strike" &&
                                    x.pitcherId === currentPitcher,
                            ).length
                        }
                    </Text>
                    <Text>
                        Ball Total:{" "}
                        {
                            pitchData.filter(
                                (x) =>
                                    x.inning === inning &&
                                    x.outcome === "ball" &&
                                    x.pitcherId === currentPitcher,
                            ).length
                        }
                    </Text>
                </View>
            </View>

            <View style={{ width: "100%", padding: 10 }}>
                <SolidButton
                    buttonStyle={{ backgroundColor: "#0E7AFE" }}
                    onPressButtonStyle={{ backgroundColor: "#0a62ce" }}
                    title="Complete Game"
                    onPress={() => handleCompleteGame()}
                />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 10,
        width: "100%",
        padding: 10,
    },
    fullContainer: {
        width: "100%",
        padding: 20,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
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
