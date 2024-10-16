import Breadcrumb from "../../../components/Breadcrumb";
import AdminTable from "../../../components/Table/AdminTable";

const DokterManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Dokter Management" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default DokterManagement;
