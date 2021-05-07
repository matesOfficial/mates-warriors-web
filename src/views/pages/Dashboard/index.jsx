import { Button } from '@chakra-ui/button'
import { ArrowForwardIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import {
  Box, Collapse, Divider, Flex, Heading, HStack, Text, Tooltip, VStack, Wrap, WrapItem
} from "@chakra-ui/react"
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
  'bloodDonor': { name: 'Blood', image: BloodDrop },
  'plasmaDonor': { name: 'Plasma', image: PlasmaDrop },
  'oxygenDonor': { name: 'Oxygen', image: Oxygen },
  'consultancy': { name: 'Consultancy', image: Doctor },
  'organDonor': { name: 'Organ', image: Organ },
  'faq': { name: 'FAQ', image: FAQ },
}

const recentDonors = [
  {
    'type': 'Plasma',
    'attributes': {
      'Name': 'Shubh Bansal',
      'Phone No.': '9999999999',
      'Remark': 'Remark',
      'State': 'Delhi',
    }
  },
  {
    'type': 'Oxygen Concentrator',
    'attributes': {
      'Name': 'Shubh Bansal',
      'Phone No.': '9999999999',
      'Brand': 'Philips',
      'State': 'Delhi',
    }
  },
  {
    'type': 'Blood',
    'attributes': {
      'Name': 'Shubh Bansal',
      'Phone No.': '9999999999',
      'Blood Group': 'B+',
      'State': 'Delhi',
    }
  },
  {
    'type': 'Oxygen Cylinder',
    'attributes': {
      'Name': 'Shubh Bansal',
      'Phone No.': '9999999999',
      'Quantity': '10 Litres',
      'State': 'Delhi',
    }
  },
]

export default function Dashboard() {
  const [openModal, setOpenModal] = useState(null);
  const [isDonor, setIsDonor] = useState(false);
  const history = useHistory()

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
                    <Tooltip key={type} isDisabled={!(type === 'consultancy' || type === 'organDonor')}
                      label="Coming Soon" fontSize="md"
                    >
                      <WrapItem>
                        <Button onClick={() => type === 'faq' ? history.push('/') : setOpenModal(type)}
                          isDisabled={type === 'consultancy' || type === 'organDonor'}
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
                    <Tooltip key={type} isDisabled={!(type === 'consultancy' || type === 'organDonor')}
                      label="Coming Soon" fontSize="md"
                    >
                      <WrapItem>
                        <Button
                          isDisabled={type === 'consultancy' || type === 'organDonor'}
                          as={(type === 'consultancy' || type === 'organDonor') ? '' : Link}
                          to={`${type === 'faq' ? '/' : "/donors?type=" + type}`}
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
                <HStack spacing={6} mt='6' mb="3" ml="1" as={Link} to="/donors?type=bloodDonor" >
                  <Text size="sm" >Try our most recent and verified leads</Text>
                  <ArrowForwardIcon color="gray.400" />
                </HStack>
                <Wrap spacing='10' my="4">
                  {recentDonors.map((recentDonation, idx) => (
                    <WrapItem key={idx}>
                      <Box p='5' borderWidth="1px" minW="250px" borderRadius="lg" >
                        <Text fontWeight="bold" isTruncated mb={2} >{recentDonation.type} Available</Text>
                        {Object.keys(recentDonation.attributes).map(item => (
                          <Text key={item} fontSize="14px" isTruncated ><i>{item}:</i> <b>{recentDonation.attributes[item]}</b></Text>
                        ))}
                      </Box>
                    </WrapItem>
                  ))}
                </Wrap>
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
