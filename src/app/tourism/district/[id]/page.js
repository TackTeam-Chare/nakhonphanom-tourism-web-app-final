// src/app/tourism/district/[id]/page.js
import { getFetchTourismDataByDistrict } from '../../../../utils/user/api';
import TourismByDistrict from '@/components/tourism/district/TourismByDistrict';
export async function generateMetadata({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataByDistrict(id);
  return { title: `สถานที่ท่องเที่ยวในอำเภอ ${tourismData[0]?.district_name || 'Unknown'}` };
}

export default async function Page({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataByDistrict(id);

  return <TourismByDistrict tourismData={tourismData} />;
};
