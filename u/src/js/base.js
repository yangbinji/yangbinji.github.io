(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (global.Yang = factory());
}(this, (function () {
    'use strict';

    var Yang = {
        version: "0.1.0",
        createdDate: "2018/6/16",
        lastModified: document.lastModified
    }

    if (localStorage.getItem("whatTab") === null) {
        localStorage.setItem("whatTab", "tab1");
    }
    if (localStorage.getItem("decimal") === null) {
        localStorage.setItem("decimal", "");
    }
    var decimal = localStorage.getItem("decimal");

    function initHexData(h) {
        return decimal.trim() === "" ? "" : (+decimal).toString(h);
    }
    var app = new Vue({
        el: "#app",
        data: {
            decimal: decimal,
            binary: initHexData(2),
            octal: initHexData(8),
            hex: initHexData(16).toUpperCase()
        },
        watch: {
            decimal: function () {
                this.binary = this.decimal.toString(2);
                this.octal = this.decimal.toString(8);
                this.hex = this.decimal.toString(16).toUpperCase();
                localStorage.setItem("decimal", app.decimal);
            },
            binary: function () {
                this.toDecimal(this.binary, 2);
            },
            octal: function () {
                this.toDecimal(this.octal, 8);
            },
            hex: function () {
                this.toDecimal(this.hex, 16);
            }
        },
        methods: {
            preExp: function (regex) {
                // this.octal = this.octal.replace(/[^-0-7+]+/g, "");
                regex.test(char) ? e.preventDefault() : 0;
            },
            exp: function (e) {
                var t = e.target;
                var char = String.fromCharCode(e.charCode);

                function preExp(regex) {
                    regex.test(char) ? e.preventDefault() : 0;
                }
                switch (t.id) {
                    case "binary":
                        preExp(/[^-01+]+/);
                        break;
                    case "octal":
                        preExp(/[^-0-7+]+/);
                    case "hex":
                        preExp(/[^-0-9a-f+]+/i);
                        break;
                }
            },
            toDecimal: function (key, radix) {
                this.decimal = parseInt(key, radix) || "";
            },
            tabHover: function (event) {
                var t = event.target;
                if (t.tagName == "LABEL") {
                    var tabId = t.getAttribute("for");
                    document.getElementById(tabId).checked = true;
                    //记住最后所在的 Tab
                    (function setLSItem() {
                        localStorage.setItem("whatTab", tabId)
                    }());
                }
            },
            wheelHandler: function (e) {
                e.deltaY < 0 ? this.decimal++ : this.decimal--;
            },
            copyResult: function () {
                var $result = document.getElementById('convertResult');
                var text = $result.innerText.replace(/\) /g, ")");
                $result.addEventListener("copy", function (e) {
                    e.clipboardData.setData('text/plain', text);
                    e.preventDefault();
                }, false);
                document.execCommand("copy");
            }

        },
    });

    var whatTab = localStorage.getItem("whatTab");
    document.getElementById(whatTab).checked = true;
    return Yang;

})));