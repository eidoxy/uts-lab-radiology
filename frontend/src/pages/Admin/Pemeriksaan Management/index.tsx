import Breadcrumb from "../../../components/Breadcrumb";
import PemeriksaanTable from "../../../components/Table/PemeriksaanTable";

const PemeriksaanManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Pemeriksaan Management" />

      <div className="flex flex-col gap-10">
        <PemeriksaanTable />
      </div>
    </>
  );
};

export default PemeriksaanManagement;
