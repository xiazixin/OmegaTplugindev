# DeepSeek OmegaT Plugin

This plugin adds DeepSeek as a machine translation provider in OmegaT.

## Features

- Registers a DeepSeek translation engine inside OmegaT.
- Sends requests to the OpenAI-compatible DeepSeek chat completions API.
- Configurable model selection, temperature, and dynamic temperature.
- **Glossary support** — automatically reads OmegaT project glossaries and passes matching entries (with comments) to the AI as translation hints.

## Requirements

- OmegaT 6.0 or newer.
- A DeepSeek API key.

## Build

From the project root, run:

```bash
./gradlew build
```

On Windows, use:

```bat
gradlew.bat build
```

The plugin JAR is written to `build/libs/`.

## Install into OmegaT

1. Copy the generated JAR from `build/libs/` into OmegaT's plugin directory.
2. Restart OmegaT.

## Configuration

Open OmegaT's machine translation settings and configure the DeepSeek engine.

| Setting | Default | Description |
|---|---|---|
| API key | *(none)* | Your DeepSeek API key, stored in OmegaT credentials |
| Model | `deepseek-v4-flash` | `deepseek-v4-flash` (faster, cheaper) or `deepseek-v4-pro` (slower, more refined) |
| Temperature | `0.3` | Slider 0.0–2.0 in 0.1 steps |
| Dynamic Temperature | Off | When enabled, lets the API auto-adjust temperature — the slider is ignored |
| Glossary | None | **None** — glossary disabled. **Reference** — glossary entries are sent as hints; the AI uses judgment and won't blindly override compound terms (e.g. `白金色` stays `platinum color` even with `金色 → gold color` in the glossary). **Strict** — glossary entries must be used exactly. |

You can also override settings with system properties:

- `deepseek.api.key`
- `deepseek.api.model`
- `deepseek.api.url`

## Glossary Files

When glossary mode is set to **Reference** or **Strict**, the plugin reads standard OmegaT glossary files (`.txt`, `.csv`, `.tab`, `.utf8`) from your project's `glossary` folder. Each line should be tab-separated:

```
source term → target term → comment (optional)
```

Only entries whose source term appears in the current segment are included in the prompt (up to 20, sorted by specificity).

## Notes

- The plugin sends only the translated text back to OmegaT.
- The translation prompt asks the API to preserve tags, placeholders, and line breaks.
- In **Reference** glossary mode, glossary entries are sent as contextual hints — the AI is instructed to use judgment and not blindly apply partial matches (e.g., compound words containing a glossary term won't be incorrectly split).
- When no OmegaT project is open, glossary features are silently skipped with no errors.
