import React, { useState, useEffect } from "react";
import {
    CircularProgress,
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";

import { CryptoState } from "../../context/CryptoContext";
import { HistoricalChart } from "../../api/api";
import { chartDays } from "../../config.js/data";
import SelectButton from "../selectButton/SelectButton";

const CoinInfo = ({ coin }) => {
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();

    const fetchHistoricalData = async () => {
        const response = await fetch(HistoricalChart(coin.id, days, currency));
        try {
            if (response.ok) {
                const data = await response.json();
                setHistoricalData(data.prices);
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(historicalData);
    useEffect(() => {
        fetchHistoricalData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, days]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    const useStyle = makeStyles((theme) => ({
        container: {
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            padding: 40,
            [theme.breakpoints.down("md")]: {
                width: "100%",
                marginTop: 0,
                padding: 20,
                paddingTop: 0,
            },
        },
    }));
    const classes = useStyle();
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {!historicalData ? (
                    <CircularProgress
                        style={{ color: "gold" }}
                        size={250}
                        thickness={1}
                    />
                ) : (
                    <>
                        <Line
                            data={{
                                labels: historicalData?.map((coin) => {
                                    let date = new Date(coin[0]);
                                    let time =
                                        date.getHours() > 12
                                            ? `${
                                                  date.getHours() - 12
                                              }: ${date.getMinutes()}PM`
                                            : `${date.getHours()}: ${date.getMinutes()} AM`;
                                    return days === 1
                                        ? time
                                        : date.toLocaleDateString();
                                }),
                                datasets: [
                                    {
                                        data: historicalData.map(
                                            (coin) => coin[1]
                                        ),
                                        label: `Price (Past ${days} Days) in  ${currency}`,
                                        borderColor: "#eebc1d",
                                    },
                                ],
                            }}
                            options={{
                                elements: {
                                    point: {
                                        radius: 2,
                                    },
                                },
                            }}
                        />
                        <div
                            style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            {chartDays.map((day) => (
                                <SelectButton
                                    key={day.value}
                                    onClick={() => setDays(day.value)}
                                    selected={day.value === days}
                                >
                                    {day.label}
                                </SelectButton>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </ThemeProvider>
    );
};

export default CoinInfo;
