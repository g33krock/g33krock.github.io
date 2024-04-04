using System.Collections.Generic;

public class Entity
{
    public int Health { get; set; }
    public int Aggro { get; set; }
    public int Shield { get; set; }
    public int Strengthen { get; set; }
    public List<Effect> Effects { get; set; }
    public string Faction { get; set; }
    public bool Alive { get; set; }
    public bool FlameShield { get; set; }
    public bool FrostShield { get; set; }
    public bool ArcaneShield { get; set; }
    public bool AggroLife { get; set; }
    public List<Card> DefaultDeck { get; set; }
    public int Power { get; set; }
    public List<Card> Deck { get; set; }
    public string Role { get; set; }
    public Dictionary<string, object> Proficiency { get; set; }
    
    public Entity(Dictionary<string, object> options)
    {
        Health = options.ContainsKey("health") ? (int)options["health"] : 0;
        Aggro = options.ContainsKey("aggro") ? (int)options["aggro"] : 0;
        Shield = options.ContainsKey("shield") ? (int)options["shield"] : 0;
        Strengthen = options.ContainsKey("strengthen") ? (int)options["strengthen"] : 0;
        Faction = options.Faction;
        Role = options.Role;
        Proficiency = options.Proficiency ?? new Dictionary<string, object>();
        Effects = new List<Effect>();
        Alive = true;
        FlameShield = false;
        Frosthield = false;
        ArcaneShield = false;
        AggroLife = false;
        Deck = new List<Card>();
        DefaultDeck = new List<Card>();
        Power = options.ContainsKey("power") ? (int)options["power"] : 0;
    }

    // Method to build and shuffle deck
    public void BuildAndShuffleDeck(List<Card> cards, List<Dictionary<string, object>> defaultDeck)
    {
        // Logic to build the deck from `defaultDeck` information
        // And then shuffle it
    }
}

public class Effect
{
    // Properties of the Effect class go here
}