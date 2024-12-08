export const EnvCheck = (env: string): string => {
    const envMap: { [key: string]: string } = {
        loc        : 'local',
        local      : 'local',
        dev        : 'development',
        development: 'development',
        prd       : 'production',
        prod       : 'production',
        production : 'production',
    };

    return envMap[env] || 'unknown';
};
