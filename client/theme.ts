import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    100: "#eb9b8f",
    200: "#e99184",
    300: "#e78678",
    400: "#e57a6b",
    500: "#e26d5c",
    600: "#cd6354",
    700: "#ba5a4c",
    800: "#a95245",
    900: "#9A4B3F",
  },
  brandOld: {
    100: "#C4F550",
    200: "#BEF43E",
    300: "#B7F32B",
    400: "#A3DE31",
    500: "#8FC837",
    600: "#7BB23D",
    700: "#669C42",
    800: "#5D8E3C",
    900: "#558137",
  },
};

const styles = {
  global: {
    html: {
      width: "100%",
    },
    body: {
      width: "100%",
    },
  },
};

const fonts = {
  body: "'Ubuntu', 'Inter', 'Open Sans', system-ui, sans-serif",
  heading: "'Ubuntu', 'Inter', 'Open Sans', system-ui, sans-serif",
  mono: "Menlo, monospace",
};

const theme = extendTheme({ config, colors, styles, fonts });

export default theme;
