"use strict";

const crypto = require("crypto");
var moment = require("moment");
moment.locale("zh-cn");
var UUID = require("uuid");
module.exports = {
  md5: (content, key = "") => {
    const cyt = crypto.createHash("md5");
    cyt.update(content + key, "UTF-8");
    return cyt.digest("hex");
  },
  rndNum: n => {
    var rnd = "";
    for (var i = 0; i < n; i++) {
      rnd += Math.floor(Math.random() * 10);
    }
    return rnd;
  },

  getDateTime: value => {
    var _today = moment();
    return _today.format(value);
  }
};
