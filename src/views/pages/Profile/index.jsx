import { ChevronDownIcon } from "@chakra-ui/icons"
import { Avatar, Box, Flex, Text, useMediaQuery } from "@chakra-ui/react"
import React from 'react'
import { useAuth } from "../../../hooks/AuthContext"
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'


export default function Profile() {
  const { curUser, logout } = useAuth();

  const [md] = useMediaQuery("(max-width: 500px)")

  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <NavBar />
      {/* Main Content */}
      <Flex direction="column" flex="1">
        <Box d="flex" flexDirection="column"
          py="4" px="10" mx="auto" my="6" flex="1"
          w={{ base: '99vw', md: '90vw' }} maxH={md ? "" : "80vh"}
          borderWidth="1px" borderRadius="lg" bgColor="#fff"
        >
          <Box mt='6' px="2" flex="1"
            overflowY={md ? "hidden" : "auto"} overflowX="hidden"
            className="custom-scroll"
          >
            <Avatar size="2xl" name="Segun Adebayo" />
            <br />
            <br />
            <Text fontSize="2xl">{curUser.phoneNumber}</Text>
            <br />
            <Box d="flex" alignItems="center" justifyContent="space-between"
              bg="gray.200" w="100%" p={4} borderRadius="md"
            >
              <Text fontSize="xl"> Donor History </Text>
              <ChevronDownIcon />
            </Box>
            <Text fontSize="md" align="center" p={5}>No Donor History</Text>
          </Box>
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  )
}
