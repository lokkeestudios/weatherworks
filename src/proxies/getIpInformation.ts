import axios from 'axios';

interface IpInformation {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

async function getIpInformation(ip: string) {
  const { data } = await axios.get<IpInformation>(
    `http://ip-api.com/json/${ip}`,
  );

  return data;
}

export default getIpInformation;
