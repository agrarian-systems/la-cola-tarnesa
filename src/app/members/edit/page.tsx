import { CardHeader, Divider, CardBody } from '@nextui-org/react';
import EditForm from './editForm';
import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';

export default async function MemberEditpage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <div>
      <CardHeader className='text-1xl font-semibold text-secondary'>
        Modifier mon Profil
      </CardHeader>
      <Divider />
      <CardBody>
        <EditForm member={member} />
      </CardBody>
    </div>
  );
}
