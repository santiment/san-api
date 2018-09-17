# SAN-API

This is the source of the sanbase API documentation project of [`https://santiment.net`](https://santiment.net).

## Setup

### Cloning

```
git clone git@github.com:santiment/san-api.git
```

### Installing dependencies

```
npm i
```

### Starting a development build

```
npm run dev
```

### Building the project

```
npm run build
```

### Running via docker

```
cd san-api
docker build -t san-api .
docker run -e BACKEND_URL=https://api.santiment.net/ -p 3000:3000 san-api
```
