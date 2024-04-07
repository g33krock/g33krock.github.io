using System;
using System.Collections.Generic;
using PaperDungeon; // Make sure this is the correct namespace

public static class EntityDatabase
{
    public static List<EntityModel> GetEntities()
    {
        var entities = new List<EntityModel>
        {
            new EntityModel
            {
                Role = "onion knight",
                Health = 20,
                Aggro = 0,
                Shield = 0,
                Strengthen = 0,
                Faction = "hero",
                Alive = true,
                Power = 1,
                Deck = GetDefaultDeck(new Dictionary<string, int>
                {
                    { "strike", 5 },
                    { "bandage", 5 },
                    { "shield", 5 },
                    { "disengage", 5 }
                })
            },
            // Repeat for other entities...
        };

        return entities;
    }

    private static List<CardModel> GetDefaultDeck(Dictionary<string, int> cardFrequencies)
    {
        var deck = new List<CardModel>();
        foreach (var entry in cardFrequencies)
        {
            // Assuming you have a method to create a CardModel based on cardName.
            // This part depends on how you're defining cards and might need adjustment.
            var cardModel = new CardModel(entry.Key, new { /* properties based on cardName */ });
            for (int i = 0; i < entry.Value; i++)
            {
                deck.Add(cardModel);
            }
        }

        return deck;
    }
}
