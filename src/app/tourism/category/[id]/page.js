// src/app/tourism/district/[id]/page.js
import { getFetchTourismDataByCategory } from '@/utils/user/api';
import TourismByCategory from '@/components/tourism/category/TourismByCategory';
export async function generateMetadata({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataByCategory(id);
  return { title: `สถานที่ท่องเที่ยวตามฤดูกาล ${tourismData[0]?.category_name || 'Unknown'}` };
}

export default async function Page({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataByCategory(id);

  return <TourismByCategory tourismData={tourismData} />;
};
