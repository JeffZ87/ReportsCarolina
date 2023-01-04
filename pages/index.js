import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar/navbar';
import MonitoredCourses from '../components/monitoredCourses/monitoredCourses';
import SearchSection from '../components/searchSection/searchSection';

export default function Home() {
  const [watchList, setWatchList] = useState([]);

  useEffect(() => {
    fetch('/api/monitored-courses')
    .then((res) => res.json()
    .then((data) => {
      setWatchList(data);
    }));
  }, [])

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
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-12 col-md-8'>
            <SearchSection watchList={watchList} setWatchList={setWatchList}/>
          </div>

          <div className='col-12 col-md-4 border border-dark mt-3'>
            <h1>Watch List</h1>
            <MonitoredCourses watchList={watchList} setWatchList={setWatchList} />
          </div>
        </div>
      </div>
    </>
  );
}
