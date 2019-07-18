# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added

- Article navigation bar based on the headers present in the page.

## [0.8.0] - 2019-07-18
### Added

- New Docs homepage.

### Changed

- Clean-up unnecessary components.
- Clean-up and update Messages.

## [0.7.0] - 2019-07-17
## Added

- Support for rendering raw HTMl from Markdown files.
- Support for 3 special CSS classes for highlighting text:
  - `alert-info`
  - `alert-danger`
  - `alert-warning`

## Changed

- `react-markdown` is now used by `DocsRenderer` component as `remark-react` was removed.

## [0.6.0] - 2019-07-17
## Added

- Version selection feature at `vtex.io/docs/:app(:/file)`.

## [0.5.0] - 2019-07-10
## Added

- Support for relative links from one markdown file to another.

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
