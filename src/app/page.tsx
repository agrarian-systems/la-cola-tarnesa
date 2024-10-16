import { auth, signOut } from '@/auth';
import { Button } from '@nextui-org/react';
import { FaRegFaceSmile } from 'react-icons/fa6';

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1 className='text-3xl'>Hello World</h1>
      <h3 className='text-2xl font-semibold'>User session data</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <form
            action={async () => {
              'use server';

              await signOut();
            }}
          >
            <Button
              type='submit'
              color='primary'
              variant='bordered'
              startContent={<FaRegFaceSmile size={20} />}
            >
              Déconnexion
            </Button>
          </form>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  );
}
