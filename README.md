# Query Extractor VS Code Extension

A simple VS Code extension to **extract variables** from SQL queries and copy them to your clipboard.

## ✨ Features

- Extracts variables of the form `${variableName}` from SQL queries.
- Ignores comments (`--` and `/* */`) by default.
- Works for both:
  - Whole `.sql` files
  - Selected text inside any file
- Automatically copies the found variables as a comma-separated list to your clipboard.
- Shows a notification with the count of variables copied.

---

## 🚀 Usage

1. Open a `.sql` file or select a SQL query snippet.
2. Run the command **`Query Extractor: Extract Variables`**:
   - Open **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P` on macOS).
   - Search for **"Query Extractor: Extract Variables"**.
3. If variables are found:
   - They are copied to your clipboard.
   - You’ll see a message like `Copied 3 variables to clipboard`.

---

## 📦 Example

```sql
-- Sample SQL
SELECT *
FROM users
WHERE id = ${userId}
AND status = ${status}
AND role = ${userRole};
```

**Extracted Variables:**

```
status, userId, userRole
```

---

## ⚙️ Installation (Local Dev)

1. Clone or download this repository.
2. Run `npm install` to install dependencies.
3. Open the project in VS Code.
4. Press `F5` to launch a new VS Code window with the extension loaded.
5. Run the command from the Command Palette.

---

## 🛠️ Development Notes

- Variables are matched using the regex:

  ```regex
  (?<!\\)(?:['"])?\$\{\s*([A-Za-z_][A-Za-z0-9_\.]*)\s*\}(?:['"])?
  ```

- This ensures escaped variables (`\${var}`) are ignored.

- Comments are stripped before parsing.

---

## 📜 License

MIT License
