/*
 Copyright 2014 KAKAO
 */

// web2app.js
!(function (a) {
  'use strict';
  var b = (a.userAgent = function (a) {
    function b(a) {
      var b = {},
        d = /(dolfin)[ \/]([\w.]+)/.exec(a) ||
          /(chrome)[ \/]([\w.]+)/.exec(a) ||
          /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) ||
          /(webkit)(?:.*version)?[ \/]([\w.]+)/.exec(a) ||
          /(msie) ([\w.]+)/.exec(a) ||
          (a.indexOf('compatible') < 0 &&
            /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)) || ['', 'unknown'];
      return (
        'webkit' === d[1]
          ? (d = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(a) ||
              /(android)[ \/]([\w._\-]+);/.exec(a) || [d[0], 'safari', d[2]])
          : 'mozilla' === d[1]
          ? (d[1] = /trident/.test(a) ? 'msie' : 'firefox')
          : /polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(
              a
            ) && (d[1] = 'polaris'),
        (b[d[1]] = !0),
        (b.name = d[1]),
        (b.version = c(d[2])),
        b
      );
    }
    function c(a) {
      var b = {},
        c = a ? a.split(/\.|-|_/) : ['0', '0', '0'];
      return (
        (b.info = c.join('.')),
        (b.major = c[0] || '0'),
        (b.minor = c[1] || '0'),
        (b.patch = c[2] || '0'),
        b
      );
    }
    function d(a) {
      return e(a) ? 'pc' : f(a) ? 'tablet' : g(a) ? 'mobile' : '';
    }
    function e(a) {
      return a.match(/linux|windows (nt|98)|macintosh/) &&
        !a.match(/android|mobile|polaris|lgtelecom|uzard|natebrowser|ktf;|skt;/)
        ? !0
        : !1;
    }
    function f(a) {
      return a.match(/ipad/) ||
        (a.match(/android/) && !a.match(/mobi|mini|fennec/))
        ? !0
        : !1;
    }
    function g(a) {
      return a.match(
        /ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/
      )
        ? !0
        : !1;
    }
    function h(a) {
      var b = {},
        d = /(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(a) ||
          /(android)[ \/]([\w._\-]+);/.exec(a) ||
          (/android/.test(a) ? ['', 'android', '0.0.0'] : !1) ||
          (/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(
            a
          )
            ? ['', 'polaris', '0.0.0']
            : !1) ||
          /(windows)(?: nt | phone(?: os){0,1} | )([\w._\-]+)/.exec(a) ||
          (/(windows)/.test(a) ? ['', 'windows', '0.0.0'] : !1) ||
          /(mac) os x ([\w._\-]+)/.exec(a) ||
          (/(linux)/.test(a) ? ['', 'linux', '0.0.0'] : !1) ||
          (/webos/.test(a) ? ['', 'webos', '0.0.0'] : !1) ||
          /(bada)[ \/]([\w._\-]+)/.exec(a) ||
          (/bada/.test(a) ? ['', 'bada', '0.0.0'] : !1) ||
          (/(rim|blackberry|bb10)/.test(a)
            ? ['', 'blackberry', '0.0.0']
            : !1) || ['', 'unknown', '0.0.0'];
      return (
        'iphone' === d[1] || 'ipad' === d[1] || 'ipod' === d[1]
          ? (d[1] = 'ios')
          : 'windows' === d[1] && '98' === d[2] && (d[2] = '0.98.0'),
        (b[d[1]] = !0),
        (b.name = d[1]),
        (b.version = c(d[2])),
        b
      );
    }
    function i(a) {
      var b = {},
        d = /(crios)[ \/]([\w.]+)/.exec(a) ||
          /(daumapps)[ \/]([\w.]+)/.exec(a) || ['', ''];
      return (
        d[1]
          ? ((b.isApp = !0), (b.name = d[1]), (b.version = c(d[2])))
          : (b.isApp = !1),
        b
      );
    }
    return (
      (a = (a || window.navigator.userAgent).toString().toLowerCase()),
      { ua: a, browser: b(a), platform: d(a), os: h(a), app: i(a) }
    );
  });
  'object' == typeof window &&
    window.navigator.userAgent &&
    (window.ua_result = b(window.navigator.userAgent) || null),
    window && ((window.util = window.util || {}), (window.util.userAgent = b));
})(
  (function () {
    return 'object' == typeof exports
      ? ((exports.daumtools =
          'undefined' == typeof exports.daumtools ? {} : exports.daumtools),
        exports.daumtools)
      : 'object' == typeof window
      ? ((window.daumtools =
          'undefined' == typeof window.daumtools ? {} : window.daumtools),
        window.daumtools)
      : void 0;
  })()
),
  (function (a) {
    'use strict';
    a.web2app = (function () {
      function a(a) {
        window.location.href = a;
      }
      function b(b) {
        var e =
            'function' == typeof b.willInvokeApp
              ? b.willInvokeApp
              : function () {},
          h = 'function' == typeof b.onAppMissing ? b.onAppMissing : a,
          i =
            'function' == typeof b.onUnsupportedEnvironment
              ? b.onUnsupportedEnvironment
              : function () {};
        e(),
          r.android
            ? c() || b.useUrlScheme
              ? b.storeURL && d(b.urlScheme, b.storeURL, h)
              : b.intentURI && f(b.intentURI)
            : r.ios && b.storeURL
            ? g(b.urlScheme, b.storeURL, h)
            : setTimeout(function () {
                i();
              }, 100);
      }
      function c() {
        var a = new RegExp(s.join('|'), 'i');
        return a.test(q.ua);
      }
      function d(a, b, c) {
        e(o, b, c), k(a);
      }
      function e(a, b, c) {
        var d = new Date().getTime();
        return setTimeout(function () {
          var e = new Date().getTime();
          j() && a + p > e - d && c(b);
        }, a);
      }
      function f(a) {
        setTimeout(function () {
          top.location.href = a;
        }, 100);
      }
      function g(a, b, c) {
        var d;
        parseInt(q.os.version.major, 10) < 8
          ? ((d = e(n, b, c)), h(d))
          : ((d = e(m, b, c)), i(d)),
          k(a);
      }
      function h(a) {
        window.addEventListener('pagehide', function b() {
          j() && (clearTimeout(a), window.removeEventListener('pagehide', b));
        });
      }
      function i(a) {
        document.addEventListener('visibilitychange', function b() {
          j() &&
            (clearTimeout(a),
            document.removeEventListener('visibilitychange', b));
        });
      }
      function j() {
        for (
          var a = ['hidden', 'webkitHidden'], b = 0, c = a.length;
          c > b;
          b++
        )
          if ('undefined' !== document[a[b]]) return !document[a[b]];
        return !0;
      }
      function k(a) {
        setTimeout(function () {
          var b = l('appLauncher');
          b.src = a;
        }, 100);
      }
      function l(a) {
        var b = document.createElement('iframe');
        return (
          (b.id = a),
          (b.style.border = 'none'),
          (b.style.width = '0'),
          (b.style.height = '0'),
          (b.style.display = 'none'),
          (b.style.overflow = 'hidden'),
          document.body.appendChild(b),
          b
        );
      }
      var m = 1e3,
        n = 2e3,
        o = 300,
        p = 100,
        q = daumtools.userAgent(),
        r = q.os,
        s = ['firefox', 'opr'];
      return b;
    })();
  })(
    (window.daumtools =
      'undefined' == typeof window.daumtools ? {} : window.daumtools)
  ),
  (function (a) {
    'use strict';
    (a.daumtools = 'undefined' == typeof a.daumtools ? {} : a.daumtools),
      'undefined' != typeof a.daumtools.web2app &&
        (a.daumtools.web2app.version = '1.0.3');
  })(window);

(function (kakao, undefined) {
  var base_url = 'storylink://posting?';
  var apiver = '1.0';
  var store = {
    android: 'market://details?id=com.kakao.story',
    ios: 'http://itunes.apple.com/app/id486244601',
  };
  var packageName = 'com.kakao.story';

  kakao.link = function (name) {
    if (name != 'story')
      return {
        send: function () {
          throw 'only story links are supported.';
        },
      };

    return {
      send: function (params) {
        params['apiver'] = apiver;

        var urlScheme = base_url + serialized(params);
        var intentURI =
          'intent:' + urlScheme + '#Intent;package=' + packageName + ';end;';
        var appStoreURL = daumtools.userAgent().os.android
          ? store.android
          : store.ios;

        daumtools.web2app({
          urlScheme: urlScheme,
          intentURI: intentURI,
          storeURL: appStoreURL,
          appName: 'KakaoStory',
        });
      },
    };

    function serialized(params) {
      var stripped = [];
      for (var k in params) {
        if (params.hasOwnProperty(k)) {
          stripped.push(k + '=' + encodeURIComponent(params[k]));
        }
      }
      return stripped.join('&');
    }
  };
})((window.kakao = window.kakao || {}));
