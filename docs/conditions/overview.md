# Conditions Overview

Conditions restrict **when** and **where** a ritual can be performed. They're added to a recipe using the `.conditions()` method with a builder callback.

## Basic Usage

```js
event.recipes.summoningrituals
    .altar("stick")
    .itemInputs(["cobblestone"])
    .itemOutputs(["diamond"])
    .conditions(conditions =>
        conditions
            .dimension("minecraft:overworld")
            .time("night")
    )
```

## Available Conditions

| Method | Description | Page |
|---|---|---|
| `.biomes([...])` | Require specific biomes | [Biome & Dimension](/conditions/biome-dimension) |
| `.dimension(id)` | Require a specific dimension | [Biome & Dimension](/conditions/biome-dimension) |
| `.time(time)` | Require day or night | [Time & Weather](/conditions/time-weather) |
| `.weather(callback)` | Require weather state | [Time & Weather](/conditions/time-weather) |
| `.maxHeight(y)` | Require altar below a Y level | [Height, Sky & Structures](/conditions/environment) |
| `.setOpenSky(bool)` | Require open/covered sky | [Height, Sky & Structures](/conditions/environment) |
| `.structures(id)` | Require a structure nearby | [Height, Sky & Structures](/conditions/environment) |

## How Conditions Work

All conditions are **AND**-combined. Every condition must be satisfied simultaneously for the ritual to start.

If any condition fails when the player inserts the catalyst:
- The ritual does **not** start
- The catalyst is **returned** to the player
- There is **no** error message by default

## Full Conditions Example

This example uses every available condition:

```js
.conditions(conditions =>
    conditions
        .biomes(["minecraft:plains", "minecraft:desert"])
        .dimension("minecraft:overworld")
        .maxHeight(30)
        .setOpenSky(true)
        .structures("#minecraft:mineshaft")
        .time("night")
        .weather(w => w.setThundering(true))
)
```

This ritual requires **all** of the following to be true:
1. Altar is in a plains or desert biome
2. Altar is in the overworld
3. Altar is at Y=30 or below
4. Altar has open sky above
5. Altar is inside a mineshaft structure
6. It is nighttime
7. It is thundering

::: tip DESIGN TIP
You don't need to use every condition. Most rituals only need one or two. Use conditions to create themed rituals — a "dark ritual" might need nighttime, while an "ocean ritual" might need a specific biome.
:::
