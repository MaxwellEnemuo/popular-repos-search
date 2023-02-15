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

### Build the app

```bash
$ npm run build
```

### Test

```bash
$ npm test
$ npm test:coverage
```

### Start app

```bash
$ docker-compose up
```

Make a post request to:

```bash
http://localhost:4000/api/repositories
```

Example payload:

```bash
{
	"date": "2019-01-10",
	"language": "Rust",
	"perPage": 50
}
```

Language and per_page are optional. It is not filtered by language in this case and per_page will default to 10.

```bash
{
	"date": "2019-01-10"
}
```

https://user-images.githubusercontent.com/17248356/217186207-bd9231a7-c204-4a75-8b88-2172cef98f50.mov
