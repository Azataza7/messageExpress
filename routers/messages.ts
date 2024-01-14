import {Router} from 'express';
import dayjs from 'dayjs';
import {promises as fs} from 'fs';
import path from 'path';

const messagesRouter = Router();
const messagesDirectory = './messages';

messagesRouter.get('/', async (req, res) => {

});

messagesRouter.post('/', async (req, res) => {
  try {
    const message = req.body.message;
    const createdAt = new Date().toISOString();
    const fileName = `${dayjs(createdAt).format('DD.MM.YYYY_HH:mm:ss')}.txt`;
    const filePath = path.join(messagesDirectory, fileName);

    await fs.writeFile(filePath, message);

    res.json({message, createdAt});
  } catch (e) {
    console.error('Error: ', e);
  }
});

export default messagesRouter;