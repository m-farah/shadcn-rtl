
# shadcn-rtl

A simple TypeScript script to convert your **ShadCN** components to **RTL-ready** by transforming Tailwind CSS class names.

---

## 🛠 How to Use

1. Make sure your components are located in:
```
src/components
````

> If not, update the `COMPONENTS_PATH` variable inside the script.

2. Run the script using any of the following:

```bash
npx tsx rtl-transform.ts
# or
bun run rtl-transform.ts
# or
ts-node rtl-transform.ts
````

---

## ✅ What It Does

Replaces LTR Tailwind classes (`pl-`, `text-left`, `rounded-l`, etc.) with their RTL counterparts.
