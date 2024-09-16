export const scenarios = {
  levels: [
    {
      character: "Mage",
      mainBoss: {
        name: "Archmage",
        type: "Boss",
        description:
          "A powerful wizard who has delved into forbidden arcane knowledge.",
      },
      subLevels: [
        {
          name: "Arcane Academy",
          miniBoss: {
            name: "Headmaster",
            type: "Mini-boss",
            description: "A master of elemental magic, head of the academy.",
          },
          mobEncounters: [
            [
              { role: "elemental", frequency: 3 },
              { role: "animated book", frequency: 2 },
            ],
            [
              { role: "mage apprentice", frequency: 3 },
              { role: "arcane sentinel", frequency: 2 },
            ],
            [
              { role: "elemental", frequency: 2 },
              { role: "mage apprentice", frequency: 3 },
            ],
            [
              { role: "arcane sentinel", frequency: 2 },
              { role: "animated book", frequency: 3 },
            ],
            [
              { role: "elemental", frequency: 3 },
              { role: "mage apprentice", frequency: 2 },
            ],
          ],
        },
        {
          name: "Enchanted Forest",
          miniBoss: {
            name: "Forest Spirit",
            type: "Mini-boss",
            description:
              "A powerful entity that controls the magic of the forest.",
          },
          mobEncounters: [
            [
              { role: "fae", frequency: 3 },
              { role: "enchanted beast", frequency: 2 },
            ],
            [
              { role: "elemental", frequency: 2 },
              { role: "fae", frequency: 3 },
            ],
            [
              { role: "enchanted beast", frequency: 3 },
              { role: "fae", frequency: 2 },
            ],
            [
              { role: "fae", frequency: 3 },
              { role: "elemental", frequency: 2 },
            ],
            [
              { role: "enchanted beast", frequency: 2 },
              { role: "fae", frequency: 3 },
            ],
          ],
        },
        {
          name: "Realm of Pure Magic",
          miniBoss: {
            name: "Arcane Guardian",
            type: "Mini-boss",
            description: "A sentient being of pure arcane energy.",
          },
          mobEncounters: [
            [
              { role: "arcane construct", frequency: 3 },
              { role: "elemental", frequency: 2 },
            ],
            [
              { role: "animated book", frequency: 3 },
              { role: "arcane construct", frequency: 2 },
            ],
            [
              { role: "arcane sentinel", frequency: 3 },
              { role: "elemental", frequency: 2 },
            ],
            [
              { role: "elemental", frequency: 2 },
              { role: "arcane sentinel", frequency: 3 },
            ],
            [
              { role: "animated book", frequency: 3 },
              { role: "arcane construct", frequency: 2 },
            ],
          ],
        },
      ],
    },
    {
      character: "Paladin",
      mainBoss: {
        name: "Fallen Angel",
        type: "Boss",
        description: "A once-holy being consumed by vengeance.",
      },
      subLevels: [
        {
          name: "Sacred Battleground",
          miniBoss: {
            name: "Dark Knight",
            type: "Mini-boss",
            description:
              "A paladin who has lost their way and serves darkness.",
          },
          mobEncounters: [
            [
              { role: "undead knight", frequency: 3 },
              { role: "crusader", frequency: 2 },
            ],
            [
              { role: "divine wraith", frequency: 3 },
              { role: "crusader", frequency: 2 },
            ],
            [
              { role: "undead knight", frequency: 3 },
              { role: "divine wraith", frequency: 2 },
            ],
            [
              { role: "crusader", frequency: 3 },
              { role: "undead knight", frequency: 2 },
            ],
            [
              { role: "divine wraith", frequency: 2 },
              { role: "crusader", frequency: 3 },
            ],
          ],
        },
        {
          name: "Tombs of Heroes",
          miniBoss: {
            name: "Corrupted Champion",
            type: "Mini-boss",
            description: "A hero who fell to darkness and defends the tombs.",
          },
          mobEncounters: [
            [
              { role: "holy knight", frequency: 3 },
              { role: "divine zealot", frequency: 2 },
            ],
            [
              { role: "holy knight", frequency: 2 },
              { role: "spirit of penance", frequency: 3 },
            ],
            [
              { role: "divine zealot", frequency: 2 },
              { role: "spirit of penance", frequency: 3 },
            ],
            [
              { role: "holy knight", frequency: 3 },
              { role: "spirit of penance", frequency: 2 },
            ],
            [
              { role: "divine zealot", frequency: 3 },
              { role: "holy knight", frequency: 2 },
            ],
          ],
        },
        {
          name: "Heavenly Citadel",
          miniBoss: {
            name: "Seraph Guardian",
            type: "Mini-boss",
            description:
              "A six-winged angel guarding the citadel’s inner sanctum.",
          },
          mobEncounters: [
            [
              { role: "celestial knight", frequency: 2 },
              { role: "radiant seraph", frequency: 3 },
            ],
            [
              { role: "holy warrior", frequency: 2 },
              { role: "radiant seraph", frequency: 3 },
            ],
            [
              { role: "celestial knight", frequency: 3 },
              { role: "holy warrior", frequency: 2 },
            ],
            [
              { role: "radiant seraph", frequency: 3 },
              { role: "celestial knight", frequency: 2 },
            ],
            [
              { role: "holy warrior", frequency: 3 },
              { role: "celestial knight", frequency: 2 },
            ],
          ],
        },
      ],
    },
    {
      character: "Druid",
      mainBoss: {
        name: "Corrupted Nature Spirit",
        type: "Boss",
        description: "A once-benevolent forest guardian turned malevolent.",
      },
      subLevels: [
        {
          name: "Wild Forest",
          miniBoss: {
            name: "Forest Warden",
            type: "Mini-boss",
            description: "A powerful guardian of the wild forests.",
          },
          mobEncounters: [
            [
              { role: "corrupted wolf", frequency: 3 },
              { role: "forest spirit", frequency: 2 },
            ],
            [
              { role: "bear", frequency: 2 },
              { role: "corrupted wolf", frequency: 3 },
            ],
            [
              { role: "forest spirit", frequency: 2 },
              { role: "bear", frequency: 3 },
            ],
            [
              { role: "corrupted wolf", frequency: 2 },
              { role: "forest spirit", frequency: 3 },
            ],
            [
              { role: "bear", frequency: 3 },
              { role: "corrupted wolf", frequency: 2 },
            ],
          ],
        },
        {
          name: "Sacred Grove",
          miniBoss: {
            name: "Treant Protector",
            type: "Mini-boss",
            description: "A massive tree guardian protecting the sacred grove.",
          },
          mobEncounters: [
            [
              { role: "corrupted fae", frequency: 2 },
              { role: "treant", frequency: 3 },
            ],
            [
              { role: "elemental", frequency: 2 },
              { role: "corrupted fae", frequency: 3 },
            ],
            [
              { role: "treant", frequency: 2 },
              { role: "elemental", frequency: 3 },
            ],
            [
              { role: "corrupted fae", frequency: 3 },
              { role: "treant", frequency: 2 },
            ],
            [
              { role: "elemental", frequency: 3 },
              { role: "corrupted fae", frequency: 2 },
            ],
          ],
        },
        {
          name: "Ancient World Tree",
          miniBoss: {
            name: "Corrupted Treant",
            type: "Mini-boss",
            description:
              "A once-majestic guardian of the World Tree, now twisted by dark magic.",
          },
          mobEncounters: [
            [
              { role: "corrupted wolf", frequency: 2 },
              { role: "forest spirit", frequency: 3 },
            ],
            [
              { role: "bear", frequency: 2 },
              { role: "forest spirit", frequency: 3 },
            ],
            [
              { role: "corrupted wolf", frequency: 3 },
              { role: "treant", frequency: 2 },
            ],
            [
              { role: "forest spirit", frequency: 3 },
              { role: "bear", frequency: 2 },
            ],
            [
              { role: "treant", frequency: 3 },
              { role: "forest spirit", frequency: 2 },
            ],
          ],
        },
      ],
    },
    {
      character: "Death Knight",
      mainBoss: {
        name: "Dread Lord",
        type: "Boss",
        description: "A powerful undead ruler wielding necromantic powers.",
      },
      subLevels: [
        {
          name: "Cursed Castle",
          miniBoss: {
            name: "Wraith Lord",
            type: "Mini-boss",
            description: "A powerful wraith ruling over the cursed castle.",
          },
          mobEncounters: [
            [
              { role: "cursed knight", frequency: 2 },
              { role: "wraith", frequency: 3 },
            ],
            [
              { role: "skeleton warrior", frequency: 3 },
              { role: "cursed knight", frequency: 2 },
            ],
            [
              { role: "wraith", frequency: 2 },
              { role: "skeleton warrior", frequency: 3 },
            ],
            [
              { role: "cursed knight", frequency: 3 },
              { role: "undead archer", frequency: 2 },
            ],
            [
              { role: "undead archer", frequency: 3 },
              { role: "skeleton warrior", frequency: 2 },
            ],
          ],
        },
        {
          name: "Dark Fortress",
          miniBoss: {
            name: "Dread Knight",
            type: "Mini-boss",
            description: "A dark champion who leads the undead armies.",
          },
          mobEncounters: [
            [
              { role: "death knight", frequency: 2 },
              { role: "undead mage", frequency: 3 },
            ],
            [
              { role: "undead knight", frequency: 3 },
              { role: "undead archer", frequency: 2 },
            ],
            [
              { role: "undead mage", frequency: 2 },
              { role: "death knight", frequency: 3 },
            ],
            [
              { role: "undead archer", frequency: 2 },
              { role: "undead knight", frequency: 3 },
            ],
            [
              { role: "death knight", frequency: 3 },
              { role: "undead mage", frequency: 2 },
            ],
          ],
        },
        {
          name: "Abyssal Realm",
          miniBoss: {
            name: "Lich Lord",
            type: "Mini-boss",
            description: "An ancient lich commanding dark magic.",
          },
          mobEncounters: [
            [
              { role: "lich", frequency: 1 },
              { role: "specter", frequency: 4 },
            ],
            [
              { role: "wraith", frequency: 2 },
              { role: "skeleton mage", frequency: 3 },
            ],
            [
              { role: "death knight", frequency: 2 },
              { role: "lich", frequency: 3 },
            ],
            [
              { role: "skeleton mage", frequency: 3 },
              { role: "specter", frequency: 2 },
            ],
            [
              { role: "specter", frequency: 3 },
              { role: "lich", frequency: 2 },
            ],
          ],
        },
      ],
    },
    {
      character: "Shaman",
      mainBoss: {
        name: "Elemental Overlord",
        type: "Boss",
        description: "A massive being composed of the primal elements.",
      },
      subLevels: [
        {
          name: "Elemental Plane of Fire",
          miniBoss: {
            name: "Fire Elemental Lord",
            type: "Mini-boss",
            description: "A being of pure fire, ruling the plane.",
          },
          mobEncounters: [
            [
              { role: "fire elemental", frequency: 3 },
              { role: "flame spirit", frequency: 2 },
            ],
            [
              { role: "flame spirit", frequency: 3 },
              { role: "molten golem", frequency: 2 },
            ],
            [
              { role: "molten golem", frequency: 2 },
              { role: "fire elemental", frequency: 3 },
            ],
            [
              { role: "flame spirit", frequency: 2 },
              { role: "fire elemental", frequency: 3 },
            ],
            [
              { role: "molten golem", frequency: 3 },
              { role: "flame spirit", frequency: 2 },
            ],
          ],
        },
        {
          name: "Elemental Plane of Earth",
          miniBoss: {
            name: "Earth Elemental Lord",
            type: "Mini-boss",
            description: "A powerful being of stone and earth.",
          },
          mobEncounters: [
            [
              { role: "earth elemental", frequency: 3 },
              { role: "stone golem", frequency: 2 },
            ],
            [
              { role: "rock spirit", frequency: 3 },
              { role: "earth elemental", frequency: 2 },
            ],
            [
              { role: "stone golem", frequency: 2 },
              { role: "rock spirit", frequency: 3 },
            ],
            [
              { role: "earth elemental", frequency: 3 },
              { role: "rock spirit", frequency: 2 },
            ],
            [
              { role: "stone golem", frequency: 3 },
              { role: "earth elemental", frequency: 2 },
            ],
          ],
        },
        {
          name: "Ancestral Spirit Realm",
          miniBoss: {
            name: "Ancestral Spirit Chief",
            type: "Mini-boss",
            description:
              "The ruler of the ancestral spirits, guiding the realm.",
          },
          mobEncounters: [
            [
              { role: "ancestral spirit", frequency: 3 },
              { role: "totemic warrior", frequency: 2 },
            ],
            [
              { role: "totemic guardian", frequency: 3 },
              { role: "ancestral spirit", frequency: 2 },
            ],
            [
              { role: "ancestral spirit", frequency: 2 },
              { role: "totemic warrior", frequency: 3 },
            ],
            [
              { role: "totemic warrior", frequency: 3 },
              { role: "ancestral spirit", frequency: 2 },
            ],
            [
              { role: "totemic guardian", frequency: 3 },
              { role: "totemic warrior", frequency: 2 },
            ],
          ],
        },
      ],
    },
    {
      character: "Necromancer",
      mainBoss: {
        name: "Lich",
        type: "Boss",
        description: "A powerful undead sorcerer, master of death and decay.",
      },
      subLevels: [
        {
          name: "Cemetery",
          miniBoss: {
            name: "Grave Warden",
            type: "Mini-boss",
            description: "A powerful undead knight who guards the cemetery.",
          },
          mobEncounters: [
            [
              { role: "skeleton", frequency: 3 },
              { role: "zombie", frequency: 2 },
            ],
            [
              { role: "zombie", frequency: 3 },
              { role: "ghoul", frequency: 2 },
            ],
            [
              { role: "skeleton", frequency: 2 },
              { role: "ghoul", frequency: 3 },
            ],
            [
              { role: "ghoul", frequency: 3 },
              { role: "zombie", frequency: 2 },
            ],
            [
              { role: "skeleton", frequency: 3 },
              { role: "ghoul", frequency: 2 },
            ],
          ],
        },
        {
          name: "Crypt",
          miniBoss: {
            name: "Crypt Guardian",
            type: "Mini-boss",
            description: "An ancient undead being that guards the crypt.",
          },
          mobEncounters: [
            [
              { role: "zombie", frequency: 2 },
              { role: "specter", frequency: 3 },
            ],
            [
              { role: "specter", frequency: 3 },
              { role: "skeleton", frequency: 2 },
            ],
            [
              { role: "ghoul", frequency: 3 },
              { role: "zombie", frequency: 2 },
            ],
            [
              { role: "skeleton", frequency: 3 },
              { role: "specter", frequency: 2 },
            ],
            [
              { role: "zombie", frequency: 3 },
              { role: "ghoul", frequency: 2 },
            ],
          ],
        },
        {
          name: "Necropolis",
          miniBoss: {
            name: "Death Priest",
            type: "Mini-boss",
            description:
              "A dark priest who commands the dead in the necropolis.",
          },
          mobEncounters: [
            [
              { role: "specter", frequency: 2 },
              { role: "lich", frequency: 3 },
            ],
            [
              { role: "lich", frequency: 2 },
              { role: "ghoul", frequency: 3 },
            ],
            [
              { role: "skeleton", frequency: 3 },
              { role: "lich", frequency: 2 },
            ],
            [
              { role: "ghoul", frequency: 2 },
              { role: "specter", frequency: 3 },
            ],
            [
              { role: "lich", frequency: 3 },
              { role: "ghoul", frequency: 2 },
            ],
          ],
        },
      ],
    },
    {
      character: "Berserker",
      mainBoss: {
        name: "Blood Berserker",
        type: "Boss",
        description:
          "A warrior consumed entirely by bloodlust, stronger than any other berserker.",
      },
      subLevels: [
        {
          name: "Tribal Lands",
          miniBoss: {
            name: "Tribal Chieftain",
            type: "Mini-boss",
            description: "The fierce leader of a rival berserker tribe.",
          },
          mobEncounters: [
            [
              { role: "tribesman", frequency: 3 },
              { role: "war beast", frequency: 2 },
            ],
            [
              { role: "war beast", frequency: 3 },
              { role: "tribesman", frequency: 2 },
            ],
            [
              { role: "tribesman", frequency: 2 },
              { role: "war beast", frequency: 3 },
            ],
            [
              { role: "war beast", frequency: 2 },
              { role: "tribesman", frequency: 3 },
            ],
            [
              { role: "tribesman", frequency: 3 },
              { role: "war beast", frequency: 2 },
            ],
          ],
        },
        {
          name: "Battlefields of Rage",
          miniBoss: {
            name: "War Shaman",
            type: "Mini-boss",
            description:
              "A powerful shaman that fuels the rage of berserkers in battle.",
          },
          mobEncounters: [
            [
              { role: "berserker", frequency: 3 },
              { role: "war beast", frequency: 2 },
            ],
            [
              { role: "war shaman", frequency: 2 },
              { role: "berserker", frequency: 3 },
            ],
            [
              { role: "war beast", frequency: 3 },
              { role: "berserker", frequency: 2 },
            ],
            [
              { role: "berserker", frequency: 3 },
              { role: "war beast", frequency: 2 },
            ],
            [
              { role: "war shaman", frequency: 3 },
              { role: "berserker", frequency: 2 },
            ],
          ],
        },
        {
          name: "Blood-soaked Arena",
          miniBoss: {
            name: "Arena Master",
            type: "Mini-boss",
            description:
              "The ruthless master of the arena who revels in bloodshed.",
          },
          mobEncounters: [
            [
              { role: "gladiator", frequency: 3 },
              { role: "pit fighter", frequency: 2 },
            ],
            [
              { role: "arena beast", frequency: 2 },
              { role: "gladiator", frequency: 3 },
            ],
            [
              { role: "pit fighter", frequency: 3 },
              { role: "gladiator", frequency: 2 },
            ],
            [
              { role: "gladiator", frequency: 3 },
              { role: "arena beast", frequency: 2 },
            ],
            [
              { role: "pit fighter", frequency: 2 },
              { role: "arena beast", frequency: 3 },
            ],
          ],
        },
      ],
    },
    {
        "character": "Rogue",
        "mainBoss": {
          "name": "Master Assassin",
          "type": "Boss",
          "description": "A deadly foe with expert skills in stealth and poison, skilled in assassination and subterfuge."
        },
        "subLevels": [
          {
            "name": "City Slums",
            "miniBoss": {
              "name": "Guild Master",
              "type": "Mini-boss",
              "description": "The leader of the thieves' guild, a shadowy figure who commands from the shadows."
            },
            "mobEncounters": [
              [{ "role": "pickpocket", "frequency": 3 }, { "role": "street thug", "frequency": 2 }],
              [{ "role": "thug", "frequency": 3 }, { "role": "street archer", "frequency": 2 }],
              [{ "role": "pickpocket", "frequency": 2 }, { "role": "shadow assassin", "frequency": 3 }],
              [{ "role": "trap setter", "frequency": 3 }, { "role": "street archer", "frequency": 2 }],
              [{ "role": "sneak thief", "frequency": 3 }, { "role": "pickpocket", "frequency": 2 }]
            ]
          },
          {
            "name": "Thieves' Guild",
            "miniBoss": {
              "name": "Guild Lieutenant",
              "type": "Mini-boss",
              "description": "A skilled fighter and second-in-command in the thieves' guild."
            },
            "mobEncounters": [
              [{ "role": "shadow assassin", "frequency": 2 }, { "role": "dagger thrower", "frequency": 3 }],
              [{ "role": "brawler", "frequency": 3 }, { "role": "lockpicker", "frequency": 2 }],
              [{ "role": "guild enforcer", "frequency": 3 }, { "role": "shadow assassin", "frequency": 2 }],
              [{ "role": "dagger thrower", "frequency": 2 }, { "role": "brawler", "frequency": 3 }],
              [{ "role": "guild enforcer", "frequency": 2 }, { "role": "lockpicker", "frequency": 3 }]
            ]
          },
          {
            "name": "Hidden Vault",
            "miniBoss": {
              "name": "Vault Guardian",
              "type": "Mini-boss",
              "description": "A powerful rogue tasked with guarding the guild's most prized possessions."
            },
            "mobEncounters": [
              [{ "role": "vault protector", "frequency": 3 }, { "role": "silent blade", "frequency": 2 }],
              [{ "role": "vault archer", "frequency": 3 }, { "role": "poison expert", "frequency": 2 }],
              [{ "role": "vault mage", "frequency": 3 }, { "role": "vault protector", "frequency": 2 }],
              [{ "role": "silent blade", "frequency": 2 }, { "role": "vault archer", "frequency": 3 }],
              [{ "role": "vault mage", "frequency": 3 }, { "role": "poison expert", "frequency": 2 }]
            ]
          }
        ]
      }
  ],
};
