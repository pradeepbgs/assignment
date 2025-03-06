import { useState } from "react";
import axios from "axios";

function App() {
    const [name, setName] = useState("");
    const [greeting, setGreeting] = useState("");

    const fetchGreeting = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.get(`http://localhost:3000/api/greet?name=${name}`);

            if (response.status !== 200)
                throw new Error(response.data.message)

            setGreeting(response.data.message);

        } catch (error) {
            setGreeting(error?.message || "An error occurred.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-center">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Greeting App</h1>
                <form action="">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        onClick={fetchGreeting}
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Get Greeting
                    </button>
                </form>
                {greeting && (
                    <h2 className="mt-4 text-lg font-medium text-green-500">{greeting}</h2>
                )}
            </div>
        </div>
    );
}

export default App;
