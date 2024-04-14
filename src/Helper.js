export  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString('fr-FR', { hour: 'numeric', minute: 'numeric' });
}


export const groupForecastByDay = (forecastData) => {
    if (!forecastData) return [];

    const groupedForecast = {};
    forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toLocaleDateString('fr-FR', { weekday: 'long' });

    if (!groupedForecast[day]) {
        groupedForecast[day] = [];
    }
    groupedForecast[day].push(item);
    });

    return Object.entries(groupedForecast);
};

export const formatDescription = (description) => {
    const words = description.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}