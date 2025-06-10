import { Container, Flex, Button, HStack, Text, useColorMode } from "@chakra-ui/react";
import { PlusSquareIcon, MoonIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
  <Container maxW={"1140px"} px={4}>
      <Flex h={16}
            alignItems={"center"} 
            justifyContent={"space-between"} 
            flexDir={{ 
              base: "column",
              sm: "row", }}
      >
        <Text
          bgGradient={'linear(to-l, #7928CA, #FF0080)'}
          bgClip={'text'}
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={'bold'}
          textAlign={"center"}
          textTransform={"uppercase"}
          >
            <Link to={"/"}>Raghavan Store</Link>
          </Text>
          <HStack spacing={2} alignItems={"center"}>
            <Link to={"/create"}>
              <Button>
                <PlusSquareIcon/>
              </Button>
            </Link>
            <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon/> : <LuSun/> }</Button>
          </HStack>
      </Flex>
  </Container>
  );
};

export default Navbar;