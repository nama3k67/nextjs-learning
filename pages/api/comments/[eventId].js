import {
  emailValidation,
  inputValidation,
} from "../../../helpers/input-validation";
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventId;
  let client;

  //Connect Database
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    //Check input validation
    if (
      !emailValidation(email) ||
      !inputValidation(name) ||
      !inputValidation(text)
    ) {
      res.status(400).json({ message: "Invalid Input!" });
      client.close();
      return;
    }
    const newComment = { email, name, text, eventId };
    let result;

    //Handle add new comment and process error
    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added Comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
    }
  }

  if (req.method === "GET") {
    //Get all comments
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
    }
  }

  client.close();
};

export default handler;
