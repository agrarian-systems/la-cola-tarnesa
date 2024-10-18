import { getCases } from '../actions/caseActions';
import CasesSidebar from './CasesSidebar';
import CasesTable from './CasesTable';

export default async function CasesPage() {
  const cases = await getCases();

  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh] mt-10'>
      <div className='col-span-2'>
        <CasesSidebar />
      </div>
      <div className='col-span-10'>
        <CasesTable cases={cases} />
      </div>
    </div>
  );
}
