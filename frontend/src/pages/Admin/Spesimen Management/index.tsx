import Breadcrumb from "../../../components/Breadcrumb";
import AdminTable from "../../../components/Table/AdminTable";

const SpesimenManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Spesimen Management" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default SpesimenManagement;
