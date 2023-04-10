
import {
    Flex,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Stack,
    Box,
    FormLabel,
    Input,
    InputLeftElement,
    InputGroup,
    InputRightElement,
    useToast,
    Text,
    Textarea
  } from "@chakra-ui/react";
  import axios from "axios";
  import React, { useState } from "react";
  import { BiHide, BiShow } from "react-icons/bi";
  import { MdOutlineEmail } from "react-icons/md";
  import { AiOutlineUser } from "react-icons/ai";
  import { RiLockPasswordLine } from "react-icons/ri";
  import { backend_url } from "../main";

export let SideDrawer = ({isOpen, onClose}) => {
    const postMaxLength = 200;
    const toast = useToast();
    const [show, setShow] = useState();
    const firstField = React.useRef();
    let [userData, setUserData] = useState({});
    let url = `${backend_url}/users/`;
  
    let handleChange = (ev) => {
      let {name, value} = ev.target;
      setUserData({...userData, [name]:value})
    }
  
    let handleShow = () => {
      setShow(!show);
    }
  
    let postData = async() => {
      if(userData.password.length < 8){
        toast({
          position: "top",
          description: "Minimum 8 characters required",
          status: "warning",
          duration: 9000,
          isClosable: true
        })
      }else{
        let res = await axios.post(url, userData);
        console.log(res);
        toast({
          position: "top",
          description: res.data.message,
          status: res.data.status,
          duration: 9000,
          isClosable: true
        })
        if(res.data.status==="success"){
          onClose();
        }
      }
      
    }
    
    let handleSubmit = async (ev) =>{
      ev.preventDefault();
      console.log(userData);
        postData();
    }
  
    return (
        <Drawer
        isOpen={isOpen}
        placement='right'
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <form>
              <Stack spacing='24px'>
                <Box>
                  <FormLabel>Name</FormLabel>
                  <InputGroup>
                    <InputLeftElement 
                    color="red.600"
                    children={<AiOutlineUser/>}
                    />  
                    <Input colorScheme="red" type="email" placeholder={"Enter your name"} name="name" ref={firstField} onChange={handleChange}/>
                    
                </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement 
                    color="red.600"
                    children={<MdOutlineEmail/>}
                    />  
                    <Input colorScheme="red" type="email" placeholder={"Enter your email address"} name="email" onChange={handleChange}/>
                </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size='md'>
                    <InputLeftElement
                        color="red.600"
                        children={<RiLockPasswordLine/>}
                        /> 
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Minimum 8 characters'
                        name="password"
                        onChange={handleChange}
                    />
                    <InputRightElement>
                        <Button  size='2xl' onClick={handleShow} colorScheme="red" variant={"ghost"}>
                        {show ? <BiShow/>: <BiHide/>}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                </Box>
                <Box>
                  <FormLabel>Bio</FormLabel>
                  <InputGroup >
                    <Textarea
                        maxLength={postMaxLength}
                        name="bio"
                        onChange={handleChange}
                        placeholder=" Write here..."
                        size="sm"
                    />
                </InputGroup>
                <Flex justifyContent={"flex-end"}>
                        <Text fontSize="12px">{`${userData.bio ? userData.bio.length:0}/${postMaxLength}`}</Text>
                    </Flex>
                </Box>

              </Stack>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='red' onClick={handleSubmit} >Register</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
}