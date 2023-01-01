export default function Search() {
    const sendRequest = async () => {
        const data = {
            term: '2022+Fall',
            subject: 'COMP',
            catalogNumber: '455'
        };
        const response = await fetch('/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        response.json().then((res) => {
            console.log(res);
        });

    }

    return (
        <div>
            <button onClick={sendRequest}>Search for classes</button>
        </div>
    );
}