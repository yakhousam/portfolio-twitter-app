/* eslint-disable no-underscore-dangle */

import { faker } from '@faker-js/faker';

const startDate = new Date('12/28/2021').toISOString();
const endDate = new Date('01/02/2022').toISOString();

const usersIds = Array(100)
  .fill('')
  .map(() => faker.datatype.uuid());

const users = [];
const tweets = [];

for (const id of usersIds) {
  users.push(getUser(id));
  tweets.push(...getUsserTweets(id));
}

function getUser(id: string) {
  const firstName = faker.name.findName();
  const lastName = faker.name.lastName();
  return {
    id,
    name: `${firstName} ${lastName}`,
    public_metrics: {
      followers_count: faker.datatype.number(),
      following_count: faker.datatype.number(),
      tweet_count: faker.datatype.number(),
      listed_count: faker.datatype.number(),
    },
    username: faker.internet.userName(firstName, lastName),
  };
}

function getUsserTweets(id: string) {
  const n = faker.datatype.number({ min: 1, max: 5 });
  const arr = [];
  for (let i = 0; i < n; i++)
    [
      arr.push({
        text: faker.lorem.text(),
        public_metrics: {
          retweet_count: faker.datatype.number(),
          reply_count: faker.datatype.number(),
          like_count: faker.datatype.number(),
          quote_count: faker.datatype.number(),
        },
        author_id: id,
        created_at: faker.date.between(startDate, endDate).toISOString(),
        id: faker.datatype.uuid(),
      }),
    ];
  return arr;
}

export const data = {
  _maxResultsWhenFetchLast: 100,
  _realData: {
    data: tweets,
    includes: {
      users,
    },
    meta: {
      newest_id: '1518282801715593218',
      oldest_id: '1518282784988712963',
      result_count: 10,
      next_token: 'b26v89c19zqg8o3fpytodvh66pq1jrs1tkrvusjyf6qnx',
    },
  },
  _rateLimit: {
    limit: 450,
    remaining: 449,
    reset: 1650822687,
  },
  _instance: {
    _currentUser: null,
    _currentUserV2: null,
    _requestMaker: {
      rateLimits: {
        'https://api.twitter.com/2/tweets/search/recent': {
          limit: 450,
          remaining: 448,
          reset: 1650822687,
        },
      },
      clientSettings: {},
      bearerToken: faker.datatype.uuid(),
    },
    _prefix: 'https://api.twitter.com/2/',
  },
  _queryParams: {
    max_results: 10,
    start_time: '2022-04-23T17:37:13.138Z',
    end_time: '2022-04-24T17:36:43.138Z',
    expansions: 'author_id',
    'tweet.fields': [
      'id',
      'author_id',
      'in_reply_to_user_id',
      'created_at',
      'public_metrics',
    ],
    'user.fields': ['username', 'public_metrics'],
    query: '#bitcoin',
  },
  _endpoint: 'tweets/search/recent',
  done: false,
  get tweets() {
    return this._realData.data;
  },
  get rateLimit() {
    return this._rateLimit;
  },
  get includes() {
    return this._realData.includes;
  },
};

