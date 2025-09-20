import { addSchedule } from "../../../lib/addSchedule";
import { day1, day2, day3, day4, day5 } from "../../../lib/schedules";


export async function GET(req) {
  try {
    await addSchedule("day1", day1);
    await addSchedule("day2", day2);
    await addSchedule("day3", day3);
    await addSchedule("day4", day4);
    await addSchedule("day5", day5);

    return new Response(JSON.stringify({ message: "Schedules uploaded successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
