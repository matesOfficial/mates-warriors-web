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
import DataCard from "./DataCard"

// let cities = ['New Delhi', 'Delhi', 'Gurgaon', 'Bangalore', 'Pune', 'Ahmedabad', 'Mumbai', 'Thane', 'Nashik', 'Kolkata', 'Lucknow', 'Noida', 'Faridabad', 'Prayagraj', 'Patna', 'Ranchi', 'Jaipur', 'Agra', 'Chandigarh', 'Nagpur', 'Chennai', 'Bhopal', 'Indore', 'Hyderabad', 'Kerala', 'Bihar', 'Gujarat', 'Maharashtra', 'Karnataka', 'Madhya Pradesh', 'Orissa', 'Uttar Pradesh', 'Telangana', 'Andhra Pradesh', 'Chhatisgarh', 'Tamil Nadu', 'West Bengal', 'Haryana', 'Uttrakhand', 'J&K', 'Himachal Pradesh', 'Jharkhand', 'Rajasthan', 'Goa', 'Assam', 'Punjab', 'Saurashtra & South Gujarat', 'Uttar Pradesh East', 'Uttar Pradesh West', 'Bundelkhand', 'Other']

let oxygenType = ['Cylinder', 'Refill', "Concentrator "]

const getData = (id) => {
  switch (id) {
    case 'bloodDonor':
      return { name: "Blood Donors", img: BloodDrop }
    case 'plasmaDonor':
      return { name: "Plasma Donors", img: PlasmaDrop }
    case 'oxygenDonor':
      return { name: "Oxygen Donors", img: Oxygen }
    default:
      return { name: "Blood Donors", img: BloodDrop }
  }
}


export default function Donors() {

  const [dbData, setDbData] = useState([])
  const [filterCity, setFilterCity] = useState('');
  const [filterBlood, setFilterBlood] = useState('');
  const [filterPin, setFilterPin] = useState('');


  const [md] = useMediaQuery("(max-width: 500px)")

  const { search } = useLocation();

  const id = queryString.parse(search).type

  const mapQuery = { bloodDonor: "is_blood_donor", plasmaDonor: "is_plasma_donor" }

  const getFirebaseData = async () => {
    const snapshot = await db.collection('users').where(`${mapQuery[id]}`, "==", true).get()
    return snapshot.docs.map(doc => doc.data());
  }

  useEffect(() => {
    getFirebaseData().then((data) => {
      setDbData(data.filter((d) => {
        let city = d.city.toLowerCase().search(filterCity.toLowerCase()) !== -1
        let state = d.state.toLowerCase().search(filterCity.toLowerCase()) !== -1
        let blood = d.blood_group === filterBlood
        let pin = d.pin_code.search(filterPin) !== -1

        if (!filterCity) city = true
        if (!filterBlood) blood = true
        if (!filterPin) pin = true

        return (city || state) && blood && pin
      }));
    })
  }, [filterCity, filterBlood, filterPin])


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
          <Stack direction={["column", "row"]}
            justify="space-between" my="4" spacing="4"
          >
            <HStack spacing="4">
              <Image
                src={getData(id).img}
                boxSize="30px"
              />
              <Heading fontSize="2xl">{getData(id).name}</Heading>
            </HStack>
            <Stack direction={["column", "row"]} spacing="4" >
              <Flex align="center" mb='-2'>
                <HamburgerIcon fontSize="xs" /> &nbsp;&nbsp;
                <Text fontSize="xs">Filter&nbsp;by</Text>
              </Flex>
              <InputGroup flex="1">
                <Input variant="filled"
                  placeholder="Search by city/state"
                  value={filterCity}
                  defaultValue={filterCity}
                  onChange={({ target: { value } }) => setFilterCity(value)}
                />
                <InputRightElement children={<Search2Icon />} />
              </InputGroup>

              {id === 'oxygenDonor' ?
                <Select variant="filled" placeholder="Select Type" flex="1"
                  value={filterBlood}
                  defaultValue={filterBlood}
                  onChange={({ target: { value } }) => setFilterBlood(value)}
                >
                  {oxygenType.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </Select>
                :
                <Select variant="filled" placeholder="Select Blood Group" flex="1"
                  value={filterBlood}
                  defaultValue={filterBlood}
                  onChange={({ target: { value } }) => setFilterBlood(value)}
                >
                  {bloodgroups.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </Select>
              }

              <InputGroup flex="1">
                <Input variant="filled" placeholder="Enter your pin"
                  value={filterPin}
                  onChange={({ target: { value } }) => setFilterPin(value)}
                />
                <InputRightElement children={<Search2Icon />} />
              </InputGroup>
            </Stack>
          </Stack>

          <Box mt='6' px="2" flex="1"
            overflowY={md ? "hidden" : "auto"} overflowX="hidden"
            className="custom-scroll"
          >
            <Wrap spacing='10' justify={{ base: "center", md: "start" }}>
              {dbData.map(donor => (
                <WrapItem key={donor.phone_number}
                  flex="1" minW="15rem" maxW="25rem"
                >
                  <DataCard donor={donor} />
                </WrapItem>
              ))}
              {dbData.map(donor => (
                <WrapItem key={donor.phone_number}
                  flex="1" minW="15rem" maxW="25rem"
                >
                  <DataCard donor={donor} />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        </Box>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  )
}
