import Breadcrumb from "../../../components/Breadcrumb";
import AdminTable from "../../../components/Table/AdminTable";

const PetugasManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Petugas Management" />

      <div className="flex flex-col gap-10">
        <AdminTable />
      </div>
    </>
  );
};

export default PetugasManagement;
