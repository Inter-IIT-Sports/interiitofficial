import Image from 'next/image';

const ScheduleCard = ({ item }) => {
  const matchTitle = `${item.sport}${item.gender ? ` - ${item.gender}'s` : ''} ${item.matchType}`;

  const details = [];
  if (item.date) details.push(`${item.date} - ${item.time}`);
  // if (item.matchNo) details.push(`Match No: ${item.matchNo}`);
  if (item.pool) details.push(`Pool: ${item.pool}`);
  if (item.courtNo) details.push(`Court: ${item.courtNo}`);

  const statusClasses = `px-3 py-1 rounded-full text-sm font-semibold capitalize border ${
    item.status && item.status.toLowerCase() === "completed"
      ? "bg-green-100 text-green-800 border-green-300"
      : "bg-yellow-100 text-yellow-800 border-yellow-300"
  }`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={item.backgroundImage}
          alt={`${item.sport} background`}
          fill
          className="object-cover opacity-40"
        />
      </div>
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg md:text-2xl font-bold">{matchTitle}</h2>
            <p className="text-sm md:text-base text-black">{details.join(' | ')}</p>
          </div>
          {/* Status for desktop */}
          {item.status && (
            <span className={`hidden md:inline-block ${statusClasses}`}>
              {item.status}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-2">
          <p className="font-bold">{item.team1}</p>
          <p className="font-bold">{item.team2}</p>
        </div>
        {/* Status for mobile */}
        {item.status && (
          <span className={`md:hidden absolute bottom-6 right-3 ${statusClasses}`}>
            {item.status}
          </span>
        )}
      </div>
    </div>
  );
};

export default ScheduleCard;