// export const data = {
//   _maxResultsWhenFetchLast: 100,
//   _realData: {
//     data: [
//       {
//         text: 'RT @JohnHunterGems: Good morning with a little humor. #Bitcoin 🤣 https://t.co/h2fLUXuYBa',
//         public_metrics: {
//           retweet_count: 20,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '1271236761251909632',
//         created_at: '2022-04-24T17:06:42.000Z',
//         id: '1518282801715593218',
//       },
//       {
//         text: '#DeFi #ethax #ethaxcrypto #ethaxtoken #DEX #cryptocurrency #Ethereum #BinanceSmartChain #Bitcoin\nTelegram: https://t.co/ucEtJFyBlX\n This project has been implemented very professionally and has a clear development plan. Created by a very professional and experienced team.',
//         public_metrics: {
//           retweet_count: 0,
//           reply_count: 0,
//           like_count: 1,
//           quote_count: 0,
//         },
//         author_id: '1445761684459573257',
//         created_at: '2022-04-24T17:36:42.000Z',
//         id: '1518282801342459904',
//       },
//       {
//         text: 'RT @sirius_protocol: 📣 Sirius Protocol Airdrop is live!\n\n🏆 Reward for Tasks:     $6,000 in reward pool. \n\n👨‍👩‍👧 Referral Reward:       5 ex…',
//         public_metrics: {
//           retweet_count: 5956,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '1475083478131564545',
//         created_at: '2022-04-24T17:36:42.000Z',
//         id: '1518282801216638976',
//       },
//       {
//         text: 'RT @sirius_protocol: 📣 Sirius Protocol Airdrop is live!\n\n🏆 Reward for Tasks:     $6,000 in reward pool. \n\n👨‍👩‍👧 Referral Reward:       5 ex…',
//         public_metrics: {
//           retweet_count: 5956,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '1515957671626633220',
//         created_at: '2022-04-24T17:36:42.000Z',
//         id: '1518282798431232000',
//       },
//       {
//         text: '#Helios #Mining #Fintech #Insurtech #Crypto #Bitcoin https://t.co/oJhOIIdruB',
//         public_metrics: {
//           retweet_count: 0,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '1299546649975422980',
//         created_at: '2022-04-24T17:36:41.000Z',
//         id: '1518282797701509120',
//       },
//       {
//         text: 'RT @1881Erdem: #kriptopara  piyasası son durum. \n#Bitcoin Saatlik bazda hafif düşüş eğilimli yatay \n#Ethereum  Saatlik bazda hafif düşüş eğ…',
//         public_metrics: {
//           retweet_count: 43,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '1437038035284238344',
//         created_at: '2022-04-24T17:36:41.000Z',
//         id: '1518282797558943744',
//       },
//       {
//         text: "@CryptoSoccerCPS awesome project with amazing team behind it,check this out and let's join guys !\n@AndikAnds @KintanaaXd @AfifMiftahuddin \n#NFTGames #CryptoSoccer $CPS #BTC \n#PlayToEarn #FreeToEarn #metaverse #NFT #BSC\n#PrivateSale #cryptocurrency #Airdrop #Bitcoin #USDT",
//         public_metrics: {
//           retweet_count: 0,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '1139879238276792320',
//         created_at: '2022-04-24T17:36:41.000Z',
//         in_reply_to_user_id: '1496160672706711558',
//         id: '1518282795344310272',
//       },
//       {
//         text: 'RT @MartiniGuyYT: 3000 LIKES ❤️ AND I START THE NEXT $2,500 #BITCOIN GIVEAWAY',
//         public_metrics: {
//           retweet_count: 674,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '1357586949771571202',
//         created_at: '2022-04-24T17:36:40.000Z',
//         id: '1518282793192722433',
//       },
//       {
//         text: 'RT @CryptoBergenhus: LFG #MarvinInu $Marvin #1000xgem \n\n#FLOKI #Flokiverse #doge #shiba #Ethereum #BNB #Binance #Bitcoin',
//         public_metrics: {
//           retweet_count: 4,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '1515385678061785097',
//         created_at: '2022-04-24T17:36:39.000Z',
//         id: '1518282786918047744',
//       },
//       {
//         text: 'RT @sanjiinu_tw: 👉 We will be listed in the #Lbankexchange within 5 days (anytime). We will be listed one by one soon on all major exchange…',
//         public_metrics: {
//           retweet_count: 43,
//           reply_count: 0,
//           like_count: 0,
//           quote_count: 0,
//         },
//         author_id: '719524162621071360',
//         created_at: '2022-04-24T17:36:38.000Z',
//         id: '1518282784988712963',
//       },
//     ],
//     includes: {
//       users: [
//         {
//           id: '1271236761251909632',
//           name: 'BingX Latino',
//           public_metrics: {
//             followers_count: 4635,
//             following_count: 964,
//             tweet_count: 1445,
//             listed_count: 26,
//           },
//           username: 'BingXLatino',
//         },
//         {
//           id: '1445761684459573257',
//           name: 'Purobi',
//           public_metrics: {
//             followers_count: 5882,
//             following_count: 6437,
//             tweet_count: 7266,
//             listed_count: 2,
//           },
//           username: 'Purobi63747736',
//         },
//         {
//           id: '1475083478131564545',
//           name: 'Hagoi',
//           public_metrics: {
//             followers_count: 62,
//             following_count: 4108,
//             tweet_count: 25182,
//             listed_count: 7,
//           },
//           username: 'Hagoicoxcityx94',
//         },
//         {
//           id: '1515957671626633220',
//           name: 'septid334',
//           public_metrics: {
//             followers_count: 37,
//             following_count: 45,
//             tweet_count: 8,
//             listed_count: 0,
//           },
//           username: 'septi_d334',
//         },
//         {
//           id: '1299546649975422980',
//           name: 'Op Vinzo',
//           public_metrics: {
//             followers_count: 3150,
//             following_count: 3814,
//             tweet_count: 30160,
//             listed_count: 0,
//           },
//           username: 'Op_Vinzo',
//         },
//         {
//           id: '1437038035284238344',
//           name: 'tunc',
//           public_metrics: {
//             followers_count: 40,
//             following_count: 111,
//             tweet_count: 269,
//             listed_count: 4,
//           },
//           username: 'LeventT23713267',
//         },
//         {
//           id: '1139879238276792320',
//           name: 'Tubitubi',
//           public_metrics: {
//             followers_count: 90,
//             following_count: 2014,
//             tweet_count: 4857,
//             listed_count: 0,
//           },
//           username: 'tubbybooo',
//         },
//         {
//           id: '1357586949771571202',
//           name: 'mark',
//           public_metrics: {
//             followers_count: 87,
//             following_count: 150,
//             tweet_count: 2063,
//             listed_count: 9,
//           },
//           username: 'mark15158514',
//         },
//         {
//           id: '1515385678061785097',
//           name: 'alexela',
//           public_metrics: {
//             followers_count: 42,
//             following_count: 109,
//             tweet_count: 981,
//             listed_count: 0,
//           },
//           username: 'alexela00a',
//         },
//         {
//           id: '719524162621071360',
//           name: 'SpaceDiz',
//           public_metrics: {
//             followers_count: 403,
//             following_count: 2061,
//             tweet_count: 8976,
//             listed_count: 8,
//           },
//           username: 'SpaceDiz',
//         },
//       ],
//     },
//     meta: {
//       newest_id: '1518282801715593218',
//       oldest_id: '1518282784988712963',
//       result_count: 10,
//       next_token: 'b26v89c19zqg8o3fpytodvh66pq1jrs1tkrvusjyf6qnx',
//     },
//   },
//   _rateLimit: {
//     limit: 450,
//     remaining: 449,
//     reset: 1650822687,
//   },
//   _instance: {
//     _currentUser: null,
//     _currentUserV2: null,
//     _requestMaker: {
//       rateLimits: {
//         'https://api.twitter.com/2/tweets/search/recent': {
//           limit: 450,
//           remaining: 448,
//           reset: 1650822687,
//         },
//       },
//       clientSettings: {},
//       bearerToken:
//         'AAAAAAAAAAAAAAAAAAAAADTSYAEAAAAA7Ty4Sduqe0bjU7utkDYCr9QuEY0%3DknQPHMoDf5D7FwqMDRNjUwgONZM1Q6m3GlgAcWLaE7om61mX80',
//     },
//     _prefix: 'https://api.twitter.com/2/',
//   },
//   _queryParams: {
//     max_results: 10,
//     start_time: '2022-04-23T17:37:13.138Z',
//     end_time: '2022-04-24T17:36:43.138Z',
//     expansions: 'author_id',
//     'tweet.fields': [
//       'id',
//       'author_id',
//       'in_reply_to_user_id',
//       'created_at',
//       'public_metrics',
//     ],
//     'user.fields': ['username', 'public_metrics'],
//     query: '#bitcoin',
//   },
//   _endpoint: 'tweets/search/recent',
//   done: false,
//   get tweets() {
//     return this._realData.data;
//   },
//   get rateLimit() {
//     return this._rateLimit;
//   },
//   get includes() {
//     return this._realData.includes;
//   },
// };
