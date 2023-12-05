// Interface for a Team document
export interface Team {
    teamID: string;
    color1: string;
    color2: string;
    logo: string;
    name: string;
}

export const DEFAULT_TEAM: Team = {
    teamID: 'defaultTeamId',
    color1: 'gray',
    color2: 'gray',
    logo: 'default_logo_url',
    name: 'Unknown Team'
};
