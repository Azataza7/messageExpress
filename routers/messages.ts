import {Router} from 'express';
import dayjs from 'dayjs';
import {promises as fs} from 'fs';
import path from 'path';
import {message} from '../types';

const messagesRouter = Router();
const messagesDirectory = './messages';

messagesRouter.get('/', async (req, res) => {
  const files = (await fs.readdir(messagesDirectory)).slice(-5);

  try {
    const messages: message[] = [];

    const messagesPromises = files.map(async (file) => {
      const messageText = await fs.readFile(path.join(messagesDirectory, file), 'utf-8');
      return {message: messageText, datetime: file};
    });

    const messagesData = await Promise.all(messagesPromises);
    messages.push(...messagesData);

    res.send(messages);
  } catch (e) {
    console.error('Error ', e);
  }
});

messagesRouter.post('/', async (req, res) => {
  try {
    const message = req.body.message;
    const createdAt = new Date().toISOString();
    const fileName = `${dayjs(createdAt).format('DD.MM.YYYY_HH:mm:ss')}.txt`;
    const filePath = path.join(messagesDirectory, fileName);

    await fs.writeFile(filePath, message);
    res.json({message, createdAt});
    console.log(res);
  } catch (e) {
    console.error('Error: ', e);
  }
});

export default messagesRouter;