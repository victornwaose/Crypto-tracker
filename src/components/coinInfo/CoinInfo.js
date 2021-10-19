import React, { useState, useEffect } from "react";

import { CryptoState } from "../../context/CryptoContext";
import { HistoricalChart } from "../../api/api";

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
    }, []);

    return <div>hello wor</div>;
};

export default CoinInfo;
