import {
  Button,
  FormControl,
  FormLabel,
  Text,
  Input,
  HStack,
  useToast,
  Heading,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLoadingHook } from "../hooks/useLoadingHook";
import axios from "../configs/axiosConfig";
import { parseBackendErrors } from "../utils/parseBackendErrors";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { isLoading, start, end } = useLoadingHook();

  const showToast = useToast();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      start();
      await axios.post("/users/register", {
        username,
        name,
        password,
      });
      showToast({
        title: "Success",
        description: "User successfully registered.",
        status: "success",
      });
      navigate("/login");
    } catch (e) {
      parseBackendErrors(e, showToast);
    } finally {
      end();
    }
  };
  return (
    <form onSubmit={loginUser}>
      <Container p="3" mt="3">
        <Heading>Register </Heading>

        <FormControl mt="4">
          <FormLabel>Username</FormLabel>
          <Input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </FormControl>

        <FormControl mt="4">
          <FormLabel>Name</FormLabel>
          <Input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </FormControl>

        <HStack mt="2" mb="2">
          <Text fontWeight={"bold"}>Already have an account?</Text>
          <Text
            onClick={() => navigate("/login")}
            color="red.400"
            textDecor="underline"
          >
            Click here to login
          </Text>
        </HStack>
        <Button
          type="submit"
          mt="3"
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Register
        </Button>
      </Container>
    </form>
  );
};

export default Register;
