namespace PaperDungeon
{
public class CardModel
{
    public string Name { get; set; }
    public List<int> Entity { get; set; } = new List<int>(); 
    public int Target { get; set; }
    public int Aggro { get; set; }
    public int Health { get; set; }
    public int Hot { get; set; }
    public int Shield { get; set; }
    public int Shot { get; set; }
    public int Strengthen { get; set; }
    public int Stot { get; set; }
    public int Reflect { get; set; }
    public int Counter { get; set; }
    public int Interrupt { get; set; }
    public int ExplosivePoisonTrap { get; set; }
    public int ParalyzingTrap { get; set; }

    public CardModel(string name, dynamic properties)
    {
        Name = name;
        Entity = properties.entity ?? new List<int> {0}; 
        Target = properties.target;
        Aggro = properties.aggro;
        Health = properties.health ?? 0;
        Hot = properties.hot ?? 0;
        Shield = properties.shield ?? 0;
        Shot = properties.shot ?? 0;
        Strengthen = properties.strengthen ?? 0;
        Stot = properties.stot ?? 0;
        Reflect = properties.reflect ?? 0;
        Counter = properties.counter ?? 0;
        Interrupt = properties.interrupt ?? 0;
        ExplosivePoisonTrap = properties.explosivePoisonTrap ?? 0;
        ParalyzingTrap = properties.paralyzingTrap ?? 0;
    }
}
}