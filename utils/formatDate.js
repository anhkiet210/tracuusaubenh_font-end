const formatDate = (date) => {
    const newDate = new Date(date);
    const h = newDate.getHours();
    const m = newDate.getMinutes();
    const day = newDate.getDate();
    const mon = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return h + ':' + m + ', ' + day + '-' + mon + '-' + year;
};

export default formatDate;
