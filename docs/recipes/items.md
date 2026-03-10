# Item Inputs & Outputs

## Item Inputs

Use `.itemInputs()` to define items that must be placed on the pedestals around the altar before starting the ritual. Pass an **array** of item strings.

```js
.itemInputs(["cobblestone", "#c:glass_blocks", "3x #c:ingots"])
```

### Item String Format

| Format | Example | Description |
|---|---|---|
| `"item_id"` | `"cobblestone"` | A single item |
| `"namespace:item_id"` | `"minecraft:cobblestone"` | With explicit namespace |
| `"Nx item_id"` | `"3x minecraft:stone"` | N copies of an item |
| `"#tag"` | `"#c:glass_blocks"` | Any item matching a tag |
| `"Nx #tag"` | `"3x #c:ingots"` | N items matching a tag |

The `minecraft:` namespace is optional — `"cobblestone"` and `"minecraft:cobblestone"` are equivalent.

::: warning
On NeoForge 1.21.1, common tags use the `#c:` prefix (e.g. `#c:ingots`, `#c:glass_blocks`). The old `#forge:` prefix from 1.19/1.20 will **not** work.
:::

### Example

```js
.itemInputs([
    "cobblestone",            // 1 cobblestone
    "#c:glass_blocks",        // 1 item from the glass blocks tag
    "3x #c:ingots",           // 3 items from the ingots tag
    "64x minecraft:stone",    // a full stack of stone
    "minecraft:ender_pearl",  // 1 ender pearl
])
```

## Item Outputs

Use `.itemOutputs()` to define items produced when the ritual completes. Supports simple strings or `SummoningItem` for advanced control.

### Simple Outputs

```js
.itemOutputs(["apple", "carrot", "3x diamond"])
```

Items spawn at the altar's position when the ritual finishes.

### SummoningItem

For control over where items spawn, use `SummoningItem.of()`:

```js
.itemOutputs([
    "apple",                                   // simple string
    "carrot",                                   // simple string
    SummoningItem.of("3x diamond"),             // 3 diamonds, default position
    SummoningItem.of("emerald")
        .offset([1, 2, 2])                     // shifted spawn position
        .spread([4, 2, 4]),                    // randomized spread
])
```

### SummoningItem Methods

| Method | Description |
|---|---|
| `SummoningItem.of(item)` | Create a summoning item (supports `Nx` count prefix) |
| `.offset([x, y, z])` | Offset spawn position relative to the altar center |
| `.spread([x, y, z])` | Add random spread to the spawn position |

### Offset vs Spread

**Offset** shifts the spawn point by a fixed amount from the altar's center position. **Spread** adds random variation on top of that.

```js
// Spawns emeralds at (altar.x + 1, altar.y + 2, altar.z + 2)
// with random scatter in a 4x2x4 block area
SummoningItem.of("emerald")
    .offset([1, 2, 2])
    .spread([4, 2, 4])
```

This is useful for creating dramatic multi-item outputs that scatter around the altar instead of all stacking in one spot.

::: info
If no offset or spread is set, items spawn directly at the altar's center position.
:::

### Practical Examples

```js
// Simple transformation: stone to diamonds
.itemInputs(["64x stone"])
.itemOutputs(["3x diamond"])

// Multiple outputs with spread
.itemOutputs([
    SummoningItem.of("16x gold_ingot").spread([2, 1, 2]),
    SummoningItem.of("emerald").offset([0, 3, 0]),
])

// Mix of simple and advanced
.itemOutputs([
    "apple",
    "carrot",
    SummoningItem.of("3x diamond"),
    SummoningItem.of("nether_star").offset([0, 2, 0]),
])
```
