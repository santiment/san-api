# How it's working?

1. Render iframe.

```javascript
<iframe src="http://api.***.*/" />
```

2. Waiting for scripts to run inside the inserted iframe. One of these scripts sends to us the santiment app user data contained in the localStorage.

```javascript
if (parent !== window) {
  parent.postMessage(
    {
      type: 'sanbase-sync',
      storage: JSON.parse(localStorage.getItem('user')),
    },
    'http://app.***.*'
  );
}
```

3. Our page receives the message and runs necessary logic.

```javascript
window.addEventListener('message', ({ origin, data }) => {
  if (origin === 'http://api.***.*') {
    console.log(data);
  }
});
```
