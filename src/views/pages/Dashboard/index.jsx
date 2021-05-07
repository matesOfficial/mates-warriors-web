import { Button } from '@chakra-ui/button'
import { ArrowForwardIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import { Avatar, Box, Collapse, Divider, Flex, Heading, HStack, Text, Tooltip, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import BloodDrop from '../../../assets/bloodDrop.svg'
import Doctor from '../../../assets/doctor.svg'
import FAQ from '../../../assets/faq.svg'
import DonorLogo from '../../../assets/Icons/health-care.svg'
import TakerLogo from '../../../assets/Icons/organ-donation.svg'
import Organ from '../../../assets/organ.svg'
import Oxygen from '../../../assets/oxygen.svg'
import PlasmaDrop from '../../../assets/plasmaDrop.svg'
import { useAuth } from '../../../store/AuthContext'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import FormModals from './Modals'

const DonorLayer = {
  'bloodDonor': { name: 'Blood', image: BloodDrop, disabled: false },
  'plasmaDonor': { name: 'Plasma', image: PlasmaDrop, disabled: false },
  'oxygenDonor': { name: 'Oxygen', image: Oxygen, disabled: true },
  'consultancy': { name: 'Consultancy', image: Doctor, disabled: true },
  'organDonor': { name: 'Organ', image: Organ, disabled: true },
}

const recentDonors = [
  {
    'type': 'Plasma',
    'attributes': {
      'Name': 'Shubh Bansal',
      'Phone No.': '9717593233',
      'Blood Group': 'B+',
      'State': 'Delhi',
    }
  },
  {
    'type': 'Blood',
    'attributes': {
      'Name': 'Simran Singh',
      'Phone No.': '8291834211',
      'Blood Group': 'Philips',
      'State': 'Delhi',
    }
  },
  {
    'type': 'Blood',
    'attributes': {
      'Name': 'Vikas Gupta',
      'Phone No.': '9212528520',
      'Blood Group': 'B+',
      'State': 'Delhi',
    }
  },
  {
    'type': 'Plasma',
    'attributes': {
      'Name': 'Atishay Jain',
      'Phone No.': '9911789351',
      'Blood Group': 'AB-',
      'State': 'Delhi',
    }
  },
]

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(null);
  const [isDonor, setIsDonor] = useState(false);

  const closeModal = () => { setOpenModal(null) };

  return (
    <Flex direction="column" minH="100vh">
      {/* NAVBAR */}
      <FormModals
        open={!!openModal}
        onClose={closeModal}
        id={openModal}
      />
      <NavBar />
      {/* MAIN DASHBOARD */}

      <Box position="absolute" bottom="8" right="8" >
        <Tooltip label="FAQ" >
          <Avatar size="md" m="1"
            as={Link}
            to="/"
            showBorder="true"
            src={FAQ}
          />
        </Tooltip>
      </Box>

      <Box mx="auto" my="8" flex="1" >
        <Box p="6" w={{ base: '100vw', md: '90vw' }} borderWidth="1px" borderRadius="lg" bgColor="#fff" >
          <Flex flexDirection='column'>
            <Button style={{ display: 'flex', justifyContent: 'space-between' }}
              size="lg"
              isFullWidth
              rightIcon={isDonor ? <ChevronUpIcon boxSize="1.5em" /> : <ChevronDownIcon boxSize="1.5em" />}
              onClick={() => setIsDonor(p => !p)}
            >
              <HStack spacing="5">
                <Image boxSize="1.5rem" src={DonorLogo} />
                <Heading size="md" flex="1"
                  color={!isDonor ? "grey" : 'default'}
                >
                  Become a Donor
                </Heading>
              </HStack>
            </Button>
            <Collapse in={isDonor}>
              <Box my='6' mx='2'>
                <Wrap spacing='10'>
                  {Object.keys(DonorLayer).map(type => (
                    <Tooltip key={type} isDisabled={!DonorLayer[type].disabled}
                      label="Coming Soon" fontSize="md"
                    >
                      <WrapItem>
                        <Button onClick={() => setOpenModal(type)}
                          isDisabled={DonorLayer[type].disabled}
                          variant="outline"
                          _focus={{ borderColor: "var(--chakra-colors-yellow-400)" }}
                          borderWidth='2px' borderColor='rgba(238, 238, 238, 1)'
                          p='12px' height='150px' width='150px'
                        >
                          <VStack spacing={4} >
                            <Image
                              src={DonorLayer[type].image}
                              height={{ base: '10vh', md: '10vh', lg: '6vh', xl: '10vh' }}
                            />
                            <Text>{DonorLayer[type].name}</Text>
                          </VStack>
                        </Button>
                      </WrapItem>
                    </Tooltip>
                  ))}
                </Wrap>
              </Box>
            </Collapse>

            <Divider width='85vw' my="4" align='center' mx="auto" />

            <Button style={{ display: 'flex', justifyContent: 'space-between' }}
              size="lg"
              isFullWidth
              rightIcon={!isDonor ? <ChevronUpIcon boxSize="1.5em" /> : <ChevronDownIcon boxSize="1.5em" />}
              onClick={() => setIsDonor(p => !p)}
            >
              <HStack spacing="5">
                <Image boxSize="1.5rem" src={TakerLogo} />
                <Heading size="md" flex="1"
                  color={isDonor ? "grey" : 'default'}
                >
                  Looking for Donor
                </Heading>
              </HStack>
            </Button>
            <Collapse in={!isDonor}>
              <Box my='6' mx='2'>
                <Wrap spacing='10'>
                  {Object.keys(DonorLayer).map(type => (
                    <Tooltip key={type} isDisabled={!DonorLayer[type].disabled}
                      label="Coming Soon" fontSize="md"
                    >
                      <WrapItem>
                        <Button
                          isDisabled={DonorLayer[type].disabled}
                          as={Link}
                          to={`/donors?type=${type}`}
                          variant="outline"
                          _focus={{ borderColor: "var(--chakra-colors-yellow-400)" }}
                          borderWidth='2px' borderColor='rgba(238, 238, 238, 1)'
                          p='12px' height='150px' width='150px'
                        >
                          <VStack spacing={4} >
                            <Image
                              src={DonorLayer[type].image}
                              height={{ base: '10vh', md: '10vh', lg: '6vh', xl: '10vh' }}
                            />
                            <Text>{DonorLayer[type].name}</Text>
                          </VStack>
                        </Button>
                      </WrapItem>
                    </Tooltip>
                  ))}
                </Wrap>

                <VStack display={{ base: 'none', xl: 'block' }}>
                  <HStack spacing={6} mt='6' mb="3" ml="1"  >
                    <Text size="sm" >Try our most recent and verified leads</Text>
                  </HStack>
                  <HStack spacing='10' height='100%' >
                    {recentDonors.map(recentDonation => (
                      <Box p='5' borderWidth="1px" height='100%' width="18vw" borderRadius="lg"
                        backgroundColor={(recentDonation.type === 'Blood') ? '#FFF5F5' : '#FFFFF0'}
                      >
                        <Text fontWeight="bold" isTruncated mb={2} >{recentDonation.type} Available</Text>
                        {Object.keys(recentDonation.attributes).map(item => (
                          <Text fontSize="14px" isTruncated ><i>{item}:</i> <b>{recentDonation.attributes[item]}</b></Text>
                        ))}
                      </Box>
                    ))}
                  </HStack>
                </VStack>

              </Box>
            </Collapse>
          </Flex>
        </Box>
      </Box>


      {/* Footer */}
      <Footer />
    </Flex>
  )
}
