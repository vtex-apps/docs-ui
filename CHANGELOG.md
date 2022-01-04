# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.1.5] - 2022-01-04

### Fixed
- Blocked search indexing with the `noindex` tag

## [2.1.4] - 2021-12-01

### Fixed
- Removed the SearchBar and Logo components from TopNav.

### Added
- Crowdin file

## [2.1.3] - 2020-08-19
### Fixed
- Search results pointing to urls with fixed version numbers, which might be outdated.

## [2.1.2] - 2020-06-24
### Fixed
- Link `Next Article` and `Previous Article` to work with trailing slash.

## [2.1.1] - 2020-06-12
### Fixed
- JSONC code snippets would not have sintax highlight.

## [2.1.0] - 2020-05-05
### Added
- Support for `<!-- DOCS-IGNORE:start -->` and `<!-- DOCS-IGNORE:end -->` tokens.

### Security
- Bump multiple package versions.

## [2.0.4] - 2020-04-28
### Fixed
- Component grid would be rendered empty due to a variable being passed to the ComponentList query with the wrong value.

## [2.0.3] - 2020-04-22
### Changed
- Moved the `around` logic to more specific interfaces.
- Renamed `docs-wrapper` to `navigation-wrapper`.

### Removed
- `docs-ui.concepts` from `interfaces.json`.

## [2.0.2] - 2020-04-15
### Fixed
- Fixed getting started url

## [2.0.1] - 2020-04-15
### Fixed
- Fix a few links that were not moved from `docs` to `docs-ui`

## [2.0.0] - 2020-04-15
### Changed
- new interfaces name: `docs` to `docs-ui`

## [1.12.1] - 2020-04-06
### Fixed
- Always adding trailing slash to URLs
- Filename with duplicated extension .md

## [1.12.0] - 2020-03-30
### Added
- `customHeader` as a setting in `settingsSchema`

## [1.11.1] - 2020-03-24
### Fixed
- Using `replace` when navigating to app's specific version.
- Updating Sidebar verification if the current link is on.

## [1.11.0] - 2020-03-24
### Added
- Support for `/docs/apps/functional` route.

## [1.10.0] - 2020-03-24

## [1.9.0] - 2020-03-18
### Added
- Support for new `/docs/concepts` route and content.

## [1.8.0] - 2020-03-12
### Added
- Messages for `/docs/recipes/store-management` route.

