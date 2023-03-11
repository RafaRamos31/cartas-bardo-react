import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`;

export const CREATE_CARD = gql`
  mutation Mutation(
    $name: String!
    $imageURL: String
    $description: String
    $rarity: Rarity!
    $fragments: Int!
    $command: String!
    $stackable: Boolean!
    $gameId: ID
    $secondsEffect: Int
    $existences: Int
    $secondsCooldown: Int
  ) {
    createCard(
      name: $name
      imageURL: $imageURL
      description: $description
      rarity: $rarity
      fragments: $fragments
      command: $command
      stackable: $stackable
      gameId: $gameId
      secondsEffect: $secondsEffect
      existences: $existences
      secondsCooldown: $secondsCooldown
    ) {
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

export const UPDATE_CARD = gql`
  mutation Mutation(
    $cardId: ID!
    $name: String
    $imageUrl: String
    $description: String
    $rarity: Rarity
    $gameId: ID
    $fragments: Int
    $command: String
    $stackable: Boolean
    $secondsEffect: Int
    $existences: Int
    $secondsCooldown: Int
    $secondsAfterStack: Int
  ) {
    updateCard(
      cardId: $cardId
      name: $name
      imageURL: $imageUrl
      description: $description
      rarity: $rarity
      gameId: $gameId
      fragments: $fragments
      command: $command
      stackable: $stackable
      secondsEffect: $secondsEffect
      existences: $existences
      secondsCooldown: $secondsCooldown
      secondsAfterStack: $secondsAfterStack
    ) {
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

export const DELETE_CARD = gql`
  mutation DeleteCard($cardId: ID!) {
    deleteCard(cardId: $cardId) {
      id
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGame($name: String!, $iconUrl: String) {
    createGame(name: $name, iconURL: $iconUrl) {
      id
      name
      iconURL
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation UpdateGame($gameId: ID!, $name: String, $iconUrl: String) {
    updateGame(gameId: $gameId, name: $name, iconURL: $iconUrl) {
      id
      name
      iconURL
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($gameId: ID!) {
    deleteGame(gameId: $gameId) {
      id
      name
      iconURL
    }
  }
`;

export const CREATE_LOOTBAG = gql`
  mutation CreateLootBag(
    $name: String!
    $description: String!
    $totalCards: Int!
    $color: String
    $fixedGameId: ID
    $fixedCards: [FixedCardInput]
    $channelPoints: Int
    $bits: Int
  ) {
    createLootBag(
      name: $name
      description: $description
      totalCards: $totalCards
      color: $color
      fixedGameId: $fixedGameId
      fixedCards: $fixedCards
      channelPoints: $channelPoints
      bits: $bits
    ) {
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
