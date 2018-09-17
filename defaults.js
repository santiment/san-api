export const examples = [
  {
    name: 'dailyActiveAddresses',
    title: 'Daily Active Addresses'
  },
  {
    name: 'burnRate',
    title: 'Token aging (burn rate)'
  },
  {
    name: 'transactionVolume',
    title: 'Transaction volume'
  },
  {
    name: 'exchangeFundsFlow',
    title: 'Exchange Funds Flow'
  },
  {
    name: 'githubActivity',
    title: 'Github Activity',
    skipArgs: ['movingAverageIntervalBase', 'ticker', 'to', 'transform'],
    notes: `\n\n\n[An article explaining our approach to tracking github activity](https://medium.com/santiment/tracking-github-activity-of-crypto-projects-introducing-a-better-approach-9fb1af3f1c32){target="_blank"}`
  },
  {
    name: 'erc20ExchangeFundsFlow',
    title: 'ERC20 Exchange Funds Flow'
  },
  {
    name: 'socialVolume',
    title: 'Social Volume'
  },
  {
    name: 'socialVolumeProjects',
    title: 'Social Volume Projects'
  },
  {
    name: 'topicSearch',
    title: 'Topic search'
  }
]

export const argumentDefaults = {
  slug: `"dragonchain"`,
  from: `"2018-08-01 16:00:00Z"`,
  to: `"2018-08-05 16:00:00Z"`,
  interval: `"1d"`,
  source: 'TELEGRAM',
  searchText: `"btc moon"`,
  socialVolumeType: 'TELEGRAM_DISCUSSION_OVERVIEW'
}
