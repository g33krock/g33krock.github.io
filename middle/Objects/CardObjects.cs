var cards = new List<Card>
{
    new Card { Name = "strike", Properties = new CardProperties { Target = 1, Aggro = 2, Health = -2 } },
    new Card { Name = "bandage", Properties = new CardProperties { Target = 0, Aggro = 2, Health = 3 } },
    new Card { Name = "heal", Properties = new CardProperties { Target = 1, Aggro = 2, Health = 2 } },
    new Card { Name = "shield", Properties = new CardProperties { Target = 1, Aggro = 2, Shield = 2 } },
    new Card { Name = "grapple", Properties = new CardProperties { Target = 1, Aggro = 3, Health = -3 } },
    new Card { Name = "plate armor", Properties = new CardProperties { Target = 0, Aggro = 4, Shield = 3, Shot = 3, Counter = 2 } },
    new Card { Name = "mirror shield", Properties = new CardProperties { Target = 0, Aggro = 4, Shield = 1, Reflect = 1, Counter = 1 } },
    new Card { Name = "rejuvinate", Properties = new CardProperties { Target = 1, Aggro = 2, Counter = 3, Hot = 2 } },
    new Card { Name = "empower", Properties = new CardProperties { Target = 1, Aggro = 2, Shield = 1, Strengthen = 1 } },
    new Card { Name = "weaken", Properties = new CardProperties { Target = 1, Aggro = 2, Shield = -1, Strengthen = -1 } },
    // Continue adding the rest of the cards here following the pattern
};
