# `react-string-clamp` changelog

All notable changes to this project will be documented in this file.

## v0.3.1

- README.md: fixed incorrect link to CHANGELOG.

## v0.3.0

- `className` property support.
- Clamping algorithms optimization.
- `maxFPS` property.

## v0.2.4

- Fixed rendering bug (font-size > ~`20px`).
- Increased accuracy. 

## v0.2.3

- `IE11` Support.
- Rendering fix.

## v0.2.2

- Fixed re-rendering on any property changing.
- Fixed unmounting error.

## v0.2.1

- Added re-rendering on text property change. Bugfix.

## v0.2.0

- Removed «prefix» prop.
- Fixed bug (minimal width) witch occured when trying to place TextClamp component inside a parent flex container.
- Added Babel. Now built package is used `ES5` (`ES6`+ code in unsupported by some common used plugins and libraries, as, for example `UglifyJS`).
- Added ability to rewrite two default inline-style rules.
- Improved onresize handling and listening mechanism.

## v0.1.3

- Code optimization & refactoring.

## v0.1.2

- Changelog update (added missed in `0.1.1` version).
- Readme update.

## v0.1.1

- Fixed non critical bug. Attempt to call `clampText()` asynchronously. Could be reason for errors if your component takes several re-renders in a very short period of time.

## v0.1.0

- Added a changelog file.
- Readme updated.
- Added unit-tests.
- Now punctuation chars array can contain multi-character strings.
- Light refactoring and bugfix.
- Added linter.
- Repository added to `Travis CI`.

## v0.0.0

- Just the first release.
