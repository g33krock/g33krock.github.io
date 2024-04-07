using System;
using System.Collections.Generic;

namespace PaperDungeon
{
    public class EntityModel
    {
        public int Health { get; set; }
        public int Aggro { get; set; }
        public int Shield { get; set; }
        public int Strengthen { get; set; }
        public List<dynamic> Effects { get; set; } = new List<dynamic>(); // Assuming dynamic type for effects; consider defining a class or struct
        public string Faction { get; set; }
        public bool Alive { get; set; } = true;
        public string Role { get; set; } = "Blob";
        public dynamic Proficiency { get; set; } // Assuming dynamic; specify concrete type if known
        public bool FlameShield { get; set; } = false;
        public bool FrostShield { get; set; } = false;
        public bool ArcaneShield { get; set; } = false;
        public bool AggroLife { get; set; } = false;
        public int Power { get; set; }
        public List<CardModel> Deck { get; set; } = new List<CardModel>(); // Assuming CardModel is another class you've defined

        public EntityModel()
        {
            // Default constructor
        }

        // Add any additional methods or constructors as needed
    }
}
