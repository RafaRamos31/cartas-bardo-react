import { gql } from "@apollo/client";

export const ALL_CARDS = gql`
  query {
    allCards {
      id
      name
      imageURL
      description
      game {
        id
        name
        iconURL
      }
      rarity
      fragments
      command
      stackable
      secondsEffect
      limited {
        existences
      }
      cooldown {
        cooldownFinishAt
        secondsCooldown
        secondsAfterStack
      }
    }
  }
`;

export const FIND_CARDS = gql`
  query FindCards($gameId: String, $rarity: Rarity, $query: String) {
    findCards(gameId: $gameId, rarity: $rarity, query: $query) {
      id
      name
      imageURL
      description
      game {
        id
        name
        iconURL
      }
      rarity
      fragments
      command
      stackable
      secondsEffect
      limited {
        existences
      }
      cooldown {
        cooldownFinishAt
        secondsCooldown
        secondsAfterStack
      }
    }
  }
`;

export const ALL_GAMES = gql`
  query {
    allGames {
      id
      name
      iconURL
    }
  }
`;

export const GET_DEFAULT_GAME = gql`
  query GetStatus {
    getStatus {
      appDefaultGameName
    }
  }
`;

export const GET_DECRYPTED_USERNAME = gql`
  query Query($usercode: String!) {
    decryptUsername(usercode: $usercode)
  }
`;

export const CURRENT_USER = gql`
  query Me {
    me {
      id
      username
      roles
      status
    }
  }
`;

export const CARD_BY_ID = gql`
  query GetCardById($cardId: String!) {
    getCardById(cardId: $cardId) {
      id
      name
      imageURL
      description
      game {
        id
        name
        iconURL
      }
      rarity
      fragments
      command
      stackable
      secondsEffect
      limited {
        existences
      }
      cooldown {
        cooldownFinishAt
        secondsCooldown
        secondsAfterStack
      }
    }
  }
`;

export const ALL_LOOTBAGS = gql`
  query AllLootBags {
    allLootBags {
      id
      name
      description
      color
      totalCards
      fixedGame {
        id
        name
        iconURL
      }
      fixedCards {
        cardType
        quantity
      }
      twitchCommand
      channelPoints
      bits
    }
  }
`;
