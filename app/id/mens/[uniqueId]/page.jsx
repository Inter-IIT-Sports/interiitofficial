import men from "../../../../public/mens.json";

export default function MenStudentPage({ params }) {
  const student = men.find(
    (s) =>
      s.uniqueId.trim().toLowerCase() === params.uniqueId.toLowerCase()
  );

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white border border-gray-300 shadow-sm rounded-lg p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-semibold text-red-600">Student Not Found</h1>
          <p className="mt-2 text-gray-600 text-sm">
            The QR code you scanned is invalid or does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-300 shadow-lg rounded-xl p-8 max-w-md w-full">
        
        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 text-center">
          Participant Verification
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Inter IIT IITM Sports 2025
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6" />

        {/* Info Section */}
        <div className="space-y-4">

          {/* Name */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Name
            </p>
            <p className="text-lg font-medium text-gray-900">
              {student.Name}
            </p>
          </div>

          {/* Unique ID */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Unique ID
            </p>
            <p className="text-lg font-medium text-gray-900">
              {student.uniqueId}
            </p>
          </div>

          {/* IIT */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Institute
            </p>
            <p className="text-lg font-medium text-gray-900">
              {student.IIT}
            </p>
          </div>

          {/* Position */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Position
            </p>
            <p className="text-base text-gray-800">
              {student.Position}
            </p>
          </div>

          {/* Gender */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Gender
            </p>
            <p className="text-base text-gray-800">
              {student.Gender}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6" />

        {/* Footer Badge */}
        <div className="flex justify-center">
          <span className="px-4 py-1 text-sm rounded-full bg-gray-100 border border-gray-300 text-gray-700">
            Verified Record
          </span>
        </div>

      </div>
    </div>
  );
}
