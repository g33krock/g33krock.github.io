var entities = new List<Entity>
{
    new Entity
    {
        Role = "onion knight",
        Health = 20,
        Shield = 0,
        Strengthen = 0,
        Aggro = 0,
        Faction = "player",
        Alive = true,
        Proficiency = new Dictionary<string, object>(),
        FlameShield = false,
        FrostShield = false,
        ArcaneShield = false,
        AggroLife = false,
        Power = 1,
        DefaultDeck = new List<CardAssignment>
        {
            new CardAssignment { CardName = "strike", Frequency = 5 },
            new CardAssignment { CardName = "bandage", Frequency = 5 },
            new CardAssignment { CardName = "shield", Frequency = 5 },
            new CardAssignment { CardName = "disengage", Frequency = 5 }
        }
    },
    new Entity
    {
        Role = "warrior",
        Health = 30,
        Shield = 0,
        Strengthen = 0,
        Aggro = 0,
        Faction = "player",
        Alive = true,
        Proficiency = new Dictionary<string, object>(),
        FlameShield = false,
        FrostShield = false,
        ArcaneShield = false,
        AggroLife = false,
        Power = 3,
        DefaultDeck = new List<CardAssignment>
        {
            new CardAssignment { CardName = "strike", Frequency = 4 },
            new CardAssignment { CardName = "bandage", Frequency = 2 },
            new CardAssignment { CardName = "shield", Frequency = 3 },
            new CardAssignment { CardName = "disengage", Frequency = 2 },
            // Additional cards for the warrior...
        }
    },
    // Additional entities (players and monsters)...
};
