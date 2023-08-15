import { Route, Routes } from "react-router-dom";

import AppContextProvider from "./context/Context";
import TemplateEditor from "./components/template-editor/TemplateEditor";
import PageNotFound from "./components/page-not-found/PageNotFound";
import Home from "./components/home/Home";

function App() {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/template" element={<TemplateEditor />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AppContextProvider>
  );
}

export default App;
