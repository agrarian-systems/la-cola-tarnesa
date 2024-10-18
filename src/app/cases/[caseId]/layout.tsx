import { ReactNode } from 'react';
import { Card } from '@nextui-org/react';

export default async function Layout({
  children,
}: {
  children: ReactNode;
  params: { userId: string };
}) {
  return (
    <div className='grid grid-cols-12 gap-5 h-[80vh]'>
      <div className='col-span-3'></div>
      <div className='col-span-9'>
        <Card className='w-full mt-10 h-[80vh]'>{children}</Card>
      </div>
    </div>
  );
}
