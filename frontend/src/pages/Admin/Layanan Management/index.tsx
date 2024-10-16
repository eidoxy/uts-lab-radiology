import Breadcrumb from "../../../components/Breadcrumb";
import AdminTable from "../../../components/Table/AdminTable";

const LayananManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Layanan Management" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default LayananManagement;
