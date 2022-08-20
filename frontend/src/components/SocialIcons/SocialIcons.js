import { useState, useCallback } from 'react';
import isEmpty from 'lodash/isEmpty';

import SocialIconEditModal from '../SocialIconEditModal';
import { useDataContext } from 'context/Data';
import { removeEmpty } from 'utils';
import { ReactComponent as TwitterIcon } from '../../assets/icons/social/twitter.svg';
import { ReactComponent as FacebookIcon } from '../../assets/icons/social/facebook.svg';
import { ReactComponent as TwitchIcon } from '../../assets/icons/social/twitch.svg';
import { ReactComponent as TikTokIcon } from '../../assets/icons/social/tiktok.svg';
import { ReactComponent as YouTubeIcon } from '../../assets/icons/social/youtube.svg';
import { ReactComponent as DiscordIcon } from '../../assets/icons/social/discord.svg';
import { ReactComponent as InstagramIcon } from '../../assets/icons/social/instagram.svg';
import { ReactComponent as LinkedinIcon } from '../../assets/icons/social/linkedin.svg';
import { ReactComponent as SnapchatIcon } from '../../assets/icons/social/snapchat.svg';
import { EditIcon } from 'components/Icons/EditIcon';
import { ReactComponent as PlusCircleIcon } from 'assets/icons/plus-circle.svg';
import './style.scss';

const socialLinkOptions = [
  {
    type: 'twitter',
    icon: TwitterIcon,
    placeholder: 'https://twitter.com/',
  },
  {
    type: 'facebook',
    icon: FacebookIcon,
    placeholder: 'https://facebook.com/',
  },
  { type: 'twitch', icon: TwitchIcon, placeholder: 'https://twitch.com/' },
  { type: 'tiktok', icon: TikTokIcon, placeholder: 'https://tiktok.com/' },
  {
    type: 'youtube',
    icon: YouTubeIcon,
    placeholder: 'https://youtube.com/',
  },
  {
    type: 'discord',
    icon: DiscordIcon,
    placeholder: 'https://discord.com/',
  },
  {
    type: 'instagram',
    icon: InstagramIcon,
    placeholder: 'https://instagram.com/',
  },
  {
    type: 'linkedin',
    icon: LinkedinIcon,
    placeholder: 'https://linkedin.com/',
  },
  {
    type: 'snapchat',
    icon: SnapchatIcon,
    placeholder: 'https://snapchat.com/',
  },
];

const SocialIcons = ({ isView }) => {
  const [show, setShow] = useState(false);
  const { state, actions } = useDataContext();
  const socialLinks = state['social'] || [];

  const handleClose = useCallback(() => {
    setShow(false);
  }, []);

  const handleShow = useCallback(() => {
    setShow(true);
  }, []);

  const handleUpdate = useCallback((socialLinks) => {
    actions.updateStore({
      path: 'social',
      value: socialLinks,
    });
  }, []);

  return (
    <div className="social-icons__wrapper">
      {!isView && isEmpty(removeEmpty(socialLinks)) && (
        <span className="social-icons__add-link" onClick={handleShow}>
          <PlusCircleIcon />
          Add Social Links
        </span>
      )}
      {socialLinkOptions.map((linkItem, idx) => {
        const Icon = linkItem.icon;
        if (socialLinks[linkItem.type]) {
          return (
            <a href={socialLinks[linkItem.type]} key={idx} target="_blank" rel="noreferrer">
              <Icon />
            </a>
          );
        }
      })}
      <div className="social-icons__action-wrapper">
        {!isView && !isEmpty(removeEmpty(socialLinks)) && (
          <EditIcon name="social-links" onClick={handleShow} />
        )}
      </div>
      <SocialIconEditModal
        socialLinks={socialLinks}
        socialLinkOptions={socialLinkOptions}
        show={show}
        onClose={handleClose}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default SocialIcons;
