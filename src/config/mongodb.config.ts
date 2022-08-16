import { registerAs } from '@nestjs/config';

const pass = '36GROtZQZQ07thGy1NGJ';

export default registerAs('mongodb', () => ({
  uri:
    process.env.MONGODB_URI ||
    `mongodb+srv://pelayoDB:${pass}@cluster0.ipcwlrw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
}));
