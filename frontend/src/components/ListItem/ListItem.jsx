import { Tr, Th, Box, Button } from "@chakra-ui/react";

const ListItem = ({ handleOnclick, Btn, listItem }) => {
  return (
    <Tr>
      {listItem &&
        listItem.map((e, i) => {
          return (
            <Th key={i}>
              <Box whiteSpace={"normal"}>{e}</Box>
            </Th>
          );
        })}
      {Btn && (
        <Th>
          <Button onClick={handleOnclick} whiteSpace={"no-wrap"}>
            {Btn}
          </Button>
        </Th>
      )}
    </Tr>
  );
};

export default ListItem;
