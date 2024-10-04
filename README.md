<p align="center">
  <a href="https://github.com/The-Commit-Company/commit">
  <img src="dashboard/src/assets/commit-logo.png" alt="Commit logo" height="100" />
     </a>

   <h3 align="center">commit</h3>
  <p align="center">Developer tooling for the Frappeverse 🪐
     <br />
    <br />
    <a href="https://frappecloud.com/marketplace/apps/commit"><strong>Install on Frappe Cloud»</strong></a>
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

Born out of a need to improve developer tooling for Frappe, "Commit" allows you to visualize your app's database schema and view all it's APIs - improving developer productivity and security of your critical applications.

## Basic Installation

The below guide assumes that you already have a working Frappe and Bench installation. If you do not have it, then please head over to [Official Installation Guide](https://frappeframework.com/docs/user/en/installation).

Go ahead and create a fresh new bench

- `bench init commit`
- `bench get-app https://github.com/The-commit-company/commit`
- `bench new-site <preferred-site-url>`
- `bench --site <site-url> install-app commit`
