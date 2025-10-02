# 🚀 Git Branching Guide

A clear and consistent Git workflow to keep our project organized and make collaboration seamless.

## 🏗️ Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | ✅ **Production-ready code only.** Stable, tested releases. |
| `dev` | 🔧 **Active development.** All features and fixes merge here first. |
| `feature/*` | 🛠️ **New features.** Example: `feature/login-page` |
| `bugfix/*` | 🐞 **Fix non-critical bugs.** Example: `bugfix/api-auth` |
| `hotfix/*` | 🔥 **Urgent production fixes.** Example: `hotfix/payment-crash` |

## 📋 Workflow Steps

### 1. 🛑 Always Pull Before You Push
```bash
git checkout dev
git pull origin dev
```
> 🔄 Do this before starting work and before pushing to avoid conflicts.

### 2. 🌿 Create a Feature/Fix Branch
```bash
git checkout -b feature/your-task-name
```
> ✅ Use descriptive names like `feature/dashboard-ui` or `bugfix/login-error`

### 3. 🚀 Push Your Branch
```bash
git push origin feature/your-task-name
```

### 4. 📬 Open a Pull Request (PR)
- **Base branch:** `dev`
- **PR title:** Clear and task-focused (e.g., "Add login page")
- **Description:** What does it do? Include screenshots if relevant.
- **Checklist:**
  - [ ] Code builds locally
  - [ ] Tests pass (if applicable)
  - [ ] Reviewed by at least one teammate

> 🏷️ Tag teammates for review using `@username`

### 5. 🧼 Keep `main` Clean
- Merge to `main` **only** after successful testing and approval
- Use PRs from `dev` → `main` to trigger production releases

## 🏷️ Naming Conventions

| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feature/` | `feature/dashboard-ui` |
| Bugfix | `bugfix/` | `bugfix/login-error` |
| Hotfix | `hotfix/` | `hotfix/payment-crash` |

## ✅ Quick Summary

- ✔️ Work in dedicated branches (`feature/*`, `bugfix/*`, etc.)
- 🔄 Pull from `dev` before pushing
- 🚀 Push your branch and open PR to `dev`
- ✅ Merge to `main` only after testing and approval
- 🏷️ Use clear, consistent branch names

## 🔧 Repository Setup (Admins)

- ✅ **Enable branch protection** on `main` (and optionally `dev`)
  - Require pull requests
  - Require review approval
  - Require status checks (tests/builds)
- 📦 **Automate PR checks** with GitHub Actions or CI tools
- 📝 **Add templates** for PRs and issues in `.github/` folder

---

**👥 Let's keep our workflow clean, clear, and collaborative!**

---

### 💡 Implementation Tips

- Save this as `GIT_GUIDE.md` or `CONTRIBUTING.md` in your repository root
- Link to it from your README with a notice like:

```
📘 See our [Git Branching Guide](./GIT_GUIDE.md) for collaboration rules.
```

The cleaned-up version is more scannable with better visual hierarchy, consistent formatting, and removed redundancy while keeping all essential information.