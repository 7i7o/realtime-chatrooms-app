import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
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
}


const theme = extendTheme({ config, styles,fonts });

export default theme;
