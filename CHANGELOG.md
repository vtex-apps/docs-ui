# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2019-07-10
## Changed

- App documentation url format to `/docs/:appName(/:fileName)`.
- When no `:fileName` param is given, the UI defaults to show the `README.md` file.

## [0.3.0] - 2019-07-09
## Added

- Tag list taken from the markdown file front-matter in the `DocsRenderer` component.
- Custom `<li>` tag for Remark.
- `Edit this page on GitHub` link at the bottom of the `AppDocs` page, using the `git` property taken from the markdown file front-matter.

## Fix

- Links to `ID`s that were not lowercase would not work, now they do.

## Changed

- Overall layout updates. 

## [0.2.0] - 2019-07-08
## Added

- New Under Construction page.

## Changed

- `Docs` component is now rendered at `/docs/home`.
- `/docs` renders `UnderConstruction` component.

## [0.1.4] - 2019-07-08
## Fix

- Inverted colors on `AppDocs` component.
- Broken Navbar links

## [0.1.3] - 2019-07-08
## Changed

- Semantic colors defined in `styles/configs/style.json`.

## Added

- CustomCard component.

## [0.1.2] - 2019-07-08
## Fix

- Trigger new build for the Styles builder.

## [0.1.1] - 2019-07-05
## Fix

- Navbar links

## Changed

- Remove apps that should not be used from `DocsData`.

## [0.1.0] - 2019-07-04

- Initial implementation based on the one taken from `vtex-apps/landing-pages`.
