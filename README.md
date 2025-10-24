# 💻 My Personal Visual Studio Code Configuration  
Optimized for **focus**, **performance**, and a **clean workflow**.

This repository includes:

- **settings.json** → Core preferences and editor tweaks  
- **keybindings.json** → Custom shortcuts for speed and comfort  
- **extensions.txt** → List of all installed extensions  

---

## 🧩 How to Install All Extensions Automatically

### For macOS / Linux

```bash
cat extensions.txt | xargs -n 1 code --install-extension
````

### For Windows (PowerShell)

```powershell
Get-Content extensions.txt | ForEach-Object { code --install-extension $_ }
```

✅ This will automatically install every extension listed in `extensions.txt`.

After installation, restart VS Code to apply all settings and extensions.
