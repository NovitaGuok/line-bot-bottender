const fileType = require('file-type');
const fs = require('fs');

module.exports = async function App(context) {
  // await context.sendText('Welcome to Bottender');
  if (context.event.isText) {
    await context.sendText(`received the text message: ${context.event.text}`);

    // Text to speech
    // var unirest = require('unirest');

    // var req = unirest('GET', 'https://voicerss-text-to-speech.p.rapidapi.com/');

    // req.query({
    //   r: '2',
    //   c: 'mp3',
    //   f: '8khz_8bit_mono',
    //   src: context.event.text,
    //   hl: 'en-us',
    //   key: 'fcb29959965b44a6837885911022e7ae',
    // });

    // req.headers({
    //   'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
    //   'x-rapidapi-key': '54ae8d0eeemsh58d84513f7c39dbp199060jsn5fb9173b2278',
    // });

    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);

    //   console.log(res.body);
    // });

    await context.sendAudio({
      originalContentUrl: 'https://example.com/audio.mp3',
      duration: 240000,
    });
  }

  if (context.event.isPayload) {
    await context.sendText(`received the payload: ${context.event.payload}`);
  }

  if (context.event.isImage) {
    await context.sendImage({
      originalContentUrl: 'https://example.com/image.jpg',
      previewImageUrl: 'https://example.com/preview.jpg',
    });
    // const buffer = await context.getMessageContent();
    // const { ext } = fileType(buffer);

    // const filename = `my-file.${ext}`;

    // // You can do whatever you want, for example, write buffer into file system
    // await fs.promises.writeFile(filename, buffer);
  }

  if (context.event.isVideo) {
    await context.sendVideo({
      originalContentUrl: 'https://example.com/video.mp4',
      previewImageUrl: 'https://example.com/preview.jpg',
    });
  }

  if (context.event.isAudio) {
    await context.sendAudio({
      originalContentUrl: 'https://example.com/audio.mp3',
      duration: 240000,
    });
  }

  if (context.event.text == 'Hi') {
    await context.sendText('Hi');
    const imagemap = {
      baseUrl: 'https://via.placeholder.com/800',
      baseSize: {
        height: 1040,
        width: 1040,
      },
      actions: [
        {
          type: 'uri',
          linkUri: 'https://placeholder.com/',
          area: {
            x: 0,
            y: 0,
            width: 520,
            height: 1040,
          },
        },
        {
          type: 'message',
          text: 'hello',
          area: {
            x: 520,
            y: 0,
            width: 520,
            height: 1040,
          },
        },
      ],
    };
    const altText = 'this is an imagemap';
    await context.sendImagemap(altText, imagemap);
  }

  if (context.event.text == 'Shopping') {
    const template = {
      thumbnailImageUrl: 'https://example.com/bot/images/image.jpg',
      title: 'Menu',
      text: 'Please select',
      actions: [
        {
          type: 'postback',
          label: 'Buy',
          data: 'action=buy&itemid=123',
        },
        {
          type: 'postback',
          label: 'Add to cart',
          data: 'action=add&itemid=123',
        },
        {
          type: 'uri',
          label: 'View detail',
          uri: 'http://example.com/page/123',
        },
      ],
    };
    const altText = 'this is a button template';
    await context.sendButtonTemplate(altText, template);
  }

  if (context.event.text == 'Shopping') {
    const template = [
      {
        thumbnailImageUrl: 'https://example.com/bot/images/item1.jpg',
        title: 'this is menu',
        text: 'description',
        actions: [
          {
            type: 'postback',
            label: 'Buy',
            data: 'action=buy&itemid=111',
          },
          {
            type: 'postback',
            label: 'Add to cart',
            data: 'action=add&itemid=111',
          },
          {
            type: 'uri',
            label: 'View detail',
            uri: 'http://example.com/page/111',
          },
        ],
      },
      {
        thumbnailImageUrl: 'https://example.com/bot/images/item2.jpg',
        title: 'this is menu',
        text: 'description',
        actions: [
          {
            type: 'postback',
            label: 'Buy',
            data: 'action=buy&itemid=222',
          },
          {
            type: 'postback',
            label: 'Add to cart',
            data: 'action=add&itemid=222',
          },
          {
            type: 'uri',
            label: 'View detail',
            uri: 'http://example.com/page/222',
          },
        ],
      },
    ];
    const altText = 'this is a carousel template';
    await context.sendCarouselTemplate(altText, template);
  }
};
