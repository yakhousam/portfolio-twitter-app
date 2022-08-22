import { faker } from '@faker-js/faker';
import { getTimestamp } from '@yak-twitter-app/utility/date';

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

type GetUserTweetsArgs = {
  id: string;
  startDate: string;
  endDate: string;
};

function getUserTweets({ id, startDate, endDate }: GetUserTweetsArgs) {
  const n = faker.datatype.number({ min: 1, max: 5 });
  const arr = [];
  for (let i = 0; i < n; i++) {
    const rand = Math.floor(Math.random() * 3);
    arr.push({
      text: (rand === 1 ? 'RT' : '') + faker.lorem.text(),
      public_metrics: {
        retweet_count: faker.datatype.number(),
        reply_count: faker.datatype.number(),
        like_count: faker.datatype.number(),
        quote_count: faker.datatype.number(),
      },
      author_id: id,
      in_reply_to_user_id:
        rand === 2 ? faker.datatype.number().toString() : undefined,
      created_at: faker.date.between(startDate, endDate).toISOString(),
      id: faker.datatype.uuid(),
    });
  }

  return arr;
}

type GetTwitterDataArgs = {
  startDate: string;
  endDate: string;
  reset?: number;
  limit?: number;
  done?: boolean;
  maxResult?: number;
};

export function getTwitterData({
  startDate,
  endDate,
  reset = getTimestamp(60 * 1) / 1000,
  limit = 450,
  done = false,
  maxResult = 5000,
}: GetTwitterDataArgs) {
  const usersIds = Array(maxResult)
    .fill(null)
    .map(() => faker.datatype.uuid());

  const users = [];
  const tweets = [];

  for (const id of usersIds) {
    users.push(getUser(id));
    tweets.push(...getUserTweets({ id, startDate, endDate }));
  }

  const data = {
    _realData: {
      data: tweets
        .slice(0, maxResult)
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ),
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
      limit: limit,
      remaining: limit - maxResult / 100,
      reset,
    },

    _endpoint: 'tweets/search/recent',
    done,
    get tweets() {
      return this._realData.data;
    },
    get rateLimit() {
      return this._rateLimit;
    },
    get includes() {
      return this._realData.includes;
    },
    next() {
      this.rateLimit.remaining -= 1; // decrease the limit after each call
      return this;
    },
  };
  return data;
}
