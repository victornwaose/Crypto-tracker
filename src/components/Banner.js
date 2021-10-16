import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const Banner = () => {
    const useStyle = makeStyles(() => ({
        banner: {
            backgroundImage: " url(./web.jpg)",
            backgroundSize: "100%",
            backgroundPosition: "cover",
        },
        bannerContent: {
            height: 100,
            display: "flex",
            flexDirection: "column",
            paddingTop: 25,
            paddingBottom: 25,
            justifyContent: "space-around",
        },
        tagline: {
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
        },
    }));
    const classes = useStyle();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: 15,
                            fontFamily: "Montserrat",
                        }}
                    >
                        Crypto-tracker
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: "darkgrey",
                            textTransform: "capitalize",
                            fontFamily: "Montserrat",
                        }}
                    >
                        Get all the 24/7 regarding your favorite Crypto
                    </Typography>
                </div>
            </Container>
        </div>
    );
};

export default Banner;
