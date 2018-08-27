# How it's working?

1. Render iframe.

```javascript
// E.g. on the index page of the api.***.*
<iframe src="http://app.***.*/" />
```

2. Waiting for scripts to run inside the inserted iframe. One of these scripts sends to us the santiment app user data contained in the localStorage.

```javascript
// Send localStorage object from the iframe to the corresponding origin (api.***.*).
parent.postMessage(
  JSON.parse(localStorage.getItem('user')),
  'http://api.***.*'
);
```

3. Our page receives the message and runs necessary logic.

```javascript
window.addEventListener('message', ({ origin, data }) => {
  if (origin === 'http://app.***.*') {
    console.log(data);
  }
});
```
