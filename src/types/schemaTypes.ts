export type GameType = {
  id: string;
  name: string;
  iconURL?: string;
};

export type CardType = {
  id?: string;
  name: string;
  imageURL?: string;
  description?: string;
  rarity: string;
  game?: GameType;
  fragments: number;
  command: string;
  stackable: Boolean;
  secondsEffect: number;
  limited?: {
    existences: number;
  };
  cooldown?: {
    cooldownFinishAt: string;
    secondsCooldown: number;
    secondsAfterStack?: number;
  };
};

export type UserBasicType = {
  id: string;
  username: string;
  roles: string[];
  status: string;
};

export type LootbagType = {
  id?: string;
  name: string;
  description: string;
  color: string;
  totalCards: number;
  fixedGame?: GameType;
  fixedCards?: {
    cardType: string,
    quantity: number
  }[];
  twitchCommand?: string;
  channelPoints?: number;
  bits?: number;
};
