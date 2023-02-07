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
```

### Start app

```bash
$ docker-compose up
```

Make a post request to:

```bash
http://localhost:4000/repositories
```

Example payload:

```bash
{
	"date": "2019-01-10",
	"language": "Rust",
	"per_page": 50
}
```

Language and per_page are optional. It is not filtered by language in this case and per_page will default to 10.

```bash
{
	"date": "2019-01-10"
}
```

<img width="916" alt="Screenshot 2023-02-07 at 1 33 49 AM" src="https://user-images.githubusercontent.com/17248356/217119012-4a80b87b-8b98-4c37-a84c-082236a1a243.png">
<img width="991" alt="Screenshot 2023-02-07 at 8 49 42 AM" src="https://user-images.githubusercontent.com/17248356/217184067-9b32a848-a78d-4bb2-b7a1-faa8e7d87406.png">

