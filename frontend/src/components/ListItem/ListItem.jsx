import { Tr, Th, Box } from "@chakra-ui/react";

const ListItem = ({ children, listItem }) => {
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
      {children && <Th>{children}</Th>}
    </Tr>
  );
};

export default ListItem;
