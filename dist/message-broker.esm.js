/* @pollon/message-broker - v1.0.0
* https://github.com/pollon-js/message-broker#readme
* 2020 Francesco Lasaracina. Licensed ISC */
function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function n(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&o(t,e)}function i(t){return(i=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function o(t,e){return(o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=i(t);if(e){var o=i(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return s(this,n)}}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function c(t,e){var n;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,i=function(){};return{s:i,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,s=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return s=t.done,t},e:function(t){u=!0,o=t},f:function(){try{s||null==n.return||n.return()}finally{if(u)throw o}}}}var l=function(){function e(n,r){t(this,e),this.method=n,this.context=r,this.disposeStrategy=function(){},this.disposed=!1}return n(e,[{key:"setDisposeStrategy",value:function(t){this.disposeStrategy="function"==typeof t?t:function(){}}},{key:"dispose",value:function(){this.disposeStrategy(),this.disposed=!0}}]),e}(),f=function(){function e(){t(this,e),this.stack=[],this.once=[]}return n(e,[{key:"add",value:function(t,e,n){var r,i=this;r=new l(t,e);for(var o=0;o<this.stack.length;o++)if(t===this.stack[o].method)return;return this.stack.unshift(r),n&&this.once.unshift(r),r.setDisposeStrategy((function(){for(var e=i.stack.length-1;e>=0;e--)t===i.stack[e].method&&i.stack.splice(e,1);for(var n=i.once.length-1;n>=0;n--)t===i.once[n].method&&i.once.splice(n,1)})),r}},{key:"remove",value:function(t){var e,n;e=this.stack.length-1,n=this.once.length-1;for(var r=e;r>=0;r--)t===this.stack[r].method&&this.stack.splice(r,1);for(var i=n;i>=0;i--)t===this.once[i].method&&this.once.splice(i,1)}},{key:"fire",value:function(){for(var t,e=this,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return t=this.stack.slice().reverse().map((function(t){return Promise.resolve(!0).then((function(){if(e.stack.includes(t)){for(var n=t.method.apply(t.context,r),i=0;i<e.once.length;i++)t.method===e.once[i].method&&t.dispose();return n}}))})),Promise.all(t)}}]),e}(),h=function(){function e(n){t(this,e),n=Array.isArray(n)?n:[],this.publications={};var r,i=c(n);try{for(i.s();!(r=i.n()).done;){var o=r.value;if(!o)throw"Pollon: [broker-provider] Cannot define a publisher with an falsy/undefined name";this.publications[o]=new f}}catch(t){i.e(t)}finally{i.f()}}return n(e,[{key:"getDelegate",value:function(t){return t in this.publications?this.publications[t]:null}},{key:"fire",value:function(t,e,n){return n=n||this,this.publications[t]?this.publications[t].fire(n,e):Promise.resolve(!0)}}]),e}();function p(t){return"object"==Object.prototype.toString.call(t).match(/^\[object\s(.*)\]$/)[1].toLowerCase()}var v=function e(n){t(this,e),this.subscriptions=p(n)?n:{}},d=function(t,e){return Array.prototype.indexOf.call(t,e)},y=function(){function e(){t(this,e),this.publishers=[],this.handlers={},this.fireDelegates={}}return n(e,[{key:"add",value:function(t){t.subscriptions&&this.addSubscriber(t),t.publications&&this.addPublisher(t)}},{key:"remove",value:function(t){t.subscriptions&&this.removeSubscriber(t),t.publications&&this.removePublisher(t)}},{key:"addSubscriber",value:function(t){var e,n,r;if(t.subscriptions)for(e in t.subscriptions)n=t.subscriptions[e],e in this.handlers||(this.handlers[e]=new f),(r=p(n)?n:{method:n,context:null,once:!1}).context=n.context||t,r.once=!!n.once||!1,this.handlers[e].add(r.method,r.context,r.once)}},{key:"removeSubscriber",value:function(t){var e,n,r;if(t.subscriptions)for(e in t.subscriptions)n=t.subscriptions[e],e in this.handlers&&(r=p(n)?n:{method:n},this.handlers[e].remove(r.method))}},{key:"addPublisher",value:function(t){var e,n;if(t.publications){if((e=d(this.publishers,t))>-1)return e;for(n in this.publishers[this.publishers.length]=t,t.publications)t.publications[n].add(this.getFireDelegate(n),null,!1);return e}}},{key:"removePublisher",value:function(t){var e,n;if(t.publications){if(-1==(e=d(this.publishers,t)))return e;for(n in this.publishers.splice(e,1),t.publications)t.publications[n].remove(this.getFireDelegate(n));return e}}},{key:"getFireDelegate",value:function(t){var e=this;return this.fireDelegates[t]||(this.fireDelegates[t]=function(t,n){var r=e.handlers[n.name]?e.handlers[n.name]:null;if(r)return r.fire(t,n)}),this.fireDelegates[t]}}]),e}(),b=function(e){r(o,e);var i=u(o);function o(){return t(this,o),i.call(this)}return n(o,[{key:"fire",value:function(){for(var t,e,n=this,r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return t=i[1],e=this.stack.slice().reverse().map((function(e){return Promise.resolve(!0).then((function(){if((!t.isEventPropagationStopped||!t.isEventPropagationStopped())&&n.stack.includes(e)){for(var r=e.method.apply(e.context,i),o=0;o<n.once.length;o++)e.method===n.once[o].method&&e.dispose();return r}}))})),Promise.all(e)}}]),o}(f),g=function e(n){t(this,e),this.name=n},m=function(e){r(o,g);var i=u(o);function o(e,n){var r;return t(this,o),(r=i.call(this,e)).propagationStopped=!1,r.args=n,r}return n(o,[{key:"stopEventPropagation",value:function(){this.propagationStopped=!0}},{key:"isEventPropagationStopped",value:function(){return!!this.propagationStopped}}]),o}(),k=function(e){r(o,h);var i=u(o);function o(e){var n;t(this,o),n=i.call(this,[]),e=Array.isArray(e)?e:[],n.publications={};var r,s=c(e);try{for(s.s();!(r=s.n()).done;){var u=r.value;n.publications[u]=new b}}catch(t){s.e(t)}finally{s.f()}return n}return n(o,[{key:"fire",value:function(t,e,n){return n=n||this,this.publications[t]?this.publications[t].fire(n,e):Promise.resolve(!0)}}]),o}(),w=function(e){r(o,g);var i=u(o);function o(e){var n;return t(this,o),(n=i.call(this,e)).property=null,n}return n(o,[{key:"exists",value:function(){return null!==this.property}}]),o}(),P=function(e){r(o,h);var i=u(o);function o(e){return t(this,o),i.call(this,e)}return n(o,[{key:"getProperty",value:function(t){var e=this.getDelegate(t);if(!e||!e.stack.length)throw"Pollon: [broker-provider] provider not found for the property ".concat(t);var n=new w(t);return this.fire(t,n,this).catch((function(e){throw"Pollon: [broker-provider] error ".concat(e," when looking for provider for the property ").concat(t)})).then((function(e){if(!n.exists())throw"Pollon: [broker-provider] provider not found for the property ".concat(t);return n.property}))}}]),o}();export{y as Broker,m as Event,b as EventDelegate,k as EventPublisher,w as Property,P as PropertyNeeder,h as Publisher,v as Subscriber};