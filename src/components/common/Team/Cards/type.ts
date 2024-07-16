type SocialType = {
  url: string;
  icon: string;
};

export type TeamCardType = {
  name: string;
  designation: string;
  bio?: string;
  profile_url?: string;
  img: string;
  classes?: string;
  socials?: SocialType[];
};
