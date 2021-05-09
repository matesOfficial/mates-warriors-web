import {
  Box, Center, Text
} from "@chakra-ui/react"
import React from 'react'

export default function Footer() {


  return (
    <>
      <Box bg="yellow.100" width="100%" p="3" >
        <Center>
          <Text fontSize='xs' isTruncated>
            Copyright &copy; <b>Maharaja Agrasen Technical Society 2021</b>
          </Text>
        </Center>
      </Box>
    </>
  )
}
