import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Notice = () => {
  return (
    <Flex w="100vw" bg="blackAlpha.900" color="white" justifyContent={"center"}>
        <Text fontSize={"12px"}p="5px">For Seamless Experience use Dummy Admin Credentials. 📧 email: admin@adobe.com, 🔑 password: AdobeAdmin@123</Text>
    </Flex>
  )
}

export default Notice