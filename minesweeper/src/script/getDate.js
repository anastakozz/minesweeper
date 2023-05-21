export function getDateTime () {
    const date = new Date();
    const options = {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const currDate = date.toLocaleDateString('en-En', options)
    return(currDate);
}

