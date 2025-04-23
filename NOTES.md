### Issues

- an issues with connectKit wallet when the modal shows up, [discussion](https://github.com/family/connectkit/issues/435)

#### Additional Considerable faetures

- Cover user fees (cover fees when user transfer funds to another wallet)
- make it availabe crosschain

++ A solutions to solve user problem who doesnt have any money to deposit into the protocol

- incentivizes a user/investor to lend their funds/assets for another user by depositing the assets into protocol and the protocol will leverage the funds to farm a yield from any yield farming protocol
- A protocol could use deposited funds by user, to deposited into a lending protocol and borrow some amount from lending protocol to cover user purchasing item, that way the protocol doesnt have to have some initial funds in the contract to cover user purchasing item. but user could only purchase an item that value is not excess the borrowed or deposted balances.

## Problem with the current Lending & borrowing protocol

- user needs to deposit some amount of supported assets in order tobe able to borrow some assets,

### NextJs Refresher

- `SSG` - your static site will be generated/pre-rendered at build time with or without data (data from api)
- `ISR` - your static site will be regenerated/updated on each revalidation has passed if theres is any updated data, so no need to rebuild your entire site (saves time).
- `GetStaticProps` - uses for static site for fetching data that will be render at build time
- `GetStaticPaths` - uses for static site for fetching statically generated pages, and uses along with `GetStaticProps`
