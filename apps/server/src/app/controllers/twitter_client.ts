import { TwitterApi } from "twitter-api-v2";

export default function getTwitterApiClient(
  accessToken?: string,
  accessSecret?: string
) {
  let twitterApiClient: TwitterApi;

  if (process.env.NODE_ENV !== "production") {
    twitterApiClient = new TwitterApi(
      "AAAAAAAAAAAAAAAAAAAAADTSYAEAAAAA7Ty4Sduqe0bjU7utkDYCr9QuEY0%3DknQPHMoDf5D7FwqMDRNjUwgONZM1Q6m3GlgAcWLaE7om61mX80"
    );
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
