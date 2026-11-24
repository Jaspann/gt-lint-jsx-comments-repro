# react-core-linter: `static-jsx` flags JSX comments inside `<T>`

Minimal reproduction: `@generaltranslation/react-core-linter/static-jsx` reports JSX comments
(`{/* ... */}`, `{ // ... }`) and empty braces (`{}`) inside `<T>` as dynamic content.
They render nothing and the gt CLI already skips them when extracting.

## Run

```sh
npm install
npm run lint
```

To see what `--fix` would write (without changing the file):

```sh
npx eslint src --fix-dry-run --format json
```

## Input (`src/Page.jsx`)

```jsx
<T>
  {/* Hero */}
  <h1>Hello, world</h1>
  {
    // Subtitle
  }
  <p>Welcome to the site.</p>
  {}
</T>
```

## Output (`@generaltranslation/react-core-linter` 0.1.15, ESLint 9.39.5, Node v24.18.0, macOS arm64)

```
src/Page.jsx
   6:7  error  All dynamic content must be wrapped in a variable component (<Var>, <DateTime>, <Num>, or <Currency>)  @generaltranslation/react-core-linter/static-jsx
   8:7  error  All dynamic content must be wrapped in a variable component (<Var>, <DateTime>, <Num>, or <Currency>)  @generaltranslation/react-core-linter/static-jsx
  12:7  error  All dynamic content must be wrapped in a variable component (<Var>, <DateTime>, <Num>, or <Currency>)  @generaltranslation/react-core-linter/static-jsx

✖ 3 problems (3 errors, 0 warnings)
```

The autofix wraps each comment in an empty `<Var>` and adds a `Var` import:

```jsx
<Var>{/* Hero */}</Var>
```
