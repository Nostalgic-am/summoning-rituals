# Biome & Dimension

## `.biomes()`

Restricts the ritual to specific biomes. Pass an array of biome resource locations.

```js
.conditions(c =>
    c.biomes(["minecraft:plains", "minecraft:desert"])
)
```

The ritual only works if the altar is in **any one** of the listed biomes (OR logic).

### Biome Tags

Use the `#` prefix to match biome tags:

```js
.conditions(c => c.biomes(["#minecraft:is_forest"]))
.conditions(c => c.biomes(["#minecraft:is_ocean"]))
.conditions(c => c.biomes(["#c:is_hot"]))
```

### Mixing IDs and Tags

```js
.conditions(c =>
    c.biomes([
        "minecraft:plains",       // specific biome
        "#minecraft:is_forest",   // any forest biome
    ])
)
```

### Common Biome Tags (1.21.1)

| Tag | Description |
|---|---|
| `#minecraft:is_forest` | All forest biomes |
| `#minecraft:is_ocean` | All ocean biomes |
| `#minecraft:is_mountain` | Mountain biomes |
| `#minecraft:is_badlands` | Badlands biomes |
| `#minecraft:is_hill` | Hill biomes |
| `#minecraft:is_taiga` | Taiga biomes |
| `#minecraft:is_jungle` | Jungle biomes |
| `#minecraft:is_nether` | Nether biomes |
| `#minecraft:is_end` | End biomes |

## `.dimension()`

Restricts the ritual to a specific dimension.

```js
.conditions(c => c.dimension("minecraft:overworld"))
```

### Vanilla Dimensions

| Dimension | ID |
|---|---|
| Overworld | `minecraft:overworld` |
| Nether | `minecraft:the_nether` |
| End | `minecraft:the_end` |

### Modded Dimensions

Modded dimensions use their own namespace:

```js
.conditions(c => c.dimension("aether:the_aether"))
.conditions(c => c.dimension("twilightforest:twilight_forest"))
```

## Combining Both

Biome and dimension conditions work together:

```js
// Only in plains or sunflower plains, in the overworld
.conditions(c =>
    c.dimension("minecraft:overworld")
     .biomes(["minecraft:plains", "minecraft:sunflower_plains"])
)
```

::: tip
Dimension is a good safety net. If your ritual spawns dangerous mobs, restricting it to a specific dimension prevents unintended use in other dimensions where balance may differ.
:::
