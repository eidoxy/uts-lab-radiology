import Breadcrumb from "../../../components/Breadcrumb";
import AdminTable from "../../../components/Table/AdminTable";

const PemeriksaanManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Pemeriksaan Management" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default PemeriksaanManagement;
