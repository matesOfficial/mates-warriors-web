import { Button } from '@chakra-ui/button'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import {
  Box, Collapse, Divider, Flex, Heading, HStack, Text, Tooltip, VStack, Wrap, WrapItem
} from "@chakra-ui/react"
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BloodDrop from '../../../assets/bloodDrop.svg'
import Doctor from '../../../assets/doctor.svg'
import DonorLogo from '../../../assets/Icons/health-care.svg'
import TakerLogo from '../../../assets/Icons/organ-donation.svg'
import Oxygen from '../../../assets/oxygen.svg'
import PlasmaDrop from '../../../assets/plasmaDrop.svg'
import Footer from '../../components/Footer'
import NavBar from '../../components/NavBar'
import FormModals from './Modals'

const DonorLayer = {
  'bloodDonor': { name: 'Blood', image: BloodDrop },
  'plasmaDonor': { name: 'Plasma', image: PlasmaDrop },
  'oxygenDonor': { name: 'Oxygen', image: Oxygen },
  'consultancy': { name: 'Consultancy', image: Doctor }
}



export default function Dashboard() {
  const [openModal, setOpenModal] = useState(null);

  const [isDonor, setIsDonor] = useState(true);

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
                    <Tooltip isDisabled={type !== 'consultancy'}
                      label="Coming Soon" fontSize="md"
                    >
                      <WrapItem>
                        <Button onClick={() => setOpenModal(type)}
                          disabled={type === 'consultancy'}
                          variant="outline"
                          _focus={{ borderColor: "var(--chakra-colors-yellow-400)" }}
                          borderWidth='2px' borderColor='rgba(238, 238, 238, 1)'
                          p='12px' height='150px' width='150px'
                        >
                          <VStack spacing={4} >
                            <Image
                              src={DonorLayer[type].image}
                              height='10vh'
                            />
                            <Text>{DonorLayer[type].name}</Text>
                          </VStack>
                        </Button>
                      </WrapItem>
                    </Tooltip>
                  ))}
                </Wrap>
              </Box>

              <Box my='10px' mx='2' height="180px" borderWidth="2px">
                <HStack spacing='10' p="4" height='100%'>
                  {Object.keys(DonorLayer).map(type => (
                    <Box p='5' borderWidth="1px" height='100%'>
                      Plasma Required contact: xxxx
                    </Box>
                  ))}
                </HStack>
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
                    <Tooltip isDisabled={type !== 'consultancy'}
                      label="Coming Soon" fontSize="md"
                    >
                      <WrapItem>
                        <Button
                          as={Link}
                          to={`/donors?type=${type}`}
                          disabled={type === 'consultancy'}
                          variant="outline"
                          _focus={{ borderColor: "var(--chakra-colors-yellow-400)" }}
                          borderWidth='2px' borderColor='rgba(238, 238, 238, 1)'
                          p='12px' height='150px' width='150px'
                        >
                          <VStack spacing={4} >
                            <Image
                              src={DonorLayer[type].image}
                              height='10vh'
                            />
                            <Text>{DonorLayer[type].name}</Text>
                          </VStack>
                        </Button>
                      </WrapItem>
                    </Tooltip>
                  ))}
                </Wrap>
              </Box>
              <Box my='10px' mx='2' height="180px" borderWidth="2px">
                <HStack spacing='10' p="4" height='100%'>
                  {Object.keys(DonorLayer).map(type => (
                    <Box p='5' borderWidth="1px" height='100%'>
                      Plasma Available contact: xxxx
                    </Box>
                  ))}
                </HStack>
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
