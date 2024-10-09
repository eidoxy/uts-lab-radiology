import Breadcrumb from '../../../components/Breadcrumb';
import ScheduleTable from '../../../components/Table/ScheduleTable';

const ScheduleManagement = () => {
  return (
    <>
      <Breadcrumb pageName="Schedule Management" />

      <div className="flex flex-col gap-10">
        <ScheduleTable />
      </div>
    </>
  );
};

export default ScheduleManagement;
