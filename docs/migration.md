# Migration from 1.19/1.20

If you have existing Summoning Rituals scripts from Minecraft 1.19 or 1.20, several things have changed in the **1.21.1** version. This guide covers every breaking change.

## Event Registration

KubeJS 6 uses a new event registration syntax.

**Before (1.19/1.20):**
```js
onEvent('recipes', event => {
    event.recipes.summoningrituals
        .altar('iron_ingot')
        // ...
})
```

**After (1.21.1):**
```js
ServerEvents.recipes(event => {
    event.recipes.summoningrituals
        .altar("iron_ingot")
        // ...
})
```

## Inputs

Individual `.input()` calls have been replaced with a single `.itemInputs()` that takes an array.

**Before:**
```js
.input('64x minecraft:stone')
.input('5x prismarine_shard')
.input(Ingredient.of('#forge:glass'))
```

**After:**
```js
.itemInputs(["64x minecraft:stone", "5x prismarine_shard", "#c:glass_blocks"])
```

::: warning
Tag namespaces have changed from `#forge:` to `#c:` on NeoForge 1.21.1 (Common tags convention).
:::

## Outputs

Individual `.itemOutput()` and `.mobOutput()` calls have been replaced with `.itemOutputs()` and `.entityOutputs()` arrays.

**Before:**
```js
.itemOutput('3x gold_ingot')
.itemOutput('diamond')
.mobOutput('wolf')
.mobOutput(SummoningOutput.mob('blaze').count(5).offset(0, 3, 0))
```

**After:**
```js
.itemOutputs(["3x gold_ingot", "diamond"])
.entityOutputs([
    "wolf",
    SummoningEntity.output("blaze", 5).offset([0, 3, 0])
])
```

## Entity Helpers

`SummoningOutput.mob()` has been renamed to `SummoningEntity.output()`, and a new `SummoningEntity.input()` exists for sacrifice inputs.

| Before (1.19/1.20) | After (1.21.1) |
|---|---|
| `SummoningOutput.mob("blaze")` | `SummoningEntity.output("blaze")` |
| `.count(5)` | Second parameter: `SummoningEntity.output("blaze", 5)` |
| N/A | `SummoningEntity.input("cat")` |

Item output helpers also changed:

| Before | After |
|---|---|
| N/A | `SummoningItem.of("3x diamond")` |

## Sacrifices

The `.sacrifice()` method and `.sacrificeRegion()` have been replaced.

**Before:**
```js
.sacrifice('pig', 3)
.sacrifice('sheep')
.sacrificeRegion(3, 3)
```

**After:**
```js
.entityInputs(["3x pig", "sheep"])
.sacrificeZone([3, 3, 3])
```

Note that `.sacrificeZone()` now takes a **3D array** `[x, y, z]` instead of two values.

## Conditions

Conditions like `.blockBelow()`, `.weather()`, and `.dayTime()` have been consolidated into a `.conditions()` builder.

**Before:**
```js
.blockBelow('minecraft:furnace', { lit: true })
.weather('clear')
.dayTime('day')
```

**After:**
```js
.conditions(conditions =>
    conditions
        .time("day")
        .weather(w => w.setThundering(false))
        .dimension("minecraft:overworld")
        .biomes(["minecraft:plains"])
        .maxHeight(256)
        .setOpenSky(true)
        .structures("#minecraft:village")
)
```

::: info
The `.blockBelow()` condition may not have a direct equivalent in 1.21.1. Check the [Conditions Overview](/conditions/overview) for all available conditions.
:::

## Recipe Time

The `.recipeTime()` method may have changed or been removed in 1.21.1. The ritual duration is now handled differently.

## Commands

A new `.commands()` method has been added for running server commands on ritual completion:

```js
.commands(["say Ritual complete!", "/give @p diamond 1"])
```

## Events

Event registration uses the new KubeJS 6 syntax:

**Before:**
```js
onEvent('summoningrituals.start', event => { ... })
onEvent('summoningrituals.complete', event => { ... })
```

**After:**
```js
ServerEvents.generic("summoningrituals.start", event => { ... })
ServerEvents.generic("summoningrituals.complete", event => { ... })
```

## Quick Reference

| Feature | 1.19/1.20 | 1.21.1 |
|---|---|---|
| Event registration | `onEvent('recipes', ...)` | `ServerEvents.recipes(...)` |
| Item inputs | `.input(item)` (chained) | `.itemInputs([...])` (array) |
| Item outputs | `.itemOutput(item)` (chained) | `.itemOutputs([...])` (array) |
| Mob outputs | `.mobOutput(mob)` (chained) | `.entityOutputs([...])` (array) |
| Sacrifices | `.sacrifice(mob, count)` | `.entityInputs([...])` |
| Sacrifice area | `.sacrificeRegion(x, z)` | `.sacrificeZone([x, y, z])` |
| Entity helper | `SummoningOutput.mob()` | `SummoningEntity.output()` |
| Conditions | Individual methods | `.conditions(builder)` |
| Commands | N/A | `.commands([...])` |
| Tags | `#forge:` | `#c:` |
