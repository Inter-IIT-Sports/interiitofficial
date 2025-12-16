import Image from "next/image";
import { useEffect, useState } from 'react';

const ScheduleCard = ({ item }) => {
  const [status, setStatus] = useState(item.status || 'Upcoming');
  const isCompleted = status.toLowerCase() === 'completed';
  const isAthletics = ['athletics'].includes(item.sport?.toLowerCase());
  const isWeightlifting = item.sport?.toLowerCase() === 'weightlifting';

  useEffect(() => {
    if (item.status && item.status.toLowerCase() === 'completed') {
      setStatus('Completed');
      return;
    }

    else {
      setStatus('upcoming');
      return;
    }
  }, [item.status]);

  const getVenueLabel = (sport) => {
    const s = sport?.toLowerCase();
    if (['cricket', 'football', 'hockey'].includes(s)) return 'Ground';
    if (s === 'table tennis') return 'Table';
    return 'Court';
  };

  const matchTitle = isAthletics
    ? `${item.sport}${item.gender ? ` - ${item.gender}` : ""}`
    : `${item.sport}${item.gender ? ` - ${item.gender}'s` : ""} ${item.matchType}`;

  let detailsLine = '';
  if (isAthletics) {
    let sessionText = '';
    if (item.session) {
      const firstWord = item.session.split(' ')[0];
      sessionText = `Session: ${firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase()}`;
    }
    const dateTime = item.date ? `${item.date} - ${item.time}` : '';
    const venue = item.venue ? `Venue: ${item.venue}` : '';
    detailsLine = [sessionText, dateTime, venue].filter(Boolean).join(' | ');
  } else {
    const details = [];
    if ((item.matchType === 'League' && item.pool) || item.sport.toLowerCase() === 'weightlifting') {
      details.push(`Pool: ${item.pool}`);
    }
    if (item.courtNo) details.push(`${getVenueLabel(item.sport)}: ${item.courtNo}`);
    if (item.date) details.push(`${item.date} - ${item.time}`);
    detailsLine = details.join(" | ");
  }

  const statusClasses = `px-3 py-1 rounded-full text-sm font-semibold capitalize border ${
    isCompleted
      ? 'bg-green-100 text-green-800 border-green-300'
      : status === 'Live'
      ? 'bg-red-100 text-red-800 border-red-300'
      : status === 'TBD'
      ? 'bg-blue-100 text-blue-800 border-blue-300'
      : 'bg-yellow-100 text-yellow-800 border-yellow-300'
  }`;

  const RenderResults = ({ item }) => {
    const isAthletics = ['athletics', 'weightlifting'].includes(item.sport?.toLowerCase());
    const isFinal = item.matchType?.toLowerCase() === 'final' || item.matchType?.toLowerCase() === 'finals';

    if (isAthletics) {
      const medalIcons = ['🥇', '🥈', '🥉', '🏵️'];
      const positionSuffix = (n) => {
        const j = n % 10, k = n % 100;
        if (j == 1 && k != 11) return "st";
        if (j == 2 && k != 12) return "nd";
        if (j == 3 && k != 13) return "rd";
        return "th";
      };

      return (
        <div className="mt-2 space-y-2">
          {item.results?.slice(0, 4).map((result, index) => (
            <div key={index} className="flex items-center text-base">
              {isFinal ? (
                <span className="text-xl mr-3 w-6 text-center">{medalIcons[index]}</span>
              ) : (
                <span className="font-semibold mr-2">{index + 1}{positionSuffix(index + 1)}:</span>
              )}
              <p>
                {result.participant}
                {result.result && <span className="text-sm text-gray-600 ml-2">({result.result})</span>}
              </p>
            </div>
          ))}
        </div>
      );
    }

    const winnerResult = item.results?.find(r => r.position?.toLowerCase() === 'winner');

    return (
      <div className="mt-2 space-y-1 text-left">
        {winnerResult ? (
          <>
            <div className="flex items-center justify-start">
              {winnerResult.logo && (
                <Image src={winnerResult.logo} alt="winner logo" width={40} height={40} className="mr-2" />
              )}
              <p className="text-lg">
                <span className="font-semibold">Winner:</span> {winnerResult.participant}
              </p>
            </div>
            <p className="text-lg">
              <span className="font-semibold">Scores:</span> {winnerResult.result}
            </p>
          </>
        ) : (
          <>
            <p className="text-lg"><span className="font-semibold">Winner:</span> TBD</p>
            <p className="text-lg"><span className="font-semibold">Scores:</span> --</p>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
      {item.backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={item.backgroundImage}
            alt={`${item.sport} background`}
            fill
            className="object-cover opacity-40"
          />
        </div>
      )}
      <div className={`p-4 relative z-10 ${isAthletics ? "min-h-[10rem]" : ""}`}>
        <div className="flex justify-between items-start gap-4">
          <div>
            <h2 className="text-lg md:text-2xl font-bold">{matchTitle}</h2>
            <p className="text-sm md:text-base text-black">{detailsLine}</p>
            {isAthletics && (
              <p className="text-lg md:text-lg font-semibold mt-4">
                {item.event} - {item.matchType}
              </p>
            )}
          </div>
          <span className={`hidden md:inline-block ${statusClasses}`}>
            {status}
          </span>
        </div>

        <div className="mt-4">
          {/* Participant Info - always visible unless it's athletics (info is already above) */}
          {isWeightlifting ? (
            <div className="space-y-2">
              <p className="font-semibold">Weighing Time: {item.team1}</p>
              <p className="font-semibold">Reporting Time: {item.team2}</p>
            </div>
          ) : !isAthletics && (
            <>
              {/* Mobile View */}
              <div className="space-y-2 md:hidden">
                <div className="flex items-center">
                  {item.team1Logo && <Image src={item.team1Logo} alt="team 1 logo" width={24} height={24} className="mr-2" />}
                  <p className="font-semibold">{item.team1}</p>
                </div>
                <div className="flex items-center">
                  {item.team2Logo && <Image src={item.team2Logo} alt="team 2 logo" width={24} height={24} className="mr-2" />}
                  <p className="font-semibold">{item.team2}</p>
                </div>
              </div>
              {/* Desktop View */}
              <div className="hidden md:flex items-center text-lg font-semibold">
                {item.team1Logo && <Image src={item.team1Logo} alt="team 1 logo" width={40} height={40} className="mr-2" />}
                <p>{item.team1}</p>
                <p className="text-base font-normal mx-4">vs</p>
                <p>{item.team2}</p>
                {item.team2Logo && <Image src={item.team2Logo} alt="team 2 logo" width={40} height={40} className="ml-2" />}
              </div>
            </>
          )}

          {/* Results - only visible if the match is completed */}
          {isCompleted && (
            <div className="mt-2">
              <RenderResults item={item} />
            </div>
          )}
        </div>

        <span className={`md:hidden absolute bottom-6 right-3 ${statusClasses}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default ScheduleCard;