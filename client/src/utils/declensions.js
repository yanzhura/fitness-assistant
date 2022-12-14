export const daysDeclension = (number) => {
    const lastDigit = parseInt(number.toString().split('').at(-1));
    if (lastDigit === 1) {
        return `${number} день`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${number} дня`;
    } else {
        return `${number} дней`;
    }
};

export const workoutsDeclension = (number) => {
    const lastDigit = parseInt(number.toString().split('').at(-1));
    if (lastDigit === 1) {
        return `${number} тренировку`;
    } else if (lastDigit >= 2 && lastDigit <= 4 && (number < 12 || number > 14)) {
        return `${number} тренировки`;
    } else {
        return `${number} тренировок`;
    }
};

export const repeatsDeclension = (number) => {
    const lastDigit = parseInt(number.toString().split('').at(-1));
    if (lastDigit >= 2 && lastDigit <= 4 && !(number >= 12 && number <= 14)) {
        return `раза`;
    } else {
        return `раз`;
    }
};
