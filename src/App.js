import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Topbar from './screens/global/Topbar';
import Dashboard from "./screens/dashboard";
import Sidebar from './screens/global/Sidebar';
import TapShap from './screens/tapShap';
import TestPage from "./screens/testpg";


function App() {
const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tapShap" element={<TapShap />} />
              <Route path="/testpg" element={<TestPage/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
