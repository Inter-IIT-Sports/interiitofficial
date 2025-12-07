import women from "../../../../public/womens.json";

export default async function WomenStudentPage({ params }) {
  // 👇 FIX: Next.js 16 returns params as a Promise
  const resolvedParams = await params;

  const uniqueParam = resolvedParams?.uniqueId?.toString().trim().toLowerCase();

  if (!uniqueParam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white border border-gray-300 shadow-sm rounded-lg p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-semibold text-red-600">Invalid QR</h1>
          <p className="mt-2 text-gray-600 text-sm">QR code is broken or missing.</p>
        </div>
      </div>
    );
  }

  const student = women.find(
    (s) => s.uniqueId.trim().toLowerCase() === uniqueParam
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
        
        <h1 className="text-xl font-semibold text-gray-900 text-center">
          Participant Verification
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Inter IIT IITM Sports 2025
        </p>

        <div className="h-px bg-gray-200 my-6" />

        <div className="space-y-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Name</p>
            <p className="text-lg font-medium text-gray-900">{student.Name}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Unique ID</p>
            <p className="text-lg font-medium text-gray-900">{student.uniqueId}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Institute</p>
            <p className="text-lg font-medium text-gray-900">{student.IIT}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Position</p>
            <p className="text-base text-gray-800">{student.Position}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Gender</p>
            <p className="text-base text-gray-800">{student.Gender}</p>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-6" />

        <div className="flex justify-center">
          <span className="px-4 py-1 text-sm rounded-full bg-gray-100 border border-gray-300 text-gray-700">
            Verified Record
          </span>
        </div>

      </div>
    </div>
  );
}
