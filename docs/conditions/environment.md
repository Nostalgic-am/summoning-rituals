# Height, Sky & Structures

## `.maxHeight()`

Restricts the ritual so the altar must be **at or below** a specific Y level.

```js
.conditions(c => c.maxHeight(30))   // altar must be at Y ≤ 30
```

### Use Cases

| Value | Effect |
|---|---|
| `maxHeight(0)` | Deep underground only (below sea level) |
| `maxHeight(30)` | Underground (cave level) |
| `maxHeight(63)` | At or below sea level |
| `maxHeight(100)` | Below mountain level |

### Example: Deep Underground Ritual

```js
event.recipes.summoningrituals
    .altar("deepslate")
    .itemInputs(["sculk", "echo_shard"])
    .entityOutputs(["minecraft:warden"])
    .conditions(c => c.maxHeight(0))
```

## `.setOpenSky()`

Requires the altar to have (or not have) a clear line of sight to the sky.

```js
.conditions(c => c.setOpenSky(true))   // must be outdoors
.conditions(c => c.setOpenSky(false))  // must be covered/underground
```

| Value | Description |
|---|---|
| `true` | Altar must have open sky above (no blocks overhead) |
| `false` | Altar must be covered (blocks above it) |

### Example: Outdoor Summoning

```js
event.recipes.summoningrituals
    .altar("sunflower")
    .itemInputs(["gold_ingot", "glowstone_dust"])
    .entityOutputs(["minecraft:allay"])
    .conditions(c =>
        c.setOpenSky(true)
         .time("day")
    )
```

### Example: Cave Ritual

```js
event.recipes.summoningrituals
    .altar("sculk_catalyst")
    .itemInputs(["echo_shard", "amethyst_shard"])
    .entityOutputs(["minecraft:warden"])
    .conditions(c =>
        c.setOpenSky(false)
         .maxHeight(0)
    )
```

## `.structures()`

Restricts the ritual to within the bounds of a specific structure.

```js
.conditions(c => c.structures("#minecraft:mineshaft"))
```

The altar must be inside the **bounding box** of the matching structure.

### Structure Tags

Use `#` for structure tags:

```js
.conditions(c => c.structures("#minecraft:village"))
.conditions(c => c.structures("#minecraft:ocean_ruin"))
```

### Specific Structures

```js
.conditions(c => c.structures("minecraft:stronghold"))
.conditions(c => c.structures("minecraft:monument"))
.conditions(c => c.structures("minecraft:fortress"))
```

### Common Structure Tags (1.21.1)

| Tag | Includes |
|---|---|
| `#minecraft:mineshaft` | Mineshaft, Mesa Mineshaft |
| `#minecraft:village` | All village types |
| `#minecraft:ocean_ruin` | Cold and Warm ocean ruins |
| `#minecraft:shipwreck` | All shipwrecks |
| `#minecraft:ruined_portal` | All ruined portals |

### Example: Stronghold Ritual

```js
event.recipes.summoningrituals
    .altar("ender_eye")
    .itemInputs(["12x ender_pearl", "12x blaze_powder"])
    .commands(["setblock ~ ~1 ~ end_portal"])
    .conditions(c =>
        c.structures("minecraft:stronghold")
         .dimension("minecraft:overworld")
    )
```

::: tip EXPLORATION REWARD
Structure conditions are great for rewarding exploration. Require players to find a specific structure before they can perform a powerful ritual — it adds progression and adventure to your modpack.
:::

## Combining All Three

```js
// Underground mineshaft ritual at night
.conditions(c =>
    c.maxHeight(30)
     .setOpenSky(false)
     .structures("#minecraft:mineshaft")
     .time("night")
)
```
