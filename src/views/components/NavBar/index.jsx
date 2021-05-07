import { RepeatClockIcon } from '@chakra-ui/icons'
import { Image } from '@chakra-ui/image'
import {
  Avatar,
  Flex, Heading, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList
} from "@chakra-ui/react"
import React from 'react'
import { Link } from 'react-router-dom'
import LogOutLogo from '../../../assets/Icons/logout.svg'
import ProfileLogo from '../../../assets/Icons/profile-user.svg'
import Logo from '../../../assets/MAU-logo.png'
import { useAuth } from '../../../store/AuthContext'

export default function NavBar() {

  const { logout } = useAuth();

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        py="0.5rem"
        px="5vw"
        w="100%"
        background='var(--chakra-colors-yellow-400)'
        boxShadow="md"
      >
        <HStack spacing="5" as={Link} to="/">
          <Image src={Logo} boxSize="40px" />
          <Heading as="h1" size="md" >MATES Warriors</Heading>
        </HStack>
        <Menu>
          <MenuButton>
            <Avatar size="md"
              showBorder="true"
              src="https://bit.ly/kent-c-dodds"
            />
          </MenuButton>
          <MenuList zIndex="100">
            <MenuItem icon={<Image src={ProfileLogo} boxSize="1.2rem" />} >
              <strong>Profile</strong>
            </MenuItem>
            <MenuItem icon={<RepeatClockIcon fontSize="1.2rem" />} >
              <strong>History</strong>
            </MenuItem>
            <MenuDivider />
            <MenuItem color="red.500"
              onClick={logout}
              icon={<Image src={LogOutLogo} boxSize="1.2rem" />}
            >
              <strong>LogOut</strong>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  )
}
