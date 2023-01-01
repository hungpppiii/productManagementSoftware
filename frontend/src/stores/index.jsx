import { EditFacilityStore } from "./editFacilityStore";
import { GetDataAPIStore } from "./getDataApiStore";
import { ModalFormStore } from "./modalFormStore";
import { ReportStore } from "./reportStore";
import { UserStore } from "./userStore";

export const Stores = ({ children }) => {
  return (
    <ModalFormStore>
      <GetDataAPIStore>
        <EditFacilityStore>
          <UserStore>
            <ReportStore>{children}</ReportStore>
          </UserStore>
        </EditFacilityStore>
      </GetDataAPIStore>
    </ModalFormStore>
  );
};

export { ReportContext } from "./reportStore";
export { UserContext } from "./userStore";
export { EditFacilityContext } from "./editFacilityStore";
export { GetDataAPIContext } from "./getDataApiStore";
export { ModalFormContext } from "./modalFormStore";
