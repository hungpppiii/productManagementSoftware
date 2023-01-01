import { Tr, Th, Checkbox, Button, Box } from "@chakra-ui/react";
import { useContext } from "react";
import { EditFacilityContext } from "../../stores/editFacilityStore";

const FactoryItem = ({ checkedItems, setCheckedItems, index, ...props }) => {
  const { id, name, type, email } = props;
  const editFacilityDispatch = useContext(EditFacilityContext)[1];

  const handleChecked = () => {
    checkedItems[index] = !checkedItems[index];
    setCheckedItems([...checkedItems]);
  };

  const handleClickEditFacility = () => {
    editFacilityDispatch({
      type: "showEditFacilityModal",
      payload: { typeEditFacility: "edit", data: props },
    });
  };

  const getType = () => {
    switch (type) {
      case "produce":
        return "Cơ sở sản xuất";
      case "distribute":
        return "Đại lý phân phối";
      case "guarantee":
        return "Trung tâm bảo hành";
      default:
        return "";
    }
  };

  return (
    <Tr>
      <Th>
        <Checkbox isChecked={checkedItems[index]} onChange={handleChecked} />
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{id}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{name}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{getType()}</Box>
      </Th>
      <Th>
        <Box whiteSpace={"normal"}>{email}</Box>
      </Th>
      <Th>
        <Button onClick={handleClickEditFacility} whiteSpace={"nowrap"}>
          Chỉnh sửa cơ sở
        </Button>
      </Th>
    </Tr>
  );
};

export default FactoryItem;
