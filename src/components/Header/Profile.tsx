import { Flex, Text, Box, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Nome Usuário</Text>
          <Text color="gray.300" fontSize="small">usuario@email.com</Text>
        </Box>
      )}

      <Avatar size="md" name="Name User" src="" />
    </Flex>
  )
}
