/**
 * Convert HTML String to DOM object.
 * @param {String} text 
 * @returns JSDOM object
 */
export function textToDOM(text) {
    const { JSDOM } = require('jsdom');  // third party library https://github.com/jsdom/jsdom
    return new JSDOM(text);
}


/**
 * Extract tokens from initial request to report.unc.edu.
 * @returns A token object containing the cookie csrf token and a middleware csrf token
 */
export async function getToken(url) {
    let csrfToken = {
        csrfMiddlewareToken: '',
        csrfCookieToken: ''
    };

    // obtain response from reports.unc.edu
    const response = await fetch(url);

    // extract token from set-cookie property 
    const setCookiesProps = response.headers.get('set-cookie');
    csrfToken.csrfCookieToken = setCookiesProps.split(';')[0].split('=')[1];
  
    // extract token from html page
    const dom = textToDOM(await response.text());
    const form = dom.window.document.getElementById('filters-form');
    csrfToken.csrfMiddlewareToken = form.querySelector('input').value;
  
    return csrfToken;
}

/**
 * Searches for classes matching the search criteria
 * @param {*} csrfToken CSRF token object
 * @param {*} searchParameter search parameter object containing search attributes
 * @return an array of class object matching the search criteria
 */
export async function searchClasses(url, csrfToken, searchParameter) {
    // sent search request to reports.unc.edu to obtain class results
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': 'csrftoken=' + csrfToken.csrfCookieToken
      },
      body: `csrfmiddlewaretoken=${csrfToken.csrfMiddlewareToken}&term=${searchParameter.term}&subject=${searchParameter.subject}&catalog_number=${searchParameter.catalogNumber}&filter-submit=`
  
    });
  
    let resultClasses = [];
  
    // extracting search results to class objects
    let resDom = textToDOM(await response.text())
    let classResultTable = resDom.window.document.getElementById('results-table');
    let classTbody = classResultTable.querySelector('tbody');
    let classTrow = classTbody.querySelectorAll('tr');
    classTrow.forEach((row) => {
      let resultClass = {
        classNumber: 0,
        subject: '',
        catalogNumber: 0,
        sectionNumber: 0,
        term: '',
        instructor: '',
        isClassOpen: false //if seats > 0 then class is open (true); false other wise
      }
      // setting the class object attributes
      resultClass.classNumber = row.innerHTML.split('<!-- class number -->')[1].split('<td>')[1].split('</td>')[0];
      resultClass.subject = searchParameter.subject;
      resultClass.catalogNumber = searchParameter.catalogNumber.toString();
      resultClass.sectionNumber = row.innerHTML.split('<!-- section number -->')[1].split('<td>')[1].split('</td>')[0];
      resultClass.term = row.innerHTML.split('<!-- term -->')[1].split('<td>')[1].split('</td>')[0];
      resultClass.instructor = row.innerHTML.split('<!-- instructor name -->')[1].split('<td>')[1].split('</td>')[0];
      let openSeatNum = row.innerHTML.split('<!-- available seats -->')[1].split('>')[1].split('<')[0];
      resultClass.isClassOpen = openSeatNum > 0;
      
      resultClasses.push(resultClass);
    });

    return resultClasses
}