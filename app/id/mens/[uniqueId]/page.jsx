import men from "@/../public/mens.json";

export default function MenStudentPage({ params }) {
  const student = men.find(
    (s) =>
      s.uniqueId.trim().toLowerCase() === params.uniqueId.toLowerCase()
  );

  if (!student) {
    return <h1 className="text-center mt-10">Student Not Found</h1>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg p-6 rounded-xl text-center">
        <h1 className="text-2xl font-bold">{student.Name}</h1>
        <p className="mt-2 text-gray-600">{student.uniqueId}</p>
        <p className="mt-1">{student.IIT}</p>
        <p className="text-sm text-gray-400">{student.Position}</p>
      </div>
    </div>
  );
}
