import { createContext, useContext, useEffect, useState } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
    const [currency, setCurrency] = useState("NGN");
    const [symbol, setSymbol] = useState("NGN");

    useEffect(() => {
        if (currency === "NGN") setSymbol("NGN");
        else if (currency === "USD") setSymbol("USD");
    }, [currency]);
    return (
        <Crypto.Provider value={{ currency, symbol, setCurrency }}>
            {children}
        </Crypto.Provider>
    );
};

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
};
