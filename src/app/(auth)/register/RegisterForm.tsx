'use client';

import { registerUser } from '@/app/actions/authActions';
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';
import { handleFormServerErrors } from '@/lib/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardHeader, CardBody, Button, Input } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { GiPadlock } from 'react-icons/gi';

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);

    if (result.status === 'success') {
      console.log('User registered successfully');
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  return (
    <Card className='w-2/5 mx-auto'>
      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col gap-2 items-center text-secondary'>
          <div className='flex flex-row items-center gap-3'>
            <GiPadlock size={20} />
            <h1 className='text-2xl font-semibold'>Créer un compte</h1>
          </div>
          <p className='text-neutral-500'>
            Bienvenue sur le site des musiques traditionelles occitanes
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input
              label='Nom'
              variant='bordered'
              {...register('name')}
              defaultValue=''
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              label='Email'
              variant='bordered'
              {...register('email')}
              defaultValue=''
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              label='Mot de passe'
              type='password'
              variant='bordered'
              {...register('password')}
              defaultValue=''
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />
            {errors.root?.serverError && (
              <p className='text-danger text-sm'>
                {errors.root.serverError.message}
              </p>
            )}
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color='secondary'
              type='submit'
            >
              Valider
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
