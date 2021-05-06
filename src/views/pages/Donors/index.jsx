import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons"
import {
  Box, Flex, Heading, HStack, Image, Input, InputGroup, InputRightElement, Select, Stack, Text, useMediaQuery, Wrap, WrapItem
} from "@chakra-ui/react"
import queryString from "query-string"
import React from 'react'
import { useLocation } from "react-router-dom"
import BloodDrop from '../../../assets/bloodDrop.svg'
import Oxygen from '../../../assets/oxygen.svg'
import PlasmaDrop from '../../../assets/plasmaDrop.svg'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import DataCard from "./DataCard"

let cities = ['Delhi', 'Gurgaon', 'Bangalore', 'Pune', 'Ahmedabad', 'Mumbai', 'Thane', 'Nashik', 'Kolkata', 'Lucknow', 'Noida', 'Faridabad', 'Prayagraj', 'Patna', 'Ranchi', 'Jaipur', 'Agra', 'Chandigarh', 'Nagpur', 'Chennai', 'Bhopal', 'Indore', 'Hyderabad', 'Kerala', 'Bihar', 'Gujarat', 'Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Orissa', 'Uttar Pradesh', 'Telangana', 'Andhra Pradesh', 'Chhatisgarh', 'Tamil Nadu', 'West Bengal', 'Haryana', 'Uttrakhand', 'J&K', 'Himachal Pradesh', 'Jharkhand', 'Rajasthan', 'Goa', 'Assam', 'Punjab', 'Saurashtra & South Gujarat', 'Uttar Pradesh East', 'Uttar Pradesh West', 'Bundelkhand', 'Other']

let bloodgroups = ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+']
let oxygenType = ['Cylinder', 'Refill', "Concentrator "]

const getData = (id) => {
  switch (id) {
    case 'bloodDonor':
      return { name: "Blood Donors", img: BloodDrop }
    case 'plasmaDonor':
      return { name: "Plasma Donors", img: PlasmaDrop }
    case 'oxygenDonor':
      return { name: "Oxygen Donors", img: Oxygen }
  }
}


export default function Donors() {

  const [md] = useMediaQuery("(max-width: 500px)")

  const { search } = useLocation();

  const id = queryString.parse(search).type


  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <NavBar />
      {/* Main Content */}

      <Box mx="auto" my="6" display="flex" flexDirection="column" py="4" px="10" w={{ base: '100vw', md: '90vw' }}
        borderWidth="1px" borderRadius="lg" bgColor="#fff" flex="1" maxH={md ? "" : "80vh"}
      >
        <Wrap justify="space-between" my="4">
          <HStack spacing="4">
            <Image
              src={getData(id).img}
              boxSize="30px"
            />
            <Heading fontSize="xl">{getData(id).name}</Heading>
          </HStack>
          <Stack direction={["column", "row"]} spacing="4">
            <Flex align="center" mb='-2'>
              <HamburgerIcon fontSize="xs" /> &nbsp;&nbsp;
                <Text fontSize="xs">Filter&nbsp;by</Text>
            </Flex>
            <Select variant="filled" placeholder="Search by city">
              {cities.map(item => (
                <option key={item} value="option1">{item}</option>
              ))}
            </Select>

            {id === 'oxygenDonor' ?
              <Select variant="filled" placeholder="Select Type">
                {oxygenType.map(item => (
                  <option key={item} value="option1">{item}</option>
                ))}
              </Select>
              :
              <Select variant="filled" placeholder="Select Blood Group">
                {bloodgroups.map(item => (
                  <option key={item} value="option1">{item}</option>
                ))}
              </Select>
            }

            <InputGroup >
              <Input variant="filled" placeholder="Enter your pin" />
              <InputRightElement children={<Search2Icon />} />
            </InputGroup>

          </Stack>
        </Wrap>
        <Box mt='6' flex="1" overflowY={md ? "hidden" : "auto"} overflowX="hidden">
          <Wrap spacing='10' justify="center">
            {bloodgroups.map(type => (
              <WrapItem key={type}>
                <DataCard />
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  )
}
