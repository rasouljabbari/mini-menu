export const useBetweenDates = (start, end) => {
    let startDate = new Date(start)
    let endDate = new Date(end)

    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
        dates.push(new Date(date).toLocaleDateString('fa'));
        date.setDate(date.getDate() + 1);
    }

    return dates;
}
