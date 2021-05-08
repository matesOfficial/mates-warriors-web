import { Box } from '@chakra-ui/layout'
import { Table, Tbody, Td, Tr } from '@chakra-ui/table'
import React from 'react'

function DataCard({ donor }) {
  return (
    <Box borderRadius="md"
      borderWidth='2px'
    >
      <Table variant="striped" size="sm">
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td><b>{donor?.name || "-"}</b></Td>
          </Tr>
          <Tr>
            <Td>Blood Group</Td>
            <Td><b>{donor?.blood_group || "-"}</b></Td>
          </Tr>
          <Tr>
            <Td>State</Td>
            <Td><b>{donor?.state || "-"}</b></Td>
          </Tr>
          <Tr>
            <Td>City</Td>
            <Td><b>{donor?.city || "-"}</b></Td>
          </Tr>
          <Tr>
            <Td>PinCode</Td>
            <Td><b>{donor?.pin_code || "-"}</b></Td>
          </Tr>
          {/* <Tr>
            <Td>Last Donation:</Td>
            <Td><b>{donor?.last_blood_donation_date || "-"}</b></Td>
          </Tr> */}
          <Tr>
            <Td>Phone No:</Td>
            <Td><b>{donor?.phone_number || "-"}</b></Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}

export default DataCard
