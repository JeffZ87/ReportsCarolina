import { useState } from 'react';

export default function Searchbar({ resultHandler }) {
    const [isFormDisabled, setIsFormDisabled] = useState(false);

    const handleSubmit = async (event) => {
        setIsFormDisabled(true);
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();
    
        // Get data from the form.
        const data = {
          term: event.target.term.value,
          subject: event.target.subject.value,
          catalogNumber: event.target.catalogNumber.value,
        };
    
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
    
        // API endpoint where we send form data.
        const endpoint = '/api/courses';
    
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        };
    
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);
        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        resultHandler(result);
        setIsFormDisabled(false);
    };


    return (
        <form className='m-1 p-2 border border-dark' onSubmit={handleSubmit}>
            <div className='form-group'>
                <label>Term<span className='text-danger'>*</span></label>
                <input type='text' className='form-control' placeholder='Enter Term' name='term' required />
                    <small id='emailHelp' className='form-text'>2022 Spring, 2023 Fall, ...</small>
            </div>
            <div className='form-group'>
                <label>Subject<span className='text-danger'>*</span></label>
                <input type='text' className='form-control' aria-describedby='emailHelp' placeholder='Enter Subject' name='subject' required />
                    <small id='emailHelp' className='form-text'>COMP, STOR, MATH, CHEM, ...</small>
            </div>
            <div className='form-group'>
                <label>Catalog Number<span className='text-danger'>*</span></label>
                <input type='text' className='form-control' placeholder='Enter CatalogNumber' name='catalogNumber'required />
            </div>
            <button type='submit' className='btn btn-primary mt-2' disabled={isFormDisabled}>Submit</button>
        </form>
    );
}