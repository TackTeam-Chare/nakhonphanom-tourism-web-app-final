import React from 'react'
import TourismComponent from '@/components/tourism/page'
import Layout from '@/components/common/layout';
import MapFetch from '@/components/map/MapFetch';
function TourismPage() {
  return (
    <div>
      <Layout>
      <TourismComponent/>
      <MapFetch/>
      </Layout>
    </div>
  )
}

export default TourismPage