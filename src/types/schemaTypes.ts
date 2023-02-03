export type GameType = {
  id: string;
  name: string;
  iconURL?: string;
};

export type CardType = {
  id?: string;
  name: string;
  imageURL?: string;
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
