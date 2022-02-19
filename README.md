# Virtual Hypixel

---

## What is `virtual-hypixel`?
This is a small program intended to improve gameplay on hypixel!
It comes with a bunch of features such as packet filtering, 
auto-queue-dodging and more. 

## How do I use it?
To use it, you need to clone this repo to your computer
(or just download it as a zip). Make sure you have [NodeJS](https://nodejs.org)
and [TypeScript](https://www.typescriptlang.org/) installed.
Once it's downloaded, run: `npm i` and then `tsc`. After the code 
is compiled, all you have to do is setup your `private_config.json`. 
Then, to start the program run `cd ./src` and `node ./tests.js`. 

## private_config.json
Rename [config.json](https://github.com/HumanDuck23/virtual-hypixel/blob/master/src/config.json)
to `private_config.json`. Here are the most important fields:

### Account
###### Settings for your account

| Name            | Value                                |
|-----------------|--------------------------------------|
| `email`         | `The email of your MC account`*      |
| `password`      | `The password of your MC account`*   |
| `auth`          | Account type, `mojang` / `microsoft` |
| `hypixelApiKey` | Your Hypixel API Key                 |

### Packet
###### Settings for packets

| Name         | Value                                                                    |
|--------------|--------------------------------------------------------------------------|
| `enableMods` | `true` or `false`, re-enables disabled mods (freelook, etc.)             |
| `particles`  | `true` or `false`, `true` -> filter out all particles sent by the server |
| `rockets`    | WIP feature, does nothing for now.                                       |                                      

### Autododge
###### Settings for the autododge module

| Name          | Value                                                |
|---------------|------------------------------------------------------|
| `shouldDodge` | `true` or `false`, enables / disables autododge      |
| `dodge`       | JSON object of dodging rules, see below for examples |

### Streammod
###### Settings for the stream moderation module

| Name      | Value                                           |
|-----------|-------------------------------------------------|
| `enabled` | `true` or `false`, enables / disabled streamMod |
| `spam`    | JSON object of rules, see below                 |

## JSON Object examples

### Autododge
```json
{
  "autododge": {
    "shouldDodge": true,
    "dodge": {
      "DUELS_SUMO_DUEL": {
        "wins": 1000,
        "ws": 50,
        "wlr": 4
      }
    }
  }
}
```

This would make the program dodge anyone in sumo duels that has:
- 1000 wins
- A 50 winstreak
**or**
- A w/l ratio of 4 or higher

Here you can see the structure of these dodging rules.
They're a simple object with the key being the mode, such as `DUELS_SUMO_DUEL`
or `DUELS_CLASSIC_DUEL`, and the value being key-value set of criteria. 
Alternatively to the mode, you can write `ALL` as the key, and the rules will 
apply for all modes. Modes can be found in [statsObject.ts](https://github.com/HumanDuck23/virtual-hypixel/blob/master/src/data/statsObject.ts).

---
 
*Don't worry, the program will **not** send your login information to anyone!
If you want to make sure for yourself, you can search through your downloaded 
copy for all occurrences of `email` and `password`, and you'll see that they're
only used for the initial login to hypixel.