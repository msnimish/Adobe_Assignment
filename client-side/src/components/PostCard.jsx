import { Avatar, Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { AiOutlineLike, AiOutlineDislike, AiFillDislike, AiFillLike  } from "react-icons/ai"
import { backend_url } from '../main';

const PostCard = ({data}) => {
    let [isLiked, setIsLiked] = useState(0);
    let [userId , setUserId] = useState("");
    let [likes, setLikes] = useState(data.likes);
    console.log("Hi");
    let token = localStorage.getItem("adobe-token");

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
            <CardFooter m="0px" p="3px" w="90%" display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
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
            </CardFooter>
        </Stack>
    </Card>
  )
}

export default PostCard