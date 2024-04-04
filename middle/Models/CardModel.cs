using System.Collections.Generic;

public class Card
{
    public string Name { get; set; }
    public List<int> Entity { get; set; }
    public int Target { get; set; }
    public int Aggro { get; set; }
    public int Health { get; set; }
    public int Hot { get; set; }
    public int Shield { get; set; }
    public int Shot { get; set; }
    public int Reflect { get; set; }
    public int Counter { get; set; }
    public int Interrupt { get; set; }
    public int ExplosivePoisonTrap { get; set; }
    public int ParalyzingTrap { get; set; }

    public Card(string name, Dictionary<string, object> properties)
    {
        Name = name;
        Health = properties.ContainsKey("health") ? (int)properties["health"] : 0;
        if (properties.ContainsKey("entity") && properties["entity"] is List<int> entityList)
        {
            Entity = new List<int>(entityList);
        }
        else
        {
            Entity = new List<int> { 0 };
        }
        Target = properties.ContainsKey("target") ? (int)properties["target"] : 0;
        Aggro = properties.ContainsKey("aggro") ? (int)properties["aggro"] : 0;
        Hot = properties.ContainsKey("hot") ? (int)properties["hot"] : 0;
        Shield = properties.ContainsKey("shield") ? (int)properties["shield"] : 0;
        Shot = properties.ContainsKey("shot") ? (int)properties["shot"] : 0;
        Reflect = properties.ContainsKey("reflect") ? (int)properties["reflect"] : 0;
        Counter = properties.ContainsKey("counter") ? (int)properties["counter"] : 0;
        Interrupt = properties.ContainsKey("interrupt") ? (int)properties["interrupt"] : 0;
        ExplosivePoisonTrap = properties.ContainsKey("explosivePoisonTrap") ? (int)properties["explosivePoisonTrap"] : 0;
        ParalyzingTrap = properties.ContainsKey("paralyzingTrap") ? (int)properties["paralyzingTrap"] : 0;
    }
}