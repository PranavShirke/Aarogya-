import React from "react";
import MedicalForm from "./MedicalForm";
import { Link } from "react-router-dom";

const MedicalInfo = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mb-4">
        <Link
          to="/"
          className="text-blue-600 hover:underline font-semibold text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[#15132b] mb-4">🩺 Medical Info</h2>
        <MedicalForm />
      </div>
    </div>
  );
};

export default MedicalInfo;
