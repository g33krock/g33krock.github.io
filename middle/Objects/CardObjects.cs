using System.Collections.Generic;

namespace PaperDungeon
{
    public static class Cards
    {
        public static List<CardModel> All = new List<CardModel>
        {
            new CardModel("strike", new { target = 3, aggro = 2, health = -2 }),
            new CardModel("bandage", new { target = 0, aggro = 2, health = 3 }),
            new CardModel("heal", new { target = 2, aggro = 2, health = 2 }),
            new CardModel("shield", new { target = 2, aggro = 2, shield = 2 }),
            new CardModel("grapple", new { target = 3, aggro = 3, health = 3 }),
            // Add more cards here following the pattern
            new CardModel("plate armor", new { shield = 3, shot = 3, counter = 2, target = 0, aggro = 4 }),
            // Continue adding other cards as necessary
        };

        // Example of initializing a card with additional properties
        public static CardModel ExampleCard = new CardModel(
            "example",
            new { target = 1, aggro = 1, health = 0, hot = 0, shield = 1, /* other properties as needed */ }
        );
    }
}
