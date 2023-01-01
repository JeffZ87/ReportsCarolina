import { getToken, searchClasses } from '../../utils/utils'
import { reportsURL } from '../../globals/urls'

/**
 * Courses available from reports.unc.edu.
 * @param {*} req 
 * @param {*} res 
 */
export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      let csrfToken = await getToken(reportsURL);
      const searchParameter = req.body;
      let result = await searchClasses(reportsURL, csrfToken, searchParameter);
      res.status(200).json(result);
      break;

    default:
      console.error('Unexpected request type: ' + req.method);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}

