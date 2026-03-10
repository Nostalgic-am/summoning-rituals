# Commands

Rituals can execute server commands when they complete, enabling integration with other mods, world changes, achievements, and more.

## `.commands()`

Pass an array of command strings. The leading `/` is **optional** — both formats are identical:

```js
.commands(["say Hi", "/say Hello"])  // both work the same way
```

## Examples

### Chat Messages

```js
.commands(["say The ritual is complete!"])
```

### Player Effects

```js
.commands([
    "effect give @p minecraft:regeneration 60 2",
    "effect give @p minecraft:strength 60 1",
    "effect give @p minecraft:glowing 30 0",
])
```

### Advancements

```js
.commands(["advancement grant @p only my_pack:completed_ritual"])
```

### Sound Effects

```js
.commands([
    "playsound minecraft:entity.ender_dragon.growl master @p",
    "playsound minecraft:entity.wither.spawn master @p ~ ~ ~ 1 0.5",
])
```

### World Changes

```js
.commands([
    "weather thunder 6000",
    "time set midnight",
])
```

### Multiple Commands

You can combine any number of commands — they all execute in sequence when the ritual completes:

```js
.commands([
    "say A dark ritual has been completed...",
    "playsound minecraft:entity.wither.spawn master @a ~ ~ ~ 0.5 0.5",
    "effect give @p minecraft:darkness 100 0",
    "summon lightning_bolt ~ ~ ~",
])
```

## Selectors

Commands are executed as the **server** with full permissions. Standard target selectors work:

| Selector | Description |
|---|---|
| `@p` | Nearest player (typically the one who started the ritual) |
| `@a` | All players |
| `@e` | All entities |
| `@s` | The executing entity (the server) |

::: warning SECURITY
Commands run with **full server permissions** (equivalent to op level 4). Be careful what you expose in a modpack — players performing the ritual will indirectly trigger these commands.
:::

::: tip
For complex per-player logic that goes beyond commands (like checking inventory, XP levels, or cancelling the ritual), use [Events](/events) instead.
:::
