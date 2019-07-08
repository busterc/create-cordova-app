const kleur = require("kleur");
const execa = require("execa");
const each = require("p-each-series");

module.exports = async app => {
  await each(app.plugins, async p => {
    try {
      let { stderr } = await execa("cordova", ["plugin", "add", p], {
        cwd: app.dir,
        stdout: "inherit"
      });

      if (stderr) {
        console.log(kleur.bold().red(stderr));
        process.exit(1);
      }

      console.log(
        kleur.green(`
    >> plugin added: ${p} <<
    `)
      );
    } catch (error) {
      console.log(kleur.bold().red(error));
    }
  });
};
