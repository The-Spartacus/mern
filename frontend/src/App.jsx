import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route,Routes } from "react-router-dom";

import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useProductStore } from "./store/product";
import SearchPage from "./pages/SearchPage";

function App(){
  const { products }=useProductStore()

return (
      <Box minH={"100vh"} bg={useColorModeValue("gray.100" , "gray.900")}>
        <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </Box>
  );
}

export default App;
