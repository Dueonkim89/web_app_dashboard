! function(e, t, n) {
    "use strict";
    var i = function(i, s) {
        !!t.getComputedStyle || (t.getComputedStyle = function(e) {
            return this.el = e, this.getPropertyValue = function(t) {
                var n = /(\-([a-z]){1})/g;
                return "float" === t && (t = "styleFloat"), n.test(t) && (t = t.replace(n, function() {
                    return arguments[2].toUpperCase()
                })), e.currentStyle[t] ? e.currentStyle[t] : null
            }, this
        });
        var o, a, r, c, l, h, u = function(e, t, n, i) {
                if ("addEventListener" in e) try {
                    e.addEventListener(t, n, i)
                } catch (s) {
                    if ("object" != typeof n || !n.handleEvent) throw s;
                    e.addEventListener(t, function(e) {
                        n.handleEvent.call(n, e)
                    }, i)
                } else "attachEvent" in e && ("object" == typeof n && n.handleEvent ? e.attachEvent("on" + t, function() {
                    n.handleEvent.call(n)
                }) : e.attachEvent("on" + t, n))
            },
            p = function(e, t, n, i) {
                if ("removeEventListener" in e) try {
                    e.removeEventListener(t, n, i)
                } catch (s) {
                    if ("object" != typeof n || !n.handleEvent) throw s;
                    e.removeEventListener(t, function(e) {
                        n.handleEvent.call(n, e)
                    }, i)
                } else "detachEvent" in e && ("object" == typeof n && n.handleEvent ? e.detachEvent("on" + t, function() {
                    n.handleEvent.call(n)
                }) : e.detachEvent("on" + t, n))
            },
            d = function(e) {
                if (e.children.length < 1) throw new Error("The Nav container has no containing elements");
                for (var t = [], n = 0; n < e.children.length; n++) 1 === e.children[n].nodeType && t.push(e.children[n]);
                return t
            },
            v = function(e, t) {
                for (var n in t) e.setAttribute(n, t[n])
            },
            f = function(e, t) {
                0 !== e.className.indexOf(t) && (e.className += " " + t, e.className = e.className.replace(/(^\s*)|(\s*$)/g, ""))
            },
            m = function(e, t) {
                var n = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className.replace(n, " ").replace(/(^\s*)|(\s*$)/g, "")
            },
            g = function(e, t, n) {
                for (var i = 0; i < e.length; i++) t.call(n, i, e[i])
            },
            y = e.createElement("style"),
            E = e.documentElement,
            C = function(t, n) {
                var i;
                this.options = {
                    animate: !0,
                    transition: 284,
                    label: "Menu",
                    insert: "before",
                    customToggle: "",
                    closeOnNavClick: !1,
                    openPos: "relative",
                    navClass: "nav-collapse",
                    navActiveClass: "js-nav-active",
                    jsClass: "js",
                    init: function() {},
                    open: function() {},
                    close: function() {}
                };
                for (i in n) this.options[i] = n[i];
                if (f(E, this.options.jsClass), this.wrapperEl = t.replace("#", ""), e.getElementById(this.wrapperEl)) this.wrapper = e.getElementById(this.wrapperEl);
                else {
                    if (!e.querySelector(this.wrapperEl)) throw new Error("The nav element you are trying to select doesn't exist");
                    this.wrapper = e.querySelector(this.wrapperEl)
                }
                this.wrapper.inner = d(this.wrapper), a = this.options, o = this.wrapper, this._init(this)
            };
        return C.prototype = {
            destroy: function() {
                this._removeStyles(), m(o, "closed"), m(o, "opened"), m(o, a.navClass), m(o, a.navClass + "-" + this.index), m(E, a.navActiveClass), o.removeAttribute("style"), o.removeAttribute("aria-hidden"), p(t, "resize", this, !1), p(t, "focus", this, !1), p(e.body, "touchmove", this, !1), p(r, "touchstart", this, !1), p(r, "touchend", this, !1), p(r, "mouseup", this, !1), p(r, "keyup", this, !1), p(r, "click", this, !1), a.customToggle ? r.removeAttribute("aria-hidden") : r.parentNode.removeChild(r)
            },
            toggle: function() {
                !0 === c && (h ? this.close() : this.open())
            },
            open: function() {
                h || (m(o, "closed"), f(o, "opened"), f(E, a.navActiveClass), f(r, "active"), o.style.position = a.openPos, v(o, {
                    "aria-hidden": "false"
                }), h = !0, a.open())
            },
            close: function() {
                h && (f(o, "closed"), m(o, "opened"), m(E, a.navActiveClass), m(r, "active"), v(o, {
                    "aria-hidden": "true"
                }), a.animate ? (c = !1, setTimeout(function() {
                    o.style.position = "absolute", c = !0
                }, a.transition + 10)) : o.style.position = "absolute", h = !1, a.close())
            },
            resize: function() {
                "none" !== t.getComputedStyle(r, null).getPropertyValue("display") ? (l = !0, v(r, {
                    "aria-hidden": "false"
                }), o.className.match(/(^|\s)closed(\s|$)/) && (v(o, {
                    "aria-hidden": "true"
                }), o.style.position = "absolute"), this._createStyles(), this._calcHeight()) : (l = !1, v(r, {
                    "aria-hidden": "true"
                }), v(o, {
                    "aria-hidden": "false"
                }), o.style.position = a.openPos, this._removeStyles())
            },
            handleEvent: function(e) {
                var n = e || t.event;
                switch (n.type) {
                    case "touchstart":
                        this._onTouchStart(n);
                        break;
                    case "touchmove":
                        this._onTouchMove(n);
                        break;
                    case "touchend":
                    case "mouseup":
                        this._onTouchEnd(n);
                        break;
                    case "click":
                        this._preventDefault(n);
                        break;
                    case "keyup":
                        this._onKeyUp(n);
                        break;
                    case "focus":
                    case "resize":
                        this.resize(n)
                }
            },
            _init: function() {
                this.index = n++, f(o, a.navClass), f(o, a.navClass + "-" + this.index), f(o, "closed"), c = !0, h = !1, this._closeOnNavClick(), this._createToggle(), this._transitions(), this.resize();
                var i = this;
                setTimeout(function() {
                    i.resize()
                }, 20), u(t, "resize", this, !1), u(t, "focus", this, !1), u(e.body, "touchmove", this, !1), u(r, "touchstart", this, !1), u(r, "touchend", this, !1), u(r, "mouseup", this, !1), u(r, "keyup", this, !1), u(r, "click", this, !1), a.init()
            },
            _createStyles: function() {
                y.parentNode || (y.type = "text/css", e.getElementsByTagName("head")[0].appendChild(y))
            },
            _removeStyles: function() {
                y.parentNode && y.parentNode.removeChild(y)
            },
            _createToggle: function() {
                var t = e.getElementById("app-headline");
                e.getElementsByTagName("header");
                if (a.customToggle) {
                    var n = a.customToggle.replace("#", "");
                    if (e.getElementById(n)) r = e.getElementById(n);
                    else {
                        if (!e.querySelector(n)) throw new Error("The custom nav toggle you are trying to select doesn't exist");
                        r = e.querySelector(n)
                    }
                } else {
                    var i = e.createElement("a");
                    i.innerHTML = a.label, v(i, {
                        href: "#",
                        class: "nav-toggle"
                    }), "after" === a.insert ? o.parentNode.insertBefore(i, o.nextSibling) : t.parentNode.insertBefore(i, t), r = i
                }
            },
            _closeOnNavClick: function() {
                if (a.closeOnNavClick) {
                    var e = o.getElementsByTagName("a"),
                        t = this;
                    g(e, function(n, i) {
                        u(e[n], "click", function() {
                            l && t.toggle()
                        }, !1)
                    })
                }
            },
            _preventDefault: function(e) {
                if (e.preventDefault) return e.stopImmediatePropagation && e.stopImmediatePropagation(), e.preventDefault(), e.stopPropagation(), !1;
                e.returnValue = !1
            },
            _onTouchStart: function(e) {
                Event.prototype.stopImmediatePropagation || this._preventDefault(e), this.startX = e.touches[0].clientX, this.startY = e.touches[0].clientY, this.touchHasMoved = !1, p(r, "mouseup", this, !1)
            },
            _onTouchMove: function(e) {
                (Math.abs(e.touches[0].clientX - this.startX) > 10 || Math.abs(e.touches[0].clientY - this.startY) > 10) && (this.touchHasMoved = !0)
            },
            _onTouchEnd: function(e) {
                if (this._preventDefault(e), l && !this.touchHasMoved) {
                    if ("touchend" === e.type) return void this.toggle();
                    var n = e || t.event;
                    3 !== n.which && 2 !== n.button && this.toggle()
                }
            },
            _onKeyUp: function(e) {
                13 === (e || t.event).keyCode && this.toggle()
            },
            _transitions: function() {
                if (a.animate) {
                    var e = o.style,
                        t = "max-height " + a.transition + "ms";
                    e.WebkitTransition = e.MozTransition = e.OTransition = e.transition = t
                }
            },
            _calcHeight: function() {
                for (var e = 0, t = 0; t < o.inner.length; t++) e += o.inner[t].offsetHeight;
                var n = "." + a.jsClass + " ." + a.navClass + "-" + this.index + ".opened{max-height:" + e + "px !important} ." + a.jsClass + " ." + a.navClass + "-" + this.index + ".opened.dropdown-active {max-height:9999px !important}";
                y.styleSheet ? y.styleSheet.cssText = n : y.innerHTML = n, n = ""
            }
        }, new C(i, s)
    };
    "undefined" != typeof module && module.exports ? module.exports = i : t.responsiveNav = i
}(document, window, 0);