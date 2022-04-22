import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Topbar from "./components/Topbar";
import { SWRConfig } from "swr";
import axios from "./configs/axiosConfig";
import AppContextProvider from "./AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Register from "./components/Register";
import SaveNote from "./components/SaveTodo";
import DeleteNote from "./components/DeleteNote";

const fetcher = (...args) => axios.get(...args).then((res) => res.data);
function App() {
  return (
    <ChakraProvider>
      <SWRConfig value={{ fetcher }}>
        <AppContextProvider>
          <BrowserRouter>
            <Topbar />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/add-todo" element={<SaveNote />} />
              <Route path="/delete-todo" element={<DeleteNote />} />
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default App;
