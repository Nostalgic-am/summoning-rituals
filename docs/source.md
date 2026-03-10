# Source Code

The KubeJS integration for Summoning Rituals is implemented in Java. If you need to look up exact method signatures, parameter types, or understand the internals, here are the key source files on the **1.21.1** branch.

## Key Files

### AltarKubeRecipe.java
The main recipe builder class — this is where all the chained methods like `.itemInputs()`, `.entityOutputs()`, `.commands()`, etc. are defined.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/recipe/AltarKubeRecipe.java)

### AltarRecipeSchema.java
Defines the recipe schema that KubeJS uses to validate and process altar recipes.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/recipe/AltarRecipeSchema.java)

### ConditionsBuilder.java
The conditions builder that powers the `.conditions()` callback — biomes, dimensions, time, weather, height, structures, and open sky.

[View on GitHub →](https://github.com/AlmostReliable/summoningrituals/blob/1.21.1/src/main/java/com/almostreliable/summoningrituals/compat/kubejs/builder/ConditionsBuilder.java)

## Repository

The full source code is available on GitHub:

- **Repository:** [AlmostReliable/summoningrituals](https://github.com/AlmostReliable/summoningrituals)
- **Branch:** `1.21.1`
- **KubeJS package:** `com.almostreliable.summoningrituals.compat.kubejs`

## Community Resources

- [CurseForge](https://www.curseforge.com/minecraft/mc-mods/summoningrituals) — Downloads and mod page
- [Modrinth](https://modrinth.com/mod/summoningrituals) — Downloads and mod page
- [Discord](https://discord.com/invite/ThFnwZCyYY) — AlmostReliable community Discord
- [KubeJS Wiki](https://kubejs.com/) — General KubeJS documentation

::: info
This documentation is community-maintained and may not cover every edge case. When in doubt, check the source code or ask on the Discord.
:::
