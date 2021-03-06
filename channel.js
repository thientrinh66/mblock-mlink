"use strict";
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault"),
    _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck")),
    _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass")),
    logger = require("./logger"),
    Channel = function() {
        function e() {
            (0, _classCallCheck2.default)(this, e), this.channelHandleMap = {}, this.channelPlatformsConnectHandleMap = {}
        }
        return (0, _createClass2.default)(e, [{
            key: "push",
            value: function(e) {
                this.channelHandleMap[e.id] = e, this.channelPlatformsConnectHandleMap[e.id] = {}
            }
        }, {
            key: "pop",
            value: function(e) {
                delete this.channelHandleMap[e.id], delete this.channelPlatformsConnectHandleMap[e.id]
            }
        }, {
            key: "withPlatformsConnect",
            value: function(e, n, a) {
                this.channelPlatformsConnectHandleMap[e] && (this.channelPlatformsConnectHandleMap[e][n] = a)
            }
        }, {
            key: "untiePlatformsConnect",
            value: function(e) {
                for (var n in this.channelPlatformsConnectHandleMap) delete this.channelPlatformsConnectHandleMap[n][e]
            }
        }, {
            key: "getChannelByConnectIdDo",
            value: function(e, n) {
                for (var a in this.channelPlatformsConnectHandleMap) this.channelPlatformsConnectHandleMap[a][e] && n(this.channelHandleMap[a])
            }
        }, {
            key: "platformsGC",
            value: function(e) {
                try {
                    var n = this.channelPlatformsConnectHandleMap[e.id];
                    this.pop(e);
                    var a = {};
                    for (var l in this.channelPlatformsConnectHandleMap)
                        for (var t in this.channelPlatformsConnectHandleMap[l]) a[t] = this.channelPlatformsConnectHandleMap[l][t];
                    for (var r in n) {
                        var o = n[r];
                        a[r] || o.kill && o.kill("SIGTERM")
                    }
                } catch (e) {
                    logger.debug("platformsGC", e)
                }
            }
        }]), e
    }();
module.exports = new Channel;
