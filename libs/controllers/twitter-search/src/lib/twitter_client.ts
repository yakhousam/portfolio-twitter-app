import { TwitterApi } from 'twitter-api-v2';

export default function getTwitterApiClient(
  accessToken?: string,
  accessSecret?: string
) {
  let twitterApiClient: TwitterApi;

  if (process.env.NODE_ENV !== 'production') {
    twitterApiClient = new TwitterApi(process.env.TWITTER_API_CLIENT);
  } else {
    twitterApiClient = new TwitterApi({
      appKey: process.env.TWITTER_ID,
      appSecret: process.env.TWITTER_SECRET,
      accessToken,
      accessSecret,
    });
  }

  return twitterApiClient;
}
