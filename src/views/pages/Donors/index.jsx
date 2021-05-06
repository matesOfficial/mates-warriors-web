import { HamburgerIcon, Search2Icon, ArrowBackIcon } from "@chakra-ui/icons"
import {
  Box, Flex, Heading, HStack, Image, Input, InputGroup, InputRightElement, Select, Stack, Text, useMediaQuery, Wrap, WrapItem, Button, Tooltip
} from "@chakra-ui/react"
import queryString from "query-string"
import React, {useState} from 'react'
import { useLocation } from "react-router-dom"
import BloodDrop from '../../../assets/bloodDrop.svg'
import Oxygen from '../../../assets/oxygen.svg'
import PlasmaDrop from '../../../assets/plasmaDrop.svg'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import DataCard from "./DataCard"
import { Link } from 'react-router-dom'
import {citiesAndStates} from '../../../citiesAndStates.js';

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

  const [state,setState] = useState('');
  const [specificFilter,setSpecificFilter] = useState('');
  const [pinCode,setPinCode] = useState('');

  function isDonorRelevant(donor) {
    // We'll check here is donor matches filters and search of user
    return true;
  }

  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <NavBar />
      {/* Main Content */}

      <Box mx="auto" my="6" display="flex" flexDirection="column" py="4" px="10" w={{ base: '100vw', md: '90vw' }}
        borderWidth="1px" borderRadius="lg" bgColor="#fff" flex="1" maxH={md ? "" : "80vh"}
      >
        <Wrap justify="space-between" my="4">
          <HStack spacing="14" >
            <Tooltip label="Go Back" display={{base:'none',xl:'inherit'}}>
              <Button 
                display={{base:'none',xl:'inherit'}}
                as={Link}
                to={`/`}
                boxShadow="md" leftIcon={<ArrowBackIcon display={{base:'none',xl:'inherit'}} ml={2} w={7} h={7} color="#fff" strokeWidth='0.1px' stroke="#000" />} colorScheme="yellow" borderRadius="100px" width="2vw" >
              </Button>
            </Tooltip>
            <HStack spacing="4" >
              <Image
                src={getData(id).img}
                boxSize="30px"
              />
              <Heading fontSize="xl">{getData(id).name}</Heading>
            </HStack>
          </HStack>
          <Stack direction={["column", "row"]} spacing="4">
            <Flex align="center" mb='-2'>
              <HamburgerIcon fontSize="xs" /> &nbsp;&nbsp;
                <Text fontSize="xs">Filter&nbsp;by</Text>
            </Flex>

            <Select variant="filled" placeholder="State" onChange={(e) => setState(e.target.value)} >
              {Object.keys(citiesAndStates).map(item => (
                <option key={item} value="option1">{item}</option>
              ))}
            </Select>

            
            <Select variant="filled" placeholder={(id === 'oxygenDonor')?"Type":"Blood Group"} onChange={(e) => setSpecificFilter(e.target.value)} >
                {((id === 'oxygenDonor')?oxygenType:bloodgroups).map(item => (
                  <option key={item} value="option1">{item}</option>
                ))}
              </Select>

            <InputGroup >
              <Input variant="filled" placeholder="Enter your pin" onChange={(e) => setPinCode(e.target.value)} />
              <InputRightElement children={<Search2Icon />} />
            </InputGroup>

          </Stack>
        </Wrap>
        <Box mt='6' flex="1" overflowY={md ? "hidden" : "auto"} overflowX="hidden">
          <Wrap spacing='10' justify="center">
            {bloodgroups.map(donor => (
              ( isDonorRelevant(donor) ) ?
              <WrapItem key={donor.uid}>
                <DataCard donor={donor} />
              </WrapItem>
              :
              <></>
            ))}
          </Wrap>
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Flex>
  )
}
