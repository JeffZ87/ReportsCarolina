import { watchListCourses } from '../../utils/globals/global';

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            res.status(200).json(watchListCourses);
            break;
        case 'POST':
            let course = req.body;
            if (course.classNumber != null) {
                watchListCourses.push(course);
            }
            res.status(200).json(watchListCourses);
            break;
        case 'DELETE':
            let classNumber = req.query.classNumber;
            for (let i = 0; i < watchListCourses.length; i++) {
                if (watchListCourses[i].classNumber == classNumber) {
                    watchListCourses.splice(i, 1);
                    i = watchListCourses.length;
                }
            }
            res.status(200).json(watchListCourses);
            break;
        default:
            console.error('Unexpected request type: ' + req.method);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}