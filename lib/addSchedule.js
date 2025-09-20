// lib/addSchedule.js
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export async function addSchedule(day, data) {
  // Create a reference to the 'days' subcollection under the 'aquatics' document
  const dayRef = doc(collection(db, "schedules", "aquatics", "days"), day);
  await setDoc(dayRef, data);
}
