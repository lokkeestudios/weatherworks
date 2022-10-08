type WeatherTimepoint =
  | {
      type: 'current' | 'forecast';
      temperature: number;
      rainPropability?: number;
      date: Date;
      icon: string;
      description: string;
    }
  | {
      type: 'sunrise' | 'sunset';
      date: Date;
      icon: string;
      description: string;
    };

export default WeatherTimepoint;
