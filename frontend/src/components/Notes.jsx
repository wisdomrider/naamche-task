import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import Note from "./Note";

const Notes = ({ notes }) => {
  return (
    <>
      {notes.map((note) => (
        <Note key={note._id} {...note} />
      ))}
      {notes.length === 0 && (
        <Flex mt="10" justifyContent="center" >
          <Text border="1px solid gray" p="2" textAlign="center" fontSize="sm">
            No notes yet.  Add one and it will show up here.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Notes;
