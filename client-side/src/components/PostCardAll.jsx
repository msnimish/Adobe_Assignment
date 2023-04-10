import { Avatar, Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Icon, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { AiOutlineLike, AiOutlineDislike, AiFillDislike, AiFillLike  } from "react-icons/ai"
import { backend_url } from '../main';
import UpdateModal from './UpdateModal';

const PostCardAll = ({data}) => {
    let [isLiked, setIsLiked] = useState(0);
    let [userId , setUserId] = useState("");
    const toast = useToast();
    let [likes, setLikes] = useState(data.likes);
    let {isOpen, onOpen, onClose} = useDisclosure();
    console.log("Hi");
    let token = localStorage.getItem("adobe-token");

    const handleUpdate = async ({content}) => {
        try{
            let res = await axios.put(`${backend_url}/posts/${data._id}`, {content}, {headers:{
                authorization: token
            }})
            if(res.status ===200){
                onClose();
            }
            toast({
                position: "top",
                title: res.data.message,
                status: res.data.status,
                duration: 9000,
                isClosable: true,
              });
        }catch(err){
            console.log(err);
        }
    }

    const handleDelete = async () => {
        try{
            let res = await axios.delete(`${backend_url}/posts/${data._id}`, {headers:{
                authorization: token
            }})
            toast({
                position: "top",
                title: res.data.message,
                status: res.data.status,
                duration: 9000,
                isClosable: true,
              });
            
        }catch(err){
            console.log(err);
        }
    }

    const getUserId = async() => {
        try{
            let res =  await axios.get(`${backend_url}/users/getUserId`,{
                headers: {
                    authorization: token
                }
            });
            console.log("userID:"+res.data.details.user_id);
            setUserId(res.data.details.user_id);
        }catch(err){
            console.log(err);
        }
    }

    const handleLike = async() => {
        try{
            let res = await axios.post(`${backend_url}/posts/${data._id}/like`,{},{
                headers:{
                    authorization: token
                }
            })
            if(res.status === 200){
                setIsLiked(1);
                setLikes(prev=>prev+1);
            }
        }catch(err){
            console.log(err);
        }
    }

    const handleDislike = async() => {
        try{
            let res = await axios.post(`${backend_url}/posts/${data._id}/unlike`,{},{
                headers:{
                    authorization: token
                }
            }, {})
            if(res.status === 200){
                setIsLiked(-1);
                setLikes(prev=>prev-1);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getUserId();
    },[])

  return (
    <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
        w="100%"
    >
        <Avatar name={data.user_id.name} bg='red.500' color="white" m="20px"/>
        <Stack w="100%">
            <CardBody>
                <Text fontWeight={"700"} py='2'>{data.user_id.name}</Text>
                <Text size='md'>{data.content}</Text>
            </CardBody>
            <Divider w="90%"/>
            <CardFooter m="0px" p="3px" w="90%" display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Flex justifyContent={"flex-end"} gap="10px">
                    <Button onClick={onOpen} colorScheme='messenger'>Edit</Button>
                    <UpdateModal isOpen={isOpen} onClose={onClose} handleUpdate={handleUpdate} oldPost={data.content}/>
                    <Button onClick={handleDelete} colorScheme='red'>Delete</Button>
                </Flex>
                <Flex justifyContent={"flex-end"} alignItems={"center"}>
                    <Text mr="5px">Likes: {likes}</Text>
                    <Flex justifyContent={"center"} alignItems={"center"} w="50px" h="50px">
                        <Button variant="ghost" onClick={handleLike}>
                            {isLiked===1 ?
                            <Icon as={AiFillLike}w="30px" h="30px" color="red.500"/>
                            : <Icon as={AiOutlineLike} w="30px" h="30px" color="red.500"/>}
                        </Button>
                    </Flex>
                    <Flex justifyContent={"center"} alignItems={"center"} w="50px" h="50px">
                    <Button variant="ghost" onClick={handleDislike} isDisabled={likes===0}>
                            {isLiked===-1 ?
                            <Icon as={AiFillDislike}w="30px" h="30px" color="red.500"/>
                            : <Icon as={AiOutlineDislike} w="30px" h="30px" color="red.500"/>}
                        </Button>
                    </Flex>
                </Flex>
            </CardFooter>
        </Stack>
    </Card>
  )
}

export default PostCardAll