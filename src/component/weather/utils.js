const getFormattedTemp = (temp) => (temp > 0 ? `+${Math.round(temp)}` : Math.round(temp));

export default getFormattedTemp;
