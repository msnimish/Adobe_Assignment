import { Button, Flex, HStack, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('adobe-isAdmin');
    console.log("isAdmin: "+isAdmin)

    const handleLogout = () => {
        localStorage.removeItem('adobe-token');
        localStorage.removeItem('adobe-isAdmin');
        navigate("/");
    }
  return (
    <Flex w="100vw"  bgColor={"red.600"}>
        <Flex w="70%" m="auto" p="10px 0px" justifyContent={"space-between"}>
            <Heading color={"white"}><Link to={"/home"}>AdobedIn</Link></Heading>
            <HStack spacing={10} color={"white"}>
                <Text><Link to="/home">Home</Link></Text>
                <Text><Link to="/myPosts">My Posts</Link></Text>
                { isAdmin===true ?
                <Text><Link to="/analytics">Analytics</Link></Text>:<></>
                }
                <Text><Link to="/profile">Profile</Link></Text>
                <Button colorScheme="blackAlpha" variant="solid" onClick={handleLogout} >Logout</Button>
            </HStack>
        </Flex>
    </Flex>
  )
}

export default Navbar