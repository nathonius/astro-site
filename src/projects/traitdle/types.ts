export type Sims4TraitCategory =
  | "personality"
  | "bonus"
  | "reward"
  | "temporary";

export type Sims4TraitType =
  | "emotional"
  | "hobby"
  | "lifestyle"
  | "social"
  | "toddler"
  | "infant"
  | "bonus-aspiration"
  | "bonus-death"
  | "reward-satisfaction"
  | "reward-adult-aspiration"
  | "reward-child-aspiration"
  | "reward-inherited"
  | "reward-age-up"
  | "reward-character-value"
  | "reward-childhood-phase"
  | "reward-confidence"
  | "reward-high-school"
  | "reward-career"
  | "reward-occult"
  | "reward-misc"
  | "temporary";

export type Sims4Pack =
  | "base game"
  | "spa day"
  | "lovestruck"
  | "strangerville"
  | "outdoor retreat"
  | "city living"
  | "for rent"
  | "get together"
  | "eco lifestyle"
  | "snowy escape"
  | "life and death"
  | "island living"
  | "cottage living"
  | "high school years"
  | "horse ranch"
  | "cats and dogs"
  | "get famous"
  | "journey to batuu"
  | "werewolves"
  | "tiny living stuff"
  | "seasons"
  | "jungle adventure"
  | "my first pet stuff"
  | "realm of magic"
  | "vampires"
  | "paranormal stuff"
  | "nifty knitting stuff"
  | "parenthood"
  | "home chef hustle stuff"
  | "discover university"
  | "bust the dust kit"
  | "crystal creations stuff"
  | "growing together"
  | "get to work"
  | "multiple"
  | "event";

export interface Sims4Trait {
  icon: string;
  name: string;
  category: Sims4TraitCategory;
  type: Sims4TraitType;
  description: string;
  pack: Sims4Pack;
}
