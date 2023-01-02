import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DistributeManagementProductSoldPage,
  DistributeManagementStorePage,
  FactoryManagementPage,
  GuaranteeManagementPage,
  ProduceManagementErrorProductsPage,
  ProduceManagementStorePage,
  ProductLinesManagementPage,
} from "./pages";
import Login from "./pages/Login";
import { Stores } from "./stores";
import SidebarWithHeader from "./components/SidebarWithHeader";
import StatisticAdmin from "./pages/StatisticAdmin";
import StatisticAgent from "./pages/StatisticAgent";
import StatisticFacility from "./pages/StatisticFacility";
import StatisticWarranty from "./pages/StatisticWarranty";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Stores>
        <BrowserRouter>
          <SidebarWithHeader>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/manage-product-lines"
                element={<ProductLinesManagementPage />}
              />
              <Route
                path="/manage-facility"
                element={<FactoryManagementPage />}
              />
              <Route path="/statistic" element={<StatisticAdmin />} />

              <Route
                path="/produce/manage-store"
                element={<ProduceManagementStorePage />}
              />
              <Route
                path="/produce/manage-error-products"
                element={<ProduceManagementErrorProductsPage />}
              />

              <Route
                path="/produce/statistic"
                element={<StatisticFacility />}
              />

              <Route
                path="/distribute/manage-store"
                element={<DistributeManagementStorePage />}
              />
              <Route
                path="/distribute/manage-insurance-products"
                element={<DistributeManagementProductSoldPage />}
              />
              <Route
                path="/distribute/statistic"
                element={<StatisticAgent />}
              />

              <Route
                path="guarantee/manage-insurance-products"
                element={<GuaranteeManagementPage />}
              />
              <Route
                path="/guarantee/statistic"
                element={<StatisticWarranty />}
              />
            </Routes>
          </SidebarWithHeader>
        </BrowserRouter>
      </Stores>
    </ChakraProvider>
  );
};

export default App;
