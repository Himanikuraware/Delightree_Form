import React from "react";
import CustomForm from "./components/CustomForm";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <CustomForm />
    </ChakraProvider>
  );
}

export default App;
