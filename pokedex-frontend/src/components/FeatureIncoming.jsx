import React from "react";
import { useNavigate } from "react-router-dom";

const FeatureIncoming = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-6">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">Feature Coming Soon</h1>
                    <p className="text-gray-400">Stay tuned for exciting new updates!</p>
                </div>

                {/* Message */}
                <div className="mb-6 text-center">
                    <p className="text-lg text-gray-300">
                        We're currently working on a new feature that will bring even more value to your experience.
                        We're excited to share it with you soon!
                    </p>
                    <p className="mt-4 text-sm text-gray-500">
                        Our team is dedicated to delivering the best features, and this is just the beginning.
                    </p>
                </div>

                {/* Button Section */}
                <div className="text-center">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeatureIncoming;
