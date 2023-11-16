// Interface for a Team document
export interface Team {
    color1: string;
    color2: string;
    logo: string;
    name: string;

  }

  export const DEFAULT_TEAM: Team = {
    color1: 'gray',
    color2: 'gray',
    logo: 'default_logo_url',
    name: 'Unknown Team'
};

