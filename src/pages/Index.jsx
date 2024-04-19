// Complete the Index page component for a Weather App displaying major European cities
import { useState, useEffect } from "react";
import { Box, Flex, Text, Heading, SimpleGrid, Spinner, useColorModeValue } from "@chakra-ui/react";
import { FaCloudSun, FaTemperatureHigh, FaWind } from "react-icons/fa";

const cities = [
  { name: "London", latitude: 51.5074, longitude: -0.1278 },
  { name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { name: "Berlin", latitude: 52.52, longitude: 13.405 },
  { name: "Madrid", latitude: 40.4168, longitude: -3.7038 },
  { name: "Rome", latitude: 41.9028, longitude: 12.4964 },
];

const WeatherCard = ({ city, temperature, weather, windSpeed }) => {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box p={5} shadow="md" borderWidth="1px" bg={bg} color={color} borderRadius="lg">
      <Heading fontSize="xl">{city}</Heading>
      <Text mt={4}>
        <FaTemperatureHigh /> Temperature: {temperature} °C
      </Text>
      <Text mt={2}>
        <FaCloudSun /> Weather: {weather}
      </Text>
      <Text mt={2}>
        <FaWind /> Wind Speed: {windSpeed} km/h
      </Text>
    </Box>
  );
};

const Index = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      const responses = await Promise.all(cities.map((city) => fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`).then((res) => res.json())));
      const data = responses.map((response, index) => ({
        city: cities[index].name,
        temperature: response.current_weather.temperature,
        weather: response.current_weather.weathercode,
        windSpeed: response.current_weather.windspeed,
      }));
      setWeatherData(data);
      setLoading(false);
    };

    fetchWeather();
  }, []);

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" p={5}>
      <Heading mb={10}>Weather in Major European Cities</Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {weatherData.map((data, index) => (
            <WeatherCard key={index} {...data} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
};

export default Index;
