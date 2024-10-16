import Breadcrumb from "../../../components/Breadcrumb";
import SpesimenTable from "../../../components/Table/SpesimenTable";

const SpesimenManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Spesimen Management" />

      <div className="flex flex-col gap-10">
        <SpesimenTable />
      </div>
    </>
  );
};

export default SpesimenManagement;
