using System.Collections.Generic;

public class Card
{
    public string Name { get; set; }
    public List<int> Entity { get; set; }
    public int Target { get; set; }
    public int Aggro { get; set; }
    public int Health { get; set; }
    // Other properties...

    public Card(string name, Dictionary<string, object> properties)
    {
        Name = name;
        // Initialize other properties from the dictionary
        // Example:
        Health = properties.ContainsKey("health") ? (int)properties["health"] : 0;
        // Repeat for other properties...
    }
}