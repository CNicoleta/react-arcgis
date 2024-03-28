import { createTheme } from "@mui/material";
import { blue, orange, purple } from "@mui/material/colors";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#236A62",
            light: "#42847D",
            dark: "#0D4F48"
        },
        secondary: {
            main: orange[500]
        },
        // success: {
        //     main: orange[500]
        // },
        // error: {},
        // warning: {},

    },
    components: {
        "MuiButton": {
            defaultProps: {},
            styleOverrides: {
                root: {
                    "&:focus": {
                        color: purple[300]
                    },
                    variants: [
                        {
                            props: {
                                variant: "contained"
                            },
                            style: {
                                backgroundColor: purple[700],
                                "&:hover": {
                                    backgroundColor: orange[700]
                                },
                                margin: "5px",

                            }
                        },
                        {
                            props: {
                                variant: "outlined"
                            },
                            style: {
                                margin: "5px",
                                border: `1px solid ${purple[700]}`,
                                "&:hover": {
                                    borderColor: orange[700]
                                },
                                color: "white"

                            }
                        }
                        , {
                            props: (props) =>
                                props.variant === 'dashed' && props.color !== 'secondary',
                            style: {
                                // textTransform: 'none',
                                color: "white",
                                border: `2px dashed ${blue[500]}`,
                                margin: "5px",
                                "&:hover": {
                                    borderColor: orange[700]
                                },
                            },

                        },
                    ]
                }
            }
        },
        "MuiTypography": {
            styleOverrides: {
                root: {
                    fontFamily: ["Georgia", "Garamond"],
                    fontSize: "2em",
                    fontWeight: 800
                }
            }
        },
        "MuiCard": {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    color: "#25C1B0",
                    backgroundColor: "#0E3C37",
                }
            }
        },
        "MuiCardMedia": {

            styleOverrides: {
                root: {
                    ".MuiCardMedia-root.MuiCardMedia-media.MuiCardMedia-img": {
                        color: "blue"
                    }
                },
            }
        },
        "MuiOutlinedInput": {
            styleOverrides: {
                root: {
                    // border: "2px solid #00352F",
                    padding: 0
                }
            }
        }
    }
});

const darkTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#ae445a",
            light: "#42847D",
            dark: "#1d1a39"
        },
        secondary: {
            main: orange[500]
        },
        // success: {
        //     main: orange[500]
        // },
        // error: {},
        // warning: {},

    },
    components: {
        "MuiButton": {
            defaultProps: {},
            styleOverrides: {
                root: {
                    // width: "44px",
                    // height: "44px"
                    variants: [
                        {
                            props: {
                                variant: "contained"
                            },
                            style: {
                                backgroundColor: purple[300],
                                "&:hover": {
                                    backgroundColor: orange[300]
                                },
                                margin: "5px",

                            }
                        },
                        {
                            props: {
                                variant: "outlined"
                            },
                            style: {
                                margin: "5px",
                                border: `1px solid ${purple[300]}`,
                                "&:hover": {
                                    borderColor: orange[300]
                                },
                                color: "white"

                            }
                        }
                        , {
                            props: (props) =>
                                props.variant === 'dashed' && props.color !== 'secondary',
                            style: {
                                textTransform: 'none',
                                border: `2px dashed ${blue[300]}`,
                                margin: "5px",
                                "&:hover": {
                                    borderColor: orange[300]
                                },
                            },

                        },
                    ]
                }
            }
        },
        "MuiTypography": {
            styleOverrides: {
                root: {
                    fontFamily: ["Georgia", "Garamond"],
                    fontSize: "4em",
                    fontWeight: 900,
                    color: "lightcoral"
                }
            }
        }
    }
})

export { lightTheme, darkTheme }