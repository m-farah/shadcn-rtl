# shadcn-rtl

A CLI tool to convert your **ShadCN** components to **RTL-ready** by transforming Tailwind CSS class names.

---

## 🚀 Installation & Usage

### Quick Start (Recommended)

```bash
npm i shadcn-rtl -g
```

This will process components in the default location: `src/components`

### Custom Path

```bash
npx shadcn-rtl --path=./components
npx shadcn-rtl --path=src/ui
npx shadcn-rtl --path=/absolute/path/to/components
```

---

## 📦 Install Locally (Optional)

If you plan to use this tool frequently, you can install it globally:

```bash
npm install -g shadcn-rtl
```

Then use it directly:

```bash
shadcn-rtl
shadcn-rtl --path=./my-components
```

---

## ✅ What It Does

Replaces LTR Tailwind classes with their RTL counterparts:

| LTR Class | RTL Class |
|-----------|-----------|
| `pl-` | `ps-` |
| `pr-` | `pe-` |
| `ml-` | `ms-` |
| `mr-` | `me-` |
| `text-left` | `text-start` |
| `rounded-l-` | `rounded-s-` |
| `border-l-` | `border-s-` |
| And many more... | |

---

## 🔧 Development

### Build

```bash
npm run build
```

### Run Locally

```bash
npm start
```

