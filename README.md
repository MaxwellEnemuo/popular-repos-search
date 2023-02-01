### Description

- The idea of this project is to implement a backend application for discovering popular repositories on GitHub using Node/TypeScript.

### Service Specification

- A list of the most popular repositories, sorted by number of stars.
- An option to view the top 10, 50, 100 repositories.
- Given a date, the most popular repositories created from this date onwards should is returned.
- A filter for the programming language.

### Implementation Details

- GitHub provides a public search endpoint which you can use for fetching the most popular repositories:
  https://api.github.com/search/repositories?q=created:>2019-01-10&sort=stars&order=desc

### Installation

```bash
$ npm install
```

### Execute the example function in index.ts

```bash
$ npm start
```

### Test

```bash
$ npm test
```
