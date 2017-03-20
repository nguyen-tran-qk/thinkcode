/*!
 * Author: mosaicpro.biz
 * Licence: Commercial (http://themeforest.net/licenses)
 * Copyright 2014
 */
process.env.DISABLE_NOTIFIER = true;
var requireDir = require('require-dir');
requireDir('./tasks', {recurse: true});