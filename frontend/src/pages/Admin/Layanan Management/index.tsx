import Breadcrumb from "../../../components/Breadcrumb";
import LayananTable from "../../../components/Table/LayananTable";

const LayananManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Layanan Management" />

      <div className="flex flex-col gap-10">
        <LayananTable />
      </div>
    </>
  );
};

export default LayananManagement;
