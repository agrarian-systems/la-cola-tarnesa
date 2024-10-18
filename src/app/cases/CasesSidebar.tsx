'use client';

import { Chip } from '@nextui-org/react';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { GoInbox } from 'react-icons/go';
import { MdOutlineDone, MdOutlinePendingActions } from 'react-icons/md';

export default function CasesSidebar() {
  // Get URL query string parameteres
  const searchParams = useSearchParams();

  // Get current URL Pathname
  const pathName = usePathname();

  // Load Router form next-navigation to manipulate URL
  const router = useRouter();

  // Local state to manage filters
  const [selected, setSelected] = useState<string>(
    searchParams.get('container') || 'all'
  );

  // Methide to change URL query string based on the selected filter
  const handleSelect = (key: string) => {
    setSelected(key);
    const params = new URLSearchParams();
    params.set('container', key);
    router.replace(`${pathName}?${params}`);
  };

  // Filters configuration array
  const items = [
    { key: 'all', label: 'All cases', icon: GoInbox, chip: true },
    {
      key: 'ongoing',
      label: 'Ongoing cases',
      icon: MdOutlinePendingActions,
      chip: true,
    },
    { key: 'solved', label: 'Solved cases', icon: MdOutlineDone, chip: true },
  ];

  return (
    <div className='flex flex-col shadow-md rounded-lg cursor-pointer'>
      {items.map(({ key, icon: Icon, label, chip }) => (
        <div
          key={key}
          className={clsx('flex flex-row items-center rounded-t-lg gap-2 p-3', {
            'text-secondary font-semibold': selected === key,
            'text-black hover:text-secondary-70': selected !== key,
          })}
          onClick={() => handleSelect(key)}
        >
          <Icon size={24} />
          <div className='flex justify-between flex-grow'>
            <span>{label}</span>
            {chip && <Chip>5</Chip>}
          </div>
        </div>
      ))}
    </div>
  );
}
