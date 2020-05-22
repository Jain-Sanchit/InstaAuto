const ig = require("./instagram");

(async () => {
  await ig.initialize();

  await ig.login('the_engi_grapher','Sanchit8169');

  await ig.likeTagsProcess(["spiti", "india","newyork"]);

  debugger;

})();
