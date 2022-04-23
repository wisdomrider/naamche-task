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
import { useAuthHook } from "../hooks/useAuthHook";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, start, end } = useLoadingHook();

  const { login } = useAuthHook();

  const showToast = useToast();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      start();
      const user = await axios.post("/users/login", {
        username,
        password,
      });
      login(user.data);
      showToast({
        title: "Success",
        description: "You have successfully logged in.",
        status: "success",
        
      });
      navigate("/");
    } catch (e) {
      parseBackendErrors(e, showToast);
    } finally {
      end();
    }
  };
  return (
    <form onSubmit={loginUser}>
      <Container p="3" mt="3">
        <Heading>Login </Heading>

        <FormControl mt="4">
          <FormLabel>Username</FormLabel>
          <Input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
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

        <HStack mt="1">
          <Text fontWeight={"bold"}>Don't have an account?</Text>
          <Text
            onClick={() => navigate("/register")}
            color="red.400"
            textDecor="underline"
          >
            Click here to register
          </Text>
        </HStack>
        <Button type="submit" mt="3" isLoading={isLoading} isDisabled={isLoading}>
          Login
        </Button>
      </Container>
    </form>
  );
};

export default Login;
