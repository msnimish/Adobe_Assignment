import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Card, CardHeader, CardBody, CardFooter, Image, Avatar, Stack, Heading, Text, Divider, ButtonGroup, Button, Flex, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { backend_url } from '../main';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const isAdmin=localStorage.getItem('adobe-isAdmin');
    const [data, setData]= useState({});
    const toast = useToast();
    const navigate = useNavigate();
    // const [userId, setUserId]=useState("");
    const token = localStorage.getItem('adobe-token');

    const getData = async () => {
        try{
            let res = await axios.get(`${backend_url}/users/getUserId`,{
                headers:{
                    authorization: token
                }
            });
            // console.log(res.data.details);
            // setUserId(res.data.details.user_id);
            await getUser(res.data.details.user_id)
        }catch(e){
            console.log(e);
        }
    }

    const getUser = async(userId) =>{
        try{
            if(userId!==""){
                let response = await axios.get(`${backend_url}/users/${userId}`)
                console.log(response);
                setData(response.data.details);
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleDelete = async() =>{
        try{
            let res = await axios.delete(`${backend_url}/users/${data._id}`);
            let response = await axios.delete(`${backend_url}/posts/deleteMyPosts`,{
                headers:{
                    authorization: token
                }
            });
            if(response.status==200){
                toast({
                    position: "top",
                    title: res.data.message,
                    status: res.data.status,
                    duration: 9000,
                    isClosable: true,
                  });
                  navigate("/");
            }

        }
        catch(err){
            console.log(err);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adobe-token');
        localStorage.removeItem('adobe-isAdmin');
        navigate("/");
    }

    useEffect(()=>{
        getData();
    },[])
  return (
    <>
        <Navbar/>
        <Flex w="70%" m="auto" mt="50px">
            <Card w="50%" m="auto" textAlign={"center"}>
                <CardBody>
                    <Avatar name={data?.name} bg='red.500' color="white" m="20px" size="2xl"/>
                    <Stack mt='6' spacing='3'>
                    <Heading size='md'>{data?.name}</Heading>
                    <Text>
                        {data?.bio}
                    </Text>
                    <Text>Do you have admin access? {data?.isAdmin==true?"🟢 Yes": "🔴 No"}</Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter textAlign={"center"} m="auto" w="40%">
                    <ButtonGroup spacing='2' display={"flex"} justifyContent={"flex-end"}>
                    <Button variant='solid' colorScheme='red' onClick={handleDelete}>
                        Delete Account
                    </Button>
                    <Button variant='ghost' colorScheme='red' onClick={handleLogout}>
                        Logout
                    </Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </Flex>
    </>
  )
}

export default Profile