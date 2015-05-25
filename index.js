#!/usr/bin/env node
/*
 * Survey Maker
 *   index.js, starts the server.
 *
 * awaterma@awaterma.net
 */

var pkg = require('./package.json');
var server = require('./lib/server.js');
var argv = process.argv[2];

server(argv != null ? argv : pkg.options.port);
