# Ritual Events

Summoning Rituals fires two events that let you hook in custom logic with KubeJS. Use these to add costs, effects, rewards, or cancel rituals based on custom conditions.

## Event Properties

Both events share the same event object:

| Property | Type | Description |
|---|---|---|
| `event.level` | `ServerLevel` | The world/level the ritual is in |
| `event.pos` | `BlockPos` | Block position of the altar |
| `event.recipe` | `AltarRecipe` | The recipe being crafted |
| `event.player` | `ServerPlayer?` | The player who invoked the ritual |

::: warning NULL PLAYER
`event.player` is **null** if the ritual was started through automation (redstone, mods, etc.). Always check before accessing player properties:
```js
if (!event.player) return;
```
:::

## `summoningrituals.start`

Fired **after** the catalyst is inserted but **before** the ritual begins. This event **can be cancelled**.

```js
ServerEvents.generic("summoningrituals.start", event => {
    // Lightning strike visual effect
    event.level.spawnLightning(event.pos.x, event.pos.y, event.pos.z, true);

    if (!event.player) return;

    // Require 3 XP levels to start
    if (event.player.getXpLevel() < 3) {
        event.cancel();  // prevents the ritual from starting
    }
})
```

### Use Cases

- **Visual effects** — lightning, particles, sounds when a ritual starts
- **XP cost** — require and deduct experience levels
- **Item checks** — require the player to hold or carry specific items
- **Custom conditions** — cancel based on any logic you want
- **Cooldowns** — prevent spamming rituals

### XP Cost Example

```js
ServerEvents.generic("summoningrituals.start", event => {
    if (!event.player) return;

    // Cost: 5 levels
    if (event.player.getXpLevel() < 5) {
        event.cancel();
        return;
    }
    event.player.addXPLevels(-5);
})
```

## `summoningrituals.complete`

Fired **after** the ritual completes and outputs have already been spawned. This event **cannot** be cancelled.

```js
ServerEvents.generic("summoningrituals.complete", event => {
    if (!event.player) return;

    // Reward: 10 XP levels
    event.player.addXPLevels(10);
})
```

### Use Cases

- **XP rewards** — give experience on completion
- **Potion effects** — buff or debuff the player
- **Advancements** — grant custom advancements
- **Additional spawns** — spawn particles, lightning, entities
- **Progression** — trigger gamestage or quest completion

### Full Reward Example

```js
ServerEvents.generic("summoningrituals.complete", event => {
    if (!event.player) return;

    // XP reward
    event.player.addXPLevels(10);

    // Potion effects
    event.player.potionEffects.add("minecraft:regeneration", 200, 1);
    event.player.potionEffects.add("minecraft:glowing", 100, 0);

    // Lightning at the altar
    event.level.spawnLightning(event.pos.x, event.pos.y, event.pos.z, true);
})
```

## Both Events Together

```js
// === Ritual Start ===
ServerEvents.generic("summoningrituals.start", event => {
    // Visual: lightning strike
    event.level.spawnLightning(event.pos.x, event.pos.y, event.pos.z, true);

    if (!event.player) return;

    // Cost: 5 XP levels
    if (event.player.getXpLevel() < 5) {
        event.cancel();
        return;
    }
    event.player.addXPLevels(-5);
})

// === Ritual Complete ===
ServerEvents.generic("summoningrituals.complete", event => {
    if (!event.player) return;

    // Reward: 10 XP levels + regeneration
    event.player.addXPLevels(10);
    event.player.potionEffects.add("minecraft:regeneration", 200, 2);
})
```

::: info GLOBAL EVENTS
Events apply to **all** summoning rituals, not individual ones. If you want different behavior per recipe, inspect `event.recipe` to identify which ritual is being performed and branch accordingly.
:::
