#!/usr/bin/env node

const meow = require("meow");
const prompts = require("./prompts");

const cli = meow(`
Usage

  $ create-cordova-app <path>

Examples:

  $ create-cordova-app .
  $ create-cordova-app my-app
  $ create-cordova-app ../my-app

`);

if (cli.input.length < 1) {
  cli.showHelp();
} else {
  prompts(cli.input[0]);
}
