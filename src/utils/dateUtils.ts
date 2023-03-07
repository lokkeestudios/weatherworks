import WeatherTimepoint from '@/types/Weathertimepoint';
import { CurrentWeather, ThreeHourForecast } from '@/utils';

const NUMBER_OF_FORECASTED_DAYS = 3;
const TIMEPOINTS_PER_DAY = 24 / 3;

function toTwoDigitNumberString(number: number) {
  return `0${number}`.slice(-2);
}

function dateToTimeString(date: Date) {
  const hours = toTwoDigitNumberString(date.getUTCHours());
  const minutes = toTwoDigitNumberString(date.getUTCMinutes());

  return `${hours}:${minutes}`;
}

function dateTimeToTimezoneDate(dateTime: number, timezone: number) {
  return new Date((dateTime + timezone) * 1000);
}

function getCurrentTimepoint(currentWeatherData: CurrentWeather) {
  const currentTimepoint: WeatherTimepoint = {
    type: 'current',
    temperature: currentWeatherData.main.temp,
    date: dateTimeToTimezoneDate(
      currentWeatherData.dt,
      currentWeatherData.timezone,
    ),
    icon: currentWeatherData.weather[0].icon,
    description: currentWeatherData.weather[0].description,
  };

  return currentTimepoint;
}

function getSunriseAndSunsetTimepoints(
  currentWeatherData: CurrentWeather,
  numberOfForecastedDays: number,
) {
  const sunriseDate = dateTimeToTimezoneDate(
    currentWeatherData.sys.sunrise,
    currentWeatherData.timezone,
  );
  const sunsetDate = dateTimeToTimezoneDate(
    currentWeatherData.sys.sunset,
    currentWeatherData.timezone,
  );

  const currentDateTime = dateTimeToTimezoneDate(
    currentWeatherData.dt,
    currentWeatherData.timezone,
  ).getTime();

  const isSunriseDateInThePast = sunriseDate.getTime() < currentDateTime;
  const isSunsetDateInThePast = sunriseDate.getTime() < currentDateTime;

  const sunriseDayOffset = isSunriseDateInThePast ? 1 : 0;
  const sunsetDayOffset = isSunsetDateInThePast ? 1 : 0;

  const sunriseAndSunsetTimepoints: WeatherTimepoint[] = [];

  for (let i = 0; i < numberOfForecastedDays; i++) {
    const currentSunriseDate = new Date(sunriseDate.getTime());
    const currentSunsetDate = new Date(sunsetDate.getTime());
    currentSunriseDate.setUTCDate(
      sunriseDate.getUTCDate() + i + sunriseDayOffset,
    );
    currentSunsetDate.setUTCDate(sunsetDate.getUTCDate() + i + sunsetDayOffset);

    const sunriseTimepoint: WeatherTimepoint = {
      type: 'sunrise',
      date: currentSunriseDate,
      icon: '00d',
      description: 'Sunrise',
    };
    const sunsetTimepoint: WeatherTimepoint = {
      type: 'sunset',
      date: currentSunsetDate,
      icon: '00n',
      description: 'Sunset',
    };
    sunriseAndSunsetTimepoints.push(sunriseTimepoint, sunsetTimepoint);
  }

  return sunriseAndSunsetTimepoints;
}

function getForecastTimepoints(
  threeHourForecastData: ThreeHourForecast,
  timezone: number,
) {
  const maxForecastTimepoints = TIMEPOINTS_PER_DAY * NUMBER_OF_FORECASTED_DAYS;

  const forecastTimepoints: WeatherTimepoint[] = [];

  threeHourForecastData.list
    .slice(0, maxForecastTimepoints)
    .forEach((forecastedWeather) => {
      const { icon, description, main } = forecastedWeather.weather[0];
      const { pop: rainPropability } = forecastedWeather;
      const rainProbabilityDataExists =
        main === 'Rain' && rainPropability !== undefined;

      forecastTimepoints.push({
        type: 'forecast',
        temperature: forecastedWeather.main.temp,
        date: dateTimeToTimezoneDate(forecastedWeather.dt, timezone),
        icon,
        description,
        rainPropability: rainProbabilityDataExists
          ? Math.round(rainPropability * 100)
          : undefined,
      });
    });

  return forecastTimepoints;
}

function getWeatherTimepoints(
  currentWeatherData: CurrentWeather,
  threeHourForecastData: ThreeHourForecast,
) {
  const weatherTimepoints: WeatherTimepoint[] = [];

  const currentTimepoint = getCurrentTimepoint(currentWeatherData);
  weatherTimepoints.push(currentTimepoint);

  const sunriseAndSunsetTimepoints = getSunriseAndSunsetTimepoints(
    currentWeatherData,
    NUMBER_OF_FORECASTED_DAYS,
  );
  weatherTimepoints.push(...sunriseAndSunsetTimepoints);

  const forecastTimepoints = getForecastTimepoints(
    threeHourForecastData,
    currentWeatherData.timezone,
  );
  weatherTimepoints.push(...forecastTimepoints);

  const sortByDatesCompareFn = (a: WeatherTimepoint, b: WeatherTimepoint) =>
    a.date.getTime() - b.date.getTime();

  const weatherTimepointsSortedByDate =
    weatherTimepoints.sort(sortByDatesCompareFn);

  return weatherTimepointsSortedByDate;
}

function sortWeatherTimepointsByDay(
  todaysDate: Date,
  weatherTimepoints: WeatherTimepoint[],
) {
  const weatherTimepointsByDay: {
    dayOfWeek: string;
    weatherTimepoints: WeatherTimepoint[];
  }[] = [];

  weatherTimepoints.forEach((weatherTimepoint) => {
    const { date: timepointDate } = weatherTimepoint;
    const timepointDay = timepointDate.getUTCDate();

    if (!weatherTimepointsByDay[timepointDay]) {
      const isTimepointDayToday = timepointDay === todaysDate.getUTCDate();

      const nameOfTimepointDay = timepointDate.toLocaleDateString('en', {
        weekday: 'long',
      });

      weatherTimepointsByDay[timepointDay] = {
        dayOfWeek: isTimepointDayToday ? 'Today' : nameOfTimepointDay,
        weatherTimepoints: [],
      };
    }

    weatherTimepointsByDay[timepointDay].weatherTimepoints.push(
      weatherTimepoint,
    );
  });

  return weatherTimepointsByDay;
}

export {
  dateToTimeString,
  dateTimeToTimezoneDate,
  getWeatherTimepoints,
  sortWeatherTimepointsByDay,
};
