interface Data {
  [key: string]: number;
}

export interface Statistics {
  original: number;
  replay: number;
  retweet: number;
  chart: {
    m5: Data;
    m15: Data;
    m30: Data;
    h1: Data;
    h4: Data;
    d1: Data;
  };
}
