import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

import { TrendingCoins } from "../../api/api";
import { CryptoState } from "../../context/CryptoContext";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Carousel = () => {
    const [trending, setTrending] = useState([]);

    const useStyle = makeStyles(() => ({
        carousel: {
            height: "50%",
            display: "flex",
            alignItems: "center",
            marginTop: "30px",
        },
        carouselItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
            marginTop: "10px",
        },
    }));
    const classes = useStyle();

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        try {
            const response = await fetch(TrendingCoins(currency));

            if (response.ok) {
                const data = await response.json();
                setTrending(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;
        return (
            <Link className={classes.carouselItem} to={`/coins${coin.id}`}>
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80"
                    style={{ marginBottom: 10 }}
                />
                <span>
                    {coin?.symbol} &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgba(14, 203, 129)" : "red",
                            fontWeight: 500,
                        }}
                    >
                        <span>
                            {profit && "+"}
                            {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                    </span>
                </span>

                <span style={{ fontSize: 22, fontWight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        );
    });

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableButtonsControls
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    );
};

export default Carousel;
