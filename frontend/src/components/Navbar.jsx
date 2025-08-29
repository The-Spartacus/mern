import { Container, Flex, Button, HStack, Text, useColorMode, Input } from "@chakra-ui/react";
import { PlusSquareIcon, MoonIcon    } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom"; // ✅ add useNavigate
import { LuSun } from "react-icons/lu";
import { useProductStore } from "../store/product";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement } from "@chakra-ui/react";




const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { products }=useProductStore()
  const [searchTerm, setSearchTerm] = useState(""); // ✅ add state
  
 
  const { fetchProducts } = useProductStore(); // ✅ use store
  const navigate = useNavigate(); // ✅ hook for navigation


  
  const handleSearch = () => {
    fetchProducts(searchTerm);
    navigate(`/search?q=${searchTerm}`);  

  };
  return (
  <Container maxW={"100%"} px={4}  mb={4} shadow={"lg"} >
      <Flex h={16}
            alignItems={"center"} 
            justifyContent={"space-between"} 
            flexDir={{ 
              base: "column",
              sm: "row", }}
      >
<Text
  as={Link}
  to="/"
  fontFamily="heading"
  fontSize={{ base: "30px", sm: "40px" }}
  fontWeight="extrabold"
  letterSpacing="6px"
  textTransform="uppercase"
  bgGradient="linear(to-r, #FF0080, #7928CA, #2C5282)"
  bgClip="text"
  textAlign="center"
  transition="all 0.9s ease"
  _hover={{  letterSpacing: "6.5px",
    bgGradient: "linear(to-r, #7928CA, #FF0080, #2C5282)",
    boxShadow: "md"
   }}
  
>
  ✦ E Mart
</Text>

<InputGroup
  maxW={{ base: "100%", sm: "300px", md: "400px" }}
  borderRadius="full"
  boxShadow={"md"}
  bg={colorMode === "light" ? "gray.100" : "gray.700"}
  _hover={{ boxShadow: "lg" }}
>
  
  <InputLeftElement pointerEvents="none">
    <SearchIcon color="gray.400" />
  </InputLeftElement>
  <Input
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
    border="none"
    focusBorderColor="teal.400"
    borderRadius="full"
    bg="transparent"
    _placeholder={{ color: "gray.400", fontStyle: "italic" }}
  />
</InputGroup>

          <HStack spacing={2} alignItems={"center"} justifyContent={"space-evenly"} mt={{ base: 2, sm: 0 }}>
            <Link to={"/"} py={2}>
              <Button leftIcon={<FaHome/>} ><text px={4}>Home</text>
              </Button>
            </Link>
            
            <Link to={"/create"}>
              <Button colorScheme="blue" leftIcon={<PlusSquareIcon />} py={2}>
                
                <text> Add Product</text>
              </Button>
            </Link>
            
            <Button onClick={toggleColorMode}>{colorMode === "light" ? <MoonIcon/> : <LuSun/> }</Button>
          </HStack>
      </Flex>
  </Container>
  );
};

export default Navbar;