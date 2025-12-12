import { client } from "../../../lib/sanity";
import ScheduleClient from "../../../Components/ScheduleClient";

// This GROQ query fetches all necessary fields, sorted by scheduledTime.
const SCHEDULE_QUERY = `*[_type == "event"] | order(scheduledTime asc) {
  _id,
  matchNo,
  sport,
  gender,
  matchType,
  pool,
  iit,
  team1,
  team2,
  scheduledTime,
  courtNo,
  status,
  winner,
  scoreDetails,
}`;

// This tells Next.js to check Sanity for updates every 60 seconds in production.
export const revalidate = 60;

export default async function ScheduleServerPage() {
  let initialScheduleData = [];
  try {
    initialScheduleData = await client.fetch(SCHEDULE_QUERY);
  } catch (error) {
    console.error("Server Fetch Error from Sanity:", error);
  }

  if (initialScheduleData.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center min-h-screen">
        <h1 className="text-xl text-red-600">
          Error: Could not load schedule data.
        </h1>
      </div>
    );
  }

  return <ScheduleClient initialSchedule={initialScheduleData} />;
}
