const apiKey = '64d9d10d6909b3d2fb434647f1dd9c2a';

document.getElementById('generate').addEventListener('click', async () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    try {
        const weatherData = await fetchWeatherData(zip);

        await postData('/add', {
            date: new Date().toLocaleDateString(),
            temperature: weatherData.temp,
            userResponse: feelings
        });

        retrieveData();
    } catch (error) {
        console.log('Error during fetching or posting data:', error);
    }
});

const fetchWeatherData = async (zip) => {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}&units=imperial`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return {
            temp: data.main.temp
        };
    } catch (error) {
        console.log('Error fetching weather data:', error);
        return { temp: 'Unavailable' };
    }
};

const postData = async (url = '', data = {}) => {
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    } catch (error) {
        console.log('Error posting data:', error);
    }
};

const retrieveData = async () => {
    try {
        const request = await fetch('/all');
        const allData = await request.json();
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log('Error retrieving data:', error);
    }
};
