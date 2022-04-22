import {
  Divider,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
const Note = ({ content, sharedWith, _id }) => {
  return (
    <Flex borderRadius="md" p="2" bg="gray.100" m="1">
      <VStack align={"start"} flex={1}>
        <Text> {content}</Text>
        <Divider />
        <small>
          Shared with: {sharedWith.map((x) => x.username).join(",")}
        </small>
      </VStack>
      <HStack ml="1">
        <Link to={"/add-todo?id=" + _id} passHref>
          <IconButton bg="white">
            <FaEdit color="black" />
          </IconButton>
        </Link>
        <Link to={"/delete-todo?id=" + _id} passHref>
          <IconButton bg="white">
            <FaTrash color="black" />
          </IconButton>
        </Link>
      </HStack>
    </Flex>
  );
};

export default Note;
