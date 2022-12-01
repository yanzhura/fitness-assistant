export const capitalize = (string) => {
    const firstCapital = string[0].toUpperCase();
    const rest = string.length > 0 ? string.slice(1) : '';
    return [firstCapital, ...rest].join('');
};
