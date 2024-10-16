import Breadcrumb from "../../../components/Breadcrumb";
import PetugasTable from "../../../components/Table/PetugasTable";

const PetugasManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Petugas Management" />

      <div className="flex flex-col gap-10">
        <PetugasTable />
      </div>
    </>
  );
};

export default PetugasManagement;
