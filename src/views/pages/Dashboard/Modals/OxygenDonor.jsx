import {
  Center, FormControl,
  Image, Input,
  Select
} from "@chakra-ui/react";
import React, {useState} from "react";
import Oxygen from '../../../../assets/oxygen.svg';
import {citiesAndStates} from '../../../../citiesAndStates.js';

const bloodgroups = ['O-', 'O+', 'B-', 'B+', 'A-', 'A+', 'AB-', 'AB+']

export default function OxygenDonor() {
  const[state,setState] = useState('')
  return (

    <>
      <Center>
        <Image src={Oxygen}
          boxSize="100px"
          objectFit="cover"
        />
      </Center>
      <FormControl mt={4}>
        <Input variant='filled' placeholder="What do you want to donate" />
      </FormControl>

      <FormControl mt={4}>
        <Input variant='filled' placeholder="Name" />
      </FormControl>
      <FormControl mt={4}>
        <Select variant='filled' placeholder="Select your state" onChange={(e) => setState(e.target.value)}>
          {Object.keys(citiesAndStates).map(stateName => {
            return (
              <option value={stateName}>{stateName}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <Select variant='filled' placeholder="Select your city">
          {citiesAndStates[state].map(city => {
            
            return (
              <option value={city}>{city}</option>
            )
          })}
        </Select>
      </FormControl>
      <FormControl mt={4}>
        <Input variant='filled' placeholder="Pin-Code" />
      </FormControl>
      <FormControl mt={4}>
        <Input variant='filled' placeholder="Phone Number" />
      </FormControl>
      <FormControl mt={4} >
        <Input variant='filled' placeholder="Mates Affiliation" />
      </FormControl>
      <FormControl mt={4}>
        <Input variant='filled' placeholder="Quantity of Product" />
      </FormControl>
    </>
  )
}
