# [commit](https://commit.frappe.cloud/)

Born out of a need to improve developer tooling for Frappe, "Commit" allows you to visualize your app's database schema and view all it's APIs - improving developer productivity and security of your critical applications.

## Basic Installation

The below guide assumes that you already have a working Frappe and Bench installation. If you do not have it, then please head over to [Official Installation Guide](https://frappeframework.com/docs/user/en/installation).

Go ahead and create a fresh new bench

- `bench init commit`
- `bench get-app https://github.com/The-commit-company/commit`
- `bench new-site <preferred-site-url>`
- `bench --site <site-url> install-app commit`

Commit will now be accessible on https://<site-url>:8000/commit. 
