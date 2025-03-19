import React from "react";
import TableComponent from "../table/TableComponent";
import { driverColumns } from "../table/columns";
import { useNavigate } from "react-router-dom";

const ActivteTab = ({data, loading}) => {
  const navigate = useNavigate();
  const handleAdd = async () => {
    navigate(`${location.pathname}/create`);
  };

  const onManage = (id) => {
    navigate(`/driver/${id}`);
  };

  return (
    <TableComponent
      showAddButton={"Add Driver"}
      data={data}
      searchPlaceholder={"Search Driver..."}
      filters={["fullname", "licenseNo"]}
      tableColumn={driverColumns}
      onAdd={handleAdd}
      loading={loading}
      onAction={onManage}
    />
  );
};

export default ActivteTab;
