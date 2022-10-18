import axios from 'axios';

type IpInformation =
  | {
      status: 'success';
      lat: number;
      lon: number;
    }
  | { status: 'fail'; message: string };

async function getIpInformation(ip: string) {
  const { data } = await axios.get<IpInformation>(
    `http://ip-api.com/json/${ip}?fields=status,message,lat,lon`,
  );

  return data;
}

export default getIpInformation;
