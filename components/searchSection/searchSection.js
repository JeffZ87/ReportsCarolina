import { useState } from 'react';
import Searchbar from '../searchbar/searchbar';
import Course from '../course/course';

export default function SearchSection({ waitListListener }) {
    const [searchResult, setSearchResult] = useState([]);

    const addToWatchList = async(courseObj) => {
        let response = await fetch('/api/monitored-courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(courseObj)
        })
        waitListListener(await response.json());
    };

    return (
        <div className='mt-3'>
            <Searchbar resultHandler={setSearchResult}/>
            <hr />
            <h1>Search Result</h1>
            {searchResult.map((course) => (
                <Course courseObj={course} btnTxt='Add' clickHandler={addToWatchList} />
            ))}
        </div>
    );
}