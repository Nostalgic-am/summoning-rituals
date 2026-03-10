# Entity Inputs & Outputs

Summoning Rituals supports entity inputs (sacrificing mobs to fuel a ritual) and entity outputs (summoning mobs as a result).

## Entity Inputs

Use `.entityInputs()` to require entities to be present in the sacrifice zone. These entities are **consumed** when the ritual starts.

```js
.entityInputs([
    "3x minecraft:elder_guardian",
    "phantom",
    "silverfish",
    "3x cow",
    "minecraft:wither",
    SummoningEntity.input("cat").tooltip("Meow"),
])
```

### Simple Entity Strings

Like items, entities support the `Nx` count prefix:

| Format | Example | Description |
|---|---|---|
| `"entity_id"` | `"phantom"` | A single entity |
| `"namespace:entity_id"` | `"minecraft:phantom"` | With explicit namespace |
| `"Nx entity_id"` | `"3x cow"` | N entities of this type |

### SummoningEntity.input()

For adding JEI/recipe viewer tooltips to entity inputs:

```js
SummoningEntity.input("cat").tooltip("Meow")
SummoningEntity.input("villager").tooltip("Any profession")
```

| Method | Description |
|---|---|
| `SummoningEntity.input(entity)` | Create an entity input |
| `.tooltip(text)` | Add a tooltip shown in JEI/EMI |

::: tip
Always pair `.entityInputs()` with `.sacrificeZone()` to ensure the detection area is large enough:
```js
.entityInputs(["3x cow", "phantom"])
.sacrificeZone([5, 3, 5])
```
:::

## Entity Outputs

Use `.entityOutputs()` to summon entities when the ritual completes.

### Simple Outputs

```js
.entityOutputs(["bat", "ender_dragon", "4x creeper"])
```

### SummoningEntity.output()

The full builder for controlling spawned entities:

```js
SummoningEntity.output("blaze", 2)
    .data({
        Health: 50,
        Attributes: [{ Name: "generic.max_health", Base: 50 }],
    })
    .offset([1, 2, 2])
    .tooltip([Text.of("50 health").aqua()])
```

### Output Builder Methods

| Method | Description |
|---|---|
| `SummoningEntity.output(entity, count?)` | Create output with optional count |
| `.data({...})` | Apply NBT data to the spawned entity |
| `.offset([x, y, z])` | Offset spawn position from the altar |
| `.spread([x, y, z])` | Randomize spawn position within a range |
| `.tooltip(text)` | Tooltip shown in JEI/EMI (string or `Text` component) |

### NBT Data

The `.data()` method accepts an NBT compound that is applied to each spawned entity. This is extremely powerful — you can customize health, equipment, attributes, and any other entity data.

**Custom health:**
```js
SummoningEntity.output("blaze", 2)
    .data({
        Health: 50,
        Attributes: [{ Name: "generic.max_health", Base: 50 }],
    })
```

**Custom equipment:**
```js
SummoningEntity.output("zombie", 3)
    .data({
        HandItems: [
            {
                id: "minecraft:diamond_sword",
                Count: 1,
                tag: { ench: [{ id: 16, lvl: 1 }] },
            },
        ],
    })
    .tooltip("Has Sword lol")
```

**Health + position control:**
```js
SummoningEntity.output("ghast")
    .offset([1, 2, 2])
    .spread([4, 2, 4])
    .data({
        Health: 50,
        Attributes: [{ Name: "generic.max_health", Base: 50 }],
    })
```

::: warning
NBT data structure depends on the entity type and Minecraft version. Check the [Minecraft Wiki — Entity Format](https://minecraft.wiki/w/Entity_format) for valid tags.
:::

### Tooltips

Tooltips appear in JEI/EMI recipe views. They can be a plain string or a styled `Text` component:

```js
// Plain text
.tooltip("Has Sword lol")

// Styled text (aqua color)
.tooltip([Text.of("50 health").aqua()])

// Multiple styled components
.tooltip([
    Text.of("Boss Mob").red().bold(),
    Text.of("50 HP").aqua(),
])
```

### Offset and Spread

**Offset** moves the spawn point by a fixed vector. **Spread** randomizes position around that point.

```js
// Spawns 2 foxes at the altar position (default)
SummoningEntity.output("fox", 2)

// Spawns a ghast offset from altar with random scatter
SummoningEntity.output("ghast")
    .offset([1, 2, 2])     // 1 block east, 2 blocks up, 2 blocks south
    .spread([4, 2, 4])     // random scatter in a 4x2x4 area
```

This is useful for spreading multiple summoned mobs around the altar area instead of stacking them all at the center.

## Complete Entity Example

```js
event.recipes.summoningrituals
    .altar("nether_star")
    .entityInputs([
        "3x minecraft:elder_guardian",
        SummoningEntity.input("cat").tooltip("Meow"),
    ])
    .entityOutputs([
        "bat",
        "4x creeper",
        SummoningEntity.output("blaze", 2)
            .data({
                Health: 50,
                Attributes: [{ Name: "generic.max_health", Base: 50 }],
            })
            .offset([1, 2, 2])
            .tooltip([Text.of("50 health").aqua()]),
        SummoningEntity.output("zombie", 3)
            .data({
                HandItems: [
                    {
                        id: "minecraft:diamond_sword",
                        Count: 1,
                        tag: { ench: [{ id: 16, lvl: 1 }] },
                    },
                ],
            })
            .tooltip("Has Sword lol"),
    ])
    .sacrificeZone([5, 3, 5])
```
