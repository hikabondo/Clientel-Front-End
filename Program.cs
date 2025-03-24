// See https://aka.ms/new-console-template for more information
using OpenWeatherConsole;
using System.Text.Json;

var apiUrl = "https://localhost:7282/WeatherForecast";

Console.ForegroundColor = ConsoleColor.White;
Console.WriteLine("Open weather map App!");
Console.WriteLine("**********************");
Console.WriteLine("Please enter the city:");

var city = Console.ReadLine();

using (HttpClient client = new HttpClient())
{
    try
    {
        var response = await client.GetAsync($"{apiUrl}?city={city}");

        if (response.IsSuccessStatusCode)
        {
            string responseBody = await response.Content.ReadAsStringAsync();

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            var responseData = JsonSerializer.Deserialize<WeatherForecast>(responseBody, options);

            if (responseData !=null)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("*****************Result********************");
                Console.WriteLine($"Date:{responseData?.Date}");
                Console.WriteLine($"City:{responseData?.City}");
                Console.WriteLine($"Temeprature C:{responseData?.TemperatureC}");
                Console.WriteLine($"Temeprature F:{responseData?.TemperatureF}");
                Console.WriteLine("*************************************");
               
            }   
        }
        else
        {
            Console.WriteLine($"Could not get weather for the city : {city}");
        }
    }
    catch (Exception e)
    {
        Console.WriteLine($"Request error: {e.Message}");
    }
}
