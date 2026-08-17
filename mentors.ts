import { Mentor } from '../types';

const chillCousinImg = 'https://i.ibb.co/Ngzq0Lp5/bro-1-1.png';
const savageSisterImg = 'https://i.ibb.co/ch8Fr5w5/sis-1.png';
const strictDadImg = 'https://i.ibb.co/bj73hpf7/papa-1.png';
const disappointedMomImg = 'https://i.ibb.co/C3Rc7kQh/mom-1.png';

export const MENTORS: Record<number, Mentor> = {
  1: {
    id: 1,
    name: 'Brother',
    diff: 'Easy',
    diffStars: '★☆☆☆',
    personality: 'Supportive, relaxed, encouraging',
    quote: 'Small savings become big wins.',
    avatarImage: chillCousinImg,
    avatarFallbackEmoji: '😎',
    themeClass: 'm1',
    color: '#9B5EFF',
    rewardKP: 50,
    rewardMult: 0.1,
    penaltyKP: 0,
    penaltyMult: 0,
    maxMult: 2.0,
    rules: [
      'Sends a gentle nudge before you exceed a category limit.',
      'No category locks or harsh penalties — pure encouragement mode.',
      'Great for beginners or relaxed budgeters.'
    ],
    lines: {
      good: 'Small savings add up — proud of you bro! Keep going! 🚀',
      warn: 'Hey, you are getting pretty close to your category limit. Take it easy on the next buy! 💬',
      over: 'It is okay! We overspent a little, but tomorrow is a fresh start. Just stay mindful! 😊'
    },
    behaviorDetails: {
      overview: 'Brother is your relaxed financial buddy. He celebrates every positive action and gently reminds you when you are spending quickly.',
      spendingRules: [
        'Warning triggered at 80% category budget limit.',
        'Zero penalties for overspending.',
        'Continuous multiplier boost as long as you log expenses.'
      ],
      rewardsExplanation: '+50 Kinetic Points (KP) per period stay within budget + 0.1x multiplier growth up to 2.0x maximum.',
      penaltiesExplanation: 'No points or multiplier losses on overspend.'
    }
  },

  2: {
    id: 2,
    name: 'Sister',
    diff: 'Medium',
    diffStars: '★★☆☆',
    personality: 'Sassy, teasing, strict',
    quote: 'Boba again? Bold choice.',
    avatarImage: savageSisterImg,
    avatarFallbackEmoji: '😏',
    themeClass: 'm2',
    color: '#C026D3',
    rewardKP: 50,
    rewardMult: 0.1,
    penaltyKP: 0,
    penaltyMult: 0.1,
    maxMult: 3.0,
    rules: [
      '2 warning pop-ups before a category is locked for the day.',
      'Sassy and teasing comments on every flagged expense.',
      '-0.1x multiplier penalty when overspending.'
    ],
    lines: {
      good: 'Okay okay, not bad! Look at you actually saving money for once. 💅',
      warn: 'Boba again? Bold choice. That is warning #1 for the day... do not test me. 🧋',
      over: 'Seriously?! I literally warned you. Category locked for today! Go reflect on your choices. 🙄'
    },
    behaviorDetails: {
      overview: 'Sister gives tough love. She uses witty teasing and daily category locks to stop impulse buys before they ruin your wallet.',
      spendingRules: [
        'Warning #1 pops up at 75% category limit.',
        'Warning #2 pops up at 90% category limit.',
        'Category flagged & locked at 100% spend.'
      ],
      rewardsExplanation: '+50 KP + 0.1x multiplier increase up to 3.0x max.',
      penaltiesExplanation: '-0.1x multiplier deduction on overspend.'
    }
  },

  3: {
    id: 3,
    name: 'Father',
    diff: 'Hard',
    diffStars: '★★★☆',
    personality: 'Cold, serious, intimidating',
    quote: 'Discipline beats impulse.',
    avatarImage: strictDadImg,
    avatarFallbackEmoji: '🧐',
    themeClass: 'm3',
    color: '#7B2EFF',
    rewardKP: 50,
    rewardMult: 0.2,
    penaltyKP: 10,
    penaltyMult: 0.1,
    maxMult: 4.0,
    rules: [
      'Only 1 strict warning before category is flagged red for the rest of the day.',
      'Cold, disciplined commentary on every transaction.',
      '-10 KP and -0.1x multiplier penalty on overspend.'
    ],
    lines: {
      good: 'Transaction recorded. Discipline beats impulse. Stay focused on the end goal. 👔',
      warn: 'Warning: You are at 85% of your category allocation. Do not let short-term desires ruin long-term stability.',
      over: 'Category budget breached. Unnecessary spending compromises future financial security. Penalties applied.'
    },
    behaviorDetails: {
      overview: 'Father demands focus and structure. He treats budget limits like unbreakable laws and rewards consistent discipline generously.',
      spendingRules: [
        'Single strict warning at 80% category capacity.',
        'Immediate red flag on 100% threshold.',
        'Daily accountability check required.'
      ],
      rewardsExplanation: '+50 KP + 0.2x fast multiplier growth up to 4.0x max.',
      penaltiesExplanation: '-10 KP deduction and -0.1x multiplier drop per overspend.'
    }
  },

  4: {
    id: 4,
    name: 'Mother',
    diff: 'Extreme',
    diffStars: '★★★★',
    personality: 'Uncompromising, guilt-trip master, extremely strict',
    quote: "I didn't raise you to buy this.",
    avatarImage: disappointedMomImg,
    avatarFallbackEmoji: '🤦‍♀️',
    themeClass: 'm4',
    color: '#DC2626',
    rewardKP: 70,
    rewardMult: 0.25,
    penaltyKP: 20,
    penaltyMult: 999, // resets multiplier to 1x
    maxMult: 5.0,
    rules: [
      'NO warnings — instantly flags transaction with a full "disappointed parent" animation & guilt trip.',
      'Multiplier instantly RESET to 1x and -20 KP on any overspend.',
      'Highest rewards (+70 KP + 30 Bonus KP) and maximum 5.0x multiplier potential!'
    ],
    lines: {
      good: 'Fine. At least you are trying. Do not make me regret trusting you with this money. 🧹',
      warn: "I see what you are buying. Neighbor's kid saves 90% of their allowance. Just saying. 😒",
      over: "I didn't raise you to waste money on this garbage! Multiplier RESET TO 1.0X! Go study your balance! 💥"
    },
    behaviorDetails: {
      overview: 'Mother gives maximum rewards for perfection (+70 KP, 5x multiplier), but zero tolerance for waste.',
      spendingRules: [
        'No grace period. Any category overspend triggers instant guilt-trip animation.',
        'Multiplier resets back to 1.0x immediately on overspend.',
        'Unlocks +30 bonus KP for zero-overspend weeks.'
      ],
      rewardsExplanation: '+70 KP + 0.25x rapid multiplier build-up up to 5.0x max + 30 bonus KP.',
      penaltiesExplanation: '-20 KP deduction & complete Multiplier Reset to 1.0x.'
    }
  }
};
