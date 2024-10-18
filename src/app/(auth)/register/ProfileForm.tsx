'use client';
import { Select, SelectItem, Textarea } from '@nextui-org/react';
import { useFormContext } from 'react-hook-form';

export default function ProfileForm() {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const InstrumentsList = [
    { label: 'Craba / Boudègue', value: 'craba' },
    { label: 'Graile', value: 'graile' },
  ];
  const DepartmentsList = [
    { label: 'Ain', value: '01' },
    { label: 'Aisne', value: '02' },
  ];
  return (
    <div className='space-y-4'>
      <Select
        label='Instrument'
        variant='bordered'
        {...register('instrument')}
        defaultSelectedKeys={getValues('instrument')}
        isInvalid={!!errors.instrument}
        errorMessage={errors.instrument?.message as string}
        aria-label='Select an instrument'
        onChange={(e) => setValue('instrument', e.target.value)}
      >
        {InstrumentsList.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label='Département'
        variant='bordered'
        {...register('department')}
        defaultSelectedKeys={getValues('department')}
        isInvalid={!!errors.department}
        errorMessage={errors.department?.message as string}
        aria-label='Select a department'
        onChange={(e) => setValue('department', e.target.value)}
      >
        {DepartmentsList.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
      <Textarea
        label='Description'
        variant='bordered'
        {...register('description')}
        defaultValue={getValues('description')}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message as string}
      />
    </div>
  );
}
