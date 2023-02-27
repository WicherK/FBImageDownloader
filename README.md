# FB Image Downloader
Application that allows you to download all images from chosen conversation. Every image later is stored as a link in text file.

## Libraries
- [puppeteer](https://www.npmjs.com/package/puppeteer)

## Installation and configuration
Before running app make sure you installed all dependencies and set ``messageThreadId`` and `userDataDir` in your **config.json** file.

- messageThreadId - thread id from conversation.

- userDataDir - folder where your saved session from Facebook is stored. By this puppeteer doesn't need to log in itself.

Example:
```json
{
    "messageThreadId": "12345678901234",
    "userDataDir": "C:\\Users\\USERNAME\\AppData\\Local\\Google\\Chrome\\User Data"
}
```

If everything is set you are good to go. After you run the program, image links should be stored in your text file.
```bash
node app.js
```

## License
[GPL-3.0](https://choosealicense.com/licenses/gpl-3.0/)
