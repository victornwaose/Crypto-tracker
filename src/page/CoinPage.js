import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ReactHtmlParser from "react-html-parser";

import { SingleCoin } from "../api/api";
import CoinInfo from "../components/coinInfo/CoinInfo";
import { CryptoState } from "../context/CryptoContext";
import { numberWithCommas } from "../components/banner/Carousel";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency = "", symbol = "" } = CryptoState();
    console.log(symbol, currency, "currency,symbol");
    console.log(coin, "coin");
    const fetchSingleCoins = async () => {
        try {
            const response = await fetch(SingleCoin(id));

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
        fetchSingleCoins();
    }, []);
    const useStyle = makeStyles((theme) => ({
        container: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        sidebar: {
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "25",
            borderRight: "2px solid gray",
        },
        heading: {
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",
        },
        description: {
            width: "100%",
            fontWeight: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "center",
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
        },
    }));
    const classes = useStyle();

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin?.image?.large}
                    alt={coin.name}
                    height="200"
                    style={{ marginTop: 20 }}
                />
                <Typography variant="h4" className={classes.heading}>
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    {ReactHtmlParser(coin?.description?.en?.split(".")[0])}
                </Typography>
                <div className={classes.marketData}>
                    <span style={{ display: "flex" }}>
                        <Typography variant="h5" className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{ fontFamily: "Montserrat" }}
                        >
                            {coin?.market_cap_rank}
                        </Typography>
                    </span>
                </div>{" "}
                <span style={{ display: "flex" }}>
                    <Typography variant="h5" className={classes.heading}>
                        Current Price:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography
                        variant="h5"
                        style={{ fontFamily: "Montserrat" }}
                    >
                        {symbol} {""}
                        {numberWithCommas(
                            coin?.market_data.current_price?.[
                                currency?.toLowerCase()
                            ]
                        )}
                    </Typography>
                </span>
                <span style={{ display: "flex" }}>
                    <Typography variant="h5" className={classes.heading}>
                        Market Cap:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography
                        variant="h5"
                        style={{ fontFamily: "Montserrat" }}
                    >
                        {symbol} {""}
                        {numberWithCommas(
                            coin?.market_data.market_cap?.[
                                currency?.toLowerCase()
                            ]
                                .toString()
                                .slice(0, -6)
                        )}{" "}
                        M
                    </Typography>
                </span>
            </div>

            {/* chart */}
            <CoinInfo coin={coin} />
        </div>
    );
};

export default CoinPage;
