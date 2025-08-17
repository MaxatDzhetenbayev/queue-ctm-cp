import React from "react";

import { EmployeeList } from "@/modules/users/ui/employee";

// import { ClientModal } from "../components/ClientModal";

const EmployeePage = () => {
  // const [currentEmployees, setCurrentEmployees] =
  //   useState<Employee[]>(employees);
  // const [currentClients, setCurrentClients] = useState<Client[]>(clients);
  // const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
  //   null
  // );
  // const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  // const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  // const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  // const handleEmployeeClick = (employee: Employee) => {
  //   setSelectedEmployee(employee);
  //   setIsEmployeeModalOpen(true);
  // };

  // const handleClientClick = (client: Client) => {
  //   setSelectedClient(client);
  //   setIsClientModalOpen(true);
  // };

  // const handleEmployeeUpdate = (updatedEmployee: Employee) => {
  //   setCurrentEmployees((prev) =>
  //     prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
  //   );
  //   setSelectedEmployee(updatedEmployee);
  // };

  // const handleClientUpdate = (updatedClient: Client) => {
  //   setCurrentClients((prev) =>
  //     prev.map((client) =>
  //       client.id === updatedClient.id ? updatedClient : client
  //     )
  //   );
  //   setSelectedClient(updatedClient);
  // };

  // const closeEmployeeModal = () => {
  //   setIsEmployeeModalOpen(false);
  //   setSelectedEmployee(null);
  // };

  // const closeClientModal = () => {
  //   setIsClientModalOpen(false);
  //   setSelectedClient(null);
  // };

  return (
    <>
      <EmployeeList />
      {/* <EmployeeModal /> */}

      {/* <ClientModal
        client={selectedClient}
        isOpen={isClientModalOpen}
        onClose={closeClientModal}
        onClientUpdate={handleClientUpdate}
      /> */}
    </>
  );
};

export default EmployeePage;
