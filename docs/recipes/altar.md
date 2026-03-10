# Altar Recipe

The altar recipe is the core building block of Summoning Rituals. Every recipe uses a fluent builder pattern starting with `.altar()`.

## Basic Structure

```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("catalyst_item")
        .itemInputs([...])
        .itemOutputs([...])
})
```

## `.altar(catalyst)`

Sets the **catalyst** — the item the player right-clicks onto the altar to begin the ritual. The catalyst is consumed when the ritual starts.

```js
.altar("minecraft:stick")          // a specific item
.altar("minecraft:diamond_sword")  // works with any item
.altar("#c:ingots")                // item tags work too
```

## Full Builder API

Every method returns the builder, so all calls can be chained:

| Method | Type | Description |
|---|---|---|
| `.altar(catalyst)` | `string` | Set the catalyst item (required) |
| `.itemInputs(items)` | `string[]` | Items required on pedestals |
| `.entityInputs(entities)` | `string[] \| SummoningEntity[]` | Entities required in the sacrifice zone |
| `.itemOutputs(items)` | `string[] \| SummoningItem[]` | Items produced by the ritual |
| `.entityOutputs(entities)` | `string[] \| SummoningEntity[]` | Entities summoned by the ritual |
| `.commands(cmds)` | `string[]` | Server commands to execute on completion |
| `.sacrificeZone(size)` | `[x, y, z]` | Size of entity detection area |
| `.conditions(callback)` | `function` | Add biome/time/weather/etc. conditions |

## Sacrifice Zone

The `.sacrificeZone([x, y, z])` defines the detection area around the altar for entity inputs. Values represent the half-size of the bounding box on each axis.

```js
.sacrificeZone([3, 3, 3])  // detects entities in a 6x6x6 area centered on the altar
.sacrificeZone([5, 2, 5])  // wider but shorter detection area
```

::: tip
If your ritual uses `.entityInputs()`, always set a sacrifice zone large enough for the required entities to fit. If omitted, the default zone may be too small to detect anything.
:::

## Minimal Recipe

The simplest possible ritual — just a catalyst and one output:

```js
event.recipes.summoningrituals
    .altar("stick")
    .itemOutputs(["diamond"])
```

## Full Chain Example

```js
event.recipes.summoningrituals
    .altar("stick")
    .itemInputs(["cobblestone", "#c:glass_blocks", "3x #c:ingots"])
    .entityInputs(["3x cow", "phantom"])
    .itemOutputs(["apple", "3x diamond"])
    .entityOutputs(["bat", "4x creeper"])
    .commands(["say Ritual complete!"])
    .sacrificeZone([3, 3, 3])
    .conditions(c =>
        c.dimension("minecraft:overworld")
         .time("night")
    )
```
