// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
const Parser = require("rss-parser");

export default function handler(req, res) {
  let items = [];
  (async function main() {
    // Make a new RSS Parser
    const parser = new Parser();
    const body = req.body;
    // Get all the items in the RSS feed
    var feed;
    try {
      feed = await parser.parseURL(body.url); // https://www.reddit.com/.rss
    } catch (e) {
      res.status(403).json({ status: "error" });
      return;
    }

    // Clean up the string and replace reserved characters
    const fileName = `${feed.title
      .replace(/\s+/g, "-")
      .replace(/[/\\?%*:|"<>]/g, "")
      .toLowerCase()}.json`;

    // Add the items to the items array
    await Promise.all(
      feed.items.map(async (currentItem) => {
        // Add a new item if it doesn't already exist
        if (
          items.filter((item) => isEquivalent(item, currentItem)).length <= 0
        ) {
          const aux = new Object(currentItem);
          const image = currentItem.content
            .split('" />')[0]
            .replace(/<img src="/, "")
            .trim();

          const content = currentItem.content.split("<br />   ");

          if (currentItem.content.split('" />').length > 1) {
            const subTitle = content[1].split(".")[0];
            aux.subTitle = subTitle;
            aux.image = image;
            aux.content = content[1].replace((subTitle+"."),"");
          } else {
            aux.image = "";
          }
          items.push(aux);
        }
      })
    );

    // Save the file
    fs.writeFileSync(fileName, JSON.stringify(items));
  })();

  function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // if number of properties is different, objects are not equivalent
    if (aProps.length != bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      let propName = aProps[i];

      // if values of same property are not equal, objects are not equivalent
      if (a[propName] !== b[propName]) {
        return false;
      }
    }

    // if we made it this far, objects are considered equivalent
    return true;
  }
  res.status(200).json({ status: "OK" });
}

// Link para o RSS http://g1.globo.com/dynamo/brasil/rss2.xml