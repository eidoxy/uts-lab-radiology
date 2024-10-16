import Breadcrumb from "../../../components/Breadcrumb";
import DokterTable from "../../../components/Table/DokterTable";

const DokterManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Dokter Management" />

      <div className="flex flex-col gap-10">
        <DokterTable />
      </div>
    </>
  );
};

export default DokterManagement;
