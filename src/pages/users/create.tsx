import { Flex, Box, Button, Heading, Divider, VStack, SimpleGrid, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup' 

import { Input } from '../../components/Form/Input'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatório').min(6, 'Minimo de 6 caracteres'),
  password_confirm: yup.string().oneOf([ null, yup.ref('password')], 'As senhas precisam ser iguais'),
})

export default function CreateUser() {
  const { register, handleSubmit, formState, formState: { errors } } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  })
  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }
  return (
    <Box>
      <Header />
      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
        >
          <Sidebar />
          <Box
            as="form"
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
            <Divider my="6" borderColor="gray.700" />
            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  name="name"
                  label="Nome completo"
                  error={errors.name}
                  {...register("name")} 
                />
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  error={errors.email}
                  {...register("email")}
                />
              </SimpleGrid>
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                <Input
                  name="password"
                  type="password"
                  label="Senha"
                  error={errors.password}
                  {...register("password")} 
                />
                <Input
                  name="password_confirm"
                  type="password"
                  label="Confirmar senha"
                  error={errors.password_confirm}
                  {...register("password_confirm")} 
                />
              </SimpleGrid>
            </VStack>
            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button
                  type="submit"
                  isLoading={formState.isSubmitting}
                  colorScheme="pink"
                >
                  Salvar
                </Button>
              </HStack>
            </Flex>
          </Box>
      </Flex>
    </Box>
  )
}
