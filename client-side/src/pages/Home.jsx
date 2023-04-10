import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { backend_url } from "../main";
import PostCard from "../components/PostCard";
import Notice from "../components/Notice";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState("");
  const postMaxLength = 300;
  const toast = useToast();
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("adobe-token");
  const initialRef = React.useRef(null);
  const [isAdmin,setIsAdmin] = useState(localStorage.getItem('adobe-isAdmin'));

  const getData = async () => {
    try {
      let res = await axios.get(`${backend_url}/posts/allPosts`);
      // console.log(res.data);
      setPosts(res.data.details);
      setIsAdmin(isAdmin);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setContent(inputValue);
  };

  let handlePost = async () => {
    try {
      let res = await axios.post(
        `${backend_url}/posts/`,
        { content },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (res.data.status === "success") {
        onClose();
      }
      toast({
        position: "top",
        title: res.data.message,
        status: res.data.status,
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
        {isAdmin===false?<Notice/>:<></>}
      <Navbar />
      <Flex w="40%" m="auto" gap="20px" mt="20px" justifyContent={"flex-end"}>
        <Button colorScheme="red" p="10px 30px" onClick={onOpen}>
          + Create Post
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} h="100vh" initialFocusRef={initialRef}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create A Post</ModalHeader>
            <ModalCloseButton size={"sm"} />
            <ModalBody>
              <Textarea
                maxLength={postMaxLength}
                value={content}
                ref={initialRef}
                onChange={handleInputChange}
                placeholder=" Write here..."
                size="sm"
              />
              <Flex justifyContent={"flex-end"}>
                <Text fontSize="12px">{`${content.length}/${postMaxLength}`}</Text>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" size={"sm"} mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="red" size={"sm"} onClick={handlePost}>
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex w="40%" m="auto" gap="20px" mt="20px" flexDirection={"column"}>
        {posts.map((post) => (
          <PostCard key={post._id} data={post} />
        ))}
      </Flex>
    </>
  );
};

export default Home;
