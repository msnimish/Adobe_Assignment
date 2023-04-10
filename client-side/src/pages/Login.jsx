import {
    Flex,
    Heading,
    Button,
    useDisclosure,
    Text
  } from "@chakra-ui/react";
  import React from "react";
  import Form from "../components/Form";
  import { backend_url } from "../main";
  import { SideDrawer } from "../components/SideDrawer";

  
  
  const Login = () => {


    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
      <Flex w="100vw" margin="0 auto" bg="red.200" h="100vh">
        <Flex
          w="400px"
          m="auto"
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems="center"
          bg="white"
          p="40px 10px"
          borderRadius={"15px"}
        >
          {/* <Image src="./logo.png" w="100px" mb="20px" /> */}
          <Heading size="xl" textAlign={"center"}>
            Welcome to <br></br><span style={{ color: "#E53E3E" }}>AdobedIn</span>
          </Heading>
          <Form url={`${backend_url}/users/login`} title="Login" />
          <Button colorScheme='red' size="sm"mt="10px" onClick={onOpen} variant="ghost">
            Don't have an account? Register!
          </Button>
          <Flex flexDir={"column"} textAlign={"center"} mt="20px">
            <Heading fontSize={"12px"} mb="10px">NOTE: Use Dummy Admin Credentials<br/> for seamless experience</Heading>
            <Text fontSize={"12px"}><b>email:</b> admin@adobe.com</Text>
            <Text fontSize={"12px"}><b>password:</b> AdobeAdmin@123</Text>
          </Flex>
          <SideDrawer isOpen={isOpen} onClose={onClose}/>
        </Flex>
      </Flex>
    );
  };
  
  export default Login;

  
  