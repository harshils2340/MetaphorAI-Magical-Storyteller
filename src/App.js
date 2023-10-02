import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';


const app = express();
const port = process.env.PORT || 3002;

app.use(
  cors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(express.json());

app.post('/process_user_input', (req, res) => {
    console.log('Processing user input...'); // Log a loading message
  
    const userInput = req.body.userInput;
  
    // Replace 'path/to/StoryScript.py' with the actual path to your StoryScript.py file
    const scriptPath = './StoryScript.py';
  
    exec(`python ${scriptPath} --userInput "${userInput}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      console.log('Python script execution complete.');
      try {
        const textWithImg = JSON.parse(stdout);
  
        const response = {
          input: userInput,
          result: textWithImg,
        };
  
        res.json(response);
  
      } catch (parseError) {
        console.error(`Error parsing Python script output: ${parseError}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
