// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCodeManagement = require('../../../app/controller/codeManagement');
import ExportHome = require('../../../app/controller/home');
import ExportIt = require('../../../app/controller/it');
import ExportItArticleManagement = require('../../../app/controller/itArticleManagement');
import ExportMessageBoard = require('../../../app/controller/messageBoard');
import ExportMessageManagement = require('../../../app/controller/messageManagement');
import ExportToken = require('../../../app/controller/token');

declare module 'egg' {
  interface IController {
    codeManagement: ExportCodeManagement;
    home: ExportHome;
    it: ExportIt;
    itArticleManagement: ExportItArticleManagement;
    messageBoard: ExportMessageBoard;
    messageManagement: ExportMessageManagement;
    token: ExportToken;
  }
}
