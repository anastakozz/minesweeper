export function getDateTime () {
    const date = new Date();
    const options = {month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const currDate = date.toLocaleDateString('en-Us', options)
    return(currDate);
}

