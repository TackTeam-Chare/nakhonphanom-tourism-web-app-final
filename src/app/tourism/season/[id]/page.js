// src/app/tourism/district/[id]/page.js
import { getFetchTourismDataBySeason } from '@/utils/api';
import TourismBySeason from '@/components/tourism/season/TourismBySeason';
export async function generateMetadata({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataBySeason(id);
  return { title: `สถานที่ท่องเที่ยวในอำเภอ ${tourismData[0]?.district_name || 'Unknown'}` };
}

export default async function Page({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataBySeason(id);

  return <TourismBySeason tourismData={tourismData} />;
};
