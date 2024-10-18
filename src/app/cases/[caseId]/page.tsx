import { getCaseById } from '@/app/actions/caseActions';
import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import { notFound } from 'next/navigation';

export default async function CaseDetailedPage({
  params,
}: {
  params: { caseId: string };
}) {
  const conflictCase = await getCaseById(params.caseId);

  if (!conflictCase) return notFound();

  return (
    <>
      <CardHeader className='text-éxl font-semibold text-secondary'>
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{conflictCase.name}</CardBody>
    </>
  );
}
