import{useState} from 'react';
import { Box, Container, Heading, useColorModeValue, VStack } from '@chakra-ui/react';



const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      alert("Please fill all fields");
      return;
    }
    const product = {
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      image: newProduct.image,
    };
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product added successfully:", data);
        setNewProduct({ name: "", price: "", image: "" });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again.");
      });
  };
  

  return (<Container maxW={"container.sm"}>
    <VStack Spacing={8}>
      <Heading as={"h1"} 
        size={"2x1"} 
        textAlign={"center"} 
        mb={8}>
          Create Product
      </Heading>
        <Box w={"full"} bg={useColorModeValue("white","gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
              <input 
                name='name' 
                value={newProduct.name}
                placeholder='Enter product name'
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} 
              />
              <input 
                name='price' 
                value={newProduct.price}
                placeholder='Enter product price' 
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <input 
                name='image' 
                value={newProduct.image}
                placeholder='Enter product image URL'
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />

              <button colorScheme='blue'
                onClick={handleAddProduct} w='full'>add product</button>
           
          
          </VStack>
        </Box>
      
    </VStack>
    </Container>);
}

export default CreatePage;