<<<<<<< HEAD
'use strict';
=======
"use strict";
>>>>>>> refs/remotes/origin/master

const {
  isInternalThread,
  isMainThread,
  SHARE_ENV,
  resourceLimits,
  setEnvironmentData,
  getEnvironmentData,
  threadId,
  threadName,
  Worker,
<<<<<<< HEAD
} = require('internal/worker');
=======
} = require("internal/worker");
>>>>>>> refs/remotes/origin/master

const {
  MessagePort,
  MessageChannel,
  markAsUncloneable,
  moveMessagePortToContext,
  receiveMessageOnPort,
  BroadcastChannel,
<<<<<<< HEAD
} = require('internal/worker/io');

const {
  postMessageToThread,
} = require('internal/worker/messaging');
=======
} = require("internal/worker/io");

const { postMessageToThread } = require("internal/worker/messaging");
>>>>>>> refs/remotes/origin/master

const {
  markAsUntransferable,
  isMarkedAsUntransferable,
<<<<<<< HEAD
} = require('internal/buffer');

const { locks } = require('internal/locks');
=======
} = require("internal/buffer");

const { locks } = require("internal/locks");
>>>>>>> refs/remotes/origin/master

module.exports = {
  isInternalThread,
  isMainThread,
  MessagePort,
  MessageChannel,
  markAsUncloneable,
  markAsUntransferable,
  isMarkedAsUntransferable,
  moveMessagePortToContext,
  receiveMessageOnPort,
  resourceLimits,
  postMessageToThread,
  threadId,
  threadName,
  SHARE_ENV,
  Worker,
  parentPort: null,
  workerData: null,
  BroadcastChannel,
  setEnvironmentData,
  getEnvironmentData,
  locks,
<<<<<<< HEAD
};
=======
};
>>>>>>> refs/remotes/origin/master
