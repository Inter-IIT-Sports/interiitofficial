import { useState, useEffect, useMemo } from 'react';
import { sportImages } from './sportImageMapping';

const iits = ["IIT Madras", "IIT Hyderabad", "IIT Tirupati"];
const dates = [
 "All Dates", "13th Dec", "14th Dec", "15th Dec", "16th Dec", "17th Dec", "18th Dec",
 "19th Dec", "20th Dec", "21st Dec"
];
const iitSports = {
 "IIT Madras": ["Badminton", "Basketball", "Squash", "Table Tennis"],
 "IIT Tirupati": ["Tennis", "Weightlifting"],
 "IIT Hyderabad": ["Athletics", "Chess", "Cricket", "Football", "Hockey", "Volleyball"],
};
const allSports = ["All Sports", "Athletics", "Badminton", "Basketball", "Chess", "Cricket",
"Football", "Hockey", "Squash", "TableTennis", "Tennis", "Volleyball", "Weightlifting"];

// CRITICAL FIX: The hook now accepts the initial data from the server
const useSchedule = (initialSchedule = []) => { 
 const [schedule, setSchedule] = useState(initialSchedule);
 const [loading, setLoading] = useState(false); 
 
 const [activeIit, setActiveIit] = useState(iits[0]);
 const [selectedSport, setSelectedSport] = useState("All Sports");
 const [selectedDate, setSelectedDate] = useState("All Dates");
 
 const processedSchedule = useMemo(() => {
  if (schedule.length === 0) return [];
  
  // Helper function for date comparison
  const parseSanityDateTime = (item) => {
   return item.scheduledTime ? new Date(item.scheduledTime) : new Date(0);
  };

  const sortedSchedule = [...schedule].sort((a, b) => {
   const dateA = parseSanityDateTime(a);
   const dateB = parseSanityDateTime(b);

   // Status sorting logic
   if (a.status === "upcoming" && b.status !== "upcoming") {
    return -1;
   }
   if (a.status !== "upcoming" && b.status === "upcoming") {
    return 1;
   }

   return dateA - dateB;
  });

  const lastImageIndex = {};
  const processed = sortedSchedule.map((item) => {
   if (!item || !item.sport) return item;

   let formattedDate = null;
   let formattedTime = null;
   
   if (item.scheduledTime) {
    const dateObj = new Date(item.scheduledTime);
    const day = dateObj.getDate();
    
    let suffix = "th";
    if (!isNaN(day)) {
     if (day === 1 || day === 21 || day === 31) suffix = "st";
     else if (day === 2 || day === 22) suffix = "nd";
     else if (day === 3 || day === 23) suffix = "rd";
     formattedDate = `${day}${suffix} Dec`;
    }
    
    // Time extraction logic
    formattedTime = dateObj.toLocaleTimeString("en-US", {
     hour: "numeric",
     minute: "2-digit",
     hour12: true,
    });
   };

   const sport = item.sport.toLowerCase();
   const images = sportImages[sport];
   let backgroundImage = "/images/main_meet_bg_image.jpg";

   // Image assignment logic
    if (images && images.length > 0) {
        if (lastImageIndex[sport] === undefined) {
            lastImageIndex[sport] = 0;
        } else {
            lastImageIndex[sport] = (lastImageIndex[sport] + 1) % images.length;
        }
        backgroundImage = images[lastImageIndex[sport]];
    }

   return {
    ...item,
    date: formattedDate, 
    time: formattedTime,
    backgroundImage: backgroundImage,
   };
  });
  
  return processed;
 }, [schedule]);

 useEffect(() => {
  const getOrdinal = (d) => {
   if (d > 3 && d < 21) return "th";
   switch (d % 10) {
    case 1:
     return "st";
    case 2:
     return "nd";
    case 3:
     return "rd";
    default:
     return "th";
   }
  };

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString("default", { month: "short" });

  const formattedToday = `${currentDay}${getOrdinal(currentDay)} ${currentMonth}`;

  const eventStartDay = parseInt(dates[1]);
  const eventStartDate = new Date(2025, 11, eventStartDay);

  if (today < eventStartDate) {
   setSelectedDate("All Dates");
  } else if (dates.includes(formattedToday)) {
   setSelectedDate(formattedToday);
  } else {
   setSelectedDate("All Dates");
  }
 }, []);


 const availableSports = useMemo(() => {
  const newSports = iitSports[activeIit]
   ? ["All Sports", ...iitSports[activeIit]]
   : allSports;
  if (!newSports.includes(selectedSport)) {
   setSelectedSport("All Sports");
  }
  return newSports;
 }, [activeIit, selectedSport]);

 const filteredSchedule = useMemo(() => {
  return processedSchedule.filter((item) => {
   if (!item) return false;
   const iitMatch = item.iit === activeIit;
   const sportMatch =
    selectedSport === "All Sports" || item.sport === selectedSport;
   const dateMatch =
    selectedDate === "All Dates" || item.date === selectedDate;
   return iitMatch && sportMatch && dateMatch;
  });
 }, [processedSchedule, activeIit, selectedSport, selectedDate]);

 return {
  loading,
  iits,
  dates,
  activeIit,
  setActiveIit,
  selectedSport,
  setSelectedSport,
  selectedDate,
  setSelectedDate,
  availableSports,
  filteredSchedule,
 };
};

export default useSchedule;