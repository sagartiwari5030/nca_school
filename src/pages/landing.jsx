import { Helmet } from 'react-helmet-async';

import CoachingPage from 'src/sections/home/coaching';

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <>
      <Helmet>
        <title> SemenAlytica |</title>
        <meta name="description" content="Choose SemenAlytica" />
      </Helmet>
      {/* <SemenAlytica/> */}
      <CoachingPage/>

      {/* <HomeView /> */}
    </>
  );
}
