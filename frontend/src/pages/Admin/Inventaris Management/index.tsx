import Breadcrumb from "../../../components/Breadcrumb";
import AdminTable from "../../../components/Table/AdminTable";

const InventarisManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Inventaris Management" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default InventarisManagement;
