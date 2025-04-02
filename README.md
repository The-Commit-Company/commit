<p align="center">
  <a href="https://github.com/The-Commit-Company/commit">
  <img src="dashboard/src/assets/commit-logo.png" alt="Commit logo" height="100" />
     </a>

   <h3 align="center">commit</h3>
  <p align="center">Developer tooling for the Frappeverse 🪐
     <br />
    <br />
    <a href="https://frappecloud.com/marketplace/apps/commit"><strong>Install on Frappe Cloud »</strong></a>
    <br />
    <br />
    <a href="https://commit.frappe.cloud/"><strong>Learn More »</strong></a>
    <br />
    <br />
    <a href="https://github.com/The-Commit-Company/commit/issues">Issues</a>
    .
    <a href="https://github.com/sponsors/The-Commit-Company?frequency=one-time">Sponsor Us!</a>
  </p>
</p>
<p align="center">
  <a href="https://github.com/The-Commit-Company/commit/blob/main/LICENSE">
    <img alt="license" src="https://img.shields.io/badge/license-AGPLv3-blue">
  </a>
     <a href="https://github.com/The-Commit-Company/commit/stargazers"><img src="https://img.shields.io/github/stars/The-Commit-Company/commit" alt="Github Stars"></a>
     <a href="https://github.com/The-Commit-Company/commit/pulse"><img src="https://img.shields.io/github/commit-activity/m/The-Commit-Company/commit" alt="Commits-per-month"></a>
</p>


# [commit](https://commit.frappe.cloud/)

Born out of a need to improve developer tooling for Frappe, "Commit" allows you to visualize your app's database schema and view all its APIs, generate documentation for the APIs, and manage your documentation through Commit Docs - improving developer productivity and security of your critical applications.


## Basic Installation

The below guide assumes that you already have a working Frappe and Bench installation. If you do not have it, then please head over to [Official Installation Guide](https://frappeframework.com/docs/user/en/installation).

Go ahead and create a fresh new bench:
```bash
# Initialize a new bench
bench init commit
```

```bash
# Get the Commit app
bench get-app https://github.com/The-commit-company/commit
```

```bash
# Create a new site
bench new-site my-site.localhost
```

```bash
# Install the Commit app on the site
bench --site my-site.localhost install-app commit
```

## Tech Stack

### Common Across Web and Mobile
- **Frappe Framework**: An open-source full-stack development framework using Python, MariaDB/Postgres, socket.io, and Redis.
- **React**: A JavaScript library for building user interfaces.
- **Frappe React SDK**: A React Hooks library for handling auth, data fetching, and API calls to the Frappe Framework backend.
- **Tailwind CSS**: A utility-first CSS framework.
- **MDX**: A Markdown format that allows you to use JSX components in your Markdown files.
- **OpenAI API**: For AI-assisted documentation generation and editing.

---

## Production Setup

### Managed Hosting
You can try **Frappe Cloud**, a simple, user-friendly, and sophisticated open-source platform to host Frappe applications with peace of mind.

It takes care of installation, setup, upgrades, monitoring, maintenance, and support of your Frappe deployments. It is a fully featured developer platform with the ability to manage and control multiple Frappe deployments.

[Try on Frappe Cloud](https://frappecloud.com/)

## Key Features

- **Database Schema Visualization**: View and analyze your application's database structure graphically.
- **API Explorer**: Easily access and test API endpoints within the Frappe framework.
- **Command Reference**: Get an overview of available Frappe commands.
- **Documentation Generation**: Auto-generate API documentation.
- **OpenAI Integration**: Edit and refine documentation using AI assistance.
- **Commit Docs**: Manage and publish documentation for your applications.
- **Docs Dashboard**: View and manage all your documentation in one place.
- **MDX Support**: Write JavaScript and React components in your Markdown files.
- **Customizable**: Tailor the tool to fit your specific needs and preferences.