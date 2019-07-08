const fs = require("fs");
const path = require("path");
const create = require("../create");
const addPlatforms = require("../platforms");
const addPlugins = require("../plugins");

const app = {
  name: "MyApp",
  id: "com.example.myapp",
  dir: path.join(__dirname, "myapp"),
  template: "cordova-app-hello-world",
  platforms: ["android", "ios", "bogus"],
  plugins: ["cordova-plugin-device", "cordova-plugin-dialogs", "bogus"]
};

jest.setTimeout(60000);

describe("createCordovaApp", () => {
  it("create app using template", async () => {
    await create(app);
    await expect(
      fs.statSync(path.join(app.dir, "www")).isDirectory()
    ).toBeTruthy();
  });

  it("platform add", async () => {
    await addPlatforms(app);
    await expect(
      fs.statSync(path.join(app.dir, "platforms/android")).isDirectory() &&
        fs.statSync(path.join(app.dir, "platforms/ios")).isDirectory()
    ).toBeTruthy();
  });

  it("plugin add", async () => {
    await addPlugins(app);
    await expect(
      fs
        .statSync(path.join(app.dir, "plugins/cordova-plugin-device"))
        .isDirectory() &&
        fs
          .statSync(path.join(app.dir, "plugins/cordova-plugin-dialogs"))
          .isDirectory()
    ).toBeTruthy();
  });
});
