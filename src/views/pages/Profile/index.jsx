import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons"
import { Box, Collapse, Divider, Flex, Heading, HStack, Image, Input, InputGroup, InputRightElement, Select, Stack, Text, useMediaQuery, Wrap, WrapItem } from "@chakra-ui/react"
import queryString from "query-string"
import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"

import BloodDrop from '../../../assets/bloodDrop.svg'
import Oxygen from '../../../assets/oxygen.svg'
import PlasmaDrop from '../../../assets/plasmaDrop.svg'
import { db } from "../../../firebase"
import { citiesAndStates, bloodgroups } from "../../../utils/citiesAndState"
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'

export default function Profile() {
  const [md] = useMediaQuery("(max-width: 500px)")

  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <NavBar />
      {/* Main Content */}
      <Flex direction="column" flex="1">
        <Box display="flex" flexDirection="column"
          py="4" px="10" mx="auto" my="6" flex="1"
          w={{ base: '99vw', md: '90vw' }} maxH={md ? "" : "80vh"}
          borderWidth="1px" borderRadius="lg" bgColor="#fff"
        >
          <Box mt='6' px="2" flex="1"
            overflowY={md ? "hidden" : "auto"} overflowX="hidden"
            className="custom-scroll"
          >
          </Box>
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  )
}
