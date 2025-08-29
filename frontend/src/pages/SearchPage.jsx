import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const { fetchProducts, products } = useProductStore();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q"); // ?q=term

  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm);   // directly fetch filtered products
    }
  }, [searchTerm, fetchProducts]);

  return (
    <Container maxW="container.xl" py={4}>
      <VStack spacing={4}>
        

        {products.length === 0 ? (
          <Text fontSize="xl" textAlign="center" fontWeight="bold" color="gray.500">
          Product Not found !
          </Text>
        ) : (
          <>
            <Text
          fontSize="26"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Search Results for "{searchTerm || ""}"
        </Text>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              w="full"
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
          </>
        )}
      </VStack>
    </Container>
  );
};

export default SearchPage;
