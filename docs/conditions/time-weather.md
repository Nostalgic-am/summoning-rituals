# Time & Weather

## `.time()`

Restricts the ritual to a specific time of day.

```js
.conditions(c => c.time("night"))
.conditions(c => c.time("day"))
```

### Valid Values

| Value | Description | Minecraft Ticks |
|---|---|---|
| `"day"` | Daytime only | ~0–12999 |
| `"night"` | Nighttime only | ~13000–23999 |

### Example: Night-Only Ritual

```js
event.recipes.summoningrituals
    .altar("ender_pearl")
    .itemInputs(["blaze_powder", "obsidian"])
    .entityOutputs(["enderman"])
    .conditions(c => c.time("night"))
```

## `.weather()`

Restricts the ritual based on weather using a callback with a weather builder.

```js
.conditions(c =>
    c.weather(w => w.setThundering(true))
)
```

### Weather Builder Methods

| Method | Description |
|---|---|
| `w.setThundering(true)` | Requires an active thunderstorm |
| `w.setThundering(false)` | Requires no thunder |

### Example: Thunderstorm Ritual

```js
event.recipes.summoningrituals
    .altar("lightning_rod")
    .itemInputs(["copper_ingot", "iron_ingot"])
    .entityOutputs(["minecraft:lightning_bolt"])
    .conditions(c =>
        c.weather(w => w.setThundering(true))
    )
```

## Combining Time and Weather

Create atmospheric rituals by combining both:

```js
// Dark ritual: thunderstorm at night
.conditions(c =>
    c.time("night")
     .weather(w => w.setThundering(true))
)
```

```js
// Peaceful daytime ritual: clear day
.conditions(c =>
    c.time("day")
     .weather(w => w.setThundering(false))
)
```

::: info
Players can check the time with F3 (debug screen) and weather visually. Consider adding tooltips or documentation to your modpack so players know what conditions they need.
:::
