import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const { deleteProduct, updateProduct } = useProductStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	// Delete confirmation modal
	const {isOpen: isDeleteOpen,onOpen: onDeleteOpen,onClose: onDeleteClose,} = useDisclosure();
	


	const handleDeleteProduct = async (pid) => {
		const { success, message } = await deleteProduct(pid);
		onDeleteClose(); // close modal after action
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Deleted",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton icon={<DeleteIcon />} onClick={onDeleteOpen} colorScheme="red" />

				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Product</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
						<Modal isOpen={isDeleteOpen} onClose={onDeleteClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirm Delete</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text>
							Are you sure you want to delete <b>{product.name}</b>? This action cannot be undone.
						</Text>
					</ModalBody>
					<ModalFooter>
						<Button variant="ghost" onClick={onDeleteClose}>
							Cancel
						</Button>
						<Button colorScheme="red" mr={3} onClick={() => handleDeleteProduct(product._id)}>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};
export default ProductCard;