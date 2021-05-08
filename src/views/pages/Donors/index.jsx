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

  console.log(filterCity, filterBlood, filterPin);

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
            <Input variant="filled" placeholder="Search by city"
              value={filterCity}
              defaultValue={filterCity}
              onChange={({ target: { value } }) => setFilterCity(value)}
            />

            {id === 'oxygenDonor' ?
              <Select variant="filled" placeholder="Select Type"
                value={filterBlood}
                defaultValue={filterBlood}
                onChange={({ target: { value } }) => setFilterBlood(value)}
              >
                {oxygenType.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </Select>
              :
              <Select variant="filled" placeholder="Select Blood Group"
                value={filterBlood}
                defaultValue={filterBlood}
                onChange={({ target: { value } }) => setFilterBlood(value)}
              >
                {bloodgroups.map(item => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </Select>
            }

            <InputGroup >
              <Input variant="filled" placeholder="Enter your pin"
                value={filterPin}
                onChange={({ target: { value } }) => setFilterPin(value)}
              />
              <InputRightElement children={<Search2Icon />} />
            </InputGroup>

          </Stack>
        </Wrap>
        <Box mt='6' flex="1" overflowY={md ? "hidden" : "auto"} overflowX="hidden">
          <Wrap spacing='10' justify="center">
            {dbData.map(donor => (
              <WrapItem key={donor.phone_number}>
                <DataCard donor={donor} />
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
