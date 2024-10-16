import Breadcrumb from "../../../components/Breadcrumb";
import AdminTable from "../../../components/Table/AdminTable";

const PasienManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Pasien Management" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default PasienManagement;
