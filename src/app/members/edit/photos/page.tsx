import { getAuthUserId } from '@/app/actions/authActions';
import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import DeleteButton from '@/components/DeleteButton';
import StarButton from '@/components/StarButton';
import { CardHeader, Divider, CardBody, Image } from '@nextui-org/react';

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <div>
      <CardHeader className='text-1xl font-semibold text-secondary'>
        Modifier mes Photos
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='grid grid-cols-5 gap-3 p-5'>
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className='relative'>
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt='Image of User'
                />
                <div className='absolute top-3 left-3 z-50'>
                  <StarButton selected={false} loading={false} />
                </div>
                <div className='absolute top-3 right-3 z-50'>
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </div>
  );
}
