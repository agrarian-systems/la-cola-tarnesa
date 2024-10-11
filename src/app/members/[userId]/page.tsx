import { getMemberByUserId } from '@/app/actions/memberActions';
import { CardBody, CardHeader, Divider } from '@nextui-org/react';
import { notFound } from 'next/navigation';

export default async function MemberDetailedPage({
  params,
}: {
  params: { userId: string };
}) {
  const member = await getMemberByUserId(params.userId);

  if (!member) return notFound();

  return (
    <>
      <CardHeader className='text-éxl font-semibold text-secondary'>
        Profile
      </CardHeader>
      <Divider />
      <CardBody>{member.description}</CardBody>
    </>
  );
}