## [1.7.0] - 2020-03-12
### Added
- New `/docs/apps/:category`, `/docs/apps/:category/:app(/:file)`, `/docs/introduction/:article` and `/docs/concepts routes to acomodate new content organization.
- Messages to render in each of these routes.

### Fixed
- Render would break if an empty markdown file was received by `DocsRenderer` component.

## [1.6.0] - 2020-03-01

## [1.5.3] - 2020-02-29
### Fixed
- Issue when opening a page already in cache
- Small UI adjustments
- Remove SearchBar from mobile Search page
- Show text instead of Icon in Getting Started "Previous Page" and "Next Page" buttons

## [1.5.2] - 2020-02-24
### Changed
- :sparkles: New fresh look

## [1.5.1] - 2020-01-22
### Fixed
- search behavior when no query string is provided

## [1.5.0] - 2020-01-16

### Added
- Search engine for mobile

## [1.4.6] - 2020-01-13

### Fixed
- Parsed markdown headlines by #

## [1.4.5] - 2020-01-13

### Updated
- Styles builder major to `2.x`

## [1.4.4] - 2020-01-06

## [1.4.3] - 2019-12-31
### Fixed
- Minor layout updates to code blocks.

## [1.4.2] - 2019-12-30
### Fixed
- Broken `/docs/components/layout` page.

## [1.4.1] - 2019-12-30
### Fixed
- Duplicated loading states on certain routes.

## [1.4.0] - 2019-12-27
### Added
- Support for search functionality.

## [1.3.5] - 2019-12-05

## [1.3.4] - 2019-12-03
### Fixed
- Ordered list indexes being reset during rendering of the markdown content.

## [1.3.3] - 2019-12-02

## [1.3.2] - 2019-11-28
### Fixed
- Use `overflow-y-auto` instead of `overflow-y-scroll`.

## [1.3.1] - 2019-11-27
### Fixed
- `escapeHtml` set to `true` would render HTML as plain-text.

## [1.3.0] - 2019-11-18
### Added
- Title tags in component pages being first headline of documentation

## [1.2.0] - 2019-11-12
### Added
- Support for more programming languages through the use of `highlight.js`.

## [1.1.2] - 2019-11-08

## [1.1.1] - 2019-11-01
### Fixed
- Logic when to open sidebar subitems.

## [1.1.0] - 2019-10-23

## [1.1.0] - 2019-10-23
### Added
- `google analytics` pageview tracking on `SideBar`

## [1.0.2] - 2019-09-16
### Changed
- Message `docs/latest-features`.

## [1.0.1] - 2019-09-09
### Changed
- Changed top bar link and text to latest releases

## [1.0.0] - 2019-09-06
### Fixed
- Overflow on mobile layout.

### Changed
- Open `SideBarItem` behavior.

## [0.29.0] - 2019-09-06
### Changed
- Overall layout adjustments for v1.0 release.

## [0.28.2] - 2019-09-04
### Added
- Query for `pixel` components from `componentsList`.

## [0.28.1] - 2019-09-03
### Changed
- Move `EnhancedAppVersionProvider` further down the component tree so thats its scope in more limited, avoiding unnecessary re-renders of the `TopNav` component.

## [0.28.0] - 2019-09-03
### Added
- Support for emojis on markdown.

## [0.27.0] - 2019-09-03
### Changed
- Move `EnhancedAppVersionProvider` down the component tree so thats its scope in more limited, avoiding unnecessary re-renders of the SideBar.

### Fixed
- Layout on `GettingStartedArticle`.
- Broken layout on Safari desktop.

## [0.26.1] - 2019-09-03
### Fixed
- Footer links.
- `ArticleNav` links would do nothing.

## [0.26.0] - 2019-09-03
### Changed
- Slug URLs for better SEO.

## [0.25.0] - 2019-09-03
### Fixed
- Handling of active section on `SideBarItem` component.
- Link to all recipes at `Home`.

### Added
- `RecipesList` can now show all available recipes on `recipes/all`.

## [0.24.0] - 2019-09-02
### Fixed
- Remove `lorem` placeholders.

## [0.23.1] - 2019-09-02
### Fixed
- `GettingStartedArticle` would always query for articles written in Portuguese.

## [0.23.0] - 2019-08-29
### Added
- New `SideBarContext` component.

### Fixed
- `<Link>` component was being used with `href` attribute instead of `to`.

## [0.22.0] - 2019-08-29
### Added
- Independent scrolling on `SideBar` and main content section.
- Max-width to the `SideBar` to prevent it from stretching on widescreens.

## [0.21.1] - 2019-08-29
### Fixed
- Broken message IDs being used by `ComponentsGrid` and `RecipesList`

## [0.21.0] - 2019-08-29
### Added
- Support for displaying a complete list of available components on `ComponentsGrid`.

## [0.20.1] - 2019-08-29
### Fixed
- Missing messages.

## [0.20.0] - 2019-08-12
### Added
- New `AppDocs` component for `/docs/app/:app(/:file)` and `/docs/components/:category/:app` routes.
- `EnhancedAppVersionProvider` to the `PageLayoutContainer` component.

## [0.19.3] - 2019-08-12
### Fixed
- Some messages that were missing.

## [0.19.2] - 2019-08-06

## [0.19.1] - 2019-08-01
### Fixed
- Missing Footer links.

## [0.19.0] - 2019-08-01
### Added
- Dynamic `Latest Features` section in the homepage.

## [0.18.1] - 2019-07-31
### Fixed
- Minor layout updates

## [0.18.0] - 2019-07-31
### Added
- New navigation bar at the top of all pages.
- `SideBarItem` navigation indicator.

### Fixed
- Text colors for better accessibility.

## [0.17.1] - 2019-07-30
### Fixed
- Inconsistent page layout.

## [0.17.0] - 2019-07-29
### Added
- New `Recipes` section that lives at `/docs/resources` and `/docs/resources/:resource`.

## [0.16.0] - 2019-07-29
### Added
- Full support for mobile navigation.

## [0.15.0] - 2019-07-29
### Added
- New `GettingStartedArticle` component to live at `/docs/getting-started/:track/:article`.

## [0.14.0] - 2019-07-26
### Added
- New `ComponentDocs` page that lives at `/docs/components/:category/:component(/:file)`.

## [0.13.0] - 2019-07-25
### Added
- New `ComponentGrid` to visualize all available components under a certain category.

## [0.12.1] - 2019-07-25
### Fixed
- Links in the SideBar now trim the file extensions to avoid requests with duplicate file extensions, such as `.md.md`.

### Changed
- Update `vtex.docs-graphql` version to `1.x`.

## [0.12.0] - 2019-07-25
### Added
- New `RecipeView` page.

## [0.11.0] - 2019-07-25
### Added
- Dynamic recipes listing page.
- New `RecipeList` GraphQL query.

## [0.10.0] - 2019-07-19
### Added
- Better support for Chapters with multiple sub-levels in the SideBar.

### Changed
- Unify `SideBar` and `HomeSideBar` into a single component.

## [0.9.0] - 2019-07-18
### Added
- Article navigation bar based on the headers present in the page.

## [0.8.0] - 2019-07-18
### Added
- New Docs homepage.

### Changed
- Clean-up unnecessary components.
- Clean-up and update Messages.

## [0.7.0] - 2019-07-17
### Added
- Support for rendering raw HTMl from Markdown files.
- Support for 3 special CSS classes for highlighting text:
  - `alert-info`
  - `alert-danger`
  - `alert-warning`

### Changed
- `react-markdown` is now used by `DocsRenderer` component as `remark-react` was removed.

## [0.6.0] - 2019-07-17
### Added
- Version selection feature at `vtex.io/docs/:app(:/file)`.

## [0.5.0] - 2019-07-10
### Added
- Support for relative links from one markdown file to another.

## [0.4.0] - 2019-07-10
### Changed
- App documentation url format to `/docs/:appName(/:fileName)`.
- When no `:fileName` param is given, the UI defaults to show the `README.md` file.

## [0.3.0] - 2019-07-09
### Added
- Tag list taken from the markdown file front-matter in the `DocsRenderer` component.
- Custom `<li>` tag for Remark.
- `Edit this page on GitHub` link at the bottom of the `AppDocs` page, using the `git` property taken from the markdown file front-matter.

### Fix
- Links to `ID`s that were not lowercase would not work, now they do.

### Changed
- Overall layout updates.

## [0.2.0] - 2019-07-08
### Added
- New Under Construction page.

### Changed
- `Docs` component is now rendered at `/docs/home`.
- `/docs` renders `UnderConstruction` component.

## [0.1.4] - 2019-07-08
### Fix
- Inverted colors on `AppDocs` component.
- Broken Navbar links

## [0.1.3] - 2019-07-08
### Changed
- Semantic colors defined in `styles/configs/style.json`.

### Added
- CustomCard component.

## [0.1.2] - 2019-07-08
### Fix

- Trigger new build for the Styles builder.

## [0.1.1] - 2019-07-05
### Fix
- Navbar links

### Changed
- Remove apps that should not be used from `DocsData`.

## [0.1.0] - 2019-07-04
- Initial implementation based on the one taken from `vtex-apps/landing-pages`.
