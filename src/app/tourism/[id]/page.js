// src/app/tourism/[id]/page.js
import { getFetchTourismDataById } from '../../../utils/api';
import TourismDetailsByIdComponent from '../../../components/tourism/TourismDetails';
import Layout from '@/components/common/layout';
// export async function generateMetadata({ params }) {
//   const { id } = params;
//   const tourismData = await getFetchTourismDataById(id);
//   return { title: tourismData.name };
// }

export default async function Page({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataById(id);

  return   <> <Layout><TourismDetailsByIdComponent tourismData={tourismData} /> </Layout></>;

}