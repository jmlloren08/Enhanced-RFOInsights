import React from "react";
import { Link } from "@inertiajs/react";

const Index = ({ message = "An unexpected error occurred." }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="text-gray-700">{message}</p>
            <Link href="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Go Home
            </Link>
        </div>
    );
};

export default Index;