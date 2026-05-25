# Kontent.ai Kickstart Sample Angular App

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![Discord][discord-shield]][discord-url]

This repository contains the solution for the Kontent.ai Kickstart Sample Angular App. It serves as a learning resource for those starting new projects with Kontent.ai, providing a foundational template to build upon.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your environment

Copy `.env.template` to `.env` and fill in your Kontent.ai credentials:

```bash
cp .env.template .env
```

```bash
# Used by Angular runtime (ng serve / ng build)
NG_APP_ENVIRONMENT_ID=your-environment-id
NG_APP_DELIVERY_API_KEY=your-delivery-api-key

# Used by scripts (model:generate, model:import, env:sync)
VITE_ENVIRONMENT_ID=your-environment-id
VITE_DELIVERY_API_KEY=your-delivery-api-key
VITE_MANAGEMENT_API_KEY=your-management-api-key
```

### 3. Run setup

Syncs your `.env` into `src/environments/environment.ts` and imports the completed Kontent.ai backup in one command:

```bash
npm run setup
```

### 4. Start the app

```bash
npm start
```

Open your browser at `http://localhost:4200`.

---

## Other Scripts

| Script | Description |
|---|---|
| `npm run env:sync` | Re-sync `.env` into `src/environments/environment.ts` after credential changes |
| `npm run model:generate` | Regenerate TypeScript models after updating the content model in Kontent.ai |
| `npm run model:import --filename="<path>"` | Import a specific backup from `./scripts/backups` |
| `npm run build` | Build for production into `dist/` |
| `npm run lint` | Run ESLint |
| `npm run biome:check` | Run Biome linter and formatter checks |
| `npm run biome:fix` | Run Biome and auto-fix issues |

> [!WARNING]
> `model:import` will **clean your environment first** — all existing content will be removed before importing.

> [!NOTE]
> Two backups are available in `./scripts/backups`: `kickstart-base.zip` (minimal content) and `kickstart-completed.zip` (fully populated).

## Contributing

- **Report Issues**: Use [GitHub Issues](https://github.com/tomh94/kickstart-angular-app/issues) to report bugs or request features.
- **Fork the Repository**: Create a personal fork of the repository on GitHub.
- **Create a Feature Branch**: Use a descriptive name for your branch.
- **Submit a Pull Request**: Submit your changes for review.

This project adheres to a [Code of Conduct](https://github.com/kontent-ai/.github/blob/main/CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.

## Support & Resources

- **Kontent.ai Support**: [Contact Support](https://kontent.ai/support/)
- **Kontent.ai Documentation**: [Learn more about Kontent.ai](https://kontent.ai/learn/)
- **Angular CLI Reference**: [Angular CLI Overview](https://angular.dev/tools/cli)

---

[contributors-shield]: https://img.shields.io/github/contributors/tomh94/kickstart-angular-app?style=for-the-badge
[contributors-url]: https://github.com/tomh94/kickstart-angular-app/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tomh94/kickstart-angular-app.svg?style=for-the-badge
[forks-url]: https://github.com/tomh94/kickstart-angular-app/network/members
[stars-shield]: https://img.shields.io/github/stars/tomh94/kickstart-angular-app.svg?style=for-the-badge
[stars-url]: https://github.com/tomh94/kickstart-angular-app/stargazers
[issues-shield]: https://img.shields.io/github/issues/tomh94/kickstart-angular-app.svg?style=for-the-badge
[issues-url]: https://github.com/tomh94/kickstart-angular-app/issues
[license-shield]: https://img.shields.io/github/license/tomh94/kickstart-angular-app.svg?style=for-the-badge
[license-url]: https://github.com/tomh94/kickstart-angular-app/blob/main/LICENSE.md
[discord-shield]: https://img.shields.io/discord/821885171984891914?color=%237289DA&label=Kontent.ai%20Discord&logo=discord&style=for-the-badge
[discord-url]: https://discord.com/invite/SKCxwPtevJ
