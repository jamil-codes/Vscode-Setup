# My Personal Visual Studio Code Configuration
**Optimized for focus, performance, and a clean workflow**

This repository includes:
- **`settings.json`** → Core preferences and editor tweaks
- **`keybindings.json`** → Custom shortcuts for speed and comfort
- **`extensions.txt`** → List of all installed extensions
- **`custom-vscode.css`** → Custom UI styling
- **`custom-vscode-script.js`** → Custom JavaScript enhancements

---

## Prerequisites

1. **Install VS Code** (Latest version)
   - [Download from official website](https://code.visualstudio.com/download)
   - **Linux:** Use the **.deb/.rpm** version (not Snap) for better compatibility

2. **Install Geist Font** (Powered by Vercel)
   - Download from [Geist Font](https://vercel.com/font)
   - Install on your OS for the optimal coding experience

---

## ⚡ Quick Start (5 Minutes Total)

### Step 1: Clone/Download This Repository
```bash
git clone https://github.com/jamil-codes/Vscode-Setup.git
cd Vscode-Setup
# OR simply download and extract to this folder
```

### Step 2: Install All Extensions Automatically

**For macOS / Linux:**
```bash
cat extensions.txt | xargs -n 1 code --force --install-extension
```

**For Windows (PowerShell):**
```powershell
Get-Content extensions.txt | ForEach-Object { code --force --install-extension $_  }
```

✅ This installs **all extensions** at once with progress feedback.

### Step 3: Apply Settings

**For macOS / Linux:**
```bash
# Backup your current settings first
cp ~/.config/Code/User/settings.json ~/.config/Code/User/settings.json.backup 2>/dev/null || echo "No existing settings"

# Copy new settings
cp settings.json ~/.config/Code/User/settings.json
cp keybindings.json ~/.config/Code/User/keybindings.json 2>/dev/null || echo "No keybindings file"
```

**For Windows (PowerShell):**
```powershell
# Backup your current settings first
Copy-Item "$env:APPDATA\Code\User\settings.json" "$env:APPDATA\Code\User\settings.json.backup" -ErrorAction SilentlyContinue

# Copy new settings
Copy-Item settings.json "$env:APPDATA\Code\User\settings.json"
Copy-Item keybindings.json "$env:APPDATA\Code\User\keybindings.json" -ErrorAction SilentlyContinue
```

### Step 4: Configure Custom CSS/JS

1. **Copy the custom files:**

**For macOS / Linux:**
```bash
cp custom-vscode.css ~/
cp custom-vscode-script.js ~/
```

**For Windows (PowerShell):**
```powershell
Copy-Item custom-vscode.css "$env:USERPROFILE\"
Copy-Item custom-vscode-script.js "$env:USERPROFILE\"
```

2. **Update the paths** in your `settings.json` (open with any text editor):

**For macOS / Linux:**
```json
"vscode_custom_css.imports": [
    "file:///${userHome}/custom-vscode.css",
    "file:///${userHome}/custom-vscode-script.js"
]
```

**For Windows:**
```json
"vscode_custom_css.imports": [
    "file:///C:/Users/<YourUsername>/custom-vscode.css",
    "file:///C:/Users/<YourUsername>/custom-vscode-script.js"
]
```

3. **Reload custom CSS**:
   - Open VS Code
   - Press `Ctrl+Shift+P`
   - Type "Reload Custom CSS and JS"
   - Press Enter (VS Code will restart)

---

## Troubleshooting

### Custom CSS Not Working?
- **Verify file paths exist**:
  ```bash
  # macOS/Linux
  ls -la ~/custom-vscode.css

  # Windows (PowerShell)
  Test-Path "$env:USERPROFILE\custom-vscode.css"
  ```
- **Official Docs**: Read the documentation of "Custom Css Js Loader" extention ( Recommended )
- **Check for errors**: Open VS Code, press `Ctrl+Shift+P` and open Developer Tools, look for errors in the console

### Extensions Not Installing?
- Make sure VS Code is installed and `code` command works

---

## Notes

- **VS Code Updates**: After each VS Code update, you may need to reload custom CSS
- **Extension Updates**: Run `code --update-extensions` periodically
- **Compatibility**: Tested on VS Code 1.85+ on Windows, macOS, and Linux

---

**Happy Coding!** 🚀
