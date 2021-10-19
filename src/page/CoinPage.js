import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { SingleCoin } from "../api/api";

import { CryptoState } from "../context/CryptoContext";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState([]);
    const { currency, symbol } = CryptoState();

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

    return (
        <div>
            <h1>hello world</h1>
        </div>
    );
};

export default CoinPage;
