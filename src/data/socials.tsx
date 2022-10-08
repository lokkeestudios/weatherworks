import {
  FaDiscord as DiscordIcon,
  FaGithub as GitHubIcon,
} from 'react-icons/fa';
import { HiOutlineCode as CodeIcon } from 'react-icons/hi';

const iconSize = 24;

const socials = [
  {
    title: 'View GitHub profile',
    icon: <GitHubIcon size={iconSize} />,
    link: 'https://github.lokkeestudios.com',
  },
  {
    title: 'Join Discord server',
    icon: <DiscordIcon size={iconSize} />,
    link: 'https://discord.lokkeestudios.com',
  },
  {
    title: 'View source code',
    icon: <CodeIcon size={iconSize} />,
    link: 'https://github.com/lokkeestudios/WeatherWorks',
  },
];

export default socials;
