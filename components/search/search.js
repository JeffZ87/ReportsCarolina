export default function Search() {
    const makeRequest = async () => {
        const response = await fetch('/api/hello');
    }

    return (
        <div>
            <button onClick={makeRequest}>Make API Call</button>
        </div>
    );
}