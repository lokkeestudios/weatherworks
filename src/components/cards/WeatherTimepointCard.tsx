import WeatherTimepoint from '@/types/Weathertimepoint';
import Image from 'next/image';

// TODO: placeholder only!
function appendZeroIfNess(s: string) {
  return s.length === 1 ? `0${s}` : s;
}

interface Props {
  weatherTimepoint: WeatherTimepoint;
}

function WeatherTimepointCard({ weatherTimepoint }: Props) {
  return (
    <li className="flex flex-col items-center gap-y-2">
      <p className="text-sm font-medium text-slate-300">
        {weatherTimepoint.type === 'current'
          ? 'Now'
          : `${appendZeroIfNess(
              weatherTimepoint.date.getUTCHours().toString(),
            )}:${appendZeroIfNess(
              weatherTimepoint.date.getUTCMinutes().toString(),
            )}`}
      </p>
      <Image
        src={`/images/icons/weather/${weatherTimepoint.icon}.webp`}
        alt={weatherTimepoint.description}
        width={60}
        height={60}
      />
      {(weatherTimepoint.type === 'current' ||
        weatherTimepoint.type === 'forecast') &&
        weatherTimepoint.rainPropability && (
          <span
            className={`text-sm ${
              weatherTimepoint.rainPropability
                ? 'text-sky-400'
                : 'text-slate-50'
            }`}
          >
            {weatherTimepoint.rainPropability}%
          </span>
        )}
      <p className="text-lg">
        {weatherTimepoint.type === 'current' ||
        weatherTimepoint.type === 'forecast'
          ? `${Math.round(weatherTimepoint.temperature)}°`
          : weatherTimepoint.description}
      </p>
    </li>
  );
}

export default WeatherTimepointCard;
