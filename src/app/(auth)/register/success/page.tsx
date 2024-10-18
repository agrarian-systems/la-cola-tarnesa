'use client';

import CardWrapper from '@/components/CardWrapper';
import { useRouter } from 'next/navigation';
import { FaCheckCircle } from 'react-icons/fa';

export default function RegisterSuccessPage() {
  const router = useRouter();
  return (
    <CardWrapper
      headerText={'Nous avons bien créé votre compte !'}
      subHeaderText={'Vous pouvez désormais vous connecter'}
      action={() => router.push('/login')}
      actionLabel='Se connecter'
      headerIcon={FaCheckCircle}
    />
  );
}
