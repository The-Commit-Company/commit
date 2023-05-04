from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in commit/__init__.py
from commit import __version__ as version

setup(
	name="commit",
	version=version,
	description="The Commit Company",
	author="The Commit Company",
	author_email="yash.jane@thecommit.company",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
