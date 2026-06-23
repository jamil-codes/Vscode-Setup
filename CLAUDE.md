# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose of the Repository

`Vscode-Setup` houses a personal Visual Studio Code configuration that can be applied to a fresh VS Code installation.  It includes:
- Editor **settings** (`settings.json`)
- Custom **keybindings** (`keybindings.json`)
- A curated list of **extensions** (`extensions.txt`)
- Optional **custom CSS** and **JavaScript** (`custom-vscode.css`, `custom-vscode-script.js`)
- A small **README** that documents the onboarding steps.

Claude should treat this repo as a *configuration bundle* rather than an application with build or test pipelines.

## Common Development Commands

These commands are useful when a user wants to work with or modify the configuration locally.

| Task | Command (Linux/macOS) | Command (Windows PowerShell) |
|------|-----------------------|------------------------------|
| **Install all extensions** | `cat extensions.txt \| xargs -n 1 code --force --install-extension` | `Get-Content extensions.txt \| ForEach-Object { code --force --install-extension $_ }` |
| **Backup existing VS Code settings** | `cp ~/.config/Code/User/settings.json ~/.config/Code/User/settings.json.backup 2>/dev/null || echo "No existing settings"` | `Copy-Item "$env:APPDATA\Code\User\settings.json" "$env:APPDATA\Code\User\settings.json.backup" -ErrorAction SilentlyContinue` |
| **Apply the bundled settings** | `cp settings.json ~/.config/Code/User/settings.json` | `Copy-Item settings.json "$env:APPDATA\Code\User\settings.json"` |
| **Apply the bundled keybindings** | `cp keybindings.json ~/.config/Code/User/keybindings.json` (optional) | `Copy-Item keybindings.json "$env:APPDATA\Code\User\keybindings.json" -ErrorAction SilentlyContinue` |
| **Install custom CSS/JS** | `cp custom-vscode.css ~/ && cp custom-vscode-script.js ~/` | `Copy-Item custom-vscode.css "$env:USERPROFILE\"; Copy-Item custom-vscode-script.js "$env:USERPROFILE\"` |
| **Reload custom CSS/JS** | Open the Command Palette (`Ctrl+Shift+P`) → *Reload Custom CSS and JS* → press **Enter**. | Same UI steps in VS Code.
| **Update all extensions** | `code --update-extensions` | `code --update-extensions` |
| **Run a single extension installation (debugging)** | `code --install-extension <extension-id>` | `code --install-extension <extension-id>` |
| **Validate custom CSS path** | `ls -la ~/custom-vscode.css` | `Test-Path "$env:USERPROFILE\custom-vscode.css"` |

> **Note:** There are no build, lint, or test scripts in this repository because it only contains configuration files.

## High‑Level Architecture & Structure

```
Vscode-Setup/
│   README.md                # Overview and quick‑start guide
│   settings.json            # Core VS Code settings (editor, UI, file handling, etc.)
│   keybindings.json         # Personal keyboard shortcuts (mostly terminal‑related)
│   extensions.txt           # One extension ID per line
│   custom-vscode.css        # Optional user CSS loaded via the "Custom CSS and JS Loader" extension
│   custom-vscode-script.js  # Optional user JavaScript loaded alongside the CSS
│   cursor-extentions.txt    # List of Cursor extensions (informational only)
│   .git/ …                  # Standard Git metadata
│   CLAUDE.md                # This documentation (generated for Claude Code)
```

- **Settings (`settings.json`)** – defines editor behavior, UI layout, file handling, and a few extension‑specific configurations.  The file is meant to be **copied** wholesale into the user’s VS Code profile.
- **Keybindings (`keybindings.json`)** – mostly terminal toggling shortcuts; can be merged with an existing keybinding file if a user already has custom bindings.
- **Extensions (`extensions.txt`)** – the source of truth for which extensions should be present.  They are installed via the `code` CLI.
- **Custom CSS/JS** – optional visual tweaks loaded by the *Custom CSS and JS Loader* extension.  Paths are referenced in `settings.json` under `vscode_custom_css.imports`.
- **Cursor extensions list** – not consumed by any script but useful for documentation; Claude can surface it when a user asks about recommended Cursor extensions. 

### Interaction Flow for a New Machine
1. **Clone the repo** (or download the zip).
2. **Install extensions** – run the appropriate `cat extensions.txt …` command.
3. **Backup existing VS Code configuration** (optional but recommended).
4. **Copy the bundled `settings.json` and `keybindings.json`** into the user profile.
5. **Copy optional CSS/JS** to the home directory and verify the import paths in `settings.json` match the location.
6. **Reload custom CSS/JS** via the VS Code command palette.
7. **Run `code --update-extensions`** periodically to keep extensions up‑to‑date.

## Important Non‑Code Files
- **`cursor-extentions.txt`** – documents the author’s preferred extensions for the Cursor AI editor.  Claude should mention this file when asked about Cursor recommendations.
- **`README.md`** – contains the step‑by‑step quick‑start already reflected above; use it for user‑facing documentation.

## Tips for Claude Code
- When a user asks how to *apply* the configuration, prioritize the commands in the **Common Development Commands** table.
- If a user wants to **add** or **remove** a single extension, suggest using `code --install-extension <id>` or `code --uninstall-extension <id>` respectively, then updating `extensions.txt`.
- For any path‑related troubleshooting, remind the user to verify that the absolute paths in `settings.json` (`vscode_custom_css.imports`) point to the files copied in step 5.
- Since there are no test suites, avoid mentioning `npm`, `yarn`, `make`, or similar build tools.
- If a user asks about linting, explain that linting is handled by extensions (e.g., *ESLint*, *Prettier*) that are already part of the extension list.

---

*Generated by Claude Code on 2026‑06‑23*
