import { startClassMonitoring, isCourseMonitoringOn, setIsCourseMonitoringOn, isMonitoringCycleRunning } from "../../utils/utils";

export default function handler(req, res) {
    switch (req.method) {
        case 'GET':  // get notification status
            res.status(200).json(isCourseMonitoringOn);
            break;

        case 'POST':  // update notification status
            if (!isCourseMonitoringOn && req.body == 'true' && !isMonitoringCycleRunning) {
                startClassMonitoring();
            }
            setIsCourseMonitoringOn(req.body == 'true');
            res.status(200).json(isCourseMonitoringOn);
            break;
        default:
            console.error('Unexpected request type: ' + req.method);
            res.status(405).end(`Method ${req.method} Not Allowed`);
            break;
    }
}