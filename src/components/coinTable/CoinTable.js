import React, { useState, useEffect } from "react";
import {
    Container,
    makeStyles,
    Typography,
    createTheme,
    ThemeProvider,
    TextField,
} from "@material-ui/core";

import { CryptoState } from "../../context/CryptoContext";
import { CoinList } from "../../api/api";

const CoinTable = () => {
    const [coin, setCoin] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currency } = CryptoState();

    const fetchCoins = async () => {
        try {
            setLoading(true);
            const response = await fetch(CoinList(currency));
            if (response.ok) {
                const data = await response.json();
                setCoin(data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(coin);

    useEffect(() => {
        fetchCoins();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "fff",
            },
            type: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <Typography
                    variant="h4"
                    style={{ margin: 18, fontFamily: "Montserrat" }}
                >
                    Current Crypto Prices By Market Cap
                </Typography>
                <TextField
                    label="search for a Crypto currency..."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100" }}
                />
            </Container>
        </ThemeProvider>
    );
};

export default CoinTable;
