import { connectDatabase, insertDocument } from "../../helpers/db-util";
import { emailValidation } from "../../helpers/input-validation";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !emailValidation(userEmail)) {
      res.status(400).json({ message: "Invalid email!" });
      return;
    }

    let client;

    //Connect Database
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
    }

    //Sign up receive newsletter
    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      res.status(201).json({ message: "Signed up successfully!" });

      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
  }
};

export default handler;
