import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Table, Row, Rows } from "react-native-table-component";
import SolidButton from "./SolidButton";

export default function GameSummary() {
    const navigation = useNavigation();
    // const gameData = navigation.getState().routes[0].params;

    const pitcherHeaders = ["Team", "Name", "B/S"]; // PC/B/S/O/SO/W/HBP/H
    // const pitchersData = []; //[["Team 1", "Pitcher 1", "1/2/3/4/5/6/7/8"]];
    const [pitcherData, setPitcherData] = useState([]); // ["Team 1", "Pitcher 1", "1/2/3/4/5/6/7/8"

    const batterHeaders = ["Team", "Name", "Hits (S/D/T/HR/O/SO/W/HBP)"];
    // const battersData = []; // [["Team 1", "Batter 1", "20 (1/2/3/4/5/6)"]];
    const [batterData, setBatterData] = useState([]); // ["Team 1", "Batter 1", "20 (1/2/3/4/5/6)"

    useEffect(() => {
        const gameData = navigation
            .getState()
            .routes.find((x) => x.name === "GameSummary")?.params; //.routes[0].params;
        // console.log("Game Summary", JSON.stringify(gameData, null, 4));

        setPitcherData([]);
        setBatterData([]);

        const pitchers = [
            ...new Set(gameData.pitchData.map((item) => item.pitcherName)),
        ];
        console.log("Pitchers", pitchers);
        const pdata = pitchers.map((value) => {
            const data = gameData.pitchData.filter(
                (item) => item.pitcherName === value,
            );
            const balls = data.reduce(
                (acc, curr) => acc + (curr.outcome === "ball" ? 1 : 0),
                0,
            );
            const strikes = data.reduce(
                (acc, curr) => acc + (curr.outcome === "strike" ? 1 : 0),
                0,
            );
            return ["Team 1", value, `${balls}/${strikes}`];
        });

        setPitcherData(pdata);
        // console.log(pdata);

        // pitchers.forEach((value) => {
        //     const data = gameData.pitchData.filter(
        //         (item) => item.pitcherName === value,
        //     );
        //     console.log(data);

        //     const balls = data.reduce(
        //         (acc, curr) => acc + (curr.outcome === "ball" ? 1 : 0),
        //         0,
        //     );
        //     const strikes = data.reduce(
        //         (acc, curr) => acc + (curr.outcome === "strike" ? 1 : 0),
        //         0,
        //     );
        //     setPitcherData([
        //         ...pitcherData,
        //         ["Team 1", value, `${balls}/${strikes}`],
        //     ]);
        //     console.log("Pitcher Data", pitcherData);
        //     // pitchersData.push(["Team 1", value, `${balls}/${strikes}`]);
        // });
        // pitcherHeaders[0][2] = `${gameData.pitchData.length} (${balls}/${strikes})`;

        const batters = [
            ...new Set(gameData.outData.map((item) => item.batterName)),
        ];
        console.log("Batters", batters);

        const bdata = batters.map((value, i) => {
            const data = gameData.outData.filter(
                (item) => item.batterName === value,
            );

            const singles = data.reduce(
                (acc, curr) => acc + (curr.outcome === "single" ? 1 : 0),
                0,
            );
            const doubles = data.reduce(
                (acc, curr) => acc + (curr.outcome === "double" ? 1 : 0),
                0,
            );
            const triples = data.reduce(
                (acc, curr) => acc + (curr.outcome === "triple" ? 1 : 0),
                0,
            );
            const homeRuns = data.reduce(
                (acc, curr) => acc + (curr.outcome === "homerun" ? 1 : 0),
                0,
            );
            const outs = data.reduce(
                (acc, curr) => acc + (curr.outcome === "out" ? 1 : 0),
                0,
            );
            const walks = data.reduce(
                (acc, curr) => acc + (curr.outcome === "walk" ? 1 : 0),
                0,
            );
            const hitByPitch = data.reduce(
                (acc, curr) => acc + (curr.outcome === "hit-by-pitch" ? 1 : 0),
                0,
            );
            return [
                "Team 1",
                value,
                `${singles}/${doubles}/${triples}/${homeRuns}/${outs}/${walks}/${hitByPitch}`,
            ];
        });

        setBatterData(bdata);
        console.log(bdata);
    }, []);

    return (
        <View
            style={{
                paddingHorizontal: 20,
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <View style={{ gap: 20 }}>
                <Text
                    style={{
                        width: "100%",
                        fontSize: 30,
                        textAlign: "center",
                        paddingVertical: 20,
                    }}
                >
                    Game Results
                </Text>

                <View style={{ gap: 6 }}>
                    <Text style={{ fontSize: 20 }}>Pitchers</Text>
                    <View>
                        <Table
                            borderStyle={{
                                borderWidth: 2,
                                borderColor: "black",
                            }}
                        >
                            <Row
                                data={pitcherHeaders}
                                style={styles.head}
                                textStyle={{ ...styles.text, color: "#fff" }}
                            />
                            <Rows data={pitcherData} textStyle={styles.text} />
                        </Table>
                    </View>
                </View>

                <View style={{ gap: 6 }}>
                    <Text style={{ fontSize: 20 }}>Batters</Text>
                    <View>
                        <Table
                            borderStyle={{
                                borderWidth: 2,
                                borderColor: "black",
                            }}
                        >
                            <Row
                                data={batterHeaders}
                                style={styles.head}
                                textStyle={{ ...styles.text, color: "#fff" }}
                            />
                            <Rows data={batterData} textStyle={styles.text} />
                        </Table>
                    </View>
                </View>
            </View>

            <View style={{ gap: 15 }}>
                <SolidButton
                    buttonStyle={{ backgroundColor: "#0E7AFE" }}
                    onPressButtonStyle={{ backgroundColor: "#0a62ce" }}
                    title="Undo and Clean Form"
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Scoresheet' }],
                        });
                    }}
                />
                <SolidButton
                    buttonStyle={{ backgroundColor: "#0E7AFE" }}
                    onPressButtonStyle={{ backgroundColor: "#0a62ce" }}
                    title="Submit to MyGame"
                    onPress={() => console.log("Submit to MyGame")}
                />
                <SolidButton
                    buttonStyle={{ backgroundColor: "#0E7AFE" }}
                    onPressButtonStyle={{ backgroundColor: "#0a62ce" }}
                    title="Back to Form"
                    onPress={() => {
                        console.log("Back to Form");
                        navigation.goBack();
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: "#fff",
    },
    head: { height: 40, backgroundColor: "#0E7AFE", color: "#fff" },
    text: { margin: 6, color: "#000" },
});
