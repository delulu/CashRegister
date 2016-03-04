/*! jsTree - v3.0.0 - 2014-04-16 - (MIT) */
(function (e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(jQuery)
})(function (e, t) {
    "use strict";
    if (!e.jstree) {
        var i = 0, n = !1, r = !1, s = !1, a = [], o = e("script:last").attr("src"), d = document, l = d.createElement("LI"), c, h;
        l.setAttribute("role", "treeitem"), c = d.createElement("I"), c.className = "jstree-icon jstree-ocl", l.appendChild(c), c = d.createElement("A"), c.className = "jstree-anchor", c.setAttribute("href", "#"), h = d.createElement("I"), h.className = "jstree-icon jstree-themeicon", c.appendChild(h), l.appendChild(c), c = h = null, e.jstree = {version: "3.0.0", defaults: {plugins: []}, plugins: {}, path: o && -1 !== o.indexOf("/") ? o.replace(/\/[^\/]+$/, "") : "", idregex: /[\\:&'".,=\- \/]/g}, e.jstree.create = function (t, n) {
            var r = new e.jstree.core(++i), s = n;
            return n = e.extend(!0, {}, e.jstree.defaults, n), s && s.plugins && (n.plugins = s.plugins), e.each(n.plugins, function (e, t) {
                "core" !== e && (r = r.plugin(t, n[t]))
            }), r.init(t, n), r
        }, e.jstree.core = function (e) {
            this._id = e, this._cnt = 0, this._data = {core: {themes: {name: !1, dots: !1, icons: !1}, selected: [], last_error: {}}}
        }, e.jstree.reference = function (i) {
            var n = null, r = null;
            if (i && i.id && (i = i.id), !r || !r.length)try {
                r = e(i)
            } catch (s) {
            }
            if (!r || !r.length)try {
                r = e("#" + i.replace(e.jstree.idregex, "\\$&"))
            } catch (s) {
            }
            return r && r.length && (r = r.closest(".jstree")).length && (r = r.data("jstree")) ? n = r : e(".jstree").each(function () {
                var r = e(this).data("jstree");
                return r && r._model.data[i] ? (n = r, !1) : t
            }), n
        }, e.fn.jstree = function (i) {
            var n = "string" == typeof i, r = Array.prototype.slice.call(arguments, 1), s = null;
            return this.each(function () {
                var a = e.jstree.reference(this), o = n && a ? a[i] : null;
                return s = n && o ? o.apply(a, r) : null, a || n || i !== t && !e.isPlainObject(i) || e(this).data("jstree", new e.jstree.create(this, i)), (a && !n || i === !0) && (s = a || !1), null !== s && s !== t ? !1 : t
            }), null !== s && s !== t ? s : this
        }, e.expr[":"].jstree = e.expr.createPseudo(function (i) {
            return function (i) {
                return e(i).hasClass("jstree") && e(i).data("jstree") !== t
            }
        }), e.jstree.defaults.core = {data: !1, strings: !1, check_callback: !1, error: e.noop, animation: 200, multiple: !0, themes: {name: !1, url: !1, dir: !1, dots: !0, icons: !0, stripes: !1, variant: !1, responsive: !0}, expand_selected_onload: !0}, e.jstree.core.prototype = {plugin: function (t, i) {
            var n = e.jstree.plugins[t];
            return n ? (this._data[t] = {}, n.prototype = this, new n(i, this)) : this
        }, init: function (t, i) {
            this._model = {data: {"#": {id: "#", parent: null, parents: [], children: [], children_d: [], state: {loaded: !1}}}, changed: [], force_full_redraw: !1, redraw_timeout: !1, default_state: {loaded: !0, opened: !1, selected: !1, disabled: !1}}, this.element = e(t).addClass("jstree jstree-" + this._id), this.settings = i, this.element.bind("destroyed", e.proxy(this.teardown, this)), this._data.core.ready = !1, this._data.core.loaded = !1, this._data.core.rtl = "rtl" === this.element.css("direction"), this.element[this._data.core.rtl ? "addClass" : "removeClass"]("jstree-rtl"), this.element.attr("role", "tree"), this.bind(), this.trigger("init"), this._data.core.original_container_html = this.element.find(" > ul > li").clone(!0), this._data.core.original_container_html.find("li").addBack().contents().filter(function () {
                return 3 === this.nodeType && (!this.nodeValue || /^\s+$/.test(this.nodeValue))
            }).remove(), this.element.html("<ul class='jstree-container-ul'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>"), this._data.core.li_height = this.get_container_ul().children("li:eq(0)").height() || 18, this.trigger("loading"), this.load_node("#")
        }, destroy: function () {
            this.element.unbind("destroyed", this.teardown), this.teardown()
        }, teardown: function () {
            this.unbind(), this.element.removeClass("jstree").removeData("jstree").find("[class^='jstree']").addBack().attr("class", function () {
                return this.className.replace(/jstree[^ ]*|$/gi, "")
            }), this.element = null
        }, bind: function () {
            this.element.on("dblclick.jstree",function () {
                if (document.selection && document.selection.empty)document.selection.empty(); else if (window.getSelection) {
                    var e = window.getSelection();
                    try {
                        e.removeAllRanges(), e.collapse()
                    } catch (t) {
                    }
                }
            }).on("click.jstree", ".jstree-ocl", e.proxy(function (e) {
                this.toggle_node(e.target)
            }, this)).on("click.jstree", ".jstree-anchor", e.proxy(function (t) {
                t.preventDefault(), e(t.currentTarget).focus(), this.activate_node(t.currentTarget, t)
            }, this)).on("keydown.jstree", ".jstree-anchor", e.proxy(function (t) {
                if ("INPUT" === t.target.tagName)return!0;
                var i = null;
                switch (t.which) {
                    case 13:
                    case 32:
                        t.type = "click", e(t.currentTarget).trigger(t);
                        break;
                    case 37:
                        t.preventDefault(), this.is_open(t.currentTarget) ? this.close_node(t.currentTarget) : (i = this.get_prev_dom(t.currentTarget), i && i.length && i.children(".jstree-anchor").focus());
                        break;
                    case 38:
                        t.preventDefault(), i = this.get_prev_dom(t.currentTarget), i && i.length && i.children(".jstree-anchor").focus();
                        break;
                    case 39:
                        t.preventDefault(), this.is_closed(t.currentTarget) ? this.open_node(t.currentTarget, function (e) {
                            this.get_node(e, !0).children(".jstree-anchor").focus()
                        }) : (i = this.get_next_dom(t.currentTarget), i && i.length && i.children(".jstree-anchor").focus());
                        break;
                    case 40:
                        t.preventDefault(), i = this.get_next_dom(t.currentTarget), i && i.length && i.children(".jstree-anchor").focus();
                        break;
                    case 46:
                        t.preventDefault(), i = this.get_node(t.currentTarget), i && i.id && "#" !== i.id && (i = this.is_selected(i) ? this.get_selected() : i);
                        break;
                    case 113:
                        t.preventDefault(), i = this.get_node(t.currentTarget);
                        break;
                    default:
                }
            }, this)).on("load_node.jstree", e.proxy(function (t, i) {
                if (i.status && ("#" !== i.node.id || this._data.core.loaded || (this._data.core.loaded = !0, this.trigger("loaded")), !this._data.core.ready && !this.get_container_ul().find(".jstree-loading:eq(0)").length)) {
                    if (this._data.core.ready = !0, this._data.core.selected.length) {
                        if (this.settings.core.expand_selected_onload) {
                            var n = [], r, s;
                            for (r = 0, s = this._data.core.selected.length; s > r; r++)n = n.concat(this._model.data[this._data.core.selected[r]].parents);
                            for (n = e.vakata.array_unique(n), r = 0, s = n.length; s > r; r++)this.open_node(n[r], !1, 0)
                        }
                        this.trigger("changed", {action: "ready", selected: this._data.core.selected})
                    }
                    setTimeout(e.proxy(function () {
                        this.trigger("ready")
                    }, this), 0)
                }
            }, this)).on("init.jstree", e.proxy(function () {
                var e = this.settings.core.themes;
                this._data.core.themes.dots = e.dots, this._data.core.themes.stripes = e.stripes, this._data.core.themes.icons = e.icons, this.set_theme(e.name || "default", e.url), this.set_theme_variant(e.variant)
            }, this)).on("loading.jstree", e.proxy(function () {
                this[this._data.core.themes.dots ? "show_dots" : "hide_dots"](), this[this._data.core.themes.icons ? "show_icons" : "hide_icons"](), this[this._data.core.themes.stripes ? "show_stripes" : "hide_stripes"]()
            }, this)).on("focus.jstree", ".jstree-anchor", e.proxy(function (t) {
                this.element.find(".jstree-hovered").not(t.currentTarget).mouseleave(), e(t.currentTarget).mouseenter()
            }, this)).on("mouseenter.jstree", ".jstree-anchor", e.proxy(function (e) {
                this.hover_node(e.currentTarget)
            }, this)).on("mouseleave.jstree", ".jstree-anchor", e.proxy(function (e) {
                this.dehover_node(e.currentTarget)
            }, this))
        }, unbind: function () {
            this.element.off(".jstree"), e(document).off(".jstree-" + this._id)
        }, trigger: function (e, t) {
            t || (t = {}), t.instance = this, this.element.triggerHandler(e.replace(".jstree", "") + ".jstree", t)
        }, get_container: function () {
            return this.element
        }, get_container_ul: function () {
            return this.element.children("ul:eq(0)")
        }, get_string: function (t) {
            var i = this.settings.core.strings;
            return e.isFunction(i) ? i.call(this, t) : i && i[t] ? i[t] : t
        }, _firstChild: function (e) {
            e = e ? e.firstChild : null;
            while (null !== e && 1 !== e.nodeType)e = e.nextSibling;
            return e
        }, _nextSibling: function (e) {
            e = e ? e.nextSibling : null;
            while (null !== e && 1 !== e.nodeType)e = e.nextSibling;
            return e
        }, _previousSibling: function (e) {
            e = e ? e.previousSibling : null;
            while (null !== e && 1 !== e.nodeType)e = e.previousSibling;
            return e
        }, get_node: function (t, i) {
            t && t.id && (t = t.id);
            var n;
            try {
                if (this._model.data[t])t = this._model.data[t]; else if (((n = e(t, this.element)).length || (n = e("#" + t.replace(e.jstree.idregex, "\\$&"), this.element)).length) && this._model.data[n.closest("li").attr("id")])t = this._model.data[n.closest("li").attr("id")]; else {
                    if (!(n = e(t, this.element)).length || !n.hasClass("jstree"))return!1;
                    t = this._model.data["#"]
                }
                return i && (t = "#" === t.id ? this.element : e("#" + t.id.replace(e.jstree.idregex, "\\$&"), this.element)), t
            } catch (r) {
                return!1
            }
        }, get_path: function (e, t, i) {
            if (e = e.parents ? e : this.get_node(e), !e || "#" === e.id || !e.parents)return!1;
            var n, r, s = [];
            for (s.push(i ? e.id : e.text), n = 0, r = e.parents.length; r > n; n++)s.push(i ? e.parents[n] : this.get_text(e.parents[n]));
            return s = s.reverse().slice(1), t ? s.join(t) : s
        }, get_next_dom: function (t, i) {
            var n;
            return t = this.get_node(t, !0), t[0] === this.element[0] ? (n = this._firstChild(this.get_container_ul()[0]), n ? e(n) : !1) : t && t.length ? i ? (n = this._nextSibling(t[0]), n ? e(n) : !1) : t.hasClass("jstree-open") ? (n = this._firstChild(t.children("ul")[0]), n ? e(n) : !1) : null !== (n = this._nextSibling(t[0])) ? e(n) : t.parentsUntil(".jstree", "li").next("li").eq(0) : !1
        }, get_prev_dom: function (t, i) {
            var n;
            if (t = this.get_node(t, !0), t[0] === this.element[0])return n = this.get_container_ul()[0].lastChild, n ? e(n) : !1;
            if (!t || !t.length)return!1;
            if (i)return n = this._previousSibling(t[0]), n ? e(n) : !1;
            if (null !== (n = this._previousSibling(t[0]))) {
                t = e(n);
                while (t.hasClass("jstree-open"))t = t.children("ul:eq(0)").children("li:last");
                return t
            }
            return n = t[0].parentNode.parentNode, n && "LI" === n.tagName ? e(n) : !1
        }, get_parent: function (e) {
            return e = this.get_node(e), e && "#" !== e.id ? e.parent : !1
        }, get_children_dom: function (e) {
            return e = this.get_node(e, !0), e[0] === this.element[0] ? this.get_container_ul().children("li") : e && e.length ? e.children("ul").children("li") : !1
        }, is_parent: function (e) {
            return e = this.get_node(e), e && (e.state.loaded === !1 || e.children.length > 0)
        }, is_loaded: function (e) {
            return e = this.get_node(e), e && e.state.loaded
        }, is_loading: function (e) {
            return e = this.get_node(e), e && e.state && e.state.loading
        }, is_open: function (e) {
            return e = this.get_node(e), e && e.state.opened
        }, is_closed: function (e) {
            return e = this.get_node(e), e && this.is_parent(e) && !e.state.opened
        }, is_leaf: function (e) {
            return!this.is_parent(e)
        }, load_node: function (t, i) {
            var n, r, s, a, o, d, l;
            if (e.isArray(t)) {
                for (t = t.slice(), n = 0, r = t.length; r > n; n++)this.load_node(t[n], i);
                return!0
            }
            if (t = this.get_node(t), !t)return i && i.call(this, t, !1), !1;
            if (t.state.loaded) {
                for (t.state.loaded = !1, s = 0, a = t.children_d.length; a > s; s++) {
                    for (o = 0, d = t.parents.length; d > o; o++)this._model.data[t.parents[o]].children_d = e.vakata.array_remove_item(this._model.data[t.parents[o]].children_d, t.children_d[s]);
                    this._model.data[t.children_d[s]].state.selected && (l = !0, this._data.core.selected = e.vakata.array_remove_item(this._data.core.selected, t.children_d[s])), delete this._model.data[t.children_d[s]]
                }
                t.children = [], t.children_d = [], l && this.trigger("changed", {action: "load_node", node: t, selected: this._data.core.selected})
            }
            return t.state.loading = !0, this.get_node(t, !0).addClass("jstree-loading"), this._load_node(t, e.proxy(function (e) {
                t.state.loading = !1, t.state.loaded = e;
                var n = this.get_node(t, !0);
                t.state.loaded && !t.children.length && n && n.length && !n.hasClass("jstree-leaf") && n.removeClass("jstree-closed jstree-open").addClass("jstree-leaf"), n.removeClass("jstree-loading"), this.trigger("load_node", {node: t, status: e}), i && i.call(this, t, e)
            }, this)), !0
        }, _load_nodes: function (e, t, i) {
            var n = !0, r = function () {
                this._load_nodes(e, t, !0)
            }, s = this._model.data, a, o;
            for (a = 0, o = e.length; o > a; a++)!s[e[a]] || s[e[a]].state.loaded && i || (this.is_loading(e[a]) || this.load_node(e[a], r), n = !1);
            n && (t.done || (t.call(this, e), t.done = !0))
        }, _load_node: function (t, i) {
            var n = this.settings.core.data, r;
            return n ? e.isFunction(n) ? n.call(this, t, e.proxy(function (n) {
                return n === !1 ? i.call(this, !1) : i.call(this, this["string" == typeof n ? "_append_html_data" : "_append_json_data"](t, "string" == typeof n ? e(n) : n))
            }, this)) : "object" == typeof n ? n.url ? (n = e.extend(!0, {}, n), e.isFunction(n.url) && (n.url = n.url.call(this, t)), e.isFunction(n.data) && (n.data = n.data.call(this, t)), e.ajax(n).done(e.proxy(function (n, r, s) {
                var a = s.getResponseHeader("Content-Type");
                return-1 !== a.indexOf("json") || "object" == typeof n ? i.call(this, this._append_json_data(t, n)) : -1 !== a.indexOf("html") || "string" == typeof n ? i.call(this, this._append_html_data(t, e(n))) : (this._data.core.last_error = {error: "ajax", plugin: "core", id: "core_04", reason: "Could not load node", data: JSON.stringify({id: t.id, xhr: s})}, i.call(this, !1))
            }, this)).fail(e.proxy(function (e) {
                i.call(this, !1), this._data.core.last_error = {error: "ajax", plugin: "core", id: "core_04", reason: "Could not load node", data: JSON.stringify({id: t.id, xhr: e})}, this.settings.core.error.call(this, this._data.core.last_error)
            }, this))) : (r = e.isArray(n) || e.isPlainObject(n) ? JSON.parse(JSON.stringify(n)) : n, "#" !== t.id && (this._data.core.last_error = {error: "nodata", plugin: "core", id: "core_05", reason: "Could not load node", data: JSON.stringify({id: t.id})}), i.call(this, "#" === t.id ? this._append_json_data(t, r) : !1)) : "string" == typeof n ? ("#" !== t.id && (this._data.core.last_error = {error: "nodata", plugin: "core", id: "core_06", reason: "Could not load node", data: JSON.stringify({id: t.id})}), i.call(this, "#" === t.id ? this._append_html_data(t, e(n)) : !1)) : i.call(this, !1) : i.call(this, "#" === t.id ? this._append_html_data(t, this._data.core.original_container_html.clone(!0)) : !1)
        }, _node_changed: function (e) {
            e = this.get_node(e), e && this._model.changed.push(e.id)
        }, _append_html_data: function (t, i) {
            t = this.get_node(t), t.children = [], t.children_d = [];
            var n = i.is("ul") ? i.children() : i, r = t.id, s = [], a = [], o = this._model.data, d = o[r], l = this._data.core.selected.length, c, h, _;
            for (n.each(e.proxy(function (t, i) {
                c = this._parse_model_from_html(e(i), r, d.parents.concat()), c && (s.push(c), a.push(c), o[c].children_d.length && (a = a.concat(o[c].children_d)))
            }, this)), d.children = s, d.children_d = a, h = 0, _ = d.parents.length; _ > h; h++)o[d.parents[h]].children_d = o[d.parents[h]].children_d.concat(a);
            return this.trigger("model", {nodes: a, parent: r}), "#" !== r ? (this._node_changed(r), this.redraw()) : (this.get_container_ul().children(".jstree-initial-node").remove(), this.redraw(!0)), this._data.core.selected.length !== l && this.trigger("changed", {action: "model", selected: this._data.core.selected}), !0
        }, _append_json_data: function (i, n) {
            i = this.get_node(i), i.children = [], i.children_d = [];
            var r = n, s = i.id, a = [], o = [], d = this._model.data, l = d[s], c = this._data.core.selected.length, h, _, u;
            if (r.d && (r = r.d, "string" == typeof r && (r = JSON.parse(r))), e.isArray(r) || (r = [r]), r.length && r[0].id !== t && r[0].parent !== t) {
                for (_ = 0, u = r.length; u > _; _++)r[_].children || (r[_].children = []), d["" + r[_].id] = r[_];
                for (_ = 0, u = r.length; u > _; _++)d["" + r[_].parent].children.push("" + r[_].id), l.children_d.push("" + r[_].id);
                for (_ = 0, u = l.children.length; u > _; _++)h = this._parse_model_from_flat_json(d[l.children[_]], s, l.parents.concat()), o.push(h), d[h].children_d.length && (o = o.concat(d[h].children_d))
            } else {
                for (_ = 0, u = r.length; u > _; _++)h = this._parse_model_from_json(r[_], s, l.parents.concat()), h && (a.push(h), o.push(h), d[h].children_d.length && (o = o.concat(d[h].children_d)));
                for (l.children = a, l.children_d = o, _ = 0, u = l.parents.length; u > _; _++)d[l.parents[_]].children_d = d[l.parents[_]].children_d.concat(o)
            }
            return this.trigger("model", {nodes: o, parent: s}), "#" !== s ? (this._node_changed(s), this.redraw()) : this.redraw(!0), this._data.core.selected.length !== c && this.trigger("changed", {action: "model", selected: this._data.core.selected}), !0
        }, _parse_model_from_html: function (i, n, r) {
            r = r ? [].concat(r) : [], n && r.unshift(n);
            var s, a, o = this._model.data, d = {id: !1, text: !1, icon: !0, parent: n, parents: r, children: [], children_d: [], data: null, state: {}, li_attr: {id: !1}, a_attr: {href: "#"}, original: !1}, l, c, h;
            for (l in this._model.default_state)this._model.default_state.hasOwnProperty(l) && (d.state[l] = this._model.default_state[l]);
            if (c = e.vakata.attributes(i, !0), e.each(c, function (i, n) {
                return n = e.trim(n), n.length ? (d.li_attr[i] = n, "id" === i && (d.id = "" + n), t) : !0
            }), c = i.children("a").eq(0), c.length && (c = e.vakata.attributes(c, !0), e.each(c, function (t, i) {
                i = e.trim(i), i.length && (d.a_attr[t] = i)
            })), c = i.children("a:eq(0)").length ? i.children("a:eq(0)").clone() : i.clone(), c.children("ins, i, ul").remove(), c = c.html(), c = e("<div />").html(c), d.text = c.html(), c = i.data(), d.data = c ? e.extend(!0, {}, c) : null, d.state.opened = i.hasClass("jstree-open"), d.state.selected = i.children("a").hasClass("jstree-clicked"), d.state.disabled = i.children("a").hasClass("jstree-disabled"), d.data && d.data.jstree)for (l in d.data.jstree)d.data.jstree.hasOwnProperty(l) && (d.state[l] = d.data.jstree[l]);
            c = i.children("a").children(".jstree-themeicon"), c.length && (d.icon = c.hasClass("jstree-themeicon-hidden") ? !1 : c.attr("rel")), d.state.icon && (d.icon = d.state.icon), c = i.children("ul").children("li");
            do h = "j" + this._id + "_" + ++this._cnt; while (o[h]);
            return d.id = d.li_attr.id ? "" + d.li_attr.id : h, c.length ? (c.each(e.proxy(function (t, i) {
                s = this._parse_model_from_html(e(i), d.id, r), a = this._model.data[s], d.children.push(s), a.children_d.length && (d.children_d = d.children_d.concat(a.children_d))
            }, this)), d.children_d = d.children_d.concat(d.children)) : i.hasClass("jstree-closed") && (d.state.loaded = !1), d.li_attr["class"] && (d.li_attr["class"] = d.li_attr["class"].replace("jstree-closed", "").replace("jstree-open", "")), d.a_attr["class"] && (d.a_attr["class"] = d.a_attr["class"].replace("jstree-clicked", "").replace("jstree-disabled", "")), o[d.id] = d, d.state.selected && this._data.core.selected.push(d.id), d.id
        }, _parse_model_from_flat_json: function (e, i, n) {
            n = n ? n.concat() : [], i && n.unshift(i);
            var r = "" + e.id, s = this._model.data, a = this._model.default_state, o, d, l, c, h = {id: r, text: e.text || "", icon: e.icon !== t ? e.icon : !0, parent: i, parents: n, children: e.children || [], children_d: e.children_d || [], data: e.data, state: {}, li_attr: {id: !1}, a_attr: {href: "#"}, original: !1};
            for (o in a)a.hasOwnProperty(o) && (h.state[o] = a[o]);
            if (e && e.data && e.data.jstree && e.data.jstree.icon && (h.icon = e.data.jstree.icon), e && e.data && (h.data = e.data, e.data.jstree))for (o in e.data.jstree)e.data.jstree.hasOwnProperty(o) && (h.state[o] = e.data.jstree[o]);
            if (e && "object" == typeof e.state)for (o in e.state)e.state.hasOwnProperty(o) && (h.state[o] = e.state[o]);
            if (e && "object" == typeof e.li_attr)for (o in e.li_attr)e.li_attr.hasOwnProperty(o) && (h.li_attr[o] = e.li_attr[o]);
            if (h.li_attr.id || (h.li_attr.id = r), e && "object" == typeof e.a_attr)for (o in e.a_attr)e.a_attr.hasOwnProperty(o) && (h.a_attr[o] = e.a_attr[o]);
            for (e && e.children && e.children === !0 && (h.state.loaded = !1, h.children = [], h.children_d = []), s[h.id] = h, o = 0, d = h.children.length; d > o; o++)l = this._parse_model_from_flat_json(s[h.children[o]], h.id, n), c = s[l], h.children_d.push(l), c.children_d.length && (h.children_d = h.children_d.concat(c.children_d));
            return delete e.data, delete e.children, s[h.id].original = e, h.state.selected && this._data.core.selected.push(h.id), h.id
        }, _parse_model_from_json: function (e, i, n) {
            n = n ? n.concat() : [], i && n.unshift(i);
            var r = !1, s, a, o, d, l = this._model.data, c = this._model.default_state, h;
            do r = "j" + this._id + "_" + ++this._cnt; while (l[r]);
            h = {id: !1, text: "string" == typeof e ? e : "", icon: "object" == typeof e && e.icon !== t ? e.icon : !0, parent: i, parents: n, children: [], children_d: [], data: null, state: {}, li_attr: {id: !1}, a_attr: {href: "#"}, original: !1};
            for (s in c)c.hasOwnProperty(s) && (h.state[s] = c[s]);
            if (e && e.id && (h.id = "" + e.id), e && e.text && (h.text = e.text), e && e.data && e.data.jstree && e.data.jstree.icon && (h.icon = e.data.jstree.icon), e && e.data && (h.data = e.data, e.data.jstree))for (s in e.data.jstree)e.data.jstree.hasOwnProperty(s) && (h.state[s] = e.data.jstree[s]);
            if (e && "object" == typeof e.state)for (s in e.state)e.state.hasOwnProperty(s) && (h.state[s] = e.state[s]);
            if (e && "object" == typeof e.li_attr)for (s in e.li_attr)e.li_attr.hasOwnProperty(s) && (h.li_attr[s] = e.li_attr[s]);
            if (h.li_attr.id && !h.id && (h.id = "" + h.li_attr.id), h.id || (h.id = r), h.li_attr.id || (h.li_attr.id = h.id), e && "object" == typeof e.a_attr)for (s in e.a_attr)e.a_attr.hasOwnProperty(s) && (h.a_attr[s] = e.a_attr[s]);
            if (e && e.children && e.children.length) {
                for (s = 0, a = e.children.length; a > s; s++)o = this._parse_model_from_json(e.children[s], h.id, n), d = l[o], h.children.push(o), d.children_d.length && (h.children_d = h.children_d.concat(d.children_d));
                h.children_d = h.children_d.concat(h.children)
            }
            return e && e.children && e.children === !0 && (h.state.loaded = !1, h.children = [], h.children_d = []), delete e.data, delete e.children, h.original = e, l[h.id] = h, h.state.selected && this._data.core.selected.push(h.id), h.id
        }, _redraw: function () {
            var e = this._model.force_full_redraw ? this._model.data["#"].children.concat([]) : this._model.changed.concat([]), t = document.createElement("UL"), i, n, r;
            for (n = 0, r = e.length; r > n; n++)i = this.redraw_node(e[n], !0, this._model.force_full_redraw), i && this._model.force_full_redraw && t.appendChild(i);
            this._model.force_full_redraw && (t.className = this.get_container_ul()[0].className, this.element.empty().append(t)), this._model.force_full_redraw = !1, this._model.changed = [], this.trigger("redraw", {nodes: e})
        }, redraw: function (e) {
            e && (this._model.force_full_redraw = !0), this._redraw()
        }, redraw_node: function (t, i, n) {
            var r = this.get_node(t), s = !1, a = !1, o = !1, d = !1, c = !1, h = !1, _ = "", u = document, g = this._model.data, f = !1, p = !1;
            if (!r)return!1;
            if ("#" === r.id)return this.redraw(!0);
            if (i = i || 0 === r.children.length, t = document.querySelector ? this.element[0].querySelector("#" + (-1 !== "0123456789".indexOf(r.id[0]) ? "\\3" + r.id[0] + " " + r.id.substr(1).replace(e.jstree.idregex, "\\$&") : r.id.replace(e.jstree.idregex, "\\$&"))) : document.getElementById(r.id))t = e(t), n || (s = t.parent().parent()[0], s === this.element[0] && (s = null), a = t.index()), i || !r.children.length || t.children("ul").length || (i = !0), i || (o = t.children("UL")[0]), p = t.attr("aria-selected"), f = t.children(".jstree-anchor")[0] === document.activeElement, t.remove(); else if (i = !0, !n) {
                if (s = "#" !== r.parent ? e("#" + r.parent.replace(e.jstree.idregex, "\\$&"), this.element)[0] : null, !(null === s || s && g[r.parent].state.opened))return!1;
                a = e.inArray(r.id, null === s ? g["#"].children : g[r.parent].children)
            }
            t = l.cloneNode(!0), _ = "jstree-node ";
            for (d in r.li_attr)if (r.li_attr.hasOwnProperty(d)) {
                if ("id" === d)continue;
                "class" !== d ? t.setAttribute(d, r.li_attr[d]) : _ += r.li_attr[d]
            }
            p && "false" !== p && t.setAttribute("aria-selected", !0), r.state.loaded && !r.children.length ? _ += " jstree-leaf" : (_ += r.state.opened && r.state.loaded ? " jstree-open" : " jstree-closed", t.setAttribute("aria-expanded", r.state.opened && r.state.loaded)), null !== r.parent && g[r.parent].children[g[r.parent].children.length - 1] === r.id && (_ += " jstree-last"), t.id = r.id, t.className = _, _ = (r.state.selected ? " jstree-clicked" : "") + (r.state.disabled ? " jstree-disabled" : "");
            for (c in r.a_attr)if (r.a_attr.hasOwnProperty(c)) {
                if ("href" === c && "#" === r.a_attr[c])continue;
                "class" !== c ? t.childNodes[1].setAttribute(c, r.a_attr[c]) : _ += " " + r.a_attr[c]
            }
            if (_.length && (t.childNodes[1].className = "jstree-anchor " + _), (r.icon && r.icon !== !0 || r.icon === !1) && (r.icon === !1 ? t.childNodes[1].childNodes[0].className += " jstree-themeicon-hidden" : -1 === r.icon.indexOf("/") && -1 === r.icon.indexOf(".") ? t.childNodes[1].childNodes[0].className += " " + r.icon + " jstree-themeicon-custom" : (t.childNodes[1].childNodes[0].style.backgroundImage = "url(" + r.icon + ")", t.childNodes[1].childNodes[0].style.backgroundPosition = "center center", t.childNodes[1].childNodes[0].style.backgroundSize = "auto", t.childNodes[1].childNodes[0].className += " jstree-themeicon-custom")), t.childNodes[1].innerHTML += r.text, i && r.children.length && r.state.opened && r.state.loaded) {
                for (h = u.createElement("UL"), h.setAttribute("role", "group"), h.className = "jstree-children", d = 0, c = r.children.length; c > d; d++)h.appendChild(this.redraw_node(r.children[d], i, !0));
                t.appendChild(h)
            }
            return o && t.appendChild(o), n || (s || (s = this.element[0]), s.getElementsByTagName("UL").length ? s = s.getElementsByTagName("UL")[0] : (d = u.createElement("UL"), d.setAttribute("role", "group"), d.className = "jstree-children", s.appendChild(d), s = d), s.childNodes.length > a ? s.insertBefore(t, s.childNodes[a]) : s.appendChild(t), f && t.childNodes[1].focus()), r.state.opened && !r.state.loaded && (r.state.opened = !1, setTimeout(e.proxy(function () {
                this.open_node(r.id, !1, 0)
            }, this), 0)), t
        }, open_node: function (i, n, r) {
            var s, a, o, d;
            if (e.isArray(i)) {
                for (i = i.slice(), s = 0, a = i.length; a > s; s++)this.open_node(i[s], n, r);
                return!0
            }
            if (i = this.get_node(i), !i || "#" === i.id)return!1;
            if (r = r === t ? this.settings.core.animation : r, !this.is_closed(i))return n && n.call(this, i, !1), !1;
            if (this.is_loaded(i))o = this.get_node(i, !0), d = this, o.length && (i.children.length && !this._firstChild(o.children("ul")[0]) && (i.state.opened = !0, this.redraw_node(i, !0), o = this.get_node(i, !0)), r ? (this.trigger("before_open", {node: i}), o.children("ul").css("display", "none").end().removeClass("jstree-closed").addClass("jstree-open").attr("aria-expanded", !0).children("ul").stop(!0, !0).slideDown(r, function () {
                this.style.display = "", d.trigger("after_open", {node: i})
            })) : (this.trigger("before_open", {node: i}), o[0].className = o[0].className.replace("jstree-closed", "jstree-open"), o[0].setAttribute("aria-expanded", !0))), i.state.opened = !0, n && n.call(this, i, !0), o.length || this.trigger("before_open", {node: i}), this.trigger("open_node", {node: i}), r && o.length || this.trigger("after_open", {node: i}); else {
                if (this.is_loading(i))return setTimeout(e.proxy(function () {
                    this.open_node(i, n, r)
                }, this), 500);
                this.load_node(i, function (e, t) {
                    return t ? this.open_node(e, n, r) : n ? n.call(this, e, !1) : !1
                })
            }
        }, _open_to: function (t) {
            if (t = this.get_node(t), !t || "#" === t.id)return!1;
            var i, n, r = t.parents;
            for (i = 0, n = r.length; n > i; i += 1)"#" !== i && this.open_node(r[i], !1, 0);
            return e("#" + t.id.replace(e.jstree.idregex, "\\$&"), this.element)
        }, close_node: function (i, n) {
            var r, s, a, o;
            if (e.isArray(i)) {
                for (i = i.slice(), r = 0, s = i.length; s > r; r++)this.close_node(i[r], n);
                return!0
            }
            return i = this.get_node(i), i && "#" !== i.id ? this.is_closed(i) ? !1 : (n = n === t ? this.settings.core.animation : n, a = this, o = this.get_node(i, !0), o.length && (n ? o.children("ul").attr("style", "display:block !important").end().removeClass("jstree-open").addClass("jstree-closed").attr("aria-expanded", !1).children("ul").stop(!0, !0).slideUp(n, function () {
                this.style.display = "", o.children("ul").remove(), a.trigger("after_close", {node: i})
            }) : (o[0].className = o[0].className.replace("jstree-open", "jstree-closed"), o.attr("aria-expanded", !1).children("ul").remove())), i.state.opened = !1, this.trigger("close_node", {node: i}), n && o.length || this.trigger("after_close", {node: i}), t) : !1
        }, toggle_node: function (i) {
            var n, r;
            if (e.isArray(i)) {
                for (i = i.slice(), n = 0, r = i.length; r > n; n++)this.toggle_node(i[n]);
                return!0
            }
            return this.is_closed(i) ? this.open_node(i) : this.is_open(i) ? this.close_node(i) : t
        }, open_all: function (e, t, i) {
            if (e || (e = "#"), e = this.get_node(e), !e)return!1;
            var n = "#" === e.id ? this.get_container_ul() : this.get_node(e, !0), r, s, a;
            if (!n.length) {
                for (r = 0, s = e.children_d.length; s > r; r++)this.is_closed(this._model.data[e.children_d[r]]) && (this._model.data[e.children_d[r]].state.opened = !0);
                return this.trigger("open_all", {node: e})
            }
            i = i || n, a = this, n = this.is_closed(e) ? n.find("li.jstree-closed").addBack() : n.find("li.jstree-closed"), n.each(function () {
                a.open_node(this, function (e, n) {
                    n && this.is_parent(e) && this.open_all(e, t, i)
                }, t || 0)
            }), 0 === i.find("li.jstree-closed").length && this.trigger("open_all", {node: this.get_node(i)})
        }, close_all: function (t, i) {
            if (t || (t = "#"), t = this.get_node(t), !t)return!1;
            var n = "#" === t.id ? this.get_container_ul() : this.get_node(t, !0), r = this, s, a;
            if (!n.length) {
                for (s = 0, a = t.children_d.length; a > s; s++)this._model.data[t.children_d[s]].state.opened = !1;
                return this.trigger("close_all", {node: t})
            }
            n = this.is_open(t) ? n.find("li.jstree-open").addBack() : n.find("li.jstree-open"), e(n.get().reverse()).each(function () {
                r.close_node(this, i || 0)
            }), this.trigger("close_all", {node: t})
        }, is_disabled: function (e) {
            return e = this.get_node(e), e && e.state && e.state.disabled
        }, enable_node: function (i) {
            var n, r;
            if (e.isArray(i)) {
                for (i = i.slice(), n = 0, r = i.length; r > n; n++)this.enable_node(i[n]);
                return!0
            }
            return i = this.get_node(i), i && "#" !== i.id ? (i.state.disabled = !1, this.get_node(i, !0).children(".jstree-anchor").removeClass("jstree-disabled"), this.trigger("enable_node", {node: i}), t) : !1
        }, disable_node: function (i) {
            var n, r;
            if (e.isArray(i)) {
                for (i = i.slice(), n = 0, r = i.length; r > n; n++)this.disable_node(i[n]);
                return!0
            }
            return i = this.get_node(i), i && "#" !== i.id ? (i.state.disabled = !0, this.get_node(i, !0).children(".jstree-anchor").addClass("jstree-disabled"), this.trigger("disable_node", {node: i}), t) : !1
        }, activate_node: function (e, i) {
            if (this.is_disabled(e))return!1;
            if (this._data.core.last_clicked = this._data.core.last_clicked && this._data.core.last_clicked.id !== t ? this.get_node(this._data.core.last_clicked.id) : null, this._data.core.last_clicked && !this._data.core.last_clicked.state.selected && (this._data.core.last_clicked = null), !this._data.core.last_clicked && this._data.core.selected.length && (this._data.core.last_clicked = this.get_node(this._data.core.selected[this._data.core.selected.length - 1])), this.settings.core.multiple && (i.metaKey || i.ctrlKey || i.shiftKey) && (!i.shiftKey || this._data.core.last_clicked && this.get_parent(e) && this.get_parent(e) === this._data.core.last_clicked.parent))if (i.shiftKey) {
                var n = this.get_node(e).id, r = this._data.core.last_clicked.id, s = this.get_node(this._data.core.last_clicked.parent).children, a = !1, o, d;
                for (o = 0, d = s.length; d > o; o += 1)s[o] === n && (a = !a), s[o] === r && (a = !a), a || s[o] === n || s[o] === r ? this.select_node(s[o], !1, !1, i) : this.deselect_node(s[o], !1, !1, i)
            } else this.is_selected(e) ? this.deselect_node(e, !1, !1, i) : this.select_node(e, !1, !1, i); else!this.settings.core.multiple && (i.metaKey || i.ctrlKey || i.shiftKey) && this.is_selected(e) ? this.deselect_node(e, !1, !1, i) : (this.deselect_all(!0), this.select_node(e, !1, !1, i), this._data.core.last_clicked = this.get_node(e));
            this.trigger("activate_node", {node: this.get_node(e)})
        }, hover_node: function (e) {
            if (e = this.get_node(e, !0), !e || !e.length || e.children(".jstree-hovered").length)return!1;
            var t = this.element.find(".jstree-hovered"), i = this.element;
            t && t.length && this.dehover_node(t), e.children(".jstree-anchor").addClass("jstree-hovered"), this.trigger("hover_node", {node: this.get_node(e)}), setTimeout(function () {
                i.attr("aria-activedescendant", e[0].id), e.attr("aria-selected", !0)
            }, 0)
        }, dehover_node: function (e) {
            return e = this.get_node(e, !0), e && e.length && e.children(".jstree-hovered").length ? (e.attr("aria-selected", !1).children(".jstree-anchor").removeClass("jstree-hovered"), this.trigger("dehover_node", {node: this.get_node(e)}), t) : !1
        }, select_node: function (i, n, r, s) {
            var a, o, d, l;
            if (e.isArray(i)) {
                for (i = i.slice(), o = 0, d = i.length; d > o; o++)this.select_node(i[o], n, r, s);
                return!0
            }
            return i = this.get_node(i), i && "#" !== i.id ? (a = this.get_node(i, !0), i.state.selected || (i.state.selected = !0, this._data.core.selected.push(i.id), r || (a = this._open_to(i)), a && a.length && a.children(".jstree-anchor").addClass("jstree-clicked"), this.trigger("select_node", {node: i, selected: this._data.core.selected, event: s}), n || this.trigger("changed", {action: "select_node", node: i, selected: this._data.core.selected, event: s})), t) : !1
        }, deselect_node: function (i, n, r) {
            var s, a, o;
            if (e.isArray(i)) {
                for (i = i.slice(), s = 0, a = i.length; a > s; s++)this.deselect_node(i[s], n, r);
                return!0
            }
            return i = this.get_node(i), i && "#" !== i.id ? (o = this.get_node(i, !0), i.state.selected && (i.state.selected = !1, this._data.core.selected = e.vakata.array_remove_item(this._data.core.selected, i.id), o.length && o.children(".jstree-anchor").removeClass("jstree-clicked"), this.trigger("deselect_node", {node: i, selected: this._data.core.selected, event: r}), n || this.trigger("changed", {action: "deselect_node", node: i, selected: this._data.core.selected, event: r})), t) : !1
        }, select_all: function (e) {
            var t = this._data.core.selected.concat([]), i, n;
            for (this._data.core.selected = this._model.data["#"].children_d.concat(), i = 0, n = this._data.core.selected.length; n > i; i++)this._model.data[this._data.core.selected[i]] && (this._model.data[this._data.core.selected[i]].state.selected = !0);
            this.redraw(!0), this.trigger("select_all", {selected: this._data.core.selected}), e || this.trigger("changed", {action: "select_all", selected: this._data.core.selected, old_selection: t})
        }, deselect_all: function (e) {
            var t = this._data.core.selected.concat([]), i, n;
            for (i = 0, n = this._data.core.selected.length; n > i; i++)this._model.data[this._data.core.selected[i]] && (this._model.data[this._data.core.selected[i]].state.selected = !1);
            this._data.core.selected = [], this.element.find(".jstree-clicked").removeClass("jstree-clicked"), this.trigger("deselect_all", {selected: this._data.core.selected, node: t}), e || this.trigger("changed", {action: "deselect_all", selected: this._data.core.selected, old_selection: t})
        }, is_selected: function (e) {
            return e = this.get_node(e), e && "#" !== e.id ? e.state.selected : !1
        }, get_selected: function (t) {
            return t ? e.map(this._data.core.selected, e.proxy(function (e) {
                return this.get_node(e)
            }, this)) : this._data.core.selected
        }, get_top_selected: function (t) {
            var i = this.get_selected(!0), n = {}, r, s, a, o;
            for (r = 0, s = i.length; s > r; r++)n[i[r].id] = i[r];
            for (r = 0, s = i.length; s > r; r++)for (a = 0, o = i[r].children_d.length; o > a; a++)n[i[r].children_d[a]] && delete n[i[r].children_d[a]];
            i = [];
            for (r in n)n.hasOwnProperty(r) && i.push(r);
            return t ? e.map(i, e.proxy(function (e) {
                return this.get_node(e)
            }, this)) : i
        }, get_bottom_selected: function (t) {
            var i = this.get_selected(!0), n = [], r, s;
            for (r = 0, s = i.length; s > r; r++)i[r].children.length || n.push(i[r].id);
            return t ? e.map(n, e.proxy(function (e) {
                return this.get_node(e)
            }, this)) : n
        }, get_state: function () {
            var e = {core: {open: [], scroll: {left: this.element.scrollLeft(), top: this.element.scrollTop()}, selected: []}}, t;
            for (t in this._model.data)this._model.data.hasOwnProperty(t) && "#" !== t && (this._model.data[t].state.opened && e.core.open.push(t), this._model.data[t].state.selected && e.core.selected.push(t));
            return e
        }, set_state: function (i, n) {
            if (i) {
                if (i.core) {
                    var r, s, a, o;
                    if (i.core.open)return e.isArray(i.core.open) ? (r = !0, s = !1, a = this, e.each(i.core.open.concat([]), function (t, o) {
                        s = a.get_node(o), s && (a.is_loaded(o) ? (a.is_closed(o) && a.open_node(o, !1, 0), i && i.core && i.core.open && e.vakata.array_remove_item(i.core.open, o)) : (a.is_loading(o) || a.open_node(o, e.proxy(function (t, r) {
                            !r && i && i.core && i.core.open && e.vakata.array_remove_item(i.core.open, t.id), this.set_state(i, n)
                        }, a), 0), r = !1))
                    }), r && (delete i.core.open, this.set_state(i, n)), !1) : (delete i.core.open, this.set_state(i, n), !1);
                    if (i.core.scroll)return i.core.scroll && i.core.scroll.left !== t && this.element.scrollLeft(i.core.scroll.left), i.core.scroll && i.core.scroll.top !== t && this.element.scrollTop(i.core.scroll.top), delete i.core.scroll, this.set_state(i, n), !1;
                    if (i.core.selected)return o = this, this.deselect_all(), e.each(i.core.selected, function (e, t) {
                        o.select_node(t)
                    }), delete i.core.selected, this.set_state(i, n), !1;
                    if (e.isEmptyObject(i.core))return delete i.core, this.set_state(i, n), !1
                }
                return e.isEmptyObject(i) ? (i = null, n && n.call(this), this.trigger("set_state"), !1) : !0
            }
            return!1
        }, refresh: function (t) {
            this._data.core.state = this.get_state(), this._cnt = 0, this._model.data = {"#": {id: "#", parent: null, parents: [], children: [], children_d: [], state: {loaded: !1}}};
            var i = this.get_container_ul()[0].className;
            t || this.element.html("<ul class='jstree-container-ul'><li class='jstree-initial-node jstree-loading jstree-leaf jstree-last'><i class='jstree-icon jstree-ocl'></i><a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>"), this.load_node("#", function (t, n) {
                n && (this.get_container_ul()[0].className = i, this.set_state(e.extend(!0, {}, this._data.core.state), function () {
                    this.trigger("refresh")
                })), this._data.core.state = null
            })
        }, refresh_node: function (t) {
            if (t = this.get_node(t), !t || "#" === t.id)return!1;
            var i = [], n = this._data.core.selected.concat([]);
            t.state.opened === !0 && i.push(t.id), this.get_node(t, !0).find(".jstree-open").each(function () {
                i.push(this.id)
            }), this._load_nodes(i, e.proxy(function (e) {
                this.open_node(e, !1, 0), this.select_node(this._data.core.selected), this.trigger("refresh_node", {node: t, nodes: e})
            }, this))
        }, set_id: function (t, i) {
            if (t = this.get_node(t), !t || "#" === t.id)return!1;
            var n, r, s = this._model.data;
            for (i = "" + i, s[t.parent].children[e.inArray(t.id, s[t.parent].children)] = i, n = 0, r = t.parents.length; r > n; n++)s[t.parents[n]].children_d[e.inArray(t.id, s[t.parents[n]].children_d)] = i;
            for (n = 0, r = t.children.length; r > n; n++)s[t.children[n]].parent = i;
            for (n = 0, r = t.children_d.length; r > n; n++)s[t.children_d[n]].parents[e.inArray(t.id, s[t.children_d[n]].parents)] = i;
            return n = e.inArray(t.id, this._data.core.selected), -1 !== n && (this._data.core.selected[n] = i), n = this.get_node(t.id, !0), n && n.attr("id", i), delete s[t.id], t.id = i, s[i] = t, !0
        }, get_text: function (e) {
            return e = this.get_node(e), e && "#" !== e.id ? e.text : !1
        }, set_text: function (t, i) {
            var n, r, s, a;
            if (e.isArray(t)) {
                for (t = t.slice(), n = 0, r = t.length; r > n; n++)this.set_text(t[n], i);
                return!0
            }
            return t = this.get_node(t), t && "#" !== t.id ? (t.text = i, s = this.get_node(t, !0), s.length && (s = s.children(".jstree-anchor:eq(0)"), a = s.children("I").clone(), s.html(i).prepend(a), this.trigger("set_text", {obj: t, text: i})), !0) : !1
        }, get_json: function (e, t, i) {
            if (e = this.get_node(e || "#"), !e)return!1;
            t && t.flat && !i && (i = []);
            var n = {id: e.id, text: e.text, icon: this.get_icon(e), li_attr: e.li_attr, a_attr: e.a_attr, state: {}, data: t && t.no_data ? !1 : e.data}, r, s;
            if (t && t.flat ? n.parent = e.parent : n.children = [], !t || !t.no_state)for (r in e.state)e.state.hasOwnProperty(r) && (n.state[r] = e.state[r]);
            if (t && t.no_id && (delete n.id, n.li_attr && n.li_attr.id && delete n.li_attr.id), t && t.flat && "#" !== e.id && i.push(n), !t || !t.no_children)for (r = 0, s = e.children.length; s > r; r++)t && t.flat ? this.get_json(e.children[r], t, i) : n.children.push(this.get_json(e.children[r], t));
            return t && t.flat ? i : "#" === e.id ? n.children : n
        }, create_node: function (i, n, r, s, a) {
            if (null === i && (i = "#"), i = this.get_node(i), !i)return!1;
            if (r = r === t ? "last" : r, !("" + r).match(/^(before|after)$/) && !a && !this.is_loaded(i))return this.load_node(i, function () {
                this.create_node(i, n, r, s, !0)
            });
            n || (n = {text: this.get_string("New node")}), n.text === t && (n.text = this.get_string("New node"));
            var o, d, l, c;
            switch ("#" === i.id && ("before" === r && (r = "first"), "after" === r && (r = "last")), r) {
                case"before":
                    o = this.get_node(i.parent), r = e.inArray(i.id, o.children), i = o;
                    break;
                case"after":
                    o = this.get_node(i.parent), r = e.inArray(i.id, o.children) + 1, i = o;
                    break;
                case"inside":
                case"first":
                    r = 0;
                    break;
                case"last":
                    r = i.children.length;
                    break;
                default:
                    r || (r = 0)
            }
            if (r > i.children.length && (r = i.children.length), n.id || (n.id = !0), !this.check("create_node", n, i, r))return this.settings.core.error.call(this, this._data.core.last_error), !1;
            if (n.id === !0 && delete n.id, n = this._parse_model_from_json(n, i.id, i.parents.concat()), !n)return!1;
            for (o = this.get_node(n), d = [], d.push(n), d = d.concat(o.children_d), this.trigger("model", {nodes: d, parent: i.id}), i.children_d = i.children_d.concat(d), l = 0, c = i.parents.length; c > l; l++)this._model.data[i.parents[l]].children_d = this._model.data[i.parents[l]].children_d.concat(d);
            for (n = o, o = [], l = 0, c = i.children.length; c > l; l++)o[l >= r ? l + 1 : l] = i.children[l];
            return o[r] = n.id, i.children = o, this.redraw_node(i, !0), s && s.call(this, this.get_node(n)), this.trigger("create_node", {node: this.get_node(n), parent: i.id, position: r}), n.id
        }, rename_node: function (t, i) {
            var n, r, s;
            if (e.isArray(t)) {
                for (t = t.slice(), n = 0, r = t.length; r > n; n++)this.rename_node(t[n], i);
                return!0
            }
            return t = this.get_node(t), t && "#" !== t.id ? (s = t.text, this.check("rename_node", t, this.get_parent(t), i) ? (this.set_text(t, i), this.trigger("rename_node", {node: t, text: i, old: s}), !0) : (this.settings.core.error.call(this, this._data.core.last_error), !1)) : !1
        }, delete_node: function (t) {
            var i, n, r, s, a, o, d, l, c, h;
            if (e.isArray(t)) {
                for (t = t.slice(), i = 0, n = t.length; n > i; i++)this.delete_node(t[i]);
                return!0
            }
            if (t = this.get_node(t), !t || "#" === t.id)return!1;
            if (r = this.get_node(t.parent), s = e.inArray(t.id, r.children), h = !1, !this.check("delete_node", t, r, s))return this.settings.core.error.call(this, this._data.core.last_error), !1;
            for (-1 !== s && (r.children = e.vakata.array_remove(r.children, s)), a = t.children_d.concat([]), a.push(t.id), l = 0, c = a.length; c > l; l++) {
                for (o = 0, d = t.parents.length; d > o; o++)s = e.inArray(a[l], this._model.data[t.parents[o]].children_d), -1 !== s && (this._model.data[t.parents[o]].children_d = e.vakata.array_remove(this._model.data[t.parents[o]].children_d, s));
                this._model.data[a[l]].state.selected && (h = !0, s = e.inArray(a[l], this._data.core.selected), -1 !== s && (this._data.core.selected = e.vakata.array_remove(this._data.core.selected, s)))
            }
            for (this.trigger("delete_node", {node: t, parent: r.id}), h && this.trigger("changed", {action: "delete_node", node: t, selected: this._data.core.selected, parent: r.id}), l = 0, c = a.length; c > l; l++)delete this._model.data[a[l]];
            return this.redraw_node(r, !0), !0
        }, check: function (t, i, n, r, s) {
            i = i && i.id ? i : this.get_node(i), n = n && n.id ? n : this.get_node(n);
            var a = t.match(/^move_node|copy_node|create_node$/i) ? n : i, o = this.settings.core.check_callback;
            return"move_node" !== t && "copy_node" !== t || s && s.is_multi || i.id !== n.id && e.inArray(i.id, n.children) !== r && -1 === e.inArray(n.id, i.children_d) ? (a && a.data && (a = a.data), a && a.functions && (a.functions[t] === !1 || a.functions[t] === !0) ? (a.functions[t] === !1 && (this._data.core.last_error = {error: "check", plugin: "core", id: "core_02", reason: "Node data prevents function: " + t, data: JSON.stringify({chk: t, pos: r, obj: i && i.id ? i.id : !1, par: n && n.id ? n.id : !1})}), a.functions[t]) : o === !1 || e.isFunction(o) && o.call(this, t, i, n, r, s) === !1 || o && o[t] === !1 ? (this._data.core.last_error = {error: "check", plugin: "core", id: "core_03", reason: "User config for core.check_callback prevents function: " + t, data: JSON.stringify({chk: t, pos: r, obj: i && i.id ? i.id : !1, par: n && n.id ? n.id : !1})}, !1) : !0) : (this._data.core.last_error = {error: "check", plugin: "core", id: "core_01", reason: "Moving parent inside child", data: JSON.stringify({chk: t, pos: r, obj: i && i.id ? i.id : !1, par: n && n.id ? n.id : !1})}, !1)
        }, last_error: function () {
            return this._data.core.last_error
        }, move_node: function (i, n, r, s, a) {
            var o, d, l, c, h, _, u, g, f, p, m, v, y;
            if (e.isArray(i)) {
                for (i = i.reverse().slice(), o = 0, d = i.length; d > o; o++)this.move_node(i[o], n, r, s, a);
                return!0
            }
            if (i = i && i.id ? i : this.get_node(i), n = this.get_node(n), r = r === t ? 0 : r, !n || !i || "#" === i.id)return!1;
            if (!("" + r).match(/^(before|after)$/) && !a && !this.is_loaded(n))return this.load_node(n, function () {
                this.move_node(i, n, r, s, !0)
            });
            if (l = "" + (i.parent || "#"), c = ("" + r).match(/^(before|after)$/) && "#" !== n.id ? this.get_node(n.parent) : n, h = i.instance ? i.instance : this._model.data[i.id] ? this : e.jstree.reference(i.id), _ = !h || !h._id || this._id !== h._id)return this.copy_node(i, n, r, s, a) ? (h && h.delete_node(i), !0) : !1;
            switch ("#" === c.id && ("before" === r && (r = "first"), "after" === r && (r = "last")), r) {
                case"before":
                    r = e.inArray(n.id, c.children);
                    break;
                case"after":
                    r = e.inArray(n.id, c.children) + 1;
                    break;
                case"inside":
                case"first":
                    r = 0;
                    break;
                case"last":
                    r = c.children.length;
                    break;
                default:
                    r || (r = 0)
            }
            if (r > c.children.length && (r = c.children.length), !this.check("move_node", i, c, r, {core: !0, is_multi: h && h._id && h._id !== this._id, is_foreign: !h || !h._id}))return this.settings.core.error.call(this, this._data.core.last_error), !1;
            if (i.parent === c.id) {
                for (u = c.children.concat(), g = e.inArray(i.id, u), -1 !== g && (u = e.vakata.array_remove(u, g), r > g && r--), g = [], f = 0, p = u.length; p > f; f++)g[f >= r ? f + 1 : f] = u[f];
                g[r] = i.id, c.children = g, this._node_changed(c.id), this.redraw("#" === c.id)
            } else {
                for (g = i.children_d.concat(), g.push(i.id), f = 0, p = i.parents.length; p > f; f++) {
                    for (u = [], y = h._model.data[i.parents[f]].children_d, m = 0, v = y.length; v > m; m++)-1 === e.inArray(y[m], g) && u.push(y[m]);
                    h._model.data[i.parents[f]].children_d = u
                }
                for (h._model.data[l].children = e.vakata.array_remove_item(h._model.data[l].children, i.id), f = 0, p = c.parents.length; p > f; f++)this._model.data[c.parents[f]].children_d = this._model.data[c.parents[f]].children_d.concat(g);
                for (u = [], f = 0, p = c.children.length; p > f; f++)u[f >= r ? f + 1 : f] = c.children[f];
                for (u[r] = i.id, c.children = u, c.children_d.push(i.id), c.children_d = c.children_d.concat(i.children_d), i.parent = c.id, g = c.parents.concat(), g.unshift(c.id), y = i.parents.length, i.parents = g, g = g.concat(), f = 0, p = i.children_d.length; p > f; f++)this._model.data[i.children_d[f]].parents = this._model.data[i.children_d[f]].parents.slice(0, -1 * y), Array.prototype.push.apply(this._model.data[i.children_d[f]].parents, g);
                this._node_changed(l), this._node_changed(c.id), this.redraw("#" === l || "#" === c.id)
            }
            return s && s.call(this, i, c, r), this.trigger("move_node", {node: i, parent: c.id, position: r, old_parent: l, is_multi: h && h._id && h._id !== this._id, is_foreign: !h || !h._id, old_instance: h, new_instance: this}), !0
        }, copy_node: function (i, n, r, s, a) {
            var o, d, l, c, h, _, u, g, f, p, m;
            if (e.isArray(i)) {
                for (i = i.reverse().slice(), o = 0, d = i.length; d > o; o++)this.copy_node(i[o], n, r, s, a);
                return!0
            }
            if (i = i && i.id ? i : this.get_node(i), n = this.get_node(n), r = r === t ? 0 : r, !n || !i || "#" === i.id)return!1;
            if (!("" + r).match(/^(before|after)$/) && !a && !this.is_loaded(n))return this.load_node(n, function () {
                this.copy_node(i, n, r, s, !0)
            });
            switch (g = "" + (i.parent || "#"), f = ("" + r).match(/^(before|after)$/) && "#" !== n.id ? this.get_node(n.parent) : n, p = i.instance ? i.instance : this._model.data[i.id] ? this : e.jstree.reference(i.id), m = !p || !p._id || this._id !== p._id, "#" === f.id && ("before" === r && (r = "first"), "after" === r && (r = "last")), r) {
                case"before":
                    r = e.inArray(n.id, f.children);
                    break;
                case"after":
                    r = e.inArray(n.id, f.children) + 1;
                    break;
                case"inside":
                case"first":
                    r = 0;
                    break;
                case"last":
                    r = f.children.length;
                    break;
                default:
                    r || (r = 0)
            }
            if (r > f.children.length && (r = f.children.length), !this.check("copy_node", i, f, r, {core: !0, is_multi: p && p._id && p._id !== this._id, is_foreign: !p || !p._id}))return this.settings.core.error.call(this, this._data.core.last_error), !1;
            if (u = p ? p.get_json(i, {no_id: !0, no_data: !0, no_state: !0}) : i, !u)return!1;
            if (u.id === !0 && delete u.id, u = this._parse_model_from_json(u, f.id, f.parents.concat()), !u)return!1;
            for (c = this.get_node(u), i && i.state && i.state.loaded === !1 && (c.state.loaded = !1), l = [], l.push(u), l = l.concat(c.children_d), this.trigger("model", {nodes: l, parent: f.id}), h = 0, _ = f.parents.length; _ > h; h++)this._model.data[f.parents[h]].children_d = this._model.data[f.parents[h]].children_d.concat(l);
            for (l = [], h = 0, _ = f.children.length; _ > h; h++)l[h >= r ? h + 1 : h] = f.children[h];
            return l[r] = c.id, f.children = l, f.children_d.push(c.id), f.children_d = f.children_d.concat(c.children_d), this._node_changed(f.id), this.redraw("#" === f.id), s && s.call(this, c, f, r), this.trigger("copy_node", {node: c, original: i, parent: f.id, position: r, old_parent: g, is_multi: p && p._id && p._id !== this._id, is_foreign: !p || !p._id, old_instance: p, new_instance: this}), c.id
        }, cut: function (i) {
            if (i || (i = this._data.core.selected.concat()), e.isArray(i) || (i = [i]), !i.length)return!1;
            var a = [], o, d, l;
            for (d = 0, l = i.length; l > d; d++)o = this.get_node(i[d]), o && o.id && "#" !== o.id && a.push(o);
            return a.length ? (n = a, s = this, r = "move_node", this.trigger("cut", {node: i}), t) : !1
        }, copy: function (i) {
            if (i || (i = this._data.core.selected.concat()), e.isArray(i) || (i = [i]), !i.length)return!1;
            var a = [], o, d, l;
            for (d = 0, l = i.length; l > d; d++)o = this.get_node(i[d]), o && o.id && "#" !== o.id && a.push(o);
            return a.length ? (n = a, s = this, r = "copy_node", this.trigger("copy", {node: i}), t) : !1
        }, get_buffer: function () {
            return{mode: r, node: n, inst: s}
        }, can_paste: function () {
            return r !== !1 && n !== !1
        }, paste: function (e, i) {
            return e = this.get_node(e), e && r && r.match(/^(copy_node|move_node)$/) && n ? (this[r](n, e, i) && this.trigger("paste", {parent: e.id, node: n, mode: r}), n = !1, r = !1, s = !1, t) : !1
        }, edit: function (i, n) {
            if (i = this._open_to(i), !i || !i.length)return!1;
            var r = this._data.core.rtl, s = this.element.width(), a = i.children(".jstree-anchor"), o = e("<span>"), d = "string" == typeof n ? n : this.get_text(i), l = e("<div />", {css: {position: "absolute", top: "-200px", left: r ? "0px" : "-1000px", visibility: "hidden"}}).appendTo("body"), c = e("<input />", {value: d, "class": "jstree-rename-input", css: {padding: "0", border: "1px solid silver", "box-sizing": "border-box", display: "inline-block", height: this._data.core.li_height + "px", lineHeight: this._data.core.li_height + "px", width: "150px"}, blur: e.proxy(function () {
                var e = o.children(".jstree-rename-input"), t = e.val();
                "" === t && (t = d), l.remove(), o.replaceWith(a), o.remove(), this.set_text(i, d), this.rename_node(i, t) === !1 && this.set_text(i, d)
            }, this), keydown: function (e) {
                var t = e.which;
                27 === t && (this.value = d), (27 === t || 13 === t || 37 === t || 38 === t || 39 === t || 40 === t || 32 === t) && e.stopImmediatePropagation(), (27 === t || 13 === t) && (e.preventDefault(), this.blur())
            }, click: function (e) {
                e.stopImmediatePropagation()
            }, mousedown: function (e) {
                e.stopImmediatePropagation()
            }, keyup: function (e) {
                c.width(Math.min(l.text("pW" + this.value).width(), s))
            }, keypress: function (e) {
                return 13 === e.which ? !1 : t
            }}), h = {fontFamily: a.css("fontFamily") || "", fontSize: a.css("fontSize") || "", fontWeight: a.css("fontWeight") || "", fontStyle: a.css("fontStyle") || "", fontStretch: a.css("fontStretch") || "", fontVariant: a.css("fontVariant") || "", letterSpacing: a.css("letterSpacing") || "", wordSpacing: a.css("wordSpacing") || ""};
            this.set_text(i, ""), o.attr("class", a.attr("class")).append(a.contents().clone()).append(c), a.replaceWith(o), l.css(h), c.css(h).width(Math.min(l.text("pW" + c[0].value).width(), s))[0].select()
        }, set_theme: function (t, i) {
            if (!t)return!1;
            if (i === !0) {
                var n = this.settings.core.themes.dir;
                n || (n = e.jstree.path + "/themes"), i = n + "/" + t + "/style.css"
            }
            i && -1 === e.inArray(i, a) && (e("head").append('<link rel="stylesheet" href="' + i + '" type="text/css" />'), a.push(i)), this._data.core.themes.name && this.element.removeClass("jstree-" + this._data.core.themes.name), this._data.core.themes.name = t, this.element.addClass("jstree-" + t), this.element[this.settings.core.themes.responsive ? "addClass" : "removeClass"]("jstree-" + t + "-responsive"), this.trigger("set_theme", {theme: t})
        }, get_theme: function () {
            return this._data.core.themes.name
        }, set_theme_variant: function (e) {
            this._data.core.themes.variant && this.element.removeClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant), this._data.core.themes.variant = e, e && this.element.addClass("jstree-" + this._data.core.themes.name + "-" + this._data.core.themes.variant)
        }, get_theme_variant: function () {
            return this._data.core.themes.variant
        }, show_stripes: function () {
            this._data.core.themes.stripes = !0, this.get_container_ul().addClass("jstree-striped")
        }, hide_stripes: function () {
            this._data.core.themes.stripes = !1, this.get_container_ul().removeClass("jstree-striped")
        }, toggle_stripes: function () {
            this._data.core.themes.stripes ? this.hide_stripes() : this.show_stripes()
        }, show_dots: function () {
            this._data.core.themes.dots = !0, this.get_container_ul().removeClass("jstree-no-dots")
        }, hide_dots: function () {
            this._data.core.themes.dots = !1, this.get_container_ul().addClass("jstree-no-dots")
        }, toggle_dots: function () {
            this._data.core.themes.dots ? this.hide_dots() : this.show_dots()
        }, show_icons: function () {
            this._data.core.themes.icons = !0, this.get_container_ul().removeClass("jstree-no-icons")
        }, hide_icons: function () {
            this._data.core.themes.icons = !1, this.get_container_ul().addClass("jstree-no-icons")
        }, toggle_icons: function () {
            this._data.core.themes.icons ? this.hide_icons() : this.show_icons()
        }, set_icon: function (t, i) {
            var n, r, s, a;
            if (e.isArray(t)) {
                for (t = t.slice(), n = 0, r = t.length; r > n; n++)this.set_icon(t[n], i);
                return!0
            }
            return t = this.get_node(t), t && "#" !== t.id ? (a = t.icon, t.icon = i, s = this.get_node(t, !0).children(".jstree-anchor").children(".jstree-themeicon"), i === !1 ? this.hide_icon(t) : i === !0 ? s.removeClass("jstree-themeicon-custom " + a).css("background", "").removeAttr("rel") : -1 === i.indexOf("/") && -1 === i.indexOf(".") ? (s.removeClass(a).css("background", ""), s.addClass(i + " jstree-themeicon-custom").attr("rel", i)) : (s.removeClass(a).css("background", ""), s.addClass("jstree-themeicon-custom").css("background", "url('" + i + "') center center no-repeat").attr("rel", i)), !0) : !1
        }, get_icon: function (e) {
            return e = this.get_node(e), e && "#" !== e.id ? e.icon : !1
        }, hide_icon: function (t) {
            var i, n;
            if (e.isArray(t)) {
                for (t = t.slice(), i = 0, n = t.length; n > i; i++)this.hide_icon(t[i]);
                return!0
            }
            return t = this.get_node(t), t && "#" !== t ? (t.icon = !1, this.get_node(t, !0).children("a").children(".jstree-themeicon").addClass("jstree-themeicon-hidden"), !0) : !1
        }, show_icon: function (t) {
            var i, n, r;
            if (e.isArray(t)) {
                for (t = t.slice(), i = 0, n = t.length; n > i; i++)this.show_icon(t[i]);
                return!0
            }
            return t = this.get_node(t), t && "#" !== t ? (r = this.get_node(t, !0), t.icon = r.length ? r.children("a").children(".jstree-themeicon").attr("rel") : !0, t.icon || (t.icon = !0), r.children("a").children(".jstree-themeicon").removeClass("jstree-themeicon-hidden"), !0) : !1
        }}, e.vakata = {}, e.vakata.attributes = function (t, i) {
            t = e(t)[0];
            var n = i ? {} : [];
            return t && t.attributes && e.each(t.attributes, function (t, r) {
                -1 === e.inArray(r.nodeName.toLowerCase(), ["style", "contenteditable", "hasfocus", "tabindex"]) && null !== r.nodeValue && "" !== e.trim(r.nodeValue) && (i ? n[r.nodeName] = r.nodeValue : n.push(r.nodeName))
            }), n
        }, e.vakata.array_unique = function (e) {
            var t = [], i, n, r;
            for (i = 0, r = e.length; r > i; i++) {
                for (n = 0; i >= n; n++)if (e[i] === e[n])break;
                n === i && t.push(e[i])
            }
            return t
        }, e.vakata.array_remove = function (e, t, i) {
            var n = e.slice((i || t) + 1 || e.length);
            return e.length = 0 > t ? e.length + t : t, e.push.apply(e, n), e
        }, e.vakata.array_remove_item = function (t, i) {
            var n = e.inArray(i, t);
            return-1 !== n ? e.vakata.array_remove(t, n) : t
        }, function () {
            var t = {}, i = function (e) {
                e = e.toLowerCase();
                var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 > e.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
                return{browser: t[1] || "", version: t[2] || "0"}
            }, n = i(window.navigator.userAgent);
            n.browser && (t[n.browser] = !0, t.version = n.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), e.vakata.browser = t
        }(), e.vakata.browser.msie && 8 > e.vakata.browser.version && (e.jstree.defaults.core.animation = 0);
        var _ = document.createElement("I");
        _.className = "jstree-icon jstree-checkbox", e.jstree.defaults.checkbox = {visible: !0, three_state: !0, whole_node: !0, keep_selected_style: !0}, e.jstree.plugins.checkbox = function (t, i) {
            this.bind = function () {
                i.bind.call(this), this._data.checkbox.uto = !1, this.element.on("init.jstree", e.proxy(function () {
                    this._data.checkbox.visible = this.settings.checkbox.visible, this.settings.checkbox.keep_selected_style || this.element.addClass("jstree-checkbox-no-clicked")
                }, this)).on("loading.jstree", e.proxy(function () {
                    this[this._data.checkbox.visible ? "show_checkboxes" : "hide_checkboxes"]()
                }, this)), this.settings.checkbox.three_state && this.element.on("changed.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree", e.proxy(function () {
                    this._data.checkbox.uto && clearTimeout(this._data.checkbox.uto), this._data.checkbox.uto = setTimeout(e.proxy(this._undetermined, this), 50)
                }, this)).on("model.jstree", e.proxy(function (t, i) {
                    var n = this._model.data, r = n[i.parent], s = i.nodes, a = [], o, d, l, c, h, _;
                    if (r.state.selected) {
                        for (d = 0, l = s.length; l > d; d++)n[s[d]].state.selected = !0;
                        this._data.core.selected = this._data.core.selected.concat(s)
                    } else for (d = 0, l = s.length; l > d; d++)if (n[s[d]].state.selected) {
                        for (c = 0, h = n[s[d]].children_d.length; h > c; c++)n[n[s[d]].children_d[c]].state.selected = !0;
                        this._data.core.selected = this._data.core.selected.concat(n[s[d]].children_d)
                    }
                    for (d = 0, l = r.children_d.length; l > d; d++)n[r.children_d[d]].children.length || a.push(n[r.children_d[d]].parent);
                    for (a = e.vakata.array_unique(a), c = 0, h = a.length; h > c; c++) {
                        r = n[a[c]];
                        while (r && "#" !== r.id) {
                            for (o = 0, d = 0, l = r.children.length; l > d; d++)o += n[r.children[d]].state.selected;
                            if (o !== l)break;
                            r.state.selected = !0, this._data.core.selected.push(r.id), _ = this.get_node(r, !0), _ && _.length && _.children(".jstree-anchor").addClass("jstree-clicked"), r = this.get_node(r.parent)
                        }
                    }
                    this._data.core.selected = e.vakata.array_unique(this._data.core.selected)
                }, this)).on("select_node.jstree", e.proxy(function (t, i) {
                    var n = i.node, r = this._model.data, s = this.get_node(n.parent), a = this.get_node(n, !0), o, d, l, c;
                    for (this._data.core.selected = e.vakata.array_unique(this._data.core.selected.concat(n.children_d)), o = 0, d = n.children_d.length; d > o; o++)c = r[n.children_d[o]], c.state.selected = !0, c && c.original && c.original.state && c.original.state.undetermined && (c.original.state.undetermined = !1);
                    while (s && "#" !== s.id) {
                        for (l = 0, o = 0, d = s.children.length; d > o; o++)l += r[s.children[o]].state.selected;
                        if (l !== d)break;
                        s.state.selected = !0, this._data.core.selected.push(s.id), c = this.get_node(s, !0), c && c.length && c.children(".jstree-anchor").addClass("jstree-clicked"), s = this.get_node(s.parent)
                    }
                    a.length && a.find(".jstree-anchor").addClass("jstree-clicked")
                }, this)).on("deselect_all.jstree", e.proxy(function (e, t) {
                    var i = this.get_node("#"), n = this._model.data, r, s, a;
                    for (r = 0, s = i.children_d.length; s > r; r++)a = n[i.children_d[r]], a && a.original && a.original.state && a.original.state.undetermined && (a.original.state.undetermined = !1)
                }, this)).on("deselect_node.jstree", e.proxy(function (t, i) {
                    var n = i.node, r = this.get_node(n, !0), s, a, o;
                    for (n && n.original && n.original.state && n.original.state.undetermined && (n.original.state.undetermined = !1), s = 0, a = n.children_d.length; a > s; s++)o = this._model.data[n.children_d[s]], o.state.selected = !1, o && o.original && o.original.state && o.original.state.undetermined && (o.original.state.undetermined = !1);
                    for (s = 0, a = n.parents.length; a > s; s++)o = this._model.data[n.parents[s]], o.state.selected = !1, o && o.original && o.original.state && o.original.state.undetermined && (o.original.state.undetermined = !1), o = this.get_node(n.parents[s], !0), o && o.length && o.children(".jstree-anchor").removeClass("jstree-clicked");
                    for (o = [], s = 0, a = this._data.core.selected.length; a > s; s++)-1 === e.inArray(this._data.core.selected[s], n.children_d) && -1 === e.inArray(this._data.core.selected[s], n.parents) && o.push(this._data.core.selected[s]);
                    this._data.core.selected = e.vakata.array_unique(o), r.length && r.find(".jstree-anchor").removeClass("jstree-clicked")
                }, this)).on("delete_node.jstree", e.proxy(function (e, t) {
                    var i = this.get_node(t.parent), n = this._model.data, r, s, a, o;
                    while (i && "#" !== i.id) {
                        for (a = 0, r = 0, s = i.children.length; s > r; r++)a += n[i.children[r]].state.selected;
                        if (a !== s)break;
                        i.state.selected = !0, this._data.core.selected.push(i.id), o = this.get_node(i, !0), o && o.length && o.children(".jstree-anchor").addClass("jstree-clicked"), i = this.get_node(i.parent)
                    }
                }, this)).on("move_node.jstree", e.proxy(function (t, i) {
                    var n = i.is_multi, r = i.old_parent, s = this.get_node(i.parent), a = this._model.data, o, d, l, c, h;
                    if (!n) {
                        o = this.get_node(r);
                        while (o && "#" !== o.id) {
                            for (d = 0, l = 0, c = o.children.length; c > l; l++)d += a[o.children[l]].state.selected;
                            if (d !== c)break;
                            o.state.selected = !0, this._data.core.selected.push(o.id), h = this.get_node(o, !0), h && h.length && h.children(".jstree-anchor").addClass("jstree-clicked"), o = this.get_node(o.parent)
                        }
                    }
                    o = s;
                    while (o && "#" !== o.id) {
                        for (d = 0, l = 0, c = o.children.length; c > l; l++)d += a[o.children[l]].state.selected;
                        if (d === c)o.state.selected || (o.state.selected = !0, this._data.core.selected.push(o.id), h = this.get_node(o, !0), h && h.length && h.children(".jstree-anchor").addClass("jstree-clicked")); else {
                            if (!o.state.selected)break;
                            o.state.selected = !1, this._data.core.selected = e.vakata.array_remove_item(this._data.core.selected, o.id), h = this.get_node(o, !0), h && h.length && h.children(".jstree-anchor").removeClass("jstree-clicked")
                        }
                        o = this.get_node(o.parent)
                    }
                }, this))
            }, this._undetermined = function () {
                var t, i, n = this._model.data, r = this._data.core.selected, s = [], a = this;
                for (t = 0, i = r.length; i > t; t++)n[r[t]] && n[r[t]].parents && (s = s.concat(n[r[t]].parents));
                for (this.element.find(".jstree-closed").not(":has(ul)").each(function () {
                    var e = a.get_node(this), r;
                    if (e.state.loaded)for (t = 0, i = e.children_d.length; i > t; t++)r = n[e.children_d[t]], !r.state.loaded && r.original && r.original.state && r.original.state.undetermined && r.original.state.undetermined === !0 && (s.push(r.id), s = s.concat(r.parents)); else e.original && e.original.state && e.original.state.undetermined && e.original.state.undetermined === !0 && (s.push(e.id), s = s.concat(e.parents))
                }), s = e.vakata.array_unique(s), s = e.vakata.array_remove_item(s, "#"), this.element.find(".jstree-undetermined").removeClass("jstree-undetermined"), t = 0, i = s.length; i > t; t++)n[s[t]].state.selected || (r = this.get_node(s[t], !0), r && r.length && r.children("a").children(".jstree-checkbox").addClass("jstree-undetermined"))
            }, this.redraw_node = function (t, n, r) {
                if (t = i.redraw_node.call(this, t, n, r)) {
                    var s = t.getElementsByTagName("A")[0];
                    s.insertBefore(_.cloneNode(!1), s.childNodes[0])
                }
                return!r && this.settings.checkbox.three_state && (this._data.checkbox.uto && clearTimeout(this._data.checkbox.uto), this._data.checkbox.uto = setTimeout(e.proxy(this._undetermined, this), 50)), t
            }, this.activate_node = function (t, n) {
                return(this.settings.checkbox.whole_node || e(n.target).hasClass("jstree-checkbox")) && (n.ctrlKey = !0), i.activate_node.call(this, t, n)
            }, this.show_checkboxes = function () {
                this._data.core.themes.checkboxes = !0, this.element.children("ul").removeClass("jstree-no-checkboxes")
            }, this.hide_checkboxes = function () {
                this._data.core.themes.checkboxes = !1, this.element.children("ul").addClass("jstree-no-checkboxes")
            }, this.toggle_checkboxes = function () {
                this._data.core.themes.checkboxes ? this.hide_checkboxes() : this.show_checkboxes()
            }
        }, e.jstree.defaults.contextmenu = {select_node: !0, show_at_node: !0, items: function (t, i) {
            return{create: {separator_before: !1, separator_after: !0, _disabled: !1, label: "Create", action: function (t) {
                var i = e.jstree.reference(t.reference), n = i.get_node(t.reference);
                i.create_node(n, {}, "last", function (e) {
                    setTimeout(function () {
                        i.edit(e)
                    }, 0)
                })
            }}, rename: {separator_before: !1, separator_after: !1, _disabled: !1, label: "Rename", action: function (t) {
                var i = e.jstree.reference(t.reference), n = i.get_node(t.reference);
                i.edit(n)
            }}, remove: {separator_before: !1, icon: !1, separator_after: !1, _disabled: !1, label: "Delete", action: function (t) {
                var i = e.jstree.reference(t.reference), n = i.get_node(t.reference);
                i.is_selected(n) ? i.delete_node(i.get_selected()) : i.delete_node(n)
            }}, ccp: {separator_before: !0, icon: !1, separator_after: !1, label: "Edit", action: !1, submenu: {cut: {separator_before: !1, separator_after: !1, label: "Cut", action: function (t) {
                var i = e.jstree.reference(t.reference), n = i.get_node(t.reference);
                i.is_selected(n) ? i.cut(i.get_selected()) : i.cut(n)
            }}, copy: {separator_before: !1, icon: !1, separator_after: !1, label: "Copy", action: function (t) {
                var i = e.jstree.reference(t.reference), n = i.get_node(t.reference);
                i.is_selected(n) ? i.copy(i.get_selected()) : i.copy(n)
            }}, paste: {separator_before: !1, icon: !1, _disabled: function (t) {
                return!e.jstree.reference(t.reference).can_paste()
            }, separator_after: !1, label: "Paste", action: function (t) {
                var i = e.jstree.reference(t.reference), n = i.get_node(t.reference);
                i.paste(n)
            }}}}}
        }}, e.jstree.plugins.contextmenu = function (i, n) {
            this.bind = function () {
                n.bind.call(this);
                var t = 0;
                this.element.on("contextmenu.jstree", ".jstree-anchor", e.proxy(function (e) {
                    e.preventDefault(), t = e.ctrlKey ? e.timeStamp : 0, this.is_loading(e.currentTarget) || this.show_contextmenu(e.currentTarget, e.pageX, e.pageY, e)
                }, this)).on("click.jstree", ".jstree-anchor", e.proxy(function (i) {
                    this._data.contextmenu.visible && (!t || i.timeStamp - t > 250) && e.vakata.context.hide()
                }, this)), e(document).on("context_hide.vakata", e.proxy(function () {
                    this._data.contextmenu.visible = !1
                }, this))
            }, this.teardown = function () {
                this._data.contextmenu.visible && e.vakata.context.hide(), n.teardown.call(this)
            }, this.show_contextmenu = function (i, n, r, s) {
                if (i = this.get_node(i), !i || "#" === i.id)return!1;
                var a = this.settings.contextmenu, o = this.get_node(i, !0), d = o.children(".jstree-anchor"), l = !1, c = !1;
                (a.show_at_node || n === t || r === t) && (l = d.offset(), n = l.left, r = l.top + this._data.core.li_height), this.settings.contextmenu.select_node && !this.is_selected(i) && (this.deselect_all(), this.select_node(i, !1, !1, s)), c = a.items, e.isFunction(c) && (c = c.call(this, i, e.proxy(function (e) {
                    this._show_contextmenu(i, n, r, e)
                }, this))), e.isPlainObject(c) && this._show_contextmenu(i, n, r, c)
            }, this._show_contextmenu = function (t, i, n, r) {
                var s = this.get_node(t, !0), a = s.children(".jstree-anchor");
                e(document).one("context_show.vakata", e.proxy(function (t, i) {
                    var n = "jstree-contextmenu jstree-" + this.get_theme() + "-contextmenu";
                    e(i.element).addClass(n)
                }, this)), this._data.contextmenu.visible = !0, e.vakata.context.show(a, {x: i, y: n}, r), this.trigger("show_contextmenu", {node: t, x: i, y: n})
            }
        }, function (e) {
            var i = !1, n = {element: !1, reference: !1, position_x: 0, position_y: 0, items: [], html: "", is_visible: !1};
            e.vakata.context = {settings: {hide_onmouseleave: 0, icons: !0}, _trigger: function (t) {
                e(document).triggerHandler("context_" + t + ".vakata", {reference: n.reference, element: n.element, position: {x: n.position_x, y: n.position_y}})
            }, _execute: function (t) {
                return t = n.items[t], t && (!t._disabled || e.isFunction(t._disabled) && !t._disabled({item: t, reference: n.reference, element: n.element})) && t.action ? t.action.call(null, {item: t, reference: n.reference, element: n.element, position: {x: n.position_x, y: n.position_y}}) : !1
            }, _parse: function (i, r) {
                if (!i)return!1;
                r || (n.html = "", n.items = []);
                var s = "", a = !1, o;
                return r && (s += "<ul>"), e.each(i, function (i, r) {
                    return r ? (n.items.push(r), !a && r.separator_before && (s += "<li class='vakata-context-separator'><a href='#' " + (e.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>"), a = !1, s += "<li class='" + (r._class || "") + (r._disabled === !0 || e.isFunction(r._disabled) && r._disabled({item: r, reference: n.reference, element: n.element}) ? " vakata-contextmenu-disabled " : "") + "' " + (r.shortcut ? " data-shortcut='" + r.shortcut + "' " : "") + ">", s += "<a href='#' rel='" + (n.items.length - 1) + "'>", e.vakata.context.settings.icons && (s += "<i ", r.icon && (s += -1 !== r.icon.indexOf("/") || -1 !== r.icon.indexOf(".") ? " style='background:url(\"" + r.icon + "\") center center no-repeat' " : " class='" + r.icon + "' "), s += "></i><span class='vakata-contextmenu-sep'>&#160;</span>"), s += (e.isFunction(r.label) ? r.label({item: i, reference: n.reference, element: n.element}) : r.label) + (r.shortcut ? ' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-' + r.shortcut + '">' + (r.shortcut_label || "") + "</span>" : "") + "<" + "/a>", r.submenu && (o = e.vakata.context._parse(r.submenu, !0), o && (s += o)), s += "</li>", r.separator_after && (s += "<li class='vakata-context-separator'><a href='#' " + (e.vakata.context.settings.icons ? "" : 'style="margin-left:0px;"') + ">&#160;<" + "/a><" + "/li>", a = !0), t) : !0
                }), s = s.replace(/<li class\='vakata-context-separator'\><\/li\>$/, ""), r && (s += "</ul>"), r || (n.html = s, e.vakata.context._trigger("parse")), s.length > 10 ? s : !1
            }, _show_submenu: function (t) {
                if (t = e(t), t.length && t.children("ul").length) {
                    var n = t.children("ul"), r = t.offset().left + t.outerWidth(), s = t.offset().top, a = n.width(), o = n.height(), d = e(window).width() + e(window).scrollLeft(), l = e(window).height() + e(window).scrollTop();
                    i ? t[0 > r - (a + 10 + t.outerWidth()) ? "addClass" : "removeClass"]("vakata-context-left") : t[r + a + 10 > d ? "addClass" : "removeClass"]("vakata-context-right"), s + o + 10 > l && n.css("bottom", "-1px"), n.show()
                }
            }, show: function (t, r, s) {
                var a, o, d, l, c, h, _, u, g = !0;
                switch (n.element && n.element.length && n.element.width(""), g) {
                    case!r && !t:
                        return!1;
                    case!!r && !!t:
                        n.reference = t, n.position_x = r.x, n.position_y = r.y;
                        break;
                    case!r && !!t:
                        n.reference = t, a = t.offset(), n.position_x = a.left + t.outerHeight(), n.position_y = a.top;
                        break;
                    case!!r && !t:
                        n.position_x = r.x, n.position_y = r.y
                }
                t && !s && e(t).data("vakata_contextmenu") && (s = e(t).data("vakata_contextmenu")), e.vakata.context._parse(s) && n.element.html(n.html), n.items.length && (o = n.element, d = n.position_x, l = n.position_y, c = o.width(), h = o.height(), _ = e(window).width() + e(window).scrollLeft(), u = e(window).height() + e(window).scrollTop(), i && (d -= o.outerWidth(), e(window).scrollLeft() + 20 > d && (d = e(window).scrollLeft() + 20)), d + c + 20 > _ && (d = _ - (c + 20)), l + h + 20 > u && (l = u - (h + 20)), n.element.css({left: d, top: l}).show().find("a:eq(0)").focus().parent().addClass("vakata-context-hover"), n.is_visible = !0, e.vakata.context._trigger("show"))
            }, hide: function () {
                n.is_visible && (n.element.hide().find("ul").hide().end().find(":focus").blur(), n.is_visible = !1, e.vakata.context._trigger("hide"))
            }}, e(function () {
                i = "rtl" === e("body").css("direction");
                var t = !1;
                n.element = e("<ul class='vakata-context'></ul>"), n.element.on("mouseenter", "li",function (i) {
                    i.stopImmediatePropagation(), e.contains(this, i.relatedTarget) || (t && clearTimeout(t), n.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end(), e(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover"), e.vakata.context._show_submenu(this))
                }).on("mouseleave", "li",function (t) {
                    e.contains(this, t.relatedTarget) || e(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")
                }).on("mouseleave",function (i) {
                    e(this).find(".vakata-context-hover").removeClass("vakata-context-hover"), e.vakata.context.settings.hide_onmouseleave && (t = setTimeout(function (t) {
                        return function () {
                            e.vakata.context.hide()
                        }
                    }(this), e.vakata.context.settings.hide_onmouseleave))
                }).on("click", "a",function (e) {
                    e.preventDefault()
                }).on("mouseup", "a",function (t) {
                    e(this).blur().parent().hasClass("vakata-context-disabled") || e.vakata.context._execute(e(this).attr("rel")) === !1 || e.vakata.context.hide()
                }).on("keydown", "a",function (t) {
                    var i = null;
                    switch (t.which) {
                        case 13:
                        case 32:
                            t.type = "mouseup", t.preventDefault(), e(t.currentTarget).trigger(t);
                            break;
                        case 37:
                            n.is_visible && (n.element.find(".vakata-context-hover").last().parents("li:eq(0)").find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 38:
                            n.is_visible && (i = n.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first(), i.length || (i = n.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()), i.addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 39:
                            n.is_visible && (n.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 40:
                            n.is_visible && (i = n.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first(), i.length || (i = n.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()), i.addClass("vakata-context-hover").children("a").focus(), t.stopImmediatePropagation(), t.preventDefault());
                            break;
                        case 27:
                            e.vakata.context.hide(), t.preventDefault();
                            break;
                        default:
                    }
                }).on("keydown",function (e) {
                    e.preventDefault();
                    var t = n.element.find(".vakata-contextmenu-shortcut-" + e.which).parent();
                    t.parent().not(".vakata-context-disabled") && t.mouseup()
                }).appendTo("body"), e(document).on("mousedown",function (t) {
                    n.is_visible && !e.contains(n.element[0], t.target) && e.vakata.context.hide()
                }).on("context_show.vakata", function (e, t) {
                    n.element.find("li:has(ul)").children("a").addClass("vakata-context-parent"), i && n.element.addClass("vakata-context-rtl").css("direction", "rtl"), n.element.find("ul").hide().end()
                })
            })
        }(e), e.jstree.defaults.dnd = {copy: !0, open_timeout: 500, is_draggable: !0, check_while_dragging: !0, always_copy: !1}, e.jstree.plugins.dnd = function (i, n) {
            this.bind = function () {
                n.bind.call(this), this.element.on("mousedown.jstree touchstart.jstree", ".jstree-anchor", e.proxy(function (i) {
                    var n = this.get_node(i.target), r = this.is_selected(n) ? this.get_selected().length : 1;
                    return n && n.id && "#" !== n.id && (1 === i.which || "touchstart" === i.type) && (this.settings.dnd.is_draggable === !0 || e.isFunction(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, r > 1 ? this.get_selected(!0) : [n])) ? (this.element.trigger("mousedown.jstree"), e.vakata.dnd.start(i, {jstree: !0, origin: this, obj: this.get_node(n, !0), nodes: r > 1 ? this.get_selected() : [n.id]}, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + '"><i class="jstree-icon jstree-er"></i>' + (r > 1 ? r + " " + this.get_string("nodes") : this.get_text(i.currentTarget, !0)) + '<ins class="jstree-copy" style="display:none;">+</ins></div>')) : t
                }, this))
            }
        }, e(function () {
            var i = !1, n = !1, r = !1, s = e('<div id="jstree-marker">&#160;</div>').hide().appendTo("body");
            e(document).bind("dnd_start.vakata",function (e, t) {
                i = !1
            }).bind("dnd_move.vakata",function (a, o) {
                if (r && clearTimeout(r), o.data.jstree && (!o.event.target.id || "jstree-marker" !== o.event.target.id)) {
                    var d = e.jstree.reference(o.event.target), l = !1, c = !1, h = !1, _, u, g, f, p, m, v, y, j, x, k, b;
                    if (d && d._data && d._data.dnd)if (s.attr("class", "jstree-" + d.get_theme()), o.helper.children().attr("class", "jstree-" + d.get_theme()).find(".jstree-copy:eq(0)")[o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey)) ? "show" : "hide"](), o.event.target !== d.element[0] && o.event.target !== d.get_container_ul()[0] || 0 !== d.get_container_ul().children().length) {
                        if (l = e(o.event.target).closest("a"), l && l.length && l.parent().is(".jstree-closed, .jstree-open, .jstree-leaf") && (c = l.offset(), h = o.event.pageY - c.top, g = l.height(), m = g / 3 > h ? ["b", "i", "a"] : h > g - g / 3 ? ["a", "i", "b"] : h > g / 2 ? ["i", "a", "b"] : ["i", "b", "a"], e.each(m, function (a, h) {
                            switch (h) {
                                case"b":
                                    _ = c.left - 6, u = c.top - 5, f = d.get_parent(l), p = l.parent().index();
                                    break;
                                case"i":
                                    _ = c.left - 2, u = c.top - 5 + g / 2 + 1, f = d.get_node(l.parent()).id, p = 0;
                                    break;
                                case"a":
                                    _ = c.left - 6, u = c.top - 5 + g, f = d.get_parent(l), p = l.parent().index() + 1
                            }
                            for (v = !0, y = 0, j = o.data.nodes.length; j > y; y++)if (x = o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey)) ? "copy_node" : "move_node", k = p, "move_node" === x && "a" === h && o.data.origin && o.data.origin === d && f === d.get_parent(o.data.nodes[y]) && (b = d.get_node(f), k > e.inArray(o.data.nodes[y], b.children) && (k -= 1)), v = v && (d && d.settings && d.settings.dnd && d.settings.dnd.check_while_dragging === !1 || d.check(x, o.data.origin && o.data.origin !== d ? o.data.origin.get_node(o.data.nodes[y]) : o.data.nodes[y], f, k, {dnd: !0, ref: d.get_node(l.parent()), pos: h, is_multi: o.data.origin && o.data.origin !== d, is_foreign: !o.data.origin})), !v) {
                                d && d.last_error && (n = d.last_error());
                                break
                            }
                            return v ? ("i" === h && l.parent().is(".jstree-closed") && d.settings.dnd.open_timeout && (r = setTimeout(function (e, t) {
                                return function () {
                                    e.open_node(t)
                                }
                            }(d, l), d.settings.dnd.open_timeout)), i = {ins: d, par: f, pos: p}, s.css({left: _ + "px", top: u + "px"}).show(), o.helper.find(".jstree-icon:eq(0)").removeClass("jstree-er").addClass("jstree-ok"), n = {}, m = !0, !1) : t
                        }), m === !0))return
                    } else {
                        for (v = !0, y = 0, j = o.data.nodes.length; j > y; y++)if (v = v && d.check(o.data.origin && (o.data.origin.settings.dnd.always_copy || o.data.origin.settings.dnd.copy && (o.event.metaKey || o.event.ctrlKey)) ? "copy_node" : "move_node", o.data.origin && o.data.origin !== d ? o.data.origin.get_node(o.data.nodes[y]) : o.data.nodes[y], "#", "last", {dnd: !0, ref: d.get_node("#"), pos: "i", is_multi: o.data.origin && o.data.origin !== d, is_foreign: !o.data.origin}), !v)break;
                        if (v)return i = {ins: d, par: "#", pos: "last"}, s.hide(), o.helper.find(".jstree-icon:eq(0)").removeClass("jstree-er").addClass("jstree-ok"), t
                    }
                    i = !1, o.helper.find(".jstree-icon").removeClass("jstree-ok").addClass("jstree-er"), s.hide()
                }
            }).bind("dnd_scroll.vakata",function (e, t) {
                t.data.jstree && (s.hide(), i = !1, t.helper.find(".jstree-icon:eq(0)").removeClass("jstree-ok").addClass("jstree-er"))
            }).bind("dnd_stop.vakata",function (t, a) {
                if (r && clearTimeout(r), a.data.jstree) {
                    s.hide();
                    var o, d, l = [];
                    if (i) {
                        for (o = 0, d = a.data.nodes.length; d > o; o++)l[o] = a.data.origin ? a.data.origin.get_node(a.data.nodes[o]) : a.data.nodes[o], a.data.origin && (l[o].instance = a.data.origin);
                        i.ins[a.data.origin && (a.data.origin.settings.dnd.always_copy || a.data.origin.settings.dnd.copy && (a.event.metaKey || a.event.ctrlKey)) ? "copy_node" : "move_node"](l, i.par, i.pos)
                    } else o = e(a.event.target).closest(".jstree"), o.length && n && n.error && "check" === n.error && (o = o.jstree(!0), o && o.settings.core.error.call(this, n))
                }
            }).bind("keyup keydown", function (t, i) {
                i = e.vakata.dnd._get(), i.data && i.data.jstree && i.helper.find(".jstree-copy:eq(0)")[i.data.origin && (i.data.origin.settings.dnd.always_copy || i.data.origin.settings.dnd.copy && (t.metaKey || t.ctrlKey)) ? "show" : "hide"]()
            })
        }), function (e) {
            var i = {element: !1, is_down: !1, is_drag: !1, helper: !1, helper_w: 0, data: !1, init_x: 0, init_y: 0, scroll_l: 0, scroll_t: 0, scroll_e: !1, scroll_i: !1};
            e.vakata.dnd = {settings: {scroll_speed: 10, scroll_proximity: 20, helper_left: 5, helper_top: 10, threshold: 5}, _trigger: function (t, i) {
                var n = e.vakata.dnd._get();
                n.event = i, e(document).triggerHandler("dnd_" + t + ".vakata", n)
            }, _get: function () {
                return{data: i.data, element: i.element, helper: i.helper}
            }, _clean: function () {
                i.helper && i.helper.remove(), i.scroll_i && (clearInterval(i.scroll_i), i.scroll_i = !1), i = {element: !1, is_down: !1, is_drag: !1, helper: !1, helper_w: 0, data: !1, init_x: 0, init_y: 0, scroll_l: 0, scroll_t: 0, scroll_e: !1, scroll_i: !1}, e(document).off("mousemove touchmove", e.vakata.dnd.drag), e(document).off("mouseup touchend", e.vakata.dnd.stop)
            }, _scroll: function (t) {
                if (!i.scroll_e || !i.scroll_l && !i.scroll_t)return i.scroll_i && (clearInterval(i.scroll_i), i.scroll_i = !1), !1;
                if (!i.scroll_i)return i.scroll_i = setInterval(e.vakata.dnd._scroll, 100), !1;
                if (t === !0)return!1;
                var n = i.scroll_e.scrollTop(), r = i.scroll_e.scrollLeft();
                i.scroll_e.scrollTop(n + i.scroll_t * e.vakata.dnd.settings.scroll_speed), i.scroll_e.scrollLeft(r + i.scroll_l * e.vakata.dnd.settings.scroll_speed), (n !== i.scroll_e.scrollTop() || r !== i.scroll_e.scrollLeft()) && e.vakata.dnd._trigger("scroll", i.scroll_e)
            }, start: function (t, n, r) {
                "touchstart" === t.type && t.originalEvent && t.originalEvent.changedTouches && t.originalEvent.changedTouches[0] && (t.pageX = t.originalEvent.changedTouches[0].pageX, t.pageY = t.originalEvent.changedTouches[0].pageY, t.target = document.elementFromPoint(t.originalEvent.changedTouches[0].pageX - window.pageXOffset, t.originalEvent.changedTouches[0].pageY - window.pageYOffset)), i.is_drag && e.vakata.dnd.stop({});
                try {
                    t.currentTarget.unselectable = "on", t.currentTarget.onselectstart = function () {
                        return!1
                    }, t.currentTarget.style && (t.currentTarget.style.MozUserSelect = "none")
                } catch (s) {
                }
                return i.init_x = t.pageX, i.init_y = t.pageY, i.data = n, i.is_down = !0, i.element = t.currentTarget, r !== !1 && (i.helper = e("<div id='vakata-dnd'></div>").html(r).css({display: "block", margin: "0", padding: "0", position: "absolute", top: "-2000px", lineHeight: "16px", zIndex: "10000"})), e(document).bind("mousemove touchmove", e.vakata.dnd.drag), e(document).bind("mouseup touchend", e.vakata.dnd.stop), !1
            }, drag: function (n) {
                if ("touchmove" === n.type && n.originalEvent && n.originalEvent.changedTouches && n.originalEvent.changedTouches[0] && (n.pageX = n.originalEvent.changedTouches[0].pageX, n.pageY = n.originalEvent.changedTouches[0].pageY, n.target = document.elementFromPoint(n.originalEvent.changedTouches[0].pageX - window.pageXOffset, n.originalEvent.changedTouches[0].pageY - window.pageYOffset)), i.is_down) {
                    if (!i.is_drag) {
                        if (!(Math.abs(n.pageX - i.init_x) > e.vakata.dnd.settings.threshold || Math.abs(n.pageY - i.init_y) > e.vakata.dnd.settings.threshold))return;
                        i.helper && (i.helper.appendTo("body"), i.helper_w = i.helper.outerWidth()), i.is_drag = !0, e.vakata.dnd._trigger("start", n)
                    }
                    var r = !1, s = !1, a = !1, o = !1, d = !1, l = !1, c = !1, h = !1, _ = !1, u = !1;
                    i.scroll_t = 0, i.scroll_l = 0, i.scroll_e = !1, e(e(n.target).parentsUntil("body").addBack().get().reverse()).filter(function () {
                        return/^auto|scroll$/.test(e(this).css("overflow")) && (this.scrollHeight > this.offsetHeight || this.scrollWidth > this.offsetWidth)
                    }).each(function () {
                        var r = e(this), s = r.offset();
                        return this.scrollHeight > this.offsetHeight && (s.top + r.height() - n.pageY < e.vakata.dnd.settings.scroll_proximity && (i.scroll_t = 1), n.pageY - s.top < e.vakata.dnd.settings.scroll_proximity && (i.scroll_t = -1)), this.scrollWidth > this.offsetWidth && (s.left + r.width() - n.pageX < e.vakata.dnd.settings.scroll_proximity && (i.scroll_l = 1), n.pageX - s.left < e.vakata.dnd.settings.scroll_proximity && (i.scroll_l = -1)), i.scroll_t || i.scroll_l ? (i.scroll_e = e(this), !1) : t
                    }), i.scroll_e || (r = e(document), s = e(window), a = r.height(), o = s.height(), d = r.width(), l = s.width(), c = r.scrollTop(), h = r.scrollLeft(), a > o && n.pageY - c < e.vakata.dnd.settings.scroll_proximity && (i.scroll_t = -1), a > o && o - (n.pageY - c) < e.vakata.dnd.settings.scroll_proximity && (i.scroll_t = 1), d > l && n.pageX - h < e.vakata.dnd.settings.scroll_proximity && (i.scroll_l = -1), d > l && l - (n.pageX - h) < e.vakata.dnd.settings.scroll_proximity && (i.scroll_l = 1), (i.scroll_t || i.scroll_l) && (i.scroll_e = r)), i.scroll_e && e.vakata.dnd._scroll(!0), i.helper && (_ = parseInt(n.pageY + e.vakata.dnd.settings.helper_top, 10), u = parseInt(n.pageX + e.vakata.dnd.settings.helper_left, 10), a && _ + 25 > a && (_ = a - 50), d && u + i.helper_w > d && (u = d - (i.helper_w + 2)), i.helper.css({left: u + "px", top: _ + "px"})), e.vakata.dnd._trigger("move", n)
                }
            }, stop: function (t) {
                "touchend" === t.type && t.originalEvent && t.originalEvent.changedTouches && t.originalEvent.changedTouches[0] && (t.pageX = t.originalEvent.changedTouches[0].pageX, t.pageY = t.originalEvent.changedTouches[0].pageY, t.target = document.elementFromPoint(t.originalEvent.changedTouches[0].pageX - window.pageXOffset, t.originalEvent.changedTouches[0].pageY - window.pageYOffset)), i.is_drag && e.vakata.dnd._trigger("stop", t), e.vakata.dnd._clean()
            }}
        }(jQuery), e.jstree.defaults.search = {ajax: !1, fuzzy: !0, case_sensitive: !1, show_only_matches: !1, close_opened_onclear: !0, search_leaves_only: !1}, e.jstree.plugins.search = function (t, i) {
            this.bind = function () {
                i.bind.call(this), this._data.search.str = "", this._data.search.dom = e(), this._data.search.res = [], this._data.search.opn = [], this.element.on("before_open.jstree", e.proxy(function (t, i) {
                    var n, r, s, a = this._data.search.res, o = [], d = e();
                    if (a && a.length) {
                        for (this._data.search.dom = e(), n = 0, r = a.length; r > n; n++)o = o.concat(this.get_node(a[n]).parents), s = this.get_node(a[n], !0), s && (this._data.search.dom = this._data.search.dom.add(s));
                        for (o = e.vakata.array_unique(o), n = 0, r = o.length; r > n; n++)"#" !== o[n] && (s = this.get_node(o[n], !0), s && (d = d.add(s)));
                        this._data.search.dom.children(".jstree-anchor").addClass("jstree-search"), this.settings.search.show_only_matches && this._data.search.res.length && (this.element.find("li").hide().filter(".jstree-last").filter(function () {
                            return this.nextSibling
                        }).removeClass("jstree-last"), d = d.add(this._data.search.dom), d.parentsUntil(".jstree").addBack().show().filter("ul").each(function () {
                            e(this).children("li:visible").eq(-1).addClass("jstree-last")
                        }))
                    }
                }, this)), this.settings.search.show_only_matches && this.element.on("search.jstree",function (t, i) {
                    i.nodes.length && (e(this).find("li").hide().filter(".jstree-last").filter(function () {
                        return this.nextSibling
                    }).removeClass("jstree-last"), i.nodes.parentsUntil(".jstree").addBack().show().filter("ul").each(function () {
                        e(this).children("li:visible").eq(-1).addClass("jstree-last")
                    }))
                }).on("clear_search.jstree", function (t, i) {
                    i.nodes.length && e(this).find("li").css("display", "").filter(".jstree-last").filter(function () {
                        return this.nextSibling
                    }).removeClass("jstree-last")
                })
            }, this.search = function (t, i) {
                if (t === !1 || "" === e.trim(t))return this.clear_search();
                var n = this.settings.search, r = n.ajax ? n.ajax : !1, s = null, a = [], o = [], d, l;
                if (this._data.search.res.length && this.clear_search(), !i && r !== !1)return e.isFunction(r) ? r.call(this, t, e.proxy(function (i) {
                    i && i.d && (i = i.d), this._load_nodes(e.isArray(i) ? i : [], function () {
                        this.search(t, !0)
                    })
                }, this)) : (r = e.extend({}, r), r.data || (r.data = {}), r.data.str = t, e.ajax(r).fail(e.proxy(function () {
                    this._data.core.last_error = {error: "ajax", plugin: "search", id: "search_01", reason: "Could not load search parents", data: JSON.stringify(r)}, this.settings.core.error.call(this, this._data.core.last_error)
                }, this)).done(e.proxy(function (i) {
                    i && i.d && (i = i.d), this._load_nodes(e.isArray(i) ? i : [], function () {
                        this.search(t, !0)
                    })
                }, this)));
                if (this._data.search.str = t, this._data.search.dom = e(), this._data.search.res = [], this._data.search.opn = [], s = new e.vakata.search(t, !0, {caseSensitive: n.case_sensitive, fuzzy: n.fuzzy}), e.each(this._model.data, function (e, t) {
                    t.text && s.search(t.text).isMatch && (!n.search_leaves_only || t.state.loaded && 0 === t.children.length) && (a.push(e), o = o.concat(t.parents))
                }), a.length) {
                    for (o = e.vakata.array_unique(o), this._search_open(o), d = 0, l = a.length; l > d; d++)s = this.get_node(a[d], !0), s && (this._data.search.dom = this._data.search.dom.add(s));
                    this._data.search.res = a, this._data.search.dom.children(".jstree-anchor").addClass("jstree-search")
                }
                this.trigger("search", {nodes: this._data.search.dom, str: t, res: this._data.search.res})
            }, this.clear_search = function () {
                this._data.search.dom.children(".jstree-anchor").removeClass("jstree-search"), this.settings.search.close_opened_onclear && this.close_node(this._data.search.opn, 0), this.trigger("clear_search", {nodes: this._data.search.dom, str: this._data.search.str, res: this._data.search.res}), this._data.search.str = "", this._data.search.res = [], this._data.search.opn = [], this._data.search.dom = e()
            }, this._search_open = function (t) {
                var i = this;
                e.each(t.concat([]), function (n, r) {
                    if ("#" === r)return!0;
                    try {
                        r = e("#" + r.replace(e.jstree.idregex, "\\$&"), i.element)
                    } catch (s) {
                    }
                    r && r.length && i.is_closed(r) && (i._data.search.opn.push(r[0].id), i.open_node(r, function () {
                        i._search_open(t)
                    }, 0))
                })
            }
        }, function (e) {
            e.vakata.search = function (e, t, i) {
                i = i || {}, i.fuzzy !== !1 && (i.fuzzy = !0), e = i.caseSensitive ? e : e.toLowerCase();
                var n = i.location || 0, r = i.distance || 100, s = i.threshold || .6, a = e.length, o, d, l, c;
                return a > 32 && (i.fuzzy = !1), i.fuzzy && (o = 1 << a - 1, d = function () {
                    var t = {}, i = 0;
                    for (i = 0; a > i; i++)t[e.charAt(i)] = 0;
                    for (i = 0; a > i; i++)t[e.charAt(i)] |= 1 << a - i - 1;
                    return t
                }(), l = function (e, t) {
                    var i = e / a, s = Math.abs(n - t);
                    return r ? i + s / r : s ? 1 : i
                }), c = function (t) {
                    if (t = i.caseSensitive ? t : t.toLowerCase(), e === t || -1 !== t.indexOf(e))return{isMatch: !0, score: 0};
                    if (!i.fuzzy)return{isMatch: !1, score: 1};
                    var r, c, h = t.length, _ = s, u = t.indexOf(e, n), g, f, p = a + h, m, v, y, j, x, k = 1, b = [];
                    for (-1 !== u && (_ = Math.min(l(0, u), _), u = t.lastIndexOf(e, n + a), -1 !== u && (_ = Math.min(l(0, u), _))), u = -1, r = 0; a > r; r++) {
                        g = 0, f = p;
                        while (f > g)_ >= l(r, n + f) ? g = f : p = f, f = Math.floor((p - g) / 2 + g);
                        for (p = f, v = Math.max(1, n - f + 1), y = Math.min(n + f, h) + a, j = Array(y + 2), j[y + 1] = (1 << r) - 1, c = y; c >= v; c--)if (x = d[t.charAt(c - 1)], j[c] = 0 === r ? (1 | j[c + 1] << 1) & x : (1 | j[c + 1] << 1) & x | (1 | (m[c + 1] | m[c]) << 1) | m[c + 1], j[c] & o && (k = l(r, c - 1), _ >= k)) {
                            if (_ = k, u = c - 1, b.push(u), !(u > n))break;
                            v = Math.max(1, 2 * n - u)
                        }
                        if (l(r + 1, n) > _)break;
                        m = j
                    }
                    return{isMatch: u >= 0, score: k}
                }, t === !0 ? {search: c} : c(t)
            }
        }(jQuery), e.jstree.defaults.sort = function (e, t) {
            return this.get_text(e) > this.get_text(t) ? 1 : -1
        }, e.jstree.plugins.sort = function (t, i) {
            this.bind = function () {
                i.bind.call(this), this.element.on("model.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent, !0)
                }, this)).on("rename_node.jstree create_node.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent || t.node.parent, !1), this.redraw_node(t.parent || t.node.parent, !0)
                }, this)).on("move_node.jstree copy_node.jstree", e.proxy(function (e, t) {
                    this.sort(t.parent, !1), this.redraw_node(t.parent, !0)
                }, this))
            }, this.sort = function (t, i) {
                var n, r;
                if (t = this.get_node(t), t && t.children && t.children.length && (t.children.sort(e.proxy(this.settings.sort, this)), i))for (n = 0, r = t.children_d.length; r > n; n++)this.sort(t.children_d[n], !1)
            }
        };
        var u = !1;
        e.jstree.defaults.state = {key: "jstree", events: "changed.jstree open_node.jstree close_node.jstree", ttl: !1, filter: !1}, e.jstree.plugins.state = function (t, i) {
            this.bind = function () {
                i.bind.call(this);
                var t = e.proxy(function () {
                    this.element.on(this.settings.state.events, e.proxy(function () {
                        u && clearTimeout(u), u = setTimeout(e.proxy(function () {
                            this.save_state()
                        }, this), 100)
                    }, this))
                }, this);
                this.element.on("ready.jstree", e.proxy(function (e, i) {
                    this.element.one("restore_state.jstree", t), this.restore_state() || t()
                }, this))
            }, this.save_state = function () {
                var t = {state: this.get_state(), ttl: this.settings.state.ttl, sec: +new Date};
                e.vakata.storage.set(this.settings.state.key, JSON.stringify(t))
            }, this.restore_state = function () {
                var t = e.vakata.storage.get(this.settings.state.key);
                if (t)try {
                    t = JSON.parse(t)
                } catch (i) {
                    return!1
                }
                return t && t.ttl && t.sec && +new Date - t.sec > t.ttl ? !1 : (t && t.state && (t = t.state), t && e.isFunction(this.settings.state.filter) && (t = this.settings.state.filter.call(this, t)), t ? (this.element.one("set_state.jstree", function (i, n) {
                    n.instance.trigger("restore_state", {state: e.extend(!0, {}, t)})
                }), this.set_state(t), !0) : !1)
            }, this.clear_state = function () {
                return e.vakata.storage.del(this.settings.state.key)
            }
        }, function (e, t) {
            e.vakata.storage = {set: function (e, t) {
                return window.localStorage.setItem(e, t)
            }, get: function (e) {
                return window.localStorage.getItem(e)
            }, del: function (e) {
                return window.localStorage.removeItem(e)
            }}
        }(jQuery), e.jstree.defaults.types = {"#": {}, "default": {}}, e.jstree.plugins.types = function (i, n) {
            this.init = function (e, i) {
                var r, s;
                if (i && i.types && i.types["default"])for (r in i.types)if ("default" !== r && "#" !== r && i.types.hasOwnProperty(r))for (s in i.types["default"])i.types["default"].hasOwnProperty(s) && i.types[r][s] === t && (i.types[r][s] = i.types["default"][s]);
                n.init.call(this, e, i), this._model.data["#"].type = "#"
            }, this.refresh = function (e) {
                n.refresh.call(this, e), this._model.data["#"].type = "#"
            }, this.bind = function () {
                this.element.on("model.jstree", e.proxy(function (e, i) {
                    var n = this._model.data, r = i.nodes, s = this.settings.types, a, o, d = "default";
                    for (a = 0, o = r.length; o > a; a++)d = "default", n[r[a]].original && n[r[a]].original.type && s[n[r[a]].original.type] && (d = n[r[a]].original.type), n[r[a]].data && n[r[a]].data.jstree && n[r[a]].data.jstree.type && s[n[r[a]].data.jstree.type] && (d = n[r[a]].data.jstree.type), n[r[a]].type = d, n[r[a]].icon === !0 && s[d].icon !== t && (n[r[a]].icon = s[d].icon)
                }, this)), n.bind.call(this)
            }, this.get_json = function (t, i, r) {
                var s, a, o = this._model.data, d = i ? e.extend(!0, {}, i, {no_id: !1}) : {}, l = n.get_json.call(this, t, d, r);
                if (l === !1)return!1;
                if (e.isArray(l))for (s = 0, a = l.length; a > s; s++)l[s].type = l[s].id && o[l[s].id] && o[l[s].id].type ? o[l[s].id].type : "default", i && i.no_id && (delete l[s].id, l[s].li_attr && l[s].li_attr.id && delete l[s].li_attr.id); else l.type = l.id && o[l.id] && o[l.id].type ? o[l.id].type : "default", i && i.no_id && (l = this._delete_ids(l));
                return l
            }, this._delete_ids = function (t) {
                if (e.isArray(t)) {
                    for (var i = 0, n = t.length; n > i; i++)t[i] = this._delete_ids(t[i]);
                    return t
                }
                return delete t.id, t.li_attr && t.li_attr.id && delete t.li_attr.id, t.children && e.isArray(t.children) && (t.children = this._delete_ids(t.children)), t
            }, this.check = function (i, r, s, a, o) {
                if (n.check.call(this, i, r, s, a, o) === !1)return!1;
                r = r && r.id ? r : this.get_node(r), s = s && s.id ? s : this.get_node(s);
                var d = r && r.id ? e.jstree.reference(r.id) : null, l, c, h, _;
                switch (d = d && d._model && d._model.data ? d._model.data : null, i) {
                    case"create_node":
                    case"move_node":
                    case"copy_node":
                        if ("move_node" !== i || -1 === e.inArray(r.id, s.children)) {
                            if (l = this.get_rules(s), l.max_children !== t && -1 !== l.max_children && l.max_children === s.children.length)return this._data.core.last_error = {error: "check", plugin: "types", id: "types_01", reason: "max_children prevents function: " + i, data: JSON.stringify({chk: i, pos: a, obj: r && r.id ? r.id : !1, par: s && s.id ? s.id : !1})}, !1;
                            if (l.valid_children !== t && -1 !== l.valid_children && -1 === e.inArray(r.type, l.valid_children))return this._data.core.last_error = {error: "check", plugin: "types", id: "types_02", reason: "valid_children prevents function: " + i, data: JSON.stringify({chk: i, pos: a, obj: r && r.id ? r.id : !1, par: s && s.id ? s.id : !1})}, !1;
                            if (d && r.children_d && r.parents) {
                                for (c = 0, h = 0, _ = r.children_d.length; _ > h; h++)c = Math.max(c, d[r.children_d[h]].parents.length);
                                c = c - r.parents.length + 1
                            }
                            (0 >= c || c === t) && (c = 1);
                            do {
                                if (l.max_depth !== t && -1 !== l.max_depth && c > l.max_depth)return this._data.core.last_error = {error: "check", plugin: "types", id: "types_03", reason: "max_depth prevents function: " + i, data: JSON.stringify({chk: i, pos: a, obj: r && r.id ? r.id : !1, par: s && s.id ? s.id : !1})}, !1;
                                s = this.get_node(s.parent), l = this.get_rules(s), c++
                            } while (s)
                        }
                }
                return!0
            }, this.get_rules = function (e) {
                if (e = this.get_node(e), !e)return!1;
                var i = this.get_type(e, !0);
                return i.max_depth === t && (i.max_depth = -1), i.max_children === t && (i.max_children = -1), i.valid_children === t && (i.valid_children = -1), i
            }, this.get_type = function (t, i) {
                return t = this.get_node(t), t ? i ? e.extend({type: t.type}, this.settings.types[t.type]) : t.type : !1
            }, this.set_type = function (i, n) {
                var r, s, a, o, d;
                if (e.isArray(i)) {
                    for (i = i.slice(), s = 0, a = i.length; a > s; s++)this.set_type(i[s], n);
                    return!0
                }
                return r = this.settings.types, i = this.get_node(i), r[n] && i ? (o = i.type, d = this.get_icon(i), i.type = n, (d === !0 || r[o] && r[o].icon && d === r[o].icon) && this.set_icon(i, r[n].icon !== t ? r[n].icon : !0), !0) : !1
            }
        }, e.jstree.plugins.unique = function (t, i) {
            this.check = function (t, n, r, s, a) {
                if (i.check.call(this, t, n, r, s, a) === !1)return!1;
                if (n = n && n.id ? n : this.get_node(n), r = r && r.id ? r : this.get_node(r), !r || !r.children)return!0;
                var o = "rename_node" === t ? s : n.text, d = [], l = this._model.data, c, h;
                for (c = 0, h = r.children.length; h > c; c++)d.push(l[r.children[c]].text);
                switch (t) {
                    case"delete_node":
                        return!0;
                    case"rename_node":
                    case"copy_node":
                        return c = -1 === e.inArray(o, d), c || (this._data.core.last_error = {error: "check", plugin: "unique", id: "unique_01", reason: "Child with name " + o + " already exists. Preventing: " + t, data: JSON.stringify({chk: t, pos: s, obj: n && n.id ? n.id : !1, par: r && r.id ? r.id : !1})}), c;
                    case"move_node":
                        return c = n.parent === r.id || -1 === e.inArray(o, d), c || (this._data.core.last_error = {error: "check", plugin: "unique", id: "unique_01", reason: "Child with name " + o + " already exists. Preventing: " + t, data: JSON.stringify({chk: t, pos: s, obj: n && n.id ? n.id : !1, par: r && r.id ? r.id : !1})}), c
                }
                return!0
            }
        };
        var g = document.createElement("DIV");
        g.setAttribute("unselectable", "on"), g.className = "jstree-wholerow", g.innerHTML = "&#160;", e.jstree.plugins.wholerow = function (t, i) {
            this.bind = function () {
                i.bind.call(this), this.element.on("loading", e.proxy(function () {
                    g.style.height = this._data.core.li_height + "px"
                }, this)).on("ready.jstree set_state.jstree", e.proxy(function () {
                    this.hide_dots()
                }, this)).on("ready.jstree", e.proxy(function () {
                    this.get_container_ul().addClass("jstree-wholerow-ul")
                }, this)).on("deselect_all.jstree", e.proxy(function (e, t) {
                    this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked")
                }, this)).on("changed.jstree", e.proxy(function (e, t) {
                    this.element.find(".jstree-wholerow-clicked").removeClass("jstree-wholerow-clicked");
                    var i = !1, n, r;
                    for (n = 0, r = t.selected.length; r > n; n++)i = this.get_node(t.selected[n], !0), i && i.length && i.children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                }, this)).on("open_node.jstree", e.proxy(function (e, t) {
                    this.get_node(t.node, !0).find(".jstree-clicked").parent().children(".jstree-wholerow").addClass("jstree-wholerow-clicked")
                }, this)).on("hover_node.jstree dehover_node.jstree", e.proxy(function (e, t) {
                    this.get_node(t.node, !0).children(".jstree-wholerow")["hover_node" === e.type ? "addClass" : "removeClass"]("jstree-wholerow-hovered")
                }, this)).on("contextmenu.jstree", ".jstree-wholerow", e.proxy(function (t) {
                    t.preventDefault();
                    var i = e.Event("contextmenu", {metaKey: t.metaKey, ctrlKey: t.ctrlKey, altKey: t.altKey, shiftKey: t.shiftKey, pageX: t.pageX, pageY: t.pageY});
                    e(t.currentTarget).closest("li").children("a:eq(0)").trigger(i)
                }, this)).on("click.jstree", ".jstree-wholerow",function (t) {
                    t.stopImmediatePropagation();
                    var i = e.Event("click", {metaKey: t.metaKey, ctrlKey: t.ctrlKey, altKey: t.altKey, shiftKey: t.shiftKey});
                    e(t.currentTarget).closest("li").children("a:eq(0)").trigger(i).focus()
                }).on("click.jstree", ".jstree-leaf > .jstree-ocl", e.proxy(function (t) {
                    t.stopImmediatePropagation();
                    var i = e.Event("click", {metaKey: t.metaKey, ctrlKey: t.ctrlKey, altKey: t.altKey, shiftKey: t.shiftKey});
                    e(t.currentTarget).closest("li").children("a:eq(0)").trigger(i).focus()
                }, this)).on("mouseover.jstree", ".jstree-wholerow, .jstree-icon", e.proxy(function (e) {
                    return e.stopImmediatePropagation(), this.hover_node(e.currentTarget), !1
                }, this)).on("mouseleave.jstree", ".jstree-node", e.proxy(function (e) {
                    this.dehover_node(e.currentTarget)
                }, this))
            }, this.teardown = function () {
                this.settings.wholerow && this.element.find(".jstree-wholerow").remove(), i.teardown.call(this)
            }, this.redraw_node = function (t, n, r) {
                if (t = i.redraw_node.call(this, t, n, r)) {
                    var s = g.cloneNode(!0);
                    -1 !== e.inArray(t.id, this._data.core.selected) && (s.className += " jstree-wholerow-clicked"), t.insertBefore(s, t.childNodes[0])
                }
                return t
            }
        }
    }
});