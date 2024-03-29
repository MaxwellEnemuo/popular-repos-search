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

### Test

```bash
$ npm test
```

### Start app

```bash
$ docker-compose up -d
```

Make a post request to:

```bash
http://localhost:8080/api/v1/repositories
```

Example payload:

```bash
{
	"date": "2019-01-10",
	"language": "Rust",
	"perPage": 50
}
```

Language and per_page are optional. In this case pagination defaults to 10.

```bash
{
	"date": "2019-01-10"
}
```
