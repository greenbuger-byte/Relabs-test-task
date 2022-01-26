export const useHumanTime = (format) => {
    const dateList = {
        D: 'getDay',
        Y: 'getFullYear',
        M: 'getMonth',
        h: 'getHours',
        m: 'getMinutes',
    }

    function addZeroBefore(cropData) {
        const crop = (`0${cropData}`).slice(-2);
        return crop === '00' ? '12' : crop;
    }

    return time => {
        const date = new Date(time  * 1000 );
        return format
            .split('')
            .map(sign =>
                (sign in dateList)
                ? addZeroBefore(date[dateList[sign]]())
                : sign)
            .join('');
    }
}