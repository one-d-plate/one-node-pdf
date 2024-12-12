export const EnvCheck = (env: string | undefined): string => {
    if (typeof env == undefined) {
        return 'local'
    }
    const envMap: { [key: string]: string } = {
        loc        : 'local',
        local      : 'local',
        dev        : 'development',
        development: 'development',
        prd       : 'production',
        prod       : 'production',
        production : 'production',
    };

    return envMap[env as string] || 'unknown';
};
