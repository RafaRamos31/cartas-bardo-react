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

export const ALL_GAMES = gql`
  query{
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

