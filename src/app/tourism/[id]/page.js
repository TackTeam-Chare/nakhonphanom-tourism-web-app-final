
import { getFetchTourismDataById } from '../../../utils/user/api';
import TourismDetailsByIdComponent from '../../../components/tourism/TourismDetails';
import Layout from '@/components/common/layout';

export default async function Page({ params }) {
  const { id } = params;
  const tourismData = await getFetchTourismDataById(id);

  return   <> <Layout><TourismDetailsByIdComponent tourismData={tourismData} /> </Layout></>;

}