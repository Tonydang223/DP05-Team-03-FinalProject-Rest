const { WebClient } = require('@slack/web-api');

// Create a new instance of the WebClient class
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

const getMainChannels = async (channelNames) => {
  const result = await web.users.list();
  const channels = await web.conversations.list();

  const channelsToNoti = channels.channels.filter((v) => channelNames.includes(v.name));
  const admin = result.members.filter((v) => v.is_admin);
  const bot = result.members.filter((v) => v.is_bot)[0]['id'];

  for (const item of channelsToNoti) {
    const memberChannel = await web.conversations.members({
      channel: item.id,
    });
    if (!memberChannel.members?.includes(bot)) {
      await web.conversations.join({ channel: item.id });
    }
  }

  return [...admin, ...channelsToNoti].map((v) => v.id);
};
const pushMessage = async (notis, message) => {
  for (const channelId of notis) {
    const result = await web.chat.postMessage({
      channel: channelId,
      text: message,
    });
    console.log(result);
  }
};

module.exports = { web, getMainChannels, pushMessage };
