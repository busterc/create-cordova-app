const kleur = require("kleur");
const execa = require("execa");

module.exports = async app => {
  let args = ["create", app.dir, app.id, app.name];
  let template = app.template.replace(/ /g, "");

  if (template.length > 0) {
    args.push("--template");
    args.push(template);
  }

  try {
    await execa("cordova", args, {
      stdout: "inherit"
    });
  } catch (error) {
    console.log(
      kleur.bold().red(`
${error}
    `)
    );
    process.exit(1);
  }
};
