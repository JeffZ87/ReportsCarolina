import Head from 'next/head'
import Navbar from '../components/navbar/navbar'

import Search from '../components/search/search'
import MonitoredCourses from '../components/monitoredCourses/monitoredCourses';

export default function Home() {
  return (
    <>
      <Head>
        <title>ReportCarolina</title>
        <meta name="description" content="Helps you get the classes you wanted" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='container-fluid'>
        <div className='row'>
          <Navbar />
        </div>

        <div className='row'>
          <div className='col-8 bg-secondary'>
            <Search />
          </div>

          <div className='col-4 bg-success'>
            <MonitoredCourses />
          </div>
        </div>
      </div>
      

    </>
  );
}
