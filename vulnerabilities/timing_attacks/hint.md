## Hints
Read "Using Node.js Event Loop for Timing Attacks" by the pasten CTF crew [1]. There's also a YouTube video by Phillip Roberts [2] discussing what Event Loop is. Additional resources by Willson Mock [3], Erin Sweson-Healey [4], Trevor Norris [5], and the Mozilla Developer Network [6].

* [1] https://snyk.io/blog/node-js-timing-attack-ccc-ctf/
* [2] https://www.youtube.com/watch?v=8aGhZQkoFbQ
* [3] http://altitudelabs.com/blog/what-is-the-javascript-event-loop/
* [4] http://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/
* [5] https://nodesource.com/blog/understanding-the-nodejs-event-loop/
* [6] https://developer.mozilla.org/en/docs/Web/JavaScript/EventLoop
* https://snyk.io/vuln/npm:secure-compare:20151024
* https://github.com/dmayer/time_trial
* https://github.com/ecbftw/nanown
* https://www.npmjs.com/package/secure-compare
* https://www.npmjs.com/package/scmp
* https://www.npmjs.com/package/buffer-equal-constant-time

## Secure Code View
'''
var mismatch = 0;
  for (var i = 0; i < a.length; ++i) {
  mismatch |= (a.charCodeAt(i) ^ b.charCodeAt(i));
}
return mismatch;
'''
