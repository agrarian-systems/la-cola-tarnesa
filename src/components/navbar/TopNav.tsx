import { Button, Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import Link from 'next/link';
import { GiAbstract074 } from 'react-icons/gi';
import NavLink from './NavLink';
import { auth } from '@/auth';
import UserMenu from './UserMenu';
import Filters from './Filters';

export default async function TopNav() {
  const session = await auth();

  return (
    <>
      <Navbar
        maxWidth='xl'
        className='bg-pink-700 '
        classNames={{
          item: [
            'text-white',
            'font-bold',
            'flex',
            'relative',
            'h-full',
            'items-center',
            "data-[active=true]:after:content-['']",
            'data-[active=true]:after:absolute',
            'data-[active=true]:after:bottom-0',
            'data-[active=true]:after:left-0',
            'data-[active=true]:after:right-0',
            'data-[active=true]:after:h-[2px]',
            'data-[active=true]:after:rounded-[2px]',
            'data-[active=true]:after:bg-white',
          ],
        }}
      >
        <NavbarBrand as={Link} href='/' className='text-white'>
          <GiAbstract074 size={40} className='mr-3' />
          <div className='font-bold text-2xl flex '>
            <span> La còla tarnesa</span>
          </div>
        </NavbarBrand>
        <NavbarContent justify='center'>
          <NavLink label='Membres' href='/members' />
          <NavLink label='Listes' href='/lists' />
          <NavLink label='Messages' href='/messages' />
        </NavbarContent>
        <NavbarContent justify='end'>
          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <>
              <Button
                as={Link}
                href='/login'
                variant='bordered'
                className='text-white'
              >
                Connexion
              </Button>
              <Button
                as={Link}
                href='/register'
                variant='bordered'
                className='text-white'
              >
                Créer un compte
              </Button>
            </>
          )}
        </NavbarContent>
      </Navbar>
      <Filters />
    </>
  );
}
