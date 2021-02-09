function getfiletree(
  fileobject,
  searchKey,
  results = [],
  npath = "",
  bread = []
) {
  const r = results;
  const b = bread;

  if (searchKey !== "" && searchKey !== undefined && searchKey !== null) {
    if (b.length == 0) b.push({ path: "", name: "root" });

    var nkey = npath;
    Object.keys(fileobject).forEach((key) => {
      const value = fileobject[key];
      nkeysplit = nkey.split("-");
      if (
        key !== "type" &&
        value["type"] === "dir" &&
        key !== "children" &&
        !nkeysplit.includes(key)
      ) {
        nkey += "-" + key;
        b.push({
          path: nkey,
          name: key,
        });
      }

      if (nkey === searchKey) {
        Object.keys(value["children"]).forEach((ikey) => {
          r.push({
            path:
              nkey +
              (value["children"][ikey]["type"] === "dir" ? "-" + ikey : ""),
            name: ikey,
            type: value["children"][ikey]["type"],
          });
        });
      } else if (typeof value === "object") {
        getfiletree(value, searchKey, r, nkey, b);
      }
    });
  } else {
    Object.keys(fileobject["children"]).forEach((key) => {
      r.push({
        path:
          npath +
          (fileobject["children"][key]["type"] === "dir" ? "-" + key : ""),
        name: key,
        type: fileobject["children"][key]["type"],
      });
    });
  }
  return { bread: b, files: r };
}

module.exports = getfiletree;
