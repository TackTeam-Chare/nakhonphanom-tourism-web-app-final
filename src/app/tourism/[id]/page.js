// src/app/tourism/[id]/page.js
import { getFetchTourismDataById } from '../../../utils/api';
import TourismDetailsById from './TourismDetails';

export async function generateMetadata({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataById(id);
  return { title: tourismData.name };
}

export default async function Page({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataById(id);

  return <TourismDetailsById tourismData={tourismData} />;
}
