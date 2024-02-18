const db = require("../db/conn");

const userPost = async (req, res) => {
   const allURLS = req.body.links
   console.log(allURLS)
  const collection = (await db()).collection("links");
  const cursor = collection.find({}, { _id: 0 });

  
  
  const data = (await cursor.toArray()).map(item => item.link);
  console.log(data)

  const matchingURLs = allURLS.filter(url => data.some(item => item === url));



  res.status(200).json({ links: matchingURLs });
};

module.exports = { userPost };
