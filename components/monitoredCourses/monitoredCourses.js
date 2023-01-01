export default function MonitoredCourses() {
    const getMonitoredCourses = async () => {
        let response = await fetch('/api/monitored-courses');
        response.json().then((res) => {
            console.log(res);
        });
    }

    const deleteMonitoredCourses = async () => {
        let classNumber = '5675'
        let response = await fetch('/api/monitored-courses?classNumber=' + classNumber, {
            method: 'DELETE',
        });
        response.json().then((res) => {
            console.log(res);
        });
    }

    const addCourse = async () => {
        let course = {
            classNumber: '4926',
            subject: 'ECON',
            catalogNumber: '101',
            sectionNumber: '001',
            term: '2022 Fall',
            instructor: 'Staub,Kalina Marie',
            isClassOpen: false //if seats > 0 then class is open (true); false other wise
        };
        
        let response = await fetch('/api/monitored-courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        });
        response.json().then((res) => {
            console.log(res);
        });
    }

    return (
        <div>
            <button onClick={getMonitoredCourses}>monitored button</button>
            <button onClick={deleteMonitoredCourses}>delete button</button>
            <button onClick={addCourse}>add button</button>
        </div>
    );
}