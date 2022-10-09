import {
  FaDiscord as DiscordIcon,
  FaGithub as GitHubIcon,
} from 'react-icons/fa';
import { HiOutlineCode as CodeIcon } from 'react-icons/hi';

const ICON_SIZE = 22;

const socials = [
  {
    title: 'View GitHub profile',
    icon: <GitHubIcon size={ICON_SIZE} />,
    link: 'https://github.lokkeestudios.com',
  },
  {
    title: 'Join Discord server',
    icon: <DiscordIcon size={ICON_SIZE} />,
    link: 'https://discord.lokkeestudios.com',
  },
  {
    title: 'View source code',
    icon: <CodeIcon size={ICON_SIZE} />,
    link: 'https://github.com/lokkeestudios/WeatherWorks',
  },
];

export default socials;
