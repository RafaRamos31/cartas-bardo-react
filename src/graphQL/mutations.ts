import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
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
