using System;
using System.Collections.Generic;

public class EntitySelection
{
    public List<Entity> Heroes { get; set; }
    public List<Entity> Monsters { get; set; }

    public EntitySelection(List<string> selectedHeroes, List<string> selectedMonsters, List<Card> allCards)
    {
        Heroes = InitializeEntities(selectedHeroes, allCards, "player");
        Monsters = InitializeEntities(selectedMonsters, allCards, "monster");
    }

    private List<Entity> InitializeEntities(List<string> selectedRoles, List<Card> allCards, string faction)
    {
        var entities = new List<Entity>();
        foreach (var role in selectedRoles)
        {
            var options = new Dictionary<string, object>
            {
                {"role", role},
                {"faction", faction},
                // Add more initialization options as needed
            };

            var entity = new Entity(options);
            BuildAndShuffleDeck(entity, allCards);
            entities.Add(entity);
        }
        return entities;
    }

    private void BuildAndShuffleDeck(Entity entity, List<Card> allCards)
    {
        // Assuming Entity has a List<Card> Deck property and a Role property
        // Filter cards based on entity's role, add to entity's deck, then shuffle
        foreach (var card in allCards)
        {
            // Example condition, customize as needed
            if (card.AllowedRoles.Contains(entity.Role))
            {
                entity.Deck.Add(card);
            }
        }

        entity.Deck.Shuffle();
    }
}
