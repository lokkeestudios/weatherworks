import WeatherTimepoint from '@/types/Weathertimepoint';
import { dateToTimeString } from '@/utils/dateUtils';
import Image from 'next/image';
import { forwardRef } from 'react';

interface Props {
  weatherTimepoint: WeatherTimepoint;
}

const WeatherTimepointCard = forwardRef<HTMLLIElement, Props>(
  ({ weatherTimepoint }, ref) => {
    const { type, date, description, icon } = weatherTimepoint;

    const isNotSunriseOrSunsetTimepoint =
      type === 'current' || type === 'forecast';

    return (
      <li
        ref={ref}
        className="flex flex-col items-center justify-between"
      >
        <p className="font-medium text-neutrals-300 text-sm">
          {type === 'current' ? 'Now' : dateToTimeString(date)}
        </p>
        <Image
          src={`/images/icons/weather/${icon}.webp`}
          alt={description}
          width={256}
          height={256}
          className="h-11 w-11 md:h-16 md:w-16"
        />
        {isNotSunriseOrSunsetTimepoint && weatherTimepoint.rainPropability && (
          <span className="font-semibold text-sky-400 text-xs">
            {weatherTimepoint.rainPropability}%
          </span>
        )}
        <p className="text-base">
          {isNotSunriseOrSunsetTimepoint
            ? `${Math.round(weatherTimepoint.temperature)}°`
            : description}
        </p>
      </li>
    );
  },
);

export default WeatherTimepointCard;
