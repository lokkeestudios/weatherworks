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
    <li className="flex flex-col items-center justify-between">
      <p className="font-medium text-neutrals-300 text-sm">
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
        width={256}
        height={256}
        loading="lazy"
        className="h-11 w-11 md:h-16 md:w-16"
      />
      {(weatherTimepoint.type === 'current' ||
        weatherTimepoint.type === 'forecast') &&
        weatherTimepoint.rainPropability && (
          <span className="font-semibold text-sky-400 text-xs">
            {weatherTimepoint.rainPropability}%
          </span>
        )}
      <p className="text-base">
        {weatherTimepoint.type === 'current' ||
        weatherTimepoint.type === 'forecast'
          ? `${Math.round(weatherTimepoint.temperature)}°`
          : weatherTimepoint.description}
      </p>
    </li>
  );
}

export default WeatherTimepointCard;
