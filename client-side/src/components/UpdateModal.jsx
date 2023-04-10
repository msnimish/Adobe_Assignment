import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'

const UpdateModal = ({isOpen, onClose, handleUpdate, oldPost}) => {
    const [content, setContent] = useState(oldPost);
    const postMaxLength = 300;
    const handleInputChange = (ev) => {
        setContent(ev.target.value);
    }
    const initialRef = useRef(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} h="100vh" initialFocusRef={initialRef}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update the Post</ModalHeader>
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
              <Button colorScheme="red" size={"sm"} onClick={()=>handleUpdate({content})}>
                Update Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  )
}

export default UpdateModal