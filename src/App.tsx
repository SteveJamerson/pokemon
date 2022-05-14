import { Helmet } from "react-helmet";
import { ThemeProvider, useTheme } from "./contexts/Theme";

const App = (): JSX.Element => {
   const { theme } = useTheme();
   return (
      <>
         <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
               rel="preconnect"
               href="https://fonts.gstatic.com"
               crossOrigin=""
            />
            <link
               href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;600;700;800;900&display=swap"
               rel="stylesheet"
            />
            <meta name="color-scheme" content={theme} />
            <meta name="theme-color" content="#1f5eff" />
            <title>Project</title>
         </Helmet>
         <ThemeProvider></ThemeProvider>
      </>
   );
};

export default App;
