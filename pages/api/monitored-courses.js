import { queuedCourses } from '../../globals/queuedCourses';

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            res.status(200).json(queuedCourses);
            break;
        case 'POST': 
            let course = req.body;
            if (course.classNumber != null) {
                queuedCourses.push(course);
            }
            res.status(200).json(queuedCourses);
            break;
        case 'DELETE':
            let classNumber = req.query.classNumber;
            for (let i = 0; i < queuedCourses.length; i++) {
                if (queuedCourses[i].classNumber == classNumber) {
                    queuedCourses.splice(i, 1);
                    i = queuedCourses.length;
                }
            }
            res.status(200).json(queuedCourses);
            break;
        default:
            console.error('Unexpected request type: ' + req.method);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}