import Breadcrumb from "../../../components/Breadcrumb";
import PasienTable from "../../../components/Table/PasienTable";

const PasienManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Pasien Management" />

      <div className="flex flex-col gap-10">
        <PasienTable />
      </div>
    </>
  );
};

export default PasienManagement;
