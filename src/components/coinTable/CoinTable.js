import React, { useState, useEffect } from "react";
import {
    Container,
    makeStyles,
    Typography,
    createTheme,
    ThemeProvider,
    TextField,
    TableContainer,
    CircularProgress,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody,
} from "@material-ui/core";
import { useHistory } from "react-router";
import { Pagination } from "@material-ui/lab";

import { CryptoState } from "../../context/CryptoContext";
import { CoinList } from "../../api/api";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const history = useHistory();
    const { currency, symbol } = CryptoState();

    const fetchCoins = async () => {
        try {
            setLoading(true);
            const response = await fetch(CoinList(currency));
            if (response.ok) {
                const data = await response.json();
                setCoins(data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
    console.log(coins);

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbols.toLowerCase().includes(search)
        );
    };

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    const useStyle = makeStyles(() => ({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPagination-root": {
                color: "gold",
            },
        },
    }));
    const classes = useStyle();

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
                    label="search for a Crypto currency.."
                    variant="outlined"
                    style={{ marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TableContainer>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>
                                    {[
                                        "Coin",
                                        "Price",
                                        "24h Change",
                                        "Market Cap",
                                    ].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={
                                                head === "Coin" ? "" : "right"
                                            }
                                        >
                                            {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch()
                                    .slice(
                                        (page - 1) * 10,
                                        (page - 1) * 10 + 10
                                    )
                                    .map((row) => {
                                        const profit =
                                            row.price_change_percentage_24h > 0;
                                        return (
                                            <TableRow
                                                onClick={() =>
                                                    history.push(
                                                        `/coins/${row.id}`
                                                    )
                                                }
                                                className={classes.row}
                                                key={row.name}
                                            >
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    style={{
                                                        display: "flex",
                                                        gap: 10,
                                                    }}
                                                >
                                                    <img
                                                        src={row?.image}
                                                        alt={row.name}
                                                        height="50"
                                                        style={{
                                                            marginBottom: 10,
                                                        }}
                                                    />
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                textTransform:
                                                                    "uppercase",
                                                                fontSize: 22,
                                                            }}
                                                        >
                                                            {row.symbol}
                                                        </span>
                                                        <span
                                                            style={{
                                                                color: "darkgrey",
                                                            }}
                                                        >
                                                            {row.name}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row?.current_price.toFixed(
                                                            2
                                                        )
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    style={{
                                                        color:
                                                            profit > 0
                                                                ? "rgba(14,203, 129)"
                                                                : "red",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    {profit && "+"}
                                                    {row.price_change_percentage_24h.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </TableCell>
                                                <TableCell align="right">
                                                    {symbol}{" "}
                                                    {numberWithCommas(
                                                        row?.market_cap
                                                            .toString()
                                                            .slice(0, 6)
                                                    )}
                                                    M
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
                <Pagination
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    );
};

export default CoinTable;
