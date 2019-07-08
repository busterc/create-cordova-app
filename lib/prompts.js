const path = require("path");
const prompts = require("prompts");
const kleur = require("kleur");

const create = require("./create");
const addPlatforms = require("./platforms");
const addPlugins = require("./plugins");

const options = {
  onCancel: () => {
    console.log(
      kleur.bold().red(`
  >> Cancelled <<
      `)
    );
    process.exit(1);
  }
};
let app = {};

module.exports = async dir => {
  app.dir = path.resolve(process.cwd(), dir);
  app.name = path.basename(dir);

  console.log(`${kleur.bold().cyan(app.dir)}`);

  let _ = await prompts(
    {
      type: "text",
      name: "name",
      message: "App Name",
      initial: app.name,
      validate: val =>
        val.replace(/ /g, "").length === 0 ? "App Name is Required" : true
    },
    options
  );

  Object.assign(app, _);

  _ = await prompts(
    {
      type: "text",
      name: "id",
      message: "App Id",
      initial: `com.example.${app.name.replace(/ /g, "").toLowerCase()}`,
      validate: val =>
        val.replace(/ /g, "").length === 0 ? "App Id is Required" : true
    },
    options
  );

  Object.assign(app, _);

  _ = await prompts(
    {
      type: "text",
      name: "template",
      message: "Template [optional]"
    },
    options
  );

  Object.assign(app, _);

  _ = await prompts(
    {
      type: "multiselect",
      name: "platforms",
      message: "Platforms",
      choices: [
        { value: "android" },
        { value: "ios" },
        { value: "electron" },
        { value: "browser" },
        { value: "osx" },
        { value: "windows" }
      ],
      min: 1
    },
    options
  );

  Object.assign(app, _);

  await create(app);

  await addPlatforms(app);

  const plugins = [
    { title: "battery-status", value: "cordova-plugin-battery-status" },
    { title: "camera", value: "cordova-plugin-camera" },
    { title: "device", value: "cordova-plugin-device" },
    { title: "dialogs", value: "cordova-plugin-dialogs" },
    { title: "file", value: "cordova-plugin-file" },
    { title: "geolocation", value: "cordova-plugin-geolocation" },
    { title: "inappbrowser", value: "cordova-plugin-inappbrowser" },
    { title: "media", value: "cordova-plugin-media" },
    { title: "media-capture", value: "cordova-plugin-media-capture" },
    {
      title: "network-information",
      value: "cordova-plugin-network-information"
    },
    { title: "screen-orientation", value: "cordova-plugin-screen-orientation" },
    { title: "splashscreen", value: "cordova-plugin-splashscreen" },
    { title: "statusbar", value: "cordova-plugin-statusbar" },
    { title: "vibration", value: "cordova-plugin-vibration" },
    { title: "whitelist", value: "cordova-plugin-whitelist" }
  ];

  _ = await prompts({
    type: "multiselect",
    name: "plugins",
    message: "Plugins",
    choices: plugins
  });

  Object.assign(app, _);

  await addPlugins(app);
};
