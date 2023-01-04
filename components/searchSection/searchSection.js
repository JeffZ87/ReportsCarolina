import { useState } from 'react';
import Searchbar from '../searchbar/searchbar';
import Course from '../course/course';

export default function SearchSection({ watchList, setWatchList }) {
    const [searchResult, setSearchResult] = useState([]);

    const addToWatchList = async(courseObj) => {
        // prevent two same courses to be added to watch list
        let isCourseRepeated = false;
        for (const watchCourse of watchList) {
            if (watchCourse.classNumber == courseObj.classNumber) {
                isCourseRepeated = true;
                alert('Course Already in Watch List');
            }
        }

        if (!isCourseRepeated) {
            let response = await fetch('/api/monitored-courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseObj)
            })
            setWatchList(await response.json());
        }
    };

    return (
        <div className='mt-3'>
            <Searchbar resultHandler={setSearchResult}/>
            <hr />
            <h1>Search Result</h1>
            {searchResult.map((course) => (
                <Course key={course.classNumber} courseObj={course} btnTxt='Add' clickHandler={addToWatchList} />
            ))}
        </div>
    );
}