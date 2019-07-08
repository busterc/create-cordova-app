const kleur = require("kleur");
const execa = require("execa");
const each = require("p-each-series");

module.exports = async app => {
  await each(app.platforms, async p => {
    try {
      let { stderr } = await execa("cordova", ["platform", "add", p], {
        cwd: app.dir,
        stdout: "inherit"
      });

      if (stderr) {
        console.log(kleur.bold().red(stderr));
        if (process.env.NODE_ENV === "test") {
          return;
        }

        process.exit(1);
      }

      console.log(
        kleur.green(`
    >> platform added: ${p} <<
    `)
      );
    } catch (error) {
      console.log(kleur.bold().red(error));
    }
  });
};
