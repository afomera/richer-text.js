"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _core = require("@tiptap/core");
var _react2 = require("@tiptap/react");
var _suggestion = _interopRequireDefault(require("@tiptap/suggestion"));
var _tippy = _interopRequireDefault(require("tippy.js"));
var _state = require("@tiptap/pm/state");
var _EmojiList = _interopRequireDefault(require("../elements/EmojiList"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var emojisList = [{
  emoji: "\uD83D\uDE00",
  description: "grinning face",
  category: "Smileys & Emotion",
  aliases: ["grinning"],
  tags: ["smile", "happy"],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE03",
  description: "grinning face with big eyes",
  category: "Smileys & Emotion",
  aliases: ["smiley"],
  tags: ["happy", "joy", "haha"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE04",
  description: "grinning face with smiling eyes",
  category: "Smileys & Emotion",
  aliases: ["smile"],
  tags: ["happy", "joy", "laugh", "pleased"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE01",
  description: "beaming face with smiling eyes",
  category: "Smileys & Emotion",
  aliases: ["grin"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE06",
  description: "grinning squinting face",
  category: "Smileys & Emotion",
  aliases: ["laughing", "satisfied"],
  tags: ["happy", "haha"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE05",
  description: "grinning face with sweat",
  category: "Smileys & Emotion",
  aliases: ["sweat_smile"],
  tags: ["hot"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD23",
  description: "rolling on the floor laughing",
  category: "Smileys & Emotion",
  aliases: ["rofl"],
  tags: ["lol", "laughing"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDE02",
  description: "face with tears of joy",
  category: "Smileys & Emotion",
  aliases: ["joy"],
  tags: ["tears"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE42",
  description: "slightly smiling face",
  category: "Smileys & Emotion",
  aliases: ["slightly_smiling_face"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDE43",
  description: "upside-down face",
  category: "Smileys & Emotion",
  aliases: ["upside_down_face"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDEE0",
  description: "melting face",
  category: "Smileys & Emotion",
  aliases: ["melting_face"],
  tags: ["sarcasm", "dread"],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDE09",
  description: "winking face",
  category: "Smileys & Emotion",
  aliases: ["wink"],
  tags: ["flirt"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE0A",
  description: "smiling face with smiling eyes",
  category: "Smileys & Emotion",
  aliases: ["blush"],
  tags: ["proud"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE07",
  description: "smiling face with halo",
  category: "Smileys & Emotion",
  aliases: ["innocent"],
  tags: ["angel"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD70",
  description: "smiling face with hearts",
  category: "Smileys & Emotion",
  aliases: ["smiling_face_with_three_hearts"],
  tags: ["love"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDE0D",
  description: "smiling face with heart-eyes",
  category: "Smileys & Emotion",
  aliases: ["heart_eyes"],
  tags: ["love", "crush"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD29",
  description: "star-struck",
  category: "Smileys & Emotion",
  aliases: ["star_struck"],
  tags: ["eyes"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDE18",
  description: "face blowing a kiss",
  category: "Smileys & Emotion",
  aliases: ["kissing_heart"],
  tags: ["flirt"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE17",
  description: "kissing face",
  category: "Smileys & Emotion",
  aliases: ["kissing"],
  tags: [],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\u263A\uFE0F",
  description: "smiling face",
  category: "Smileys & Emotion",
  aliases: ["relaxed"],
  tags: ["blush", "pleased"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE1A",
  description: "kissing face with closed eyes",
  category: "Smileys & Emotion",
  aliases: ["kissing_closed_eyes"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE19",
  description: "kissing face with smiling eyes",
  category: "Smileys & Emotion",
  aliases: ["kissing_smiling_eyes"],
  tags: [],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD72",
  description: "smiling face with tear",
  category: "Smileys & Emotion",
  aliases: ["smiling_face_with_tear"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDE0B",
  description: "face savoring food",
  category: "Smileys & Emotion",
  aliases: ["yum"],
  tags: ["tongue", "lick"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE1B",
  description: "face with tongue",
  category: "Smileys & Emotion",
  aliases: ["stuck_out_tongue"],
  tags: [],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE1C",
  description: "winking face with tongue",
  category: "Smileys & Emotion",
  aliases: ["stuck_out_tongue_winking_eye"],
  tags: ["prank", "silly"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD2A",
  description: "zany face",
  category: "Smileys & Emotion",
  aliases: ["zany_face"],
  tags: ["goofy", "wacky"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDE1D",
  description: "squinting face with tongue",
  category: "Smileys & Emotion",
  aliases: ["stuck_out_tongue_closed_eyes"],
  tags: ["prank"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD11",
  description: "money-mouth face",
  category: "Smileys & Emotion",
  aliases: ["money_mouth_face"],
  tags: ["rich"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD17",
  description: "smiling face with open hands",
  category: "Smileys & Emotion",
  aliases: ["hugs"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD2D",
  description: "face with hand over mouth",
  category: "Smileys & Emotion",
  aliases: ["hand_over_mouth"],
  tags: ["quiet", "whoops"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEE2",
  description: "face with open eyes and hand over mouth",
  category: "Smileys & Emotion",
  aliases: ["face_with_open_eyes_and_hand_over_mouth"],
  tags: ["gasp", "shock"],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDEE3",
  description: "face with peeking eye",
  category: "Smileys & Emotion",
  aliases: ["face_with_peeking_eye"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDD2B",
  description: "shushing face",
  category: "Smileys & Emotion",
  aliases: ["shushing_face"],
  tags: ["silence", "quiet"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD14",
  description: "thinking face",
  category: "Smileys & Emotion",
  aliases: ["thinking"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDEE1",
  description: "saluting face",
  category: "Smileys & Emotion",
  aliases: ["saluting_face"],
  tags: ["respect"],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDD10",
  description: "zipper-mouth face",
  category: "Smileys & Emotion",
  aliases: ["zipper_mouth_face"],
  tags: ["silence", "hush"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD28",
  description: "face with raised eyebrow",
  category: "Smileys & Emotion",
  aliases: ["raised_eyebrow"],
  tags: ["suspicious"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDE10",
  description: "neutral face",
  category: "Smileys & Emotion",
  aliases: ["neutral_face"],
  tags: ["meh"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE11",
  description: "expressionless face",
  category: "Smileys & Emotion",
  aliases: ["expressionless"],
  tags: [],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE36",
  description: "face without mouth",
  category: "Smileys & Emotion",
  aliases: ["no_mouth"],
  tags: ["mute", "silence"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEE5",
  description: "dotted line face",
  category: "Smileys & Emotion",
  aliases: ["dotted_line_face"],
  tags: ["invisible"],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDE36\u200D\uD83C\uDF2B\uFE0F",
  description: "face in clouds",
  category: "Smileys & Emotion",
  aliases: ["face_in_clouds"],
  tags: [],
  unicode_version: "13.1",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDE0F",
  description: "smirking face",
  category: "Smileys & Emotion",
  aliases: ["smirk"],
  tags: ["smug"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE12",
  description: "unamused face",
  category: "Smileys & Emotion",
  aliases: ["unamused"],
  tags: ["meh"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE44",
  description: "face with rolling eyes",
  category: "Smileys & Emotion",
  aliases: ["roll_eyes"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDE2C",
  description: "grimacing face",
  category: "Smileys & Emotion",
  aliases: ["grimacing"],
  tags: [],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE2E\u200D\uD83D\uDCA8",
  description: "face exhaling",
  category: "Smileys & Emotion",
  aliases: ["face_exhaling"],
  tags: [],
  unicode_version: "13.1",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD25",
  description: "lying face",
  category: "Smileys & Emotion",
  aliases: ["lying_face"],
  tags: ["liar"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDEE8",
  description: "shaking face",
  category: "Smileys & Emotion",
  aliases: ["shaking_face"],
  tags: ["shock"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDE0C",
  description: "relieved face",
  category: "Smileys & Emotion",
  aliases: ["relieved"],
  tags: ["whew"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE14",
  description: "pensive face",
  category: "Smileys & Emotion",
  aliases: ["pensive"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE2A",
  description: "sleepy face",
  category: "Smileys & Emotion",
  aliases: ["sleepy"],
  tags: ["tired"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD24",
  description: "drooling face",
  category: "Smileys & Emotion",
  aliases: ["drooling_face"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDE34",
  description: "sleeping face",
  category: "Smileys & Emotion",
  aliases: ["sleeping"],
  tags: ["zzz"],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE37",
  description: "face with medical mask",
  category: "Smileys & Emotion",
  aliases: ["mask"],
  tags: ["sick", "ill"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD12",
  description: "face with thermometer",
  category: "Smileys & Emotion",
  aliases: ["face_with_thermometer"],
  tags: ["sick"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD15",
  description: "face with head-bandage",
  category: "Smileys & Emotion",
  aliases: ["face_with_head_bandage"],
  tags: ["hurt"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD22",
  description: "nauseated face",
  category: "Smileys & Emotion",
  aliases: ["nauseated_face"],
  tags: ["sick", "barf", "disgusted"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD2E",
  description: "face vomiting",
  category: "Smileys & Emotion",
  aliases: ["vomiting_face"],
  tags: ["barf", "sick"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD27",
  description: "sneezing face",
  category: "Smileys & Emotion",
  aliases: ["sneezing_face"],
  tags: ["achoo", "sick"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD75",
  description: "hot face",
  category: "Smileys & Emotion",
  aliases: ["hot_face"],
  tags: ["heat", "sweating"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD76",
  description: "cold face",
  category: "Smileys & Emotion",
  aliases: ["cold_face"],
  tags: ["freezing", "ice"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD74",
  description: "woozy face",
  category: "Smileys & Emotion",
  aliases: ["woozy_face"],
  tags: ["groggy"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDE35",
  description: "face with crossed-out eyes",
  category: "Smileys & Emotion",
  aliases: ["dizzy_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE35\u200D\uD83D\uDCAB",
  description: "face with spiral eyes",
  category: "Smileys & Emotion",
  aliases: ["face_with_spiral_eyes"],
  tags: [],
  unicode_version: "13.1",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD2F",
  description: "exploding head",
  category: "Smileys & Emotion",
  aliases: ["exploding_head"],
  tags: ["mind", "blown"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD20",
  description: "cowboy hat face",
  category: "Smileys & Emotion",
  aliases: ["cowboy_hat_face"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD73",
  description: "partying face",
  category: "Smileys & Emotion",
  aliases: ["partying_face"],
  tags: ["celebration", "birthday"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD78",
  description: "disguised face",
  category: "Smileys & Emotion",
  aliases: ["disguised_face"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDE0E",
  description: "smiling face with sunglasses",
  category: "Smileys & Emotion",
  aliases: ["sunglasses"],
  tags: ["cool"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD13",
  description: "nerd face",
  category: "Smileys & Emotion",
  aliases: ["nerd_face"],
  tags: ["geek", "glasses"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDDD0",
  description: "face with monocle",
  category: "Smileys & Emotion",
  aliases: ["monocle_face"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDE15",
  description: "confused face",
  category: "Smileys & Emotion",
  aliases: ["confused"],
  tags: [],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEE4",
  description: "face with diagonal mouth",
  category: "Smileys & Emotion",
  aliases: ["face_with_diagonal_mouth"],
  tags: ["confused"],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDE1F",
  description: "worried face",
  category: "Smileys & Emotion",
  aliases: ["worried"],
  tags: ["nervous"],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE41",
  description: "slightly frowning face",
  category: "Smileys & Emotion",
  aliases: ["slightly_frowning_face"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u2639\uFE0F",
  description: "frowning face",
  category: "Smileys & Emotion",
  aliases: ["frowning_face"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDE2E",
  description: "face with open mouth",
  category: "Smileys & Emotion",
  aliases: ["open_mouth"],
  tags: ["surprise", "impressed", "wow"],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE2F",
  description: "hushed face",
  category: "Smileys & Emotion",
  aliases: ["hushed"],
  tags: ["silence", "speechless"],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE32",
  description: "astonished face",
  category: "Smileys & Emotion",
  aliases: ["astonished"],
  tags: ["amazed", "gasp"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE33",
  description: "flushed face",
  category: "Smileys & Emotion",
  aliases: ["flushed"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD7A",
  description: "pleading face",
  category: "Smileys & Emotion",
  aliases: ["pleading_face"],
  tags: ["puppy", "eyes"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD79",
  description: "face holding back tears",
  category: "Smileys & Emotion",
  aliases: ["face_holding_back_tears"],
  tags: ["tears", "gratitude"],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDE26",
  description: "frowning face with open mouth",
  category: "Smileys & Emotion",
  aliases: ["frowning"],
  tags: [],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE27",
  description: "anguished face",
  category: "Smileys & Emotion",
  aliases: ["anguished"],
  tags: ["stunned"],
  unicode_version: "6.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE28",
  description: "fearful face",
  category: "Smileys & Emotion",
  aliases: ["fearful"],
  tags: ["scared", "shocked", "oops"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE30",
  description: "anxious face with sweat",
  category: "Smileys & Emotion",
  aliases: ["cold_sweat"],
  tags: ["nervous"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE25",
  description: "sad but relieved face",
  category: "Smileys & Emotion",
  aliases: ["disappointed_relieved"],
  tags: ["phew", "sweat", "nervous"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE22",
  description: "crying face",
  category: "Smileys & Emotion",
  aliases: ["cry"],
  tags: ["sad", "tear"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE2D",
  description: "loudly crying face",
  category: "Smileys & Emotion",
  aliases: ["sob"],
  tags: ["sad", "cry", "bawling"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE31",
  description: "face screaming in fear",
  category: "Smileys & Emotion",
  aliases: ["scream"],
  tags: ["horror", "shocked"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE16",
  description: "confounded face",
  category: "Smileys & Emotion",
  aliases: ["confounded"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE23",
  description: "persevering face",
  category: "Smileys & Emotion",
  aliases: ["persevere"],
  tags: ["struggling"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE1E",
  description: "disappointed face",
  category: "Smileys & Emotion",
  aliases: ["disappointed"],
  tags: ["sad"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE13",
  description: "downcast face with sweat",
  category: "Smileys & Emotion",
  aliases: ["sweat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE29",
  description: "weary face",
  category: "Smileys & Emotion",
  aliases: ["weary"],
  tags: ["tired"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE2B",
  description: "tired face",
  category: "Smileys & Emotion",
  aliases: ["tired_face"],
  tags: ["upset", "whine"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD71",
  description: "yawning face",
  category: "Smileys & Emotion",
  aliases: ["yawning_face"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDE24",
  description: "face with steam from nose",
  category: "Smileys & Emotion",
  aliases: ["triumph"],
  tags: ["smug"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE21",
  description: "enraged face",
  category: "Smileys & Emotion",
  aliases: ["rage", "pout"],
  tags: ["angry"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE20",
  description: "angry face",
  category: "Smileys & Emotion",
  aliases: ["angry"],
  tags: ["mad", "annoyed"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD2C",
  description: "face with symbols on mouth",
  category: "Smileys & Emotion",
  aliases: ["cursing_face"],
  tags: ["foul"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDE08",
  description: "smiling face with horns",
  category: "Smileys & Emotion",
  aliases: ["smiling_imp"],
  tags: ["devil", "evil", "horns"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC7F",
  description: "angry face with horns",
  category: "Smileys & Emotion",
  aliases: ["imp"],
  tags: ["angry", "devil", "evil", "horns"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC80",
  description: "skull",
  category: "Smileys & Emotion",
  aliases: ["skull"],
  tags: ["dead", "danger", "poison"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2620\uFE0F",
  description: "skull and crossbones",
  category: "Smileys & Emotion",
  aliases: ["skull_and_crossbones"],
  tags: ["danger", "pirate"],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCA9",
  description: "pile of poo",
  category: "Smileys & Emotion",
  aliases: ["hankey", "poop", "shit"],
  tags: ["crap"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD21",
  description: "clown face",
  category: "Smileys & Emotion",
  aliases: ["clown_face"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDC79",
  description: "ogre",
  category: "Smileys & Emotion",
  aliases: ["japanese_ogre"],
  tags: ["monster"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC7A",
  description: "goblin",
  category: "Smileys & Emotion",
  aliases: ["japanese_goblin"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC7B",
  description: "ghost",
  category: "Smileys & Emotion",
  aliases: ["ghost"],
  tags: ["halloween"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC7D",
  description: "alien",
  category: "Smileys & Emotion",
  aliases: ["alien"],
  tags: ["ufo"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC7E",
  description: "alien monster",
  category: "Smileys & Emotion",
  aliases: ["space_invader"],
  tags: ["game", "retro"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD16",
  description: "robot",
  category: "Smileys & Emotion",
  aliases: ["robot"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDE3A",
  description: "grinning cat",
  category: "Smileys & Emotion",
  aliases: ["smiley_cat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE38",
  description: "grinning cat with smiling eyes",
  category: "Smileys & Emotion",
  aliases: ["smile_cat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE39",
  description: "cat with tears of joy",
  category: "Smileys & Emotion",
  aliases: ["joy_cat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE3B",
  description: "smiling cat with heart-eyes",
  category: "Smileys & Emotion",
  aliases: ["heart_eyes_cat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE3C",
  description: "cat with wry smile",
  category: "Smileys & Emotion",
  aliases: ["smirk_cat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE3D",
  description: "kissing cat",
  category: "Smileys & Emotion",
  aliases: ["kissing_cat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE40",
  description: "weary cat",
  category: "Smileys & Emotion",
  aliases: ["scream_cat"],
  tags: ["horror"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE3F",
  description: "crying cat",
  category: "Smileys & Emotion",
  aliases: ["crying_cat_face"],
  tags: ["sad", "tear"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE3E",
  description: "pouting cat",
  category: "Smileys & Emotion",
  aliases: ["pouting_cat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE48",
  description: "see-no-evil monkey",
  category: "Smileys & Emotion",
  aliases: ["see_no_evil"],
  tags: ["monkey", "blind", "ignore"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE49",
  description: "hear-no-evil monkey",
  category: "Smileys & Emotion",
  aliases: ["hear_no_evil"],
  tags: ["monkey", "deaf"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE4A",
  description: "speak-no-evil monkey",
  category: "Smileys & Emotion",
  aliases: ["speak_no_evil"],
  tags: ["monkey", "mute", "hush"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC8C",
  description: "love letter",
  category: "Smileys & Emotion",
  aliases: ["love_letter"],
  tags: ["email", "envelope"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC98",
  description: "heart with arrow",
  category: "Smileys & Emotion",
  aliases: ["cupid"],
  tags: ["love", "heart"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC9D",
  description: "heart with ribbon",
  category: "Smileys & Emotion",
  aliases: ["gift_heart"],
  tags: ["chocolates"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC96",
  description: "sparkling heart",
  category: "Smileys & Emotion",
  aliases: ["sparkling_heart"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC97",
  description: "growing heart",
  category: "Smileys & Emotion",
  aliases: ["heartpulse"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC93",
  description: "beating heart",
  category: "Smileys & Emotion",
  aliases: ["heartbeat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC9E",
  description: "revolving hearts",
  category: "Smileys & Emotion",
  aliases: ["revolving_hearts"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC95",
  description: "two hearts",
  category: "Smileys & Emotion",
  aliases: ["two_hearts"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC9F",
  description: "heart decoration",
  category: "Smileys & Emotion",
  aliases: ["heart_decoration"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2763\uFE0F",
  description: "heart exclamation",
  category: "Smileys & Emotion",
  aliases: ["heavy_heart_exclamation"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDC94",
  description: "broken heart",
  category: "Smileys & Emotion",
  aliases: ["broken_heart"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2764\uFE0F\u200D\uD83D\uDD25",
  description: "heart on fire",
  category: "Smileys & Emotion",
  aliases: ["heart_on_fire"],
  tags: [],
  unicode_version: "13.1",
  ios_version: "14.0"
}, {
  emoji: "\u2764\uFE0F\u200D\uD83E\uDE79",
  description: "mending heart",
  category: "Smileys & Emotion",
  aliases: ["mending_heart"],
  tags: [],
  unicode_version: "13.1",
  ios_version: "14.0"
}, {
  emoji: "\u2764\uFE0F",
  description: "red heart",
  category: "Smileys & Emotion",
  aliases: ["heart"],
  tags: ["love"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE77",
  description: "pink heart",
  category: "Smileys & Emotion",
  aliases: ["pink_heart"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83E\uDDE1",
  description: "orange heart",
  category: "Smileys & Emotion",
  aliases: ["orange_heart"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC9B",
  description: "yellow heart",
  category: "Smileys & Emotion",
  aliases: ["yellow_heart"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC9A",
  description: "green heart",
  category: "Smileys & Emotion",
  aliases: ["green_heart"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC99",
  description: "blue heart",
  category: "Smileys & Emotion",
  aliases: ["blue_heart"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE75",
  description: "light blue heart",
  category: "Smileys & Emotion",
  aliases: ["light_blue_heart"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDC9C",
  description: "purple heart",
  category: "Smileys & Emotion",
  aliases: ["purple_heart"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD0E",
  description: "brown heart",
  category: "Smileys & Emotion",
  aliases: ["brown_heart"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDDA4",
  description: "black heart",
  category: "Smileys & Emotion",
  aliases: ["black_heart"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDE76",
  description: "grey heart",
  category: "Smileys & Emotion",
  aliases: ["grey_heart"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83E\uDD0D",
  description: "white heart",
  category: "Smileys & Emotion",
  aliases: ["white_heart"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDC8B",
  description: "kiss mark",
  category: "Smileys & Emotion",
  aliases: ["kiss"],
  tags: ["lipstick"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCAF",
  description: "hundred points",
  category: "Smileys & Emotion",
  aliases: ["100"],
  tags: ["score", "perfect"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCA2",
  description: "anger symbol",
  category: "Smileys & Emotion",
  aliases: ["anger"],
  tags: ["angry"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCA5",
  description: "collision",
  category: "Smileys & Emotion",
  aliases: ["boom", "collision"],
  tags: ["explode"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCAB",
  description: "dizzy",
  category: "Smileys & Emotion",
  aliases: ["dizzy"],
  tags: ["star"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCA6",
  description: "sweat droplets",
  category: "Smileys & Emotion",
  aliases: ["sweat_drops"],
  tags: ["water", "workout"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCA8",
  description: "dashing away",
  category: "Smileys & Emotion",
  aliases: ["dash"],
  tags: ["wind", "blow", "fast"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD73\uFE0F",
  description: "hole",
  category: "Smileys & Emotion",
  aliases: ["hole"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCAC",
  description: "speech balloon",
  category: "Smileys & Emotion",
  aliases: ["speech_balloon"],
  tags: ["comment"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F",
  description: "eye in speech bubble",
  category: "Smileys & Emotion",
  aliases: ["eye_speech_bubble"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDDE8\uFE0F",
  description: "left speech bubble",
  category: "Smileys & Emotion",
  aliases: ["left_speech_bubble"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDDEF\uFE0F",
  description: "right anger bubble",
  category: "Smileys & Emotion",
  aliases: ["right_anger_bubble"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCAD",
  description: "thought balloon",
  category: "Smileys & Emotion",
  aliases: ["thought_balloon"],
  tags: ["thinking"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCA4",
  description: "ZZZ",
  category: "Smileys & Emotion",
  aliases: ["zzz"],
  tags: ["sleeping"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC4B",
  description: "waving hand",
  category: "People & Body",
  aliases: ["wave"],
  tags: ["goodbye"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD1A",
  description: "raised back of hand",
  category: "People & Body",
  aliases: ["raised_back_of_hand"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDD90\uFE0F",
  description: "hand with fingers splayed",
  category: "People & Body",
  aliases: ["raised_hand_with_fingers_splayed"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\u270B",
  description: "raised hand",
  category: "People & Body",
  aliases: ["hand", "raised_hand"],
  tags: ["highfive", "stop"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDD96",
  description: "vulcan salute",
  category: "People & Body",
  aliases: ["vulcan_salute"],
  tags: ["prosper", "spock"],
  unicode_version: "7.0",
  ios_version: "8.3",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF1",
  description: "rightwards hand",
  category: "People & Body",
  aliases: ["rightwards_hand"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF2",
  description: "leftwards hand",
  category: "People & Body",
  aliases: ["leftwards_hand"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF3",
  description: "palm down hand",
  category: "People & Body",
  aliases: ["palm_down_hand"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF4",
  description: "palm up hand",
  category: "People & Body",
  aliases: ["palm_up_hand"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF7",
  description: "leftwards pushing hand",
  category: "People & Body",
  aliases: ["leftwards_pushing_hand"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF8",
  description: "rightwards pushing hand",
  category: "People & Body",
  aliases: ["rightwards_pushing_hand"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC4C",
  description: "OK hand",
  category: "People & Body",
  aliases: ["ok_hand"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD0C",
  description: "pinched fingers",
  category: "People & Body",
  aliases: ["pinched_fingers"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD0F",
  description: "pinching hand",
  category: "People & Body",
  aliases: ["pinching_hand"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\u270C\uFE0F",
  description: "victory hand",
  category: "People & Body",
  aliases: ["v"],
  tags: ["victory", "peace"],
  unicode_version: "",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD1E",
  description: "crossed fingers",
  category: "People & Body",
  aliases: ["crossed_fingers"],
  tags: ["luck", "hopeful"],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF0",
  description: "hand with index finger and thumb crossed",
  category: "People & Body",
  aliases: ["hand_with_index_finger_and_thumb_crossed"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD1F",
  description: "love-you gesture",
  category: "People & Body",
  aliases: ["love_you_gesture"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD18",
  description: "sign of the horns",
  category: "People & Body",
  aliases: ["metal"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD19",
  description: "call me hand",
  category: "People & Body",
  aliases: ["call_me_hand"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC48",
  description: "backhand index pointing left",
  category: "People & Body",
  aliases: ["point_left"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC49",
  description: "backhand index pointing right",
  category: "People & Body",
  aliases: ["point_right"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC46",
  description: "backhand index pointing up",
  category: "People & Body",
  aliases: ["point_up_2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDD95",
  description: "middle finger",
  category: "People & Body",
  aliases: ["middle_finger", "fu"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC47",
  description: "backhand index pointing down",
  category: "People & Body",
  aliases: ["point_down"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\u261D\uFE0F",
  description: "index pointing up",
  category: "People & Body",
  aliases: ["point_up"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF5",
  description: "index pointing at the viewer",
  category: "People & Body",
  aliases: ["index_pointing_at_the_viewer"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC4D",
  description: "thumbs up",
  category: "People & Body",
  aliases: ["+1", "thumbsup"],
  tags: ["approve", "ok"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC4E",
  description: "thumbs down",
  category: "People & Body",
  aliases: ["-1", "thumbsdown"],
  tags: ["disapprove", "bury"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\u270A",
  description: "raised fist",
  category: "People & Body",
  aliases: ["fist_raised", "fist"],
  tags: ["power"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC4A",
  description: "oncoming fist",
  category: "People & Body",
  aliases: ["fist_oncoming", "facepunch", "punch"],
  tags: ["attack"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD1B",
  description: "left-facing fist",
  category: "People & Body",
  aliases: ["fist_left"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD1C",
  description: "right-facing fist",
  category: "People & Body",
  aliases: ["fist_right"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC4F",
  description: "clapping hands",
  category: "People & Body",
  aliases: ["clap"],
  tags: ["praise", "applause"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4C",
  description: "raising hands",
  category: "People & Body",
  aliases: ["raised_hands"],
  tags: ["hooray"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEF6",
  description: "heart hands",
  category: "People & Body",
  aliases: ["heart_hands"],
  tags: ["love"],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC50",
  description: "open hands",
  category: "People & Body",
  aliases: ["open_hands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD32",
  description: "palms up together",
  category: "People & Body",
  aliases: ["palms_up_together"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD1D",
  description: "handshake",
  category: "People & Body",
  aliases: ["handshake"],
  tags: ["deal"],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4F",
  description: "folded hands",
  category: "People & Body",
  aliases: ["pray"],
  tags: ["please", "hope", "wish"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\u270D\uFE0F",
  description: "writing hand",
  category: "People & Body",
  aliases: ["writing_hand"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC85",
  description: "nail polish",
  category: "People & Body",
  aliases: ["nail_care"],
  tags: ["beauty", "manicure"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD33",
  description: "selfie",
  category: "People & Body",
  aliases: ["selfie"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDCAA",
  description: "flexed biceps",
  category: "People & Body",
  aliases: ["muscle"],
  tags: ["flex", "bicep", "strong", "workout"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDBE",
  description: "mechanical arm",
  category: "People & Body",
  aliases: ["mechanical_arm"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDBF",
  description: "mechanical leg",
  category: "People & Body",
  aliases: ["mechanical_leg"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDB5",
  description: "leg",
  category: "People & Body",
  aliases: ["leg"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDB6",
  description: "foot",
  category: "People & Body",
  aliases: ["foot"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC42",
  description: "ear",
  category: "People & Body",
  aliases: ["ear"],
  tags: ["hear", "sound", "listen"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDBB",
  description: "ear with hearing aid",
  category: "People & Body",
  aliases: ["ear_with_hearing_aid"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC43",
  description: "nose",
  category: "People & Body",
  aliases: ["nose"],
  tags: ["smell"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDE0",
  description: "brain",
  category: "People & Body",
  aliases: ["brain"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEC0",
  description: "anatomical heart",
  category: "People & Body",
  aliases: ["anatomical_heart"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDEC1",
  description: "lungs",
  category: "People & Body",
  aliases: ["lungs"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDDB7",
  description: "tooth",
  category: "People & Body",
  aliases: ["tooth"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDB4",
  description: "bone",
  category: "People & Body",
  aliases: ["bone"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC40",
  description: "eyes",
  category: "People & Body",
  aliases: ["eyes"],
  tags: ["look", "see", "watch"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC41\uFE0F",
  description: "eye",
  category: "People & Body",
  aliases: ["eye"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDC45",
  description: "tongue",
  category: "People & Body",
  aliases: ["tongue"],
  tags: ["taste"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC44",
  description: "mouth",
  category: "People & Body",
  aliases: ["lips"],
  tags: ["kiss"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEE6",
  description: "biting lip",
  category: "People & Body",
  aliases: ["biting_lip"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDC76",
  description: "baby",
  category: "People & Body",
  aliases: ["baby"],
  tags: ["child", "newborn"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD2",
  description: "child",
  category: "People & Body",
  aliases: ["child"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC66",
  description: "boy",
  category: "People & Body",
  aliases: ["boy"],
  tags: ["child"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC67",
  description: "girl",
  category: "People & Body",
  aliases: ["girl"],
  tags: ["child"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1",
  description: "person",
  category: "People & Body",
  aliases: ["adult"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC71",
  description: "person: blond hair",
  category: "People & Body",
  aliases: ["blond_haired_person"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68",
  description: "man",
  category: "People & Body",
  aliases: ["man"],
  tags: ["mustache", "father", "dad"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD4",
  description: "person: beard",
  category: "People & Body",
  aliases: ["bearded_person"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD4\u200D\u2642\uFE0F",
  description: "man: beard",
  category: "People & Body",
  aliases: ["man_beard"],
  tags: [],
  unicode_version: "13.1",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD4\u200D\u2640\uFE0F",
  description: "woman: beard",
  category: "People & Body",
  aliases: ["woman_beard"],
  tags: [],
  unicode_version: "13.1",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83E\uDDB0",
  description: "man: red hair",
  category: "People & Body",
  aliases: ["red_haired_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83E\uDDB1",
  description: "man: curly hair",
  category: "People & Body",
  aliases: ["curly_haired_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83E\uDDB3",
  description: "man: white hair",
  category: "People & Body",
  aliases: ["white_haired_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83E\uDDB2",
  description: "man: bald",
  category: "People & Body",
  aliases: ["bald_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69",
  description: "woman",
  category: "People & Body",
  aliases: ["woman"],
  tags: ["girls"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83E\uDDB0",
  description: "woman: red hair",
  category: "People & Body",
  aliases: ["red_haired_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83E\uDDB0",
  description: "person: red hair",
  category: "People & Body",
  aliases: ["person_red_hair"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83E\uDDB1",
  description: "woman: curly hair",
  category: "People & Body",
  aliases: ["curly_haired_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83E\uDDB1",
  description: "person: curly hair",
  category: "People & Body",
  aliases: ["person_curly_hair"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83E\uDDB3",
  description: "woman: white hair",
  category: "People & Body",
  aliases: ["white_haired_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83E\uDDB3",
  description: "person: white hair",
  category: "People & Body",
  aliases: ["person_white_hair"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83E\uDDB2",
  description: "woman: bald",
  category: "People & Body",
  aliases: ["bald_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83E\uDDB2",
  description: "person: bald",
  category: "People & Body",
  aliases: ["person_bald"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC71\u200D\u2640\uFE0F",
  description: "woman: blond hair",
  category: "People & Body",
  aliases: ["blond_haired_woman", "blonde_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC71\u200D\u2642\uFE0F",
  description: "man: blond hair",
  category: "People & Body",
  aliases: ["blond_haired_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD3",
  description: "older person",
  category: "People & Body",
  aliases: ["older_adult"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC74",
  description: "old man",
  category: "People & Body",
  aliases: ["older_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC75",
  description: "old woman",
  category: "People & Body",
  aliases: ["older_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4D",
  description: "person frowning",
  category: "People & Body",
  aliases: ["frowning_person"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4D\u200D\u2642\uFE0F",
  description: "man frowning",
  category: "People & Body",
  aliases: ["frowning_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4D\u200D\u2640\uFE0F",
  description: "woman frowning",
  category: "People & Body",
  aliases: ["frowning_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4E",
  description: "person pouting",
  category: "People & Body",
  aliases: ["pouting_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4E\u200D\u2642\uFE0F",
  description: "man pouting",
  category: "People & Body",
  aliases: ["pouting_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4E\u200D\u2640\uFE0F",
  description: "woman pouting",
  category: "People & Body",
  aliases: ["pouting_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE45",
  description: "person gesturing NO",
  category: "People & Body",
  aliases: ["no_good"],
  tags: ["stop", "halt", "denied"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE45\u200D\u2642\uFE0F",
  description: "man gesturing NO",
  category: "People & Body",
  aliases: ["no_good_man", "ng_man"],
  tags: ["stop", "halt", "denied"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE45\u200D\u2640\uFE0F",
  description: "woman gesturing NO",
  category: "People & Body",
  aliases: ["no_good_woman", "ng_woman"],
  tags: ["stop", "halt", "denied"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE46",
  description: "person gesturing OK",
  category: "People & Body",
  aliases: ["ok_person"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE46\u200D\u2642\uFE0F",
  description: "man gesturing OK",
  category: "People & Body",
  aliases: ["ok_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE46\u200D\u2640\uFE0F",
  description: "woman gesturing OK",
  category: "People & Body",
  aliases: ["ok_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC81",
  description: "person tipping hand",
  category: "People & Body",
  aliases: ["tipping_hand_person", "information_desk_person"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC81\u200D\u2642\uFE0F",
  description: "man tipping hand",
  category: "People & Body",
  aliases: ["tipping_hand_man", "sassy_man"],
  tags: ["information"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC81\u200D\u2640\uFE0F",
  description: "woman tipping hand",
  category: "People & Body",
  aliases: ["tipping_hand_woman", "sassy_woman"],
  tags: ["information"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4B",
  description: "person raising hand",
  category: "People & Body",
  aliases: ["raising_hand"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4B\u200D\u2642\uFE0F",
  description: "man raising hand",
  category: "People & Body",
  aliases: ["raising_hand_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE4B\u200D\u2640\uFE0F",
  description: "woman raising hand",
  category: "People & Body",
  aliases: ["raising_hand_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCF",
  description: "deaf person",
  category: "People & Body",
  aliases: ["deaf_person"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCF\u200D\u2642\uFE0F",
  description: "deaf man",
  category: "People & Body",
  aliases: ["deaf_man"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCF\u200D\u2640\uFE0F",
  description: "deaf woman",
  category: "People & Body",
  aliases: ["deaf_woman"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE47",
  description: "person bowing",
  category: "People & Body",
  aliases: ["bow"],
  tags: ["respect", "thanks"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE47\u200D\u2642\uFE0F",
  description: "man bowing",
  category: "People & Body",
  aliases: ["bowing_man"],
  tags: ["respect", "thanks"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDE47\u200D\u2640\uFE0F",
  description: "woman bowing",
  category: "People & Body",
  aliases: ["bowing_woman"],
  tags: ["respect", "thanks"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD26",
  description: "person facepalming",
  category: "People & Body",
  aliases: ["facepalm"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD26\u200D\u2642\uFE0F",
  description: "man facepalming",
  category: "People & Body",
  aliases: ["man_facepalming"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD26\u200D\u2640\uFE0F",
  description: "woman facepalming",
  category: "People & Body",
  aliases: ["woman_facepalming"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD37",
  description: "person shrugging",
  category: "People & Body",
  aliases: ["shrug"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD37\u200D\u2642\uFE0F",
  description: "man shrugging",
  category: "People & Body",
  aliases: ["man_shrugging"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD37\u200D\u2640\uFE0F",
  description: "woman shrugging",
  category: "People & Body",
  aliases: ["woman_shrugging"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\u2695\uFE0F",
  description: "health worker",
  category: "People & Body",
  aliases: ["health_worker"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\u2695\uFE0F",
  description: "man health worker",
  category: "People & Body",
  aliases: ["man_health_worker"],
  tags: ["doctor", "nurse"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\u2695\uFE0F",
  description: "woman health worker",
  category: "People & Body",
  aliases: ["woman_health_worker"],
  tags: ["doctor", "nurse"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDF93",
  description: "student",
  category: "People & Body",
  aliases: ["student"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83C\uDF93",
  description: "man student",
  category: "People & Body",
  aliases: ["man_student"],
  tags: ["graduation"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83C\uDF93",
  description: "woman student",
  category: "People & Body",
  aliases: ["woman_student"],
  tags: ["graduation"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDFEB",
  description: "teacher",
  category: "People & Body",
  aliases: ["teacher"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83C\uDFEB",
  description: "man teacher",
  category: "People & Body",
  aliases: ["man_teacher"],
  tags: ["school", "professor"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83C\uDFEB",
  description: "woman teacher",
  category: "People & Body",
  aliases: ["woman_teacher"],
  tags: ["school", "professor"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\u2696\uFE0F",
  description: "judge",
  category: "People & Body",
  aliases: ["judge"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\u2696\uFE0F",
  description: "man judge",
  category: "People & Body",
  aliases: ["man_judge"],
  tags: ["justice"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\u2696\uFE0F",
  description: "woman judge",
  category: "People & Body",
  aliases: ["woman_judge"],
  tags: ["justice"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDF3E",
  description: "farmer",
  category: "People & Body",
  aliases: ["farmer"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83C\uDF3E",
  description: "man farmer",
  category: "People & Body",
  aliases: ["man_farmer"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83C\uDF3E",
  description: "woman farmer",
  category: "People & Body",
  aliases: ["woman_farmer"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDF73",
  description: "cook",
  category: "People & Body",
  aliases: ["cook"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83C\uDF73",
  description: "man cook",
  category: "People & Body",
  aliases: ["man_cook"],
  tags: ["chef"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83C\uDF73",
  description: "woman cook",
  category: "People & Body",
  aliases: ["woman_cook"],
  tags: ["chef"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83D\uDD27",
  description: "mechanic",
  category: "People & Body",
  aliases: ["mechanic"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDD27",
  description: "man mechanic",
  category: "People & Body",
  aliases: ["man_mechanic"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDD27",
  description: "woman mechanic",
  category: "People & Body",
  aliases: ["woman_mechanic"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDFED",
  description: "factory worker",
  category: "People & Body",
  aliases: ["factory_worker"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83C\uDFED",
  description: "man factory worker",
  category: "People & Body",
  aliases: ["man_factory_worker"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83C\uDFED",
  description: "woman factory worker",
  category: "People & Body",
  aliases: ["woman_factory_worker"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83D\uDCBC",
  description: "office worker",
  category: "People & Body",
  aliases: ["office_worker"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDCBC",
  description: "man office worker",
  category: "People & Body",
  aliases: ["man_office_worker"],
  tags: ["business"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDCBC",
  description: "woman office worker",
  category: "People & Body",
  aliases: ["woman_office_worker"],
  tags: ["business"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83D\uDD2C",
  description: "scientist",
  category: "People & Body",
  aliases: ["scientist"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDD2C",
  description: "man scientist",
  category: "People & Body",
  aliases: ["man_scientist"],
  tags: ["research"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDD2C",
  description: "woman scientist",
  category: "People & Body",
  aliases: ["woman_scientist"],
  tags: ["research"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83D\uDCBB",
  description: "technologist",
  category: "People & Body",
  aliases: ["technologist"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDCBB",
  description: "man technologist",
  category: "People & Body",
  aliases: ["man_technologist"],
  tags: ["coder"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDCBB",
  description: "woman technologist",
  category: "People & Body",
  aliases: ["woman_technologist"],
  tags: ["coder"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDFA4",
  description: "singer",
  category: "People & Body",
  aliases: ["singer"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83C\uDFA4",
  description: "man singer",
  category: "People & Body",
  aliases: ["man_singer"],
  tags: ["rockstar"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83C\uDFA4",
  description: "woman singer",
  category: "People & Body",
  aliases: ["woman_singer"],
  tags: ["rockstar"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDFA8",
  description: "artist",
  category: "People & Body",
  aliases: ["artist"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83C\uDFA8",
  description: "man artist",
  category: "People & Body",
  aliases: ["man_artist"],
  tags: ["painter"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83C\uDFA8",
  description: "woman artist",
  category: "People & Body",
  aliases: ["woman_artist"],
  tags: ["painter"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\u2708\uFE0F",
  description: "pilot",
  category: "People & Body",
  aliases: ["pilot"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\u2708\uFE0F",
  description: "man pilot",
  category: "People & Body",
  aliases: ["man_pilot"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\u2708\uFE0F",
  description: "woman pilot",
  category: "People & Body",
  aliases: ["woman_pilot"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83D\uDE80",
  description: "astronaut",
  category: "People & Body",
  aliases: ["astronaut"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDE80",
  description: "man astronaut",
  category: "People & Body",
  aliases: ["man_astronaut"],
  tags: ["space"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDE80",
  description: "woman astronaut",
  category: "People & Body",
  aliases: ["woman_astronaut"],
  tags: ["space"],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83D\uDE92",
  description: "firefighter",
  category: "People & Body",
  aliases: ["firefighter"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDE92",
  description: "man firefighter",
  category: "People & Body",
  aliases: ["man_firefighter"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDE92",
  description: "woman firefighter",
  category: "People & Body",
  aliases: ["woman_firefighter"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC6E",
  description: "police officer",
  category: "People & Body",
  aliases: ["police_officer", "cop"],
  tags: ["law"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC6E\u200D\u2642\uFE0F",
  description: "man police officer",
  category: "People & Body",
  aliases: ["policeman"],
  tags: ["law", "cop"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC6E\u200D\u2640\uFE0F",
  description: "woman police officer",
  category: "People & Body",
  aliases: ["policewoman"],
  tags: ["law", "cop"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDD75\uFE0F",
  description: "detective",
  category: "People & Body",
  aliases: ["detective"],
  tags: ["sleuth"],
  unicode_version: "7.0",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDD75\uFE0F\u200D\u2642\uFE0F",
  description: "man detective",
  category: "People & Body",
  aliases: ["male_detective"],
  tags: ["sleuth"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDD75\uFE0F\u200D\u2640\uFE0F",
  description: "woman detective",
  category: "People & Body",
  aliases: ["female_detective"],
  tags: ["sleuth"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC82",
  description: "guard",
  category: "People & Body",
  aliases: ["guard"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC82\u200D\u2642\uFE0F",
  description: "man guard",
  category: "People & Body",
  aliases: ["guardsman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC82\u200D\u2640\uFE0F",
  description: "woman guard",
  category: "People & Body",
  aliases: ["guardswoman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD77",
  description: "ninja",
  category: "People & Body",
  aliases: ["ninja"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC77",
  description: "construction worker",
  category: "People & Body",
  aliases: ["construction_worker"],
  tags: ["helmet"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC77\u200D\u2642\uFE0F",
  description: "man construction worker",
  category: "People & Body",
  aliases: ["construction_worker_man"],
  tags: ["helmet"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC77\u200D\u2640\uFE0F",
  description: "woman construction worker",
  category: "People & Body",
  aliases: ["construction_worker_woman"],
  tags: ["helmet"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEC5",
  description: "person with crown",
  category: "People & Body",
  aliases: ["person_with_crown"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD34",
  description: "prince",
  category: "People & Body",
  aliases: ["prince"],
  tags: ["crown", "royal"],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC78",
  description: "princess",
  category: "People & Body",
  aliases: ["princess"],
  tags: ["crown", "royal"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC73",
  description: "person wearing turban",
  category: "People & Body",
  aliases: ["person_with_turban"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC73\u200D\u2642\uFE0F",
  description: "man wearing turban",
  category: "People & Body",
  aliases: ["man_with_turban"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC73\u200D\u2640\uFE0F",
  description: "woman wearing turban",
  category: "People & Body",
  aliases: ["woman_with_turban"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC72",
  description: "person with skullcap",
  category: "People & Body",
  aliases: ["man_with_gua_pi_mao"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD5",
  description: "woman with headscarf",
  category: "People & Body",
  aliases: ["woman_with_headscarf"],
  tags: ["hijab"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD35",
  description: "person in tuxedo",
  category: "People & Body",
  aliases: ["person_in_tuxedo"],
  tags: ["groom", "marriage", "wedding"],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD35\u200D\u2642\uFE0F",
  description: "man in tuxedo",
  category: "People & Body",
  aliases: ["man_in_tuxedo"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD35\u200D\u2640\uFE0F",
  description: "woman in tuxedo",
  category: "People & Body",
  aliases: ["woman_in_tuxedo"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC70",
  description: "person with veil",
  category: "People & Body",
  aliases: ["person_with_veil"],
  tags: ["marriage", "wedding"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC70\u200D\u2642\uFE0F",
  description: "man with veil",
  category: "People & Body",
  aliases: ["man_with_veil"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC70\u200D\u2640\uFE0F",
  description: "woman with veil",
  category: "People & Body",
  aliases: ["woman_with_veil", "bride_with_veil"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD30",
  description: "pregnant woman",
  category: "People & Body",
  aliases: ["pregnant_woman"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEC3",
  description: "pregnant man",
  category: "People & Body",
  aliases: ["pregnant_man"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDEC4",
  description: "pregnant person",
  category: "People & Body",
  aliases: ["pregnant_person"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD31",
  description: "breast-feeding",
  category: "People & Body",
  aliases: ["breast_feeding"],
  tags: ["nursing"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83C\uDF7C",
  description: "woman feeding baby",
  category: "People & Body",
  aliases: ["woman_feeding_baby"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83C\uDF7C",
  description: "man feeding baby",
  category: "People & Body",
  aliases: ["man_feeding_baby"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDF7C",
  description: "person feeding baby",
  category: "People & Body",
  aliases: ["person_feeding_baby"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC7C",
  description: "baby angel",
  category: "People & Body",
  aliases: ["angel"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDF85",
  description: "Santa Claus",
  category: "People & Body",
  aliases: ["santa"],
  tags: ["christmas"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD36",
  description: "Mrs. Claus",
  category: "People & Body",
  aliases: ["mrs_claus"],
  tags: ["santa"],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83C\uDF84",
  description: "mx claus",
  category: "People & Body",
  aliases: ["mx_claus"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDB8",
  description: "superhero",
  category: "People & Body",
  aliases: ["superhero"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDB8\u200D\u2642\uFE0F",
  description: "man superhero",
  category: "People & Body",
  aliases: ["superhero_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDB8\u200D\u2640\uFE0F",
  description: "woman superhero",
  category: "People & Body",
  aliases: ["superhero_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDB9",
  description: "supervillain",
  category: "People & Body",
  aliases: ["supervillain"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDB9\u200D\u2642\uFE0F",
  description: "man supervillain",
  category: "People & Body",
  aliases: ["supervillain_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDB9\u200D\u2640\uFE0F",
  description: "woman supervillain",
  category: "People & Body",
  aliases: ["supervillain_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD9",
  description: "mage",
  category: "People & Body",
  aliases: ["mage"],
  tags: ["wizard"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD9\u200D\u2642\uFE0F",
  description: "man mage",
  category: "People & Body",
  aliases: ["mage_man"],
  tags: ["wizard"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD9\u200D\u2640\uFE0F",
  description: "woman mage",
  category: "People & Body",
  aliases: ["mage_woman"],
  tags: ["wizard"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDA",
  description: "fairy",
  category: "People & Body",
  aliases: ["fairy"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDA\u200D\u2642\uFE0F",
  description: "man fairy",
  category: "People & Body",
  aliases: ["fairy_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDA\u200D\u2640\uFE0F",
  description: "woman fairy",
  category: "People & Body",
  aliases: ["fairy_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDB",
  description: "vampire",
  category: "People & Body",
  aliases: ["vampire"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDB\u200D\u2642\uFE0F",
  description: "man vampire",
  category: "People & Body",
  aliases: ["vampire_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDB\u200D\u2640\uFE0F",
  description: "woman vampire",
  category: "People & Body",
  aliases: ["vampire_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDC",
  description: "merperson",
  category: "People & Body",
  aliases: ["merperson"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDC\u200D\u2642\uFE0F",
  description: "merman",
  category: "People & Body",
  aliases: ["merman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDC\u200D\u2640\uFE0F",
  description: "mermaid",
  category: "People & Body",
  aliases: ["mermaid"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDD",
  description: "elf",
  category: "People & Body",
  aliases: ["elf"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDD\u200D\u2642\uFE0F",
  description: "man elf",
  category: "People & Body",
  aliases: ["elf_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDD\u200D\u2640\uFE0F",
  description: "woman elf",
  category: "People & Body",
  aliases: ["elf_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDDE",
  description: "genie",
  category: "People & Body",
  aliases: ["genie"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDDE\u200D\u2642\uFE0F",
  description: "man genie",
  category: "People & Body",
  aliases: ["genie_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDDE\u200D\u2640\uFE0F",
  description: "woman genie",
  category: "People & Body",
  aliases: ["genie_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDDF",
  description: "zombie",
  category: "People & Body",
  aliases: ["zombie"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDDF\u200D\u2642\uFE0F",
  description: "man zombie",
  category: "People & Body",
  aliases: ["zombie_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDDF\u200D\u2640\uFE0F",
  description: "woman zombie",
  category: "People & Body",
  aliases: ["zombie_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDCC",
  description: "troll",
  category: "People & Body",
  aliases: ["troll"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDC86",
  description: "person getting massage",
  category: "People & Body",
  aliases: ["massage"],
  tags: ["spa"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC86\u200D\u2642\uFE0F",
  description: "man getting massage",
  category: "People & Body",
  aliases: ["massage_man"],
  tags: ["spa"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC86\u200D\u2640\uFE0F",
  description: "woman getting massage",
  category: "People & Body",
  aliases: ["massage_woman"],
  tags: ["spa"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC87",
  description: "person getting haircut",
  category: "People & Body",
  aliases: ["haircut"],
  tags: ["beauty"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC87\u200D\u2642\uFE0F",
  description: "man getting haircut",
  category: "People & Body",
  aliases: ["haircut_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC87\u200D\u2640\uFE0F",
  description: "woman getting haircut",
  category: "People & Body",
  aliases: ["haircut_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB6",
  description: "person walking",
  category: "People & Body",
  aliases: ["walking"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB6\u200D\u2642\uFE0F",
  description: "man walking",
  category: "People & Body",
  aliases: ["walking_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB6\u200D\u2640\uFE0F",
  description: "woman walking",
  category: "People & Body",
  aliases: ["walking_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCD",
  description: "person standing",
  category: "People & Body",
  aliases: ["standing_person"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCD\u200D\u2642\uFE0F",
  description: "man standing",
  category: "People & Body",
  aliases: ["standing_man"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCD\u200D\u2640\uFE0F",
  description: "woman standing",
  category: "People & Body",
  aliases: ["standing_woman"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCE",
  description: "person kneeling",
  category: "People & Body",
  aliases: ["kneeling_person"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCE\u200D\u2642\uFE0F",
  description: "man kneeling",
  category: "People & Body",
  aliases: ["kneeling_man"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDCE\u200D\u2640\uFE0F",
  description: "woman kneeling",
  category: "People & Body",
  aliases: ["kneeling_woman"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83E\uDDAF",
  description: "person with white cane",
  category: "People & Body",
  aliases: ["person_with_probing_cane"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83E\uDDAF",
  description: "man with white cane",
  category: "People & Body",
  aliases: ["man_with_probing_cane"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83E\uDDAF",
  description: "woman with white cane",
  category: "People & Body",
  aliases: ["woman_with_probing_cane"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83E\uDDBC",
  description: "person in motorized wheelchair",
  category: "People & Body",
  aliases: ["person_in_motorized_wheelchair"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83E\uDDBC",
  description: "man in motorized wheelchair",
  category: "People & Body",
  aliases: ["man_in_motorized_wheelchair"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83E\uDDBC",
  description: "woman in motorized wheelchair",
  category: "People & Body",
  aliases: ["woman_in_motorized_wheelchair"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83E\uDDBD",
  description: "person in manual wheelchair",
  category: "People & Body",
  aliases: ["person_in_manual_wheelchair"],
  tags: [],
  unicode_version: "12.1",
  ios_version: "13.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\uD83E\uDDBD",
  description: "man in manual wheelchair",
  category: "People & Body",
  aliases: ["man_in_manual_wheelchair"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\uD83E\uDDBD",
  description: "woman in manual wheelchair",
  category: "People & Body",
  aliases: ["woman_in_manual_wheelchair"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFC3",
  description: "person running",
  category: "People & Body",
  aliases: ["runner", "running"],
  tags: ["exercise", "workout", "marathon"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFC3\u200D\u2642\uFE0F",
  description: "man running",
  category: "People & Body",
  aliases: ["running_man"],
  tags: ["exercise", "workout", "marathon"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFC3\u200D\u2640\uFE0F",
  description: "woman running",
  category: "People & Body",
  aliases: ["running_woman"],
  tags: ["exercise", "workout", "marathon"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC83",
  description: "woman dancing",
  category: "People & Body",
  aliases: ["woman_dancing", "dancer"],
  tags: ["dress"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDD7A",
  description: "man dancing",
  category: "People & Body",
  aliases: ["man_dancing"],
  tags: ["dancer"],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83D\uDD74\uFE0F",
  description: "person in suit levitating",
  category: "People & Body",
  aliases: ["business_suit_levitating"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC6F",
  description: "people with bunny ears",
  category: "People & Body",
  aliases: ["dancers"],
  tags: ["bunny"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC6F\u200D\u2642\uFE0F",
  description: "men with bunny ears",
  category: "People & Body",
  aliases: ["dancing_men"],
  tags: ["bunny"],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC6F\u200D\u2640\uFE0F",
  description: "women with bunny ears",
  category: "People & Body",
  aliases: ["dancing_women"],
  tags: ["bunny"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDD6",
  description: "person in steamy room",
  category: "People & Body",
  aliases: ["sauna_person"],
  tags: ["steamy"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD6\u200D\u2642\uFE0F",
  description: "man in steamy room",
  category: "People & Body",
  aliases: ["sauna_man"],
  tags: ["steamy"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD6\u200D\u2640\uFE0F",
  description: "woman in steamy room",
  category: "People & Body",
  aliases: ["sauna_woman"],
  tags: ["steamy"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD7",
  description: "person climbing",
  category: "People & Body",
  aliases: ["climbing"],
  tags: ["bouldering"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD7\u200D\u2642\uFE0F",
  description: "man climbing",
  category: "People & Body",
  aliases: ["climbing_man"],
  tags: ["bouldering"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD7\u200D\u2640\uFE0F",
  description: "woman climbing",
  category: "People & Body",
  aliases: ["climbing_woman"],
  tags: ["bouldering"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD3A",
  description: "person fencing",
  category: "People & Body",
  aliases: ["person_fencing"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDFC7",
  description: "horse racing",
  category: "People & Body",
  aliases: ["horse_racing"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\u26F7\uFE0F",
  description: "skier",
  category: "People & Body",
  aliases: ["skier"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFC2",
  description: "snowboarder",
  category: "People & Body",
  aliases: ["snowboarder"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCC\uFE0F",
  description: "person golfing",
  category: "People & Body",
  aliases: ["golfing"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCC\uFE0F\u200D\u2642\uFE0F",
  description: "man golfing",
  category: "People & Body",
  aliases: ["golfing_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCC\uFE0F\u200D\u2640\uFE0F",
  description: "woman golfing",
  category: "People & Body",
  aliases: ["golfing_woman"],
  tags: [],
  unicode_version: "",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFC4",
  description: "person surfing",
  category: "People & Body",
  aliases: ["surfer"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFC4\u200D\u2642\uFE0F",
  description: "man surfing",
  category: "People & Body",
  aliases: ["surfing_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFC4\u200D\u2640\uFE0F",
  description: "woman surfing",
  category: "People & Body",
  aliases: ["surfing_woman"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEA3",
  description: "person rowing boat",
  category: "People & Body",
  aliases: ["rowboat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEA3\u200D\u2642\uFE0F",
  description: "man rowing boat",
  category: "People & Body",
  aliases: ["rowing_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEA3\u200D\u2640\uFE0F",
  description: "woman rowing boat",
  category: "People & Body",
  aliases: ["rowing_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCA",
  description: "person swimming",
  category: "People & Body",
  aliases: ["swimmer"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCA\u200D\u2642\uFE0F",
  description: "man swimming",
  category: "People & Body",
  aliases: ["swimming_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCA\u200D\u2640\uFE0F",
  description: "woman swimming",
  category: "People & Body",
  aliases: ["swimming_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\u26F9\uFE0F",
  description: "person bouncing ball",
  category: "People & Body",
  aliases: ["bouncing_ball_person"],
  tags: ["basketball"],
  unicode_version: "5.2",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\u26F9\uFE0F\u200D\u2642\uFE0F",
  description: "man bouncing ball",
  category: "People & Body",
  aliases: ["bouncing_ball_man", "basketball_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\u26F9\uFE0F\u200D\u2640\uFE0F",
  description: "woman bouncing ball",
  category: "People & Body",
  aliases: ["bouncing_ball_woman", "basketball_woman"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCB\uFE0F",
  description: "person lifting weights",
  category: "People & Body",
  aliases: ["weight_lifting"],
  tags: ["gym", "workout"],
  unicode_version: "7.0",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCB\uFE0F\u200D\u2642\uFE0F",
  description: "man lifting weights",
  category: "People & Body",
  aliases: ["weight_lifting_man"],
  tags: ["gym", "workout"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83C\uDFCB\uFE0F\u200D\u2640\uFE0F",
  description: "woman lifting weights",
  category: "People & Body",
  aliases: ["weight_lifting_woman"],
  tags: ["gym", "workout"],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB4",
  description: "person biking",
  category: "People & Body",
  aliases: ["bicyclist"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB4\u200D\u2642\uFE0F",
  description: "man biking",
  category: "People & Body",
  aliases: ["biking_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB4\u200D\u2640\uFE0F",
  description: "woman biking",
  category: "People & Body",
  aliases: ["biking_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB5",
  description: "person mountain biking",
  category: "People & Body",
  aliases: ["mountain_bicyclist"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB5\u200D\u2642\uFE0F",
  description: "man mountain biking",
  category: "People & Body",
  aliases: ["mountain_biking_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEB5\u200D\u2640\uFE0F",
  description: "woman mountain biking",
  category: "People & Body",
  aliases: ["mountain_biking_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD38",
  description: "person cartwheeling",
  category: "People & Body",
  aliases: ["cartwheeling"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD38\u200D\u2642\uFE0F",
  description: "man cartwheeling",
  category: "People & Body",
  aliases: ["man_cartwheeling"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD38\u200D\u2640\uFE0F",
  description: "woman cartwheeling",
  category: "People & Body",
  aliases: ["woman_cartwheeling"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD3C",
  description: "people wrestling",
  category: "People & Body",
  aliases: ["wrestling"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD3C\u200D\u2642\uFE0F",
  description: "men wrestling",
  category: "People & Body",
  aliases: ["men_wrestling"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD3C\u200D\u2640\uFE0F",
  description: "women wrestling",
  category: "People & Body",
  aliases: ["women_wrestling"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD3D",
  description: "person playing water polo",
  category: "People & Body",
  aliases: ["water_polo"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD3D\u200D\u2642\uFE0F",
  description: "man playing water polo",
  category: "People & Body",
  aliases: ["man_playing_water_polo"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD3D\u200D\u2640\uFE0F",
  description: "woman playing water polo",
  category: "People & Body",
  aliases: ["woman_playing_water_polo"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD3E",
  description: "person playing handball",
  category: "People & Body",
  aliases: ["handball_person"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD3E\u200D\u2642\uFE0F",
  description: "man playing handball",
  category: "People & Body",
  aliases: ["man_playing_handball"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD3E\u200D\u2640\uFE0F",
  description: "woman playing handball",
  category: "People & Body",
  aliases: ["woman_playing_handball"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD39",
  description: "person juggling",
  category: "People & Body",
  aliases: ["juggling_person"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD39\u200D\u2642\uFE0F",
  description: "man juggling",
  category: "People & Body",
  aliases: ["man_juggling"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDD39\u200D\u2640\uFE0F",
  description: "woman juggling",
  category: "People & Body",
  aliases: ["woman_juggling"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD8",
  description: "person in lotus position",
  category: "People & Body",
  aliases: ["lotus_position"],
  tags: ["meditation"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD8\u200D\u2642\uFE0F",
  description: "man in lotus position",
  category: "People & Body",
  aliases: ["lotus_position_man"],
  tags: ["meditation"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD8\u200D\u2640\uFE0F",
  description: "woman in lotus position",
  category: "People & Body",
  aliases: ["lotus_position_woman"],
  tags: ["meditation"],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDEC0",
  description: "person taking bath",
  category: "People & Body",
  aliases: ["bath"],
  tags: ["shower"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDECC",
  description: "person in bed",
  category: "People & Body",
  aliases: ["sleeping_bed"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1",
  skin_tones: true
}, {
  emoji: "\uD83E\uDDD1\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1",
  description: "people holding hands",
  category: "People & Body",
  aliases: ["people_holding_hands"],
  tags: ["couple", "date"],
  unicode_version: "12.0",
  ios_version: "13.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC6D",
  description: "women holding hands",
  category: "People & Body",
  aliases: ["two_women_holding_hands"],
  tags: ["couple", "date"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC6B",
  description: "woman and man holding hands",
  category: "People & Body",
  aliases: ["couple"],
  tags: ["date"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC6C",
  description: "men holding hands",
  category: "People & Body",
  aliases: ["two_men_holding_hands"],
  tags: ["couple", "date"],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC8F",
  description: "kiss",
  category: "People & Body",
  aliases: ["couplekiss"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68",
  description: "kiss: woman, man",
  category: "People & Body",
  aliases: ["couplekiss_man_woman"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68",
  description: "kiss: man, man",
  category: "People & Body",
  aliases: ["couplekiss_man_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC69",
  description: "kiss: woman, woman",
  category: "People & Body",
  aliases: ["couplekiss_woman_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC91",
  description: "couple with heart",
  category: "People & Body",
  aliases: ["couple_with_heart"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC68",
  description: "couple with heart: woman, man",
  category: "People & Body",
  aliases: ["couple_with_heart_woman_man"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC68",
  description: "couple with heart: man, man",
  category: "People & Body",
  aliases: ["couple_with_heart_man_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC69",
  description: "couple with heart: woman, woman",
  category: "People & Body",
  aliases: ["couple_with_heart_woman_woman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3",
  skin_tones: true
}, {
  emoji: "\uD83D\uDC6A",
  description: "family",
  category: "People & Body",
  aliases: ["family"],
  tags: ["home", "parents", "child"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66",
  description: "family: man, woman, boy",
  category: "People & Body",
  aliases: ["family_man_woman_boy"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67",
  description: "family: man, woman, girl",
  category: "People & Body",
  aliases: ["family_man_woman_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
  description: "family: man, woman, girl, boy",
  category: "People & Body",
  aliases: ["family_man_woman_girl_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66",
  description: "family: man, woman, boy, boy",
  category: "People & Body",
  aliases: ["family_man_woman_boy_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67",
  description: "family: man, woman, girl, girl",
  category: "People & Body",
  aliases: ["family_man_woman_girl_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC66",
  description: "family: man, man, boy",
  category: "People & Body",
  aliases: ["family_man_man_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67",
  description: "family: man, man, girl",
  category: "People & Body",
  aliases: ["family_man_man_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
  description: "family: man, man, girl, boy",
  category: "People & Body",
  aliases: ["family_man_man_girl_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC66\u200D\uD83D\uDC66",
  description: "family: man, man, boy, boy",
  category: "People & Body",
  aliases: ["family_man_man_boy_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC67",
  description: "family: man, man, girl, girl",
  category: "People & Body",
  aliases: ["family_man_man_girl_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC66",
  description: "family: woman, woman, boy",
  category: "People & Body",
  aliases: ["family_woman_woman_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67",
  description: "family: woman, woman, girl",
  category: "People & Body",
  aliases: ["family_woman_woman_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
  description: "family: woman, woman, girl, boy",
  category: "People & Body",
  aliases: ["family_woman_woman_girl_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66",
  description: "family: woman, woman, boy, boy",
  category: "People & Body",
  aliases: ["family_woman_woman_boy_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67",
  description: "family: woman, woman, girl, girl",
  category: "People & Body",
  aliases: ["family_woman_woman_girl_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC66",
  description: "family: man, boy",
  category: "People & Body",
  aliases: ["family_man_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC66\u200D\uD83D\uDC66",
  description: "family: man, boy, boy",
  category: "People & Body",
  aliases: ["family_man_boy_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC67",
  description: "family: man, girl",
  category: "People & Body",
  aliases: ["family_man_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
  description: "family: man, girl, boy",
  category: "People & Body",
  aliases: ["family_man_girl_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC67",
  description: "family: man, girl, girl",
  category: "People & Body",
  aliases: ["family_man_girl_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC66",
  description: "family: woman, boy",
  category: "People & Body",
  aliases: ["family_woman_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66",
  description: "family: woman, boy, boy",
  category: "People & Body",
  aliases: ["family_woman_boy_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC67",
  description: "family: woman, girl",
  category: "People & Body",
  aliases: ["family_woman_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
  description: "family: woman, girl, boy",
  category: "People & Body",
  aliases: ["family_woman_girl_boy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67",
  description: "family: woman, girl, girl",
  category: "People & Body",
  aliases: ["family_woman_girl_girl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83D\uDDE3\uFE0F",
  description: "speaking head",
  category: "People & Body",
  aliases: ["speaking_head"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDC64",
  description: "bust in silhouette",
  category: "People & Body",
  aliases: ["bust_in_silhouette"],
  tags: ["user"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC65",
  description: "busts in silhouette",
  category: "People & Body",
  aliases: ["busts_in_silhouette"],
  tags: ["users", "group", "team"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEC2",
  description: "people hugging",
  category: "People & Body",
  aliases: ["people_hugging"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDC63",
  description: "footprints",
  category: "People & Body",
  aliases: ["footprints"],
  tags: ["feet", "tracks"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC35",
  description: "monkey face",
  category: "Animals & Nature",
  aliases: ["monkey_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC12",
  description: "monkey",
  category: "Animals & Nature",
  aliases: ["monkey"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD8D",
  description: "gorilla",
  category: "Animals & Nature",
  aliases: ["gorilla"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDDA7",
  description: "orangutan",
  category: "Animals & Nature",
  aliases: ["orangutan"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDC36",
  description: "dog face",
  category: "Animals & Nature",
  aliases: ["dog"],
  tags: ["pet"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC15",
  description: "dog",
  category: "Animals & Nature",
  aliases: ["dog2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDAE",
  description: "guide dog",
  category: "Animals & Nature",
  aliases: ["guide_dog"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDC15\u200D\uD83E\uDDBA",
  description: "service dog",
  category: "Animals & Nature",
  aliases: ["service_dog"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDC29",
  description: "poodle",
  category: "Animals & Nature",
  aliases: ["poodle"],
  tags: ["dog"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC3A",
  description: "wolf",
  category: "Animals & Nature",
  aliases: ["wolf"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD8A",
  description: "fox",
  category: "Animals & Nature",
  aliases: ["fox_face"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD9D",
  description: "raccoon",
  category: "Animals & Nature",
  aliases: ["raccoon"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC31",
  description: "cat face",
  category: "Animals & Nature",
  aliases: ["cat"],
  tags: ["pet"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC08",
  description: "cat",
  category: "Animals & Nature",
  aliases: ["cat2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC08\u200D\u2B1B",
  description: "black cat",
  category: "Animals & Nature",
  aliases: ["black_cat"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD81",
  description: "lion",
  category: "Animals & Nature",
  aliases: ["lion"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDC2F",
  description: "tiger face",
  category: "Animals & Nature",
  aliases: ["tiger"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC05",
  description: "tiger",
  category: "Animals & Nature",
  aliases: ["tiger2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC06",
  description: "leopard",
  category: "Animals & Nature",
  aliases: ["leopard"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC34",
  description: "horse face",
  category: "Animals & Nature",
  aliases: ["horse"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDECE",
  description: "moose",
  category: "Animals & Nature",
  aliases: ["moose"],
  tags: ["canada"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83E\uDECF",
  description: "donkey",
  category: "Animals & Nature",
  aliases: ["donkey"],
  tags: ["mule"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDC0E",
  description: "horse",
  category: "Animals & Nature",
  aliases: ["racehorse"],
  tags: ["speed"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD84",
  description: "unicorn",
  category: "Animals & Nature",
  aliases: ["unicorn"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD93",
  description: "zebra",
  category: "Animals & Nature",
  aliases: ["zebra"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD8C",
  description: "deer",
  category: "Animals & Nature",
  aliases: ["deer"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDDAC",
  description: "bison",
  category: "Animals & Nature",
  aliases: ["bison"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDC2E",
  description: "cow face",
  category: "Animals & Nature",
  aliases: ["cow"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC02",
  description: "ox",
  category: "Animals & Nature",
  aliases: ["ox"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC03",
  description: "water buffalo",
  category: "Animals & Nature",
  aliases: ["water_buffalo"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC04",
  description: "cow",
  category: "Animals & Nature",
  aliases: ["cow2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC37",
  description: "pig face",
  category: "Animals & Nature",
  aliases: ["pig"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC16",
  description: "pig",
  category: "Animals & Nature",
  aliases: ["pig2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC17",
  description: "boar",
  category: "Animals & Nature",
  aliases: ["boar"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC3D",
  description: "pig nose",
  category: "Animals & Nature",
  aliases: ["pig_nose"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC0F",
  description: "ram",
  category: "Animals & Nature",
  aliases: ["ram"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC11",
  description: "ewe",
  category: "Animals & Nature",
  aliases: ["sheep"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC10",
  description: "goat",
  category: "Animals & Nature",
  aliases: ["goat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC2A",
  description: "camel",
  category: "Animals & Nature",
  aliases: ["dromedary_camel"],
  tags: ["desert"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC2B",
  description: "two-hump camel",
  category: "Animals & Nature",
  aliases: ["camel"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD99",
  description: "llama",
  category: "Animals & Nature",
  aliases: ["llama"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD92",
  description: "giraffe",
  category: "Animals & Nature",
  aliases: ["giraffe"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC18",
  description: "elephant",
  category: "Animals & Nature",
  aliases: ["elephant"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDA3",
  description: "mammoth",
  category: "Animals & Nature",
  aliases: ["mammoth"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD8F",
  description: "rhinoceros",
  category: "Animals & Nature",
  aliases: ["rhinoceros"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD9B",
  description: "hippopotamus",
  category: "Animals & Nature",
  aliases: ["hippopotamus"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC2D",
  description: "mouse face",
  category: "Animals & Nature",
  aliases: ["mouse"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC01",
  description: "mouse",
  category: "Animals & Nature",
  aliases: ["mouse2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC00",
  description: "rat",
  category: "Animals & Nature",
  aliases: ["rat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC39",
  description: "hamster",
  category: "Animals & Nature",
  aliases: ["hamster"],
  tags: ["pet"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC30",
  description: "rabbit face",
  category: "Animals & Nature",
  aliases: ["rabbit"],
  tags: ["bunny"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC07",
  description: "rabbit",
  category: "Animals & Nature",
  aliases: ["rabbit2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC3F\uFE0F",
  description: "chipmunk",
  category: "Animals & Nature",
  aliases: ["chipmunk"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDDAB",
  description: "beaver",
  category: "Animals & Nature",
  aliases: ["beaver"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD94",
  description: "hedgehog",
  category: "Animals & Nature",
  aliases: ["hedgehog"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD87",
  description: "bat",
  category: "Animals & Nature",
  aliases: ["bat"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDC3B",
  description: "bear",
  category: "Animals & Nature",
  aliases: ["bear"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC3B\u200D\u2744\uFE0F",
  description: "polar bear",
  category: "Animals & Nature",
  aliases: ["polar_bear"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDC28",
  description: "koala",
  category: "Animals & Nature",
  aliases: ["koala"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC3C",
  description: "panda",
  category: "Animals & Nature",
  aliases: ["panda_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDA5",
  description: "sloth",
  category: "Animals & Nature",
  aliases: ["sloth"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDA6",
  description: "otter",
  category: "Animals & Nature",
  aliases: ["otter"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDA8",
  description: "skunk",
  category: "Animals & Nature",
  aliases: ["skunk"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDD98",
  description: "kangaroo",
  category: "Animals & Nature",
  aliases: ["kangaroo"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDA1",
  description: "badger",
  category: "Animals & Nature",
  aliases: ["badger"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC3E",
  description: "paw prints",
  category: "Animals & Nature",
  aliases: ["feet", "paw_prints"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD83",
  description: "turkey",
  category: "Animals & Nature",
  aliases: ["turkey"],
  tags: ["thanksgiving"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDC14",
  description: "chicken",
  category: "Animals & Nature",
  aliases: ["chicken"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC13",
  description: "rooster",
  category: "Animals & Nature",
  aliases: ["rooster"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC23",
  description: "hatching chick",
  category: "Animals & Nature",
  aliases: ["hatching_chick"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC24",
  description: "baby chick",
  category: "Animals & Nature",
  aliases: ["baby_chick"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC25",
  description: "front-facing baby chick",
  category: "Animals & Nature",
  aliases: ["hatched_chick"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC26",
  description: "bird",
  category: "Animals & Nature",
  aliases: ["bird"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC27",
  description: "penguin",
  category: "Animals & Nature",
  aliases: ["penguin"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD4A\uFE0F",
  description: "dove",
  category: "Animals & Nature",
  aliases: ["dove"],
  tags: ["peace"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD85",
  description: "eagle",
  category: "Animals & Nature",
  aliases: ["eagle"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD86",
  description: "duck",
  category: "Animals & Nature",
  aliases: ["duck"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDDA2",
  description: "swan",
  category: "Animals & Nature",
  aliases: ["swan"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD89",
  description: "owl",
  category: "Animals & Nature",
  aliases: ["owl"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDDA4",
  description: "dodo",
  category: "Animals & Nature",
  aliases: ["dodo"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDEB6",
  description: "feather",
  category: "Animals & Nature",
  aliases: ["feather"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDDA9",
  description: "flamingo",
  category: "Animals & Nature",
  aliases: ["flamingo"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDD9A",
  description: "peacock",
  category: "Animals & Nature",
  aliases: ["peacock"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD9C",
  description: "parrot",
  category: "Animals & Nature",
  aliases: ["parrot"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEBD",
  description: "wing",
  category: "Animals & Nature",
  aliases: ["wing"],
  tags: ["fly"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDC26\u200D\u2B1B",
  description: "black bird",
  category: "Animals & Nature",
  aliases: ["black_bird"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83E\uDEBF",
  description: "goose",
  category: "Animals & Nature",
  aliases: ["goose"],
  tags: ["honk"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDC38",
  description: "frog",
  category: "Animals & Nature",
  aliases: ["frog"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC0A",
  description: "crocodile",
  category: "Animals & Nature",
  aliases: ["crocodile"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC22",
  description: "turtle",
  category: "Animals & Nature",
  aliases: ["turtle"],
  tags: ["slow"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD8E",
  description: "lizard",
  category: "Animals & Nature",
  aliases: ["lizard"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDC0D",
  description: "snake",
  category: "Animals & Nature",
  aliases: ["snake"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC32",
  description: "dragon face",
  category: "Animals & Nature",
  aliases: ["dragon_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC09",
  description: "dragon",
  category: "Animals & Nature",
  aliases: ["dragon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD95",
  description: "sauropod",
  category: "Animals & Nature",
  aliases: ["sauropod"],
  tags: ["dinosaur"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD96",
  description: "T-Rex",
  category: "Animals & Nature",
  aliases: ["t-rex"],
  tags: ["dinosaur"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC33",
  description: "spouting whale",
  category: "Animals & Nature",
  aliases: ["whale"],
  tags: ["sea"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC0B",
  description: "whale",
  category: "Animals & Nature",
  aliases: ["whale2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC2C",
  description: "dolphin",
  category: "Animals & Nature",
  aliases: ["dolphin", "flipper"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDAD",
  description: "seal",
  category: "Animals & Nature",
  aliases: ["seal"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDC1F",
  description: "fish",
  category: "Animals & Nature",
  aliases: ["fish"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC20",
  description: "tropical fish",
  category: "Animals & Nature",
  aliases: ["tropical_fish"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC21",
  description: "blowfish",
  category: "Animals & Nature",
  aliases: ["blowfish"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD88",
  description: "shark",
  category: "Animals & Nature",
  aliases: ["shark"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDC19",
  description: "octopus",
  category: "Animals & Nature",
  aliases: ["octopus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC1A",
  description: "spiral shell",
  category: "Animals & Nature",
  aliases: ["shell"],
  tags: ["sea", "beach"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEB8",
  description: "coral",
  category: "Animals & Nature",
  aliases: ["coral"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDEBC",
  description: "jellyfish",
  category: "Animals & Nature",
  aliases: ["jellyfish"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDC0C",
  description: "snail",
  category: "Animals & Nature",
  aliases: ["snail"],
  tags: ["slow"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD8B",
  description: "butterfly",
  category: "Animals & Nature",
  aliases: ["butterfly"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDC1B",
  description: "bug",
  category: "Animals & Nature",
  aliases: ["bug"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC1C",
  description: "ant",
  category: "Animals & Nature",
  aliases: ["ant"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC1D",
  description: "honeybee",
  category: "Animals & Nature",
  aliases: ["bee", "honeybee"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEB2",
  description: "beetle",
  category: "Animals & Nature",
  aliases: ["beetle"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDC1E",
  description: "lady beetle",
  category: "Animals & Nature",
  aliases: ["lady_beetle"],
  tags: ["bug"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD97",
  description: "cricket",
  category: "Animals & Nature",
  aliases: ["cricket"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEB3",
  description: "cockroach",
  category: "Animals & Nature",
  aliases: ["cockroach"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDD77\uFE0F",
  description: "spider",
  category: "Animals & Nature",
  aliases: ["spider"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD78\uFE0F",
  description: "spider web",
  category: "Animals & Nature",
  aliases: ["spider_web"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD82",
  description: "scorpion",
  category: "Animals & Nature",
  aliases: ["scorpion"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD9F",
  description: "mosquito",
  category: "Animals & Nature",
  aliases: ["mosquito"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEB0",
  description: "fly",
  category: "Animals & Nature",
  aliases: ["fly"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDEB1",
  description: "worm",
  category: "Animals & Nature",
  aliases: ["worm"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDDA0",
  description: "microbe",
  category: "Animals & Nature",
  aliases: ["microbe"],
  tags: ["germ"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC90",
  description: "bouquet",
  category: "Animals & Nature",
  aliases: ["bouquet"],
  tags: ["flowers"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF38",
  description: "cherry blossom",
  category: "Animals & Nature",
  aliases: ["cherry_blossom"],
  tags: ["flower", "spring"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCAE",
  description: "white flower",
  category: "Animals & Nature",
  aliases: ["white_flower"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEB7",
  description: "lotus",
  category: "Animals & Nature",
  aliases: ["lotus"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83C\uDFF5\uFE0F",
  description: "rosette",
  category: "Animals & Nature",
  aliases: ["rosette"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF39",
  description: "rose",
  category: "Animals & Nature",
  aliases: ["rose"],
  tags: ["flower"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD40",
  description: "wilted flower",
  category: "Animals & Nature",
  aliases: ["wilted_flower"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDF3A",
  description: "hibiscus",
  category: "Animals & Nature",
  aliases: ["hibiscus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF3B",
  description: "sunflower",
  category: "Animals & Nature",
  aliases: ["sunflower"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF3C",
  description: "blossom",
  category: "Animals & Nature",
  aliases: ["blossom"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF37",
  description: "tulip",
  category: "Animals & Nature",
  aliases: ["tulip"],
  tags: ["flower"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEBB",
  description: "hyacinth",
  category: "Animals & Nature",
  aliases: ["hyacinth"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83C\uDF31",
  description: "seedling",
  category: "Animals & Nature",
  aliases: ["seedling"],
  tags: ["plant"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEB4",
  description: "potted plant",
  category: "Animals & Nature",
  aliases: ["potted_plant"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83C\uDF32",
  description: "evergreen tree",
  category: "Animals & Nature",
  aliases: ["evergreen_tree"],
  tags: ["wood"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF33",
  description: "deciduous tree",
  category: "Animals & Nature",
  aliases: ["deciduous_tree"],
  tags: ["wood"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF34",
  description: "palm tree",
  category: "Animals & Nature",
  aliases: ["palm_tree"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF35",
  description: "cactus",
  category: "Animals & Nature",
  aliases: ["cactus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF3E",
  description: "sheaf of rice",
  category: "Animals & Nature",
  aliases: ["ear_of_rice"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF3F",
  description: "herb",
  category: "Animals & Nature",
  aliases: ["herb"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2618\uFE0F",
  description: "shamrock",
  category: "Animals & Nature",
  aliases: ["shamrock"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF40",
  description: "four leaf clover",
  category: "Animals & Nature",
  aliases: ["four_leaf_clover"],
  tags: ["luck"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF41",
  description: "maple leaf",
  category: "Animals & Nature",
  aliases: ["maple_leaf"],
  tags: ["canada"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF42",
  description: "fallen leaf",
  category: "Animals & Nature",
  aliases: ["fallen_leaf"],
  tags: ["autumn"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF43",
  description: "leaf fluttering in wind",
  category: "Animals & Nature",
  aliases: ["leaves"],
  tags: ["leaf"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEB9",
  description: "empty nest",
  category: "Animals & Nature",
  aliases: ["empty_nest"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDEBA",
  description: "nest with eggs",
  category: "Animals & Nature",
  aliases: ["nest_with_eggs"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83C\uDF44",
  description: "mushroom",
  category: "Animals & Nature",
  aliases: ["mushroom"],
  tags: ["fungus"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF47",
  description: "grapes",
  category: "Food & Drink",
  aliases: ["grapes"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF48",
  description: "melon",
  category: "Food & Drink",
  aliases: ["melon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF49",
  description: "watermelon",
  category: "Food & Drink",
  aliases: ["watermelon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF4A",
  description: "tangerine",
  category: "Food & Drink",
  aliases: ["tangerine", "orange", "mandarin"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF4B",
  description: "lemon",
  category: "Food & Drink",
  aliases: ["lemon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF4C",
  description: "banana",
  category: "Food & Drink",
  aliases: ["banana"],
  tags: ["fruit"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF4D",
  description: "pineapple",
  category: "Food & Drink",
  aliases: ["pineapple"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD6D",
  description: "mango",
  category: "Food & Drink",
  aliases: ["mango"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDF4E",
  description: "red apple",
  category: "Food & Drink",
  aliases: ["apple"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF4F",
  description: "green apple",
  category: "Food & Drink",
  aliases: ["green_apple"],
  tags: ["fruit"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF50",
  description: "pear",
  category: "Food & Drink",
  aliases: ["pear"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF51",
  description: "peach",
  category: "Food & Drink",
  aliases: ["peach"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF52",
  description: "cherries",
  category: "Food & Drink",
  aliases: ["cherries"],
  tags: ["fruit"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF53",
  description: "strawberry",
  category: "Food & Drink",
  aliases: ["strawberry"],
  tags: ["fruit"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDED0",
  description: "blueberries",
  category: "Food & Drink",
  aliases: ["blueberries"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD5D",
  description: "kiwi fruit",
  category: "Food & Drink",
  aliases: ["kiwi_fruit"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDF45",
  description: "tomato",
  category: "Food & Drink",
  aliases: ["tomato"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDED2",
  description: "olive",
  category: "Food & Drink",
  aliases: ["olive"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD65",
  description: "coconut",
  category: "Food & Drink",
  aliases: ["coconut"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD51",
  description: "avocado",
  category: "Food & Drink",
  aliases: ["avocado"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDF46",
  description: "eggplant",
  category: "Food & Drink",
  aliases: ["eggplant"],
  tags: ["aubergine"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD54",
  description: "potato",
  category: "Food & Drink",
  aliases: ["potato"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD55",
  description: "carrot",
  category: "Food & Drink",
  aliases: ["carrot"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDF3D",
  description: "ear of corn",
  category: "Food & Drink",
  aliases: ["corn"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF36\uFE0F",
  description: "hot pepper",
  category: "Food & Drink",
  aliases: ["hot_pepper"],
  tags: ["spicy"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDED1",
  description: "bell pepper",
  category: "Food & Drink",
  aliases: ["bell_pepper"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD52",
  description: "cucumber",
  category: "Food & Drink",
  aliases: ["cucumber"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD6C",
  description: "leafy green",
  category: "Food & Drink",
  aliases: ["leafy_green"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD66",
  description: "broccoli",
  category: "Food & Drink",
  aliases: ["broccoli"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDC4",
  description: "garlic",
  category: "Food & Drink",
  aliases: ["garlic"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDC5",
  description: "onion",
  category: "Food & Drink",
  aliases: ["onion"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDD5C",
  description: "peanuts",
  category: "Food & Drink",
  aliases: ["peanuts"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDED8",
  description: "beans",
  category: "Food & Drink",
  aliases: ["beans"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83C\uDF30",
  description: "chestnut",
  category: "Food & Drink",
  aliases: ["chestnut"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEDA",
  description: "ginger root",
  category: "Food & Drink",
  aliases: ["ginger_root"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83E\uDEDB",
  description: "pea pod",
  category: "Food & Drink",
  aliases: ["pea_pod"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83C\uDF5E",
  description: "bread",
  category: "Food & Drink",
  aliases: ["bread"],
  tags: ["toast"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD50",
  description: "croissant",
  category: "Food & Drink",
  aliases: ["croissant"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD56",
  description: "baguette bread",
  category: "Food & Drink",
  aliases: ["baguette_bread"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDED3",
  description: "flatbread",
  category: "Food & Drink",
  aliases: ["flatbread"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD68",
  description: "pretzel",
  category: "Food & Drink",
  aliases: ["pretzel"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD6F",
  description: "bagel",
  category: "Food & Drink",
  aliases: ["bagel"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD5E",
  description: "pancakes",
  category: "Food & Drink",
  aliases: ["pancakes"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDDC7",
  description: "waffle",
  category: "Food & Drink",
  aliases: ["waffle"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDC0",
  description: "cheese wedge",
  category: "Food & Drink",
  aliases: ["cheese"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF56",
  description: "meat on bone",
  category: "Food & Drink",
  aliases: ["meat_on_bone"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF57",
  description: "poultry leg",
  category: "Food & Drink",
  aliases: ["poultry_leg"],
  tags: ["meat", "chicken"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD69",
  description: "cut of meat",
  category: "Food & Drink",
  aliases: ["cut_of_meat"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD53",
  description: "bacon",
  category: "Food & Drink",
  aliases: ["bacon"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDF54",
  description: "hamburger",
  category: "Food & Drink",
  aliases: ["hamburger"],
  tags: ["burger"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF5F",
  description: "french fries",
  category: "Food & Drink",
  aliases: ["fries"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF55",
  description: "pizza",
  category: "Food & Drink",
  aliases: ["pizza"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF2D",
  description: "hot dog",
  category: "Food & Drink",
  aliases: ["hotdog"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD6A",
  description: "sandwich",
  category: "Food & Drink",
  aliases: ["sandwich"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDF2E",
  description: "taco",
  category: "Food & Drink",
  aliases: ["taco"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF2F",
  description: "burrito",
  category: "Food & Drink",
  aliases: ["burrito"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDED4",
  description: "tamale",
  category: "Food & Drink",
  aliases: ["tamale"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD59",
  description: "stuffed flatbread",
  category: "Food & Drink",
  aliases: ["stuffed_flatbread"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDDC6",
  description: "falafel",
  category: "Food & Drink",
  aliases: ["falafel"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDD5A",
  description: "egg",
  category: "Food & Drink",
  aliases: ["egg"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDF73",
  description: "cooking",
  category: "Food & Drink",
  aliases: ["fried_egg"],
  tags: ["breakfast"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD58",
  description: "shallow pan of food",
  category: "Food & Drink",
  aliases: ["shallow_pan_of_food"],
  tags: ["paella", "curry"],
  unicode_version: "",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDF72",
  description: "pot of food",
  category: "Food & Drink",
  aliases: ["stew"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDED5",
  description: "fondue",
  category: "Food & Drink",
  aliases: ["fondue"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDD63",
  description: "bowl with spoon",
  category: "Food & Drink",
  aliases: ["bowl_with_spoon"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD57",
  description: "green salad",
  category: "Food & Drink",
  aliases: ["green_salad"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83C\uDF7F",
  description: "popcorn",
  category: "Food & Drink",
  aliases: ["popcorn"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDDC8",
  description: "butter",
  category: "Food & Drink",
  aliases: ["butter"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDC2",
  description: "salt",
  category: "Food & Drink",
  aliases: ["salt"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD6B",
  description: "canned food",
  category: "Food & Drink",
  aliases: ["canned_food"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDF71",
  description: "bento box",
  category: "Food & Drink",
  aliases: ["bento"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF58",
  description: "rice cracker",
  category: "Food & Drink",
  aliases: ["rice_cracker"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF59",
  description: "rice ball",
  category: "Food & Drink",
  aliases: ["rice_ball"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF5A",
  description: "cooked rice",
  category: "Food & Drink",
  aliases: ["rice"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF5B",
  description: "curry rice",
  category: "Food & Drink",
  aliases: ["curry"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF5C",
  description: "steaming bowl",
  category: "Food & Drink",
  aliases: ["ramen"],
  tags: ["noodle"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF5D",
  description: "spaghetti",
  category: "Food & Drink",
  aliases: ["spaghetti"],
  tags: ["pasta"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF60",
  description: "roasted sweet potato",
  category: "Food & Drink",
  aliases: ["sweet_potato"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF62",
  description: "oden",
  category: "Food & Drink",
  aliases: ["oden"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF63",
  description: "sushi",
  category: "Food & Drink",
  aliases: ["sushi"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF64",
  description: "fried shrimp",
  category: "Food & Drink",
  aliases: ["fried_shrimp"],
  tags: ["tempura"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF65",
  description: "fish cake with swirl",
  category: "Food & Drink",
  aliases: ["fish_cake"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD6E",
  description: "moon cake",
  category: "Food & Drink",
  aliases: ["moon_cake"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDF61",
  description: "dango",
  category: "Food & Drink",
  aliases: ["dango"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD5F",
  description: "dumpling",
  category: "Food & Drink",
  aliases: ["dumpling"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD60",
  description: "fortune cookie",
  category: "Food & Drink",
  aliases: ["fortune_cookie"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD61",
  description: "takeout box",
  category: "Food & Drink",
  aliases: ["takeout_box"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD80",
  description: "crab",
  category: "Food & Drink",
  aliases: ["crab"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD9E",
  description: "lobster",
  category: "Food & Drink",
  aliases: ["lobster"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD90",
  description: "shrimp",
  category: "Food & Drink",
  aliases: ["shrimp"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD91",
  description: "squid",
  category: "Food & Drink",
  aliases: ["squid"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDDAA",
  description: "oyster",
  category: "Food & Drink",
  aliases: ["oyster"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83C\uDF66",
  description: "soft ice cream",
  category: "Food & Drink",
  aliases: ["icecream"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF67",
  description: "shaved ice",
  category: "Food & Drink",
  aliases: ["shaved_ice"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF68",
  description: "ice cream",
  category: "Food & Drink",
  aliases: ["ice_cream"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF69",
  description: "doughnut",
  category: "Food & Drink",
  aliases: ["doughnut"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF6A",
  description: "cookie",
  category: "Food & Drink",
  aliases: ["cookie"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF82",
  description: "birthday cake",
  category: "Food & Drink",
  aliases: ["birthday"],
  tags: ["party"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF70",
  description: "shortcake",
  category: "Food & Drink",
  aliases: ["cake"],
  tags: ["dessert"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDC1",
  description: "cupcake",
  category: "Food & Drink",
  aliases: ["cupcake"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD67",
  description: "pie",
  category: "Food & Drink",
  aliases: ["pie"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDF6B",
  description: "chocolate bar",
  category: "Food & Drink",
  aliases: ["chocolate_bar"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF6C",
  description: "candy",
  category: "Food & Drink",
  aliases: ["candy"],
  tags: ["sweet"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF6D",
  description: "lollipop",
  category: "Food & Drink",
  aliases: ["lollipop"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF6E",
  description: "custard",
  category: "Food & Drink",
  aliases: ["custard"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF6F",
  description: "honey pot",
  category: "Food & Drink",
  aliases: ["honey_pot"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF7C",
  description: "baby bottle",
  category: "Food & Drink",
  aliases: ["baby_bottle"],
  tags: ["milk"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD5B",
  description: "glass of milk",
  category: "Food & Drink",
  aliases: ["milk_glass"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\u2615",
  description: "hot beverage",
  category: "Food & Drink",
  aliases: ["coffee"],
  tags: ["cafe", "espresso"],
  unicode_version: "4.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDED6",
  description: "teapot",
  category: "Food & Drink",
  aliases: ["teapot"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83C\uDF75",
  description: "teacup without handle",
  category: "Food & Drink",
  aliases: ["tea"],
  tags: ["green", "breakfast"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF76",
  description: "sake",
  category: "Food & Drink",
  aliases: ["sake"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF7E",
  description: "bottle with popping cork",
  category: "Food & Drink",
  aliases: ["champagne"],
  tags: ["bottle", "bubbly", "celebration"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF77",
  description: "wine glass",
  category: "Food & Drink",
  aliases: ["wine_glass"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF78",
  description: "cocktail glass",
  category: "Food & Drink",
  aliases: ["cocktail"],
  tags: ["drink"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF79",
  description: "tropical drink",
  category: "Food & Drink",
  aliases: ["tropical_drink"],
  tags: ["summer", "vacation"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF7A",
  description: "beer mug",
  category: "Food & Drink",
  aliases: ["beer"],
  tags: ["drink"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF7B",
  description: "clinking beer mugs",
  category: "Food & Drink",
  aliases: ["beers"],
  tags: ["drinks"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD42",
  description: "clinking glasses",
  category: "Food & Drink",
  aliases: ["clinking_glasses"],
  tags: ["cheers", "toast"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD43",
  description: "tumbler glass",
  category: "Food & Drink",
  aliases: ["tumbler_glass"],
  tags: ["whisky"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDED7",
  description: "pouring liquid",
  category: "Food & Drink",
  aliases: ["pouring_liquid"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDD64",
  description: "cup with straw",
  category: "Food & Drink",
  aliases: ["cup_with_straw"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDCB",
  description: "bubble tea",
  category: "Food & Drink",
  aliases: ["bubble_tea"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDDC3",
  description: "beverage box",
  category: "Food & Drink",
  aliases: ["beverage_box"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDC9",
  description: "mate",
  category: "Food & Drink",
  aliases: ["mate"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDCA",
  description: "ice",
  category: "Food & Drink",
  aliases: ["ice_cube"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDD62",
  description: "chopsticks",
  category: "Food & Drink",
  aliases: ["chopsticks"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDF7D\uFE0F",
  description: "fork and knife with plate",
  category: "Food & Drink",
  aliases: ["plate_with_cutlery"],
  tags: ["dining", "dinner"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF74",
  description: "fork and knife",
  category: "Food & Drink",
  aliases: ["fork_and_knife"],
  tags: ["cutlery"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD44",
  description: "spoon",
  category: "Food & Drink",
  aliases: ["spoon"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDD2A",
  description: "kitchen knife",
  category: "Food & Drink",
  aliases: ["hocho", "knife"],
  tags: ["cut", "chop"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDED9",
  description: "jar",
  category: "Food & Drink",
  aliases: ["jar"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83C\uDFFA",
  description: "amphora",
  category: "Food & Drink",
  aliases: ["amphora"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF0D",
  description: "globe showing Europe-Africa",
  category: "Travel & Places",
  aliases: ["earth_africa"],
  tags: ["globe", "world", "international"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF0E",
  description: "globe showing Americas",
  category: "Travel & Places",
  aliases: ["earth_americas"],
  tags: ["globe", "world", "international"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF0F",
  description: "globe showing Asia-Australia",
  category: "Travel & Places",
  aliases: ["earth_asia"],
  tags: ["globe", "world", "international"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF10",
  description: "globe with meridians",
  category: "Travel & Places",
  aliases: ["globe_with_meridians"],
  tags: ["world", "global", "international"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDFA\uFE0F",
  description: "world map",
  category: "Travel & Places",
  aliases: ["world_map"],
  tags: ["travel"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDFE",
  description: "map of Japan",
  category: "Travel & Places",
  aliases: ["japan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDED",
  description: "compass",
  category: "Travel & Places",
  aliases: ["compass"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFD4\uFE0F",
  description: "snow-capped mountain",
  category: "Travel & Places",
  aliases: ["mountain_snow"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u26F0\uFE0F",
  description: "mountain",
  category: "Travel & Places",
  aliases: ["mountain"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF0B",
  description: "volcano",
  category: "Travel & Places",
  aliases: ["volcano"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDFB",
  description: "mount fuji",
  category: "Travel & Places",
  aliases: ["mount_fuji"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFD5\uFE0F",
  description: "camping",
  category: "Travel & Places",
  aliases: ["camping"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFD6\uFE0F",
  description: "beach with umbrella",
  category: "Travel & Places",
  aliases: ["beach_umbrella"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFDC\uFE0F",
  description: "desert",
  category: "Travel & Places",
  aliases: ["desert"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFDD\uFE0F",
  description: "desert island",
  category: "Travel & Places",
  aliases: ["desert_island"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFDE\uFE0F",
  description: "national park",
  category: "Travel & Places",
  aliases: ["national_park"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFDF\uFE0F",
  description: "stadium",
  category: "Travel & Places",
  aliases: ["stadium"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFDB\uFE0F",
  description: "classical building",
  category: "Travel & Places",
  aliases: ["classical_building"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFD7\uFE0F",
  description: "building construction",
  category: "Travel & Places",
  aliases: ["building_construction"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDDF1",
  description: "brick",
  category: "Travel & Places",
  aliases: ["bricks"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEA8",
  description: "rock",
  category: "Travel & Places",
  aliases: ["rock"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDEB5",
  description: "wood",
  category: "Travel & Places",
  aliases: ["wood"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDED6",
  description: "hut",
  category: "Travel & Places",
  aliases: ["hut"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83C\uDFD8\uFE0F",
  description: "houses",
  category: "Travel & Places",
  aliases: ["houses"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFDA\uFE0F",
  description: "derelict house",
  category: "Travel & Places",
  aliases: ["derelict_house"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFE0",
  description: "house",
  category: "Travel & Places",
  aliases: ["house"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFE1",
  description: "house with garden",
  category: "Travel & Places",
  aliases: ["house_with_garden"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFE2",
  description: "office building",
  category: "Travel & Places",
  aliases: ["office"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFE3",
  description: "Japanese post office",
  category: "Travel & Places",
  aliases: ["post_office"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFE4",
  description: "post office",
  category: "Travel & Places",
  aliases: ["european_post_office"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFE5",
  description: "hospital",
  category: "Travel & Places",
  aliases: ["hospital"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFE6",
  description: "bank",
  category: "Travel & Places",
  aliases: ["bank"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFE8",
  description: "hotel",
  category: "Travel & Places",
  aliases: ["hotel"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFE9",
  description: "love hotel",
  category: "Travel & Places",
  aliases: ["love_hotel"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFEA",
  description: "convenience store",
  category: "Travel & Places",
  aliases: ["convenience_store"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFEB",
  description: "school",
  category: "Travel & Places",
  aliases: ["school"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFEC",
  description: "department store",
  category: "Travel & Places",
  aliases: ["department_store"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFED",
  description: "factory",
  category: "Travel & Places",
  aliases: ["factory"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFEF",
  description: "Japanese castle",
  category: "Travel & Places",
  aliases: ["japanese_castle"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFF0",
  description: "castle",
  category: "Travel & Places",
  aliases: ["european_castle"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC92",
  description: "wedding",
  category: "Travel & Places",
  aliases: ["wedding"],
  tags: ["marriage"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDFC",
  description: "Tokyo tower",
  category: "Travel & Places",
  aliases: ["tokyo_tower"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDFD",
  description: "Statue of Liberty",
  category: "Travel & Places",
  aliases: ["statue_of_liberty"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u26EA",
  description: "church",
  category: "Travel & Places",
  aliases: ["church"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD4C",
  description: "mosque",
  category: "Travel & Places",
  aliases: ["mosque"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDED5",
  description: "hindu temple",
  category: "Travel & Places",
  aliases: ["hindu_temple"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDD4D",
  description: "synagogue",
  category: "Travel & Places",
  aliases: ["synagogue"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\u26E9\uFE0F",
  description: "shinto shrine",
  category: "Travel & Places",
  aliases: ["shinto_shrine"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD4B",
  description: "kaaba",
  category: "Travel & Places",
  aliases: ["kaaba"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\u26F2",
  description: "fountain",
  category: "Travel & Places",
  aliases: ["fountain"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\u26FA",
  description: "tent",
  category: "Travel & Places",
  aliases: ["tent"],
  tags: ["camping"],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF01",
  description: "foggy",
  category: "Travel & Places",
  aliases: ["foggy"],
  tags: ["karl"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF03",
  description: "night with stars",
  category: "Travel & Places",
  aliases: ["night_with_stars"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFD9\uFE0F",
  description: "cityscape",
  category: "Travel & Places",
  aliases: ["cityscape"],
  tags: ["skyline"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF04",
  description: "sunrise over mountains",
  category: "Travel & Places",
  aliases: ["sunrise_over_mountains"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF05",
  description: "sunrise",
  category: "Travel & Places",
  aliases: ["sunrise"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF06",
  description: "cityscape at dusk",
  category: "Travel & Places",
  aliases: ["city_sunset"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF07",
  description: "sunset",
  category: "Travel & Places",
  aliases: ["city_sunrise"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF09",
  description: "bridge at night",
  category: "Travel & Places",
  aliases: ["bridge_at_night"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2668\uFE0F",
  description: "hot springs",
  category: "Travel & Places",
  aliases: ["hotsprings"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFA0",
  description: "carousel horse",
  category: "Travel & Places",
  aliases: ["carousel_horse"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEDD",
  description: "playground slide",
  category: "Travel & Places",
  aliases: ["playground_slide"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83C\uDFA1",
  description: "ferris wheel",
  category: "Travel & Places",
  aliases: ["ferris_wheel"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFA2",
  description: "roller coaster",
  category: "Travel & Places",
  aliases: ["roller_coaster"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC88",
  description: "barber pole",
  category: "Travel & Places",
  aliases: ["barber"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFAA",
  description: "circus tent",
  category: "Travel & Places",
  aliases: ["circus_tent"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE82",
  description: "locomotive",
  category: "Travel & Places",
  aliases: ["steam_locomotive"],
  tags: ["train"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE83",
  description: "railway car",
  category: "Travel & Places",
  aliases: ["railway_car"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE84",
  description: "high-speed train",
  category: "Travel & Places",
  aliases: ["bullettrain_side"],
  tags: ["train"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE85",
  description: "bullet train",
  category: "Travel & Places",
  aliases: ["bullettrain_front"],
  tags: ["train"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE86",
  description: "train",
  category: "Travel & Places",
  aliases: ["train2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE87",
  description: "metro",
  category: "Travel & Places",
  aliases: ["metro"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE88",
  description: "light rail",
  category: "Travel & Places",
  aliases: ["light_rail"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE89",
  description: "station",
  category: "Travel & Places",
  aliases: ["station"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE8A",
  description: "tram",
  category: "Travel & Places",
  aliases: ["tram"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE9D",
  description: "monorail",
  category: "Travel & Places",
  aliases: ["monorail"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE9E",
  description: "mountain railway",
  category: "Travel & Places",
  aliases: ["mountain_railway"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE8B",
  description: "tram car",
  category: "Travel & Places",
  aliases: ["train"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE8C",
  description: "bus",
  category: "Travel & Places",
  aliases: ["bus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE8D",
  description: "oncoming bus",
  category: "Travel & Places",
  aliases: ["oncoming_bus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE8E",
  description: "trolleybus",
  category: "Travel & Places",
  aliases: ["trolleybus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE90",
  description: "minibus",
  category: "Travel & Places",
  aliases: ["minibus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE91",
  description: "ambulance",
  category: "Travel & Places",
  aliases: ["ambulance"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE92",
  description: "fire engine",
  category: "Travel & Places",
  aliases: ["fire_engine"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE93",
  description: "police car",
  category: "Travel & Places",
  aliases: ["police_car"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE94",
  description: "oncoming police car",
  category: "Travel & Places",
  aliases: ["oncoming_police_car"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE95",
  description: "taxi",
  category: "Travel & Places",
  aliases: ["taxi"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE96",
  description: "oncoming taxi",
  category: "Travel & Places",
  aliases: ["oncoming_taxi"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE97",
  description: "automobile",
  category: "Travel & Places",
  aliases: ["car", "red_car"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE98",
  description: "oncoming automobile",
  category: "Travel & Places",
  aliases: ["oncoming_automobile"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE99",
  description: "sport utility vehicle",
  category: "Travel & Places",
  aliases: ["blue_car"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEFB",
  description: "pickup truck",
  category: "Travel & Places",
  aliases: ["pickup_truck"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDE9A",
  description: "delivery truck",
  category: "Travel & Places",
  aliases: ["truck"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE9B",
  description: "articulated lorry",
  category: "Travel & Places",
  aliases: ["articulated_lorry"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE9C",
  description: "tractor",
  category: "Travel & Places",
  aliases: ["tractor"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFCE\uFE0F",
  description: "racing car",
  category: "Travel & Places",
  aliases: ["racing_car"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFCD\uFE0F",
  description: "motorcycle",
  category: "Travel & Places",
  aliases: ["motorcycle"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEF5",
  description: "motor scooter",
  category: "Travel & Places",
  aliases: ["motor_scooter"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDDBD",
  description: "manual wheelchair",
  category: "Travel & Places",
  aliases: ["manual_wheelchair"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDBC",
  description: "motorized wheelchair",
  category: "Travel & Places",
  aliases: ["motorized_wheelchair"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDEFA",
  description: "auto rickshaw",
  category: "Travel & Places",
  aliases: ["auto_rickshaw"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDEB2",
  description: "bicycle",
  category: "Travel & Places",
  aliases: ["bike"],
  tags: ["bicycle"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEF4",
  description: "kick scooter",
  category: "Travel & Places",
  aliases: ["kick_scooter"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDEF9",
  description: "skateboard",
  category: "Travel & Places",
  aliases: ["skateboard"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDEFC",
  description: "roller skate",
  category: "Travel & Places",
  aliases: ["roller_skate"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDE8F",
  description: "bus stop",
  category: "Travel & Places",
  aliases: ["busstop"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEE3\uFE0F",
  description: "motorway",
  category: "Travel & Places",
  aliases: ["motorway"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEE4\uFE0F",
  description: "railway track",
  category: "Travel & Places",
  aliases: ["railway_track"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEE2\uFE0F",
  description: "oil drum",
  category: "Travel & Places",
  aliases: ["oil_drum"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u26FD",
  description: "fuel pump",
  category: "Travel & Places",
  aliases: ["fuelpump"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEDE",
  description: "wheel",
  category: "Travel & Places",
  aliases: ["wheel"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDEA8",
  description: "police car light",
  category: "Travel & Places",
  aliases: ["rotating_light"],
  tags: ["911", "emergency"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEA5",
  description: "horizontal traffic light",
  category: "Travel & Places",
  aliases: ["traffic_light"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEA6",
  description: "vertical traffic light",
  category: "Travel & Places",
  aliases: ["vertical_traffic_light"],
  tags: ["semaphore"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDED1",
  description: "stop sign",
  category: "Travel & Places",
  aliases: ["stop_sign"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDEA7",
  description: "construction",
  category: "Travel & Places",
  aliases: ["construction"],
  tags: ["wip"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2693",
  description: "anchor",
  category: "Travel & Places",
  aliases: ["anchor"],
  tags: ["ship"],
  unicode_version: "4.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEDF",
  description: "ring buoy",
  category: "Travel & Places",
  aliases: ["ring_buoy"],
  tags: ["life preserver"],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\u26F5",
  description: "sailboat",
  category: "Travel & Places",
  aliases: ["boat", "sailboat"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEF6",
  description: "canoe",
  category: "Travel & Places",
  aliases: ["canoe"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDEA4",
  description: "speedboat",
  category: "Travel & Places",
  aliases: ["speedboat"],
  tags: ["ship"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEF3\uFE0F",
  description: "passenger ship",
  category: "Travel & Places",
  aliases: ["passenger_ship"],
  tags: ["cruise"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u26F4\uFE0F",
  description: "ferry",
  category: "Travel & Places",
  aliases: ["ferry"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEE5\uFE0F",
  description: "motor boat",
  category: "Travel & Places",
  aliases: ["motor_boat"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEA2",
  description: "ship",
  category: "Travel & Places",
  aliases: ["ship"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2708\uFE0F",
  description: "airplane",
  category: "Travel & Places",
  aliases: ["airplane"],
  tags: ["flight"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEE9\uFE0F",
  description: "small airplane",
  category: "Travel & Places",
  aliases: ["small_airplane"],
  tags: ["flight"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEEB",
  description: "airplane departure",
  category: "Travel & Places",
  aliases: ["flight_departure"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEEC",
  description: "airplane arrival",
  category: "Travel & Places",
  aliases: ["flight_arrival"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDE82",
  description: "parachute",
  category: "Travel & Places",
  aliases: ["parachute"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDCBA",
  description: "seat",
  category: "Travel & Places",
  aliases: ["seat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE81",
  description: "helicopter",
  category: "Travel & Places",
  aliases: ["helicopter"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDE9F",
  description: "suspension railway",
  category: "Travel & Places",
  aliases: ["suspension_railway"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEA0",
  description: "mountain cableway",
  category: "Travel & Places",
  aliases: ["mountain_cableway"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEA1",
  description: "aerial tramway",
  category: "Travel & Places",
  aliases: ["aerial_tramway"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEF0\uFE0F",
  description: "satellite",
  category: "Travel & Places",
  aliases: ["artificial_satellite"],
  tags: ["orbit", "space"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDE80",
  description: "rocket",
  category: "Travel & Places",
  aliases: ["rocket"],
  tags: ["ship", "launch"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEF8",
  description: "flying saucer",
  category: "Travel & Places",
  aliases: ["flying_saucer"],
  tags: ["ufo"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDECE\uFE0F",
  description: "bellhop bell",
  category: "Travel & Places",
  aliases: ["bellhop_bell"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDDF3",
  description: "luggage",
  category: "Travel & Places",
  aliases: ["luggage"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\u231B",
  description: "hourglass done",
  category: "Travel & Places",
  aliases: ["hourglass"],
  tags: ["time"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u23F3",
  description: "hourglass not done",
  category: "Travel & Places",
  aliases: ["hourglass_flowing_sand"],
  tags: ["time"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u231A",
  description: "watch",
  category: "Travel & Places",
  aliases: ["watch"],
  tags: ["time"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u23F0",
  description: "alarm clock",
  category: "Travel & Places",
  aliases: ["alarm_clock"],
  tags: ["morning"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u23F1\uFE0F",
  description: "stopwatch",
  category: "Travel & Places",
  aliases: ["stopwatch"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.1"
}, {
  emoji: "\u23F2\uFE0F",
  description: "timer clock",
  category: "Travel & Places",
  aliases: ["timer_clock"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD70\uFE0F",
  description: "mantelpiece clock",
  category: "Travel & Places",
  aliases: ["mantelpiece_clock"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD5B",
  description: "twelve o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock12"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD67",
  description: "twelve-thirty",
  category: "Travel & Places",
  aliases: ["clock1230"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD50",
  description: "one o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock1"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD5C",
  description: "one-thirty",
  category: "Travel & Places",
  aliases: ["clock130"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD51",
  description: "two o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD5D",
  description: "two-thirty",
  category: "Travel & Places",
  aliases: ["clock230"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD52",
  description: "three o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock3"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD5E",
  description: "three-thirty",
  category: "Travel & Places",
  aliases: ["clock330"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD53",
  description: "four o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock4"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD5F",
  description: "four-thirty",
  category: "Travel & Places",
  aliases: ["clock430"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD54",
  description: "five o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock5"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD60",
  description: "five-thirty",
  category: "Travel & Places",
  aliases: ["clock530"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD55",
  description: "six o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock6"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD61",
  description: "six-thirty",
  category: "Travel & Places",
  aliases: ["clock630"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD56",
  description: "seven o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock7"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD62",
  description: "seven-thirty",
  category: "Travel & Places",
  aliases: ["clock730"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD57",
  description: "eight o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock8"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD63",
  description: "eight-thirty",
  category: "Travel & Places",
  aliases: ["clock830"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD58",
  description: "nine o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock9"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD64",
  description: "nine-thirty",
  category: "Travel & Places",
  aliases: ["clock930"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD59",
  description: "ten o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock10"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD65",
  description: "ten-thirty",
  category: "Travel & Places",
  aliases: ["clock1030"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD5A",
  description: "eleven o\u2019clock",
  category: "Travel & Places",
  aliases: ["clock11"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD66",
  description: "eleven-thirty",
  category: "Travel & Places",
  aliases: ["clock1130"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF11",
  description: "new moon",
  category: "Travel & Places",
  aliases: ["new_moon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF12",
  description: "waxing crescent moon",
  category: "Travel & Places",
  aliases: ["waxing_crescent_moon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF13",
  description: "first quarter moon",
  category: "Travel & Places",
  aliases: ["first_quarter_moon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF14",
  description: "waxing gibbous moon",
  category: "Travel & Places",
  aliases: ["moon", "waxing_gibbous_moon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF15",
  description: "full moon",
  category: "Travel & Places",
  aliases: ["full_moon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF16",
  description: "waning gibbous moon",
  category: "Travel & Places",
  aliases: ["waning_gibbous_moon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF17",
  description: "last quarter moon",
  category: "Travel & Places",
  aliases: ["last_quarter_moon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF18",
  description: "waning crescent moon",
  category: "Travel & Places",
  aliases: ["waning_crescent_moon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF19",
  description: "crescent moon",
  category: "Travel & Places",
  aliases: ["crescent_moon"],
  tags: ["night"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF1A",
  description: "new moon face",
  category: "Travel & Places",
  aliases: ["new_moon_with_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF1B",
  description: "first quarter moon face",
  category: "Travel & Places",
  aliases: ["first_quarter_moon_with_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF1C",
  description: "last quarter moon face",
  category: "Travel & Places",
  aliases: ["last_quarter_moon_with_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF21\uFE0F",
  description: "thermometer",
  category: "Travel & Places",
  aliases: ["thermometer"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u2600\uFE0F",
  description: "sun",
  category: "Travel & Places",
  aliases: ["sunny"],
  tags: ["weather"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF1D",
  description: "full moon face",
  category: "Travel & Places",
  aliases: ["full_moon_with_face"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF1E",
  description: "sun with face",
  category: "Travel & Places",
  aliases: ["sun_with_face"],
  tags: ["summer"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE90",
  description: "ringed planet",
  category: "Travel & Places",
  aliases: ["ringed_planet"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\u2B50",
  description: "star",
  category: "Travel & Places",
  aliases: ["star"],
  tags: [],
  unicode_version: "5.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF1F",
  description: "glowing star",
  category: "Travel & Places",
  aliases: ["star2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF20",
  description: "shooting star",
  category: "Travel & Places",
  aliases: ["stars"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF0C",
  description: "milky way",
  category: "Travel & Places",
  aliases: ["milky_way"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2601\uFE0F",
  description: "cloud",
  category: "Travel & Places",
  aliases: ["cloud"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u26C5",
  description: "sun behind cloud",
  category: "Travel & Places",
  aliases: ["partly_sunny"],
  tags: ["weather", "cloud"],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\u26C8\uFE0F",
  description: "cloud with lightning and rain",
  category: "Travel & Places",
  aliases: ["cloud_with_lightning_and_rain"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF24\uFE0F",
  description: "sun behind small cloud",
  category: "Travel & Places",
  aliases: ["sun_behind_small_cloud"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF25\uFE0F",
  description: "sun behind large cloud",
  category: "Travel & Places",
  aliases: ["sun_behind_large_cloud"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF26\uFE0F",
  description: "sun behind rain cloud",
  category: "Travel & Places",
  aliases: ["sun_behind_rain_cloud"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF27\uFE0F",
  description: "cloud with rain",
  category: "Travel & Places",
  aliases: ["cloud_with_rain"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF28\uFE0F",
  description: "cloud with snow",
  category: "Travel & Places",
  aliases: ["cloud_with_snow"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF29\uFE0F",
  description: "cloud with lightning",
  category: "Travel & Places",
  aliases: ["cloud_with_lightning"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF2A\uFE0F",
  description: "tornado",
  category: "Travel & Places",
  aliases: ["tornado"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF2B\uFE0F",
  description: "fog",
  category: "Travel & Places",
  aliases: ["fog"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF2C\uFE0F",
  description: "wind face",
  category: "Travel & Places",
  aliases: ["wind_face"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF00",
  description: "cyclone",
  category: "Travel & Places",
  aliases: ["cyclone"],
  tags: ["swirl"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF08",
  description: "rainbow",
  category: "Travel & Places",
  aliases: ["rainbow"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF02",
  description: "closed umbrella",
  category: "Travel & Places",
  aliases: ["closed_umbrella"],
  tags: ["weather", "rain"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2602\uFE0F",
  description: "umbrella",
  category: "Travel & Places",
  aliases: ["open_umbrella"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u2614",
  description: "umbrella with rain drops",
  category: "Travel & Places",
  aliases: ["umbrella"],
  tags: ["rain", "weather"],
  unicode_version: "4.0",
  ios_version: "6.0"
}, {
  emoji: "\u26F1\uFE0F",
  description: "umbrella on ground",
  category: "Travel & Places",
  aliases: ["parasol_on_ground"],
  tags: ["beach_umbrella"],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\u26A1",
  description: "high voltage",
  category: "Travel & Places",
  aliases: ["zap"],
  tags: ["lightning", "thunder"],
  unicode_version: "4.0",
  ios_version: "6.0"
}, {
  emoji: "\u2744\uFE0F",
  description: "snowflake",
  category: "Travel & Places",
  aliases: ["snowflake"],
  tags: ["winter", "cold", "weather"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2603\uFE0F",
  description: "snowman",
  category: "Travel & Places",
  aliases: ["snowman_with_snow"],
  tags: ["winter", "christmas"],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u26C4",
  description: "snowman without snow",
  category: "Travel & Places",
  aliases: ["snowman"],
  tags: ["winter"],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\u2604\uFE0F",
  description: "comet",
  category: "Travel & Places",
  aliases: ["comet"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD25",
  description: "fire",
  category: "Travel & Places",
  aliases: ["fire"],
  tags: ["burn"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCA7",
  description: "droplet",
  category: "Travel & Places",
  aliases: ["droplet"],
  tags: ["water"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF0A",
  description: "water wave",
  category: "Travel & Places",
  aliases: ["ocean"],
  tags: ["sea"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF83",
  description: "jack-o-lantern",
  category: "Activities",
  aliases: ["jack_o_lantern"],
  tags: ["halloween"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF84",
  description: "Christmas tree",
  category: "Activities",
  aliases: ["christmas_tree"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF86",
  description: "fireworks",
  category: "Activities",
  aliases: ["fireworks"],
  tags: ["festival", "celebration"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF87",
  description: "sparkler",
  category: "Activities",
  aliases: ["sparkler"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDE8",
  description: "firecracker",
  category: "Activities",
  aliases: ["firecracker"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\u2728",
  description: "sparkles",
  category: "Activities",
  aliases: ["sparkles"],
  tags: ["shiny"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF88",
  description: "balloon",
  category: "Activities",
  aliases: ["balloon"],
  tags: ["party", "birthday"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF89",
  description: "party popper",
  category: "Activities",
  aliases: ["tada"],
  tags: ["hooray", "party"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF8A",
  description: "confetti ball",
  category: "Activities",
  aliases: ["confetti_ball"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF8B",
  description: "tanabata tree",
  category: "Activities",
  aliases: ["tanabata_tree"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF8D",
  description: "pine decoration",
  category: "Activities",
  aliases: ["bamboo"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF8E",
  description: "Japanese dolls",
  category: "Activities",
  aliases: ["dolls"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF8F",
  description: "carp streamer",
  category: "Activities",
  aliases: ["flags"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF90",
  description: "wind chime",
  category: "Activities",
  aliases: ["wind_chime"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF91",
  description: "moon viewing ceremony",
  category: "Activities",
  aliases: ["rice_scene"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDE7",
  description: "red envelope",
  category: "Activities",
  aliases: ["red_envelope"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDF80",
  description: "ribbon",
  category: "Activities",
  aliases: ["ribbon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF81",
  description: "wrapped gift",
  category: "Activities",
  aliases: ["gift"],
  tags: ["present", "birthday", "christmas"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF97\uFE0F",
  description: "reminder ribbon",
  category: "Activities",
  aliases: ["reminder_ribbon"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF9F\uFE0F",
  description: "admission tickets",
  category: "Activities",
  aliases: ["tickets"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFAB",
  description: "ticket",
  category: "Activities",
  aliases: ["ticket"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF96\uFE0F",
  description: "military medal",
  category: "Activities",
  aliases: ["medal_military"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFC6",
  description: "trophy",
  category: "Activities",
  aliases: ["trophy"],
  tags: ["award", "contest", "winner"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFC5",
  description: "sports medal",
  category: "Activities",
  aliases: ["medal_sports"],
  tags: ["gold", "winner"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD47",
  description: "1st place medal",
  category: "Activities",
  aliases: ["1st_place_medal"],
  tags: ["gold"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD48",
  description: "2nd place medal",
  category: "Activities",
  aliases: ["2nd_place_medal"],
  tags: ["silver"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD49",
  description: "3rd place medal",
  category: "Activities",
  aliases: ["3rd_place_medal"],
  tags: ["bronze"],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\u26BD",
  description: "soccer ball",
  category: "Activities",
  aliases: ["soccer"],
  tags: ["sports"],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\u26BE",
  description: "baseball",
  category: "Activities",
  aliases: ["baseball"],
  tags: ["sports"],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD4E",
  description: "softball",
  category: "Activities",
  aliases: ["softball"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFC0",
  description: "basketball",
  category: "Activities",
  aliases: ["basketball"],
  tags: ["sports"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFD0",
  description: "volleyball",
  category: "Activities",
  aliases: ["volleyball"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFC8",
  description: "american football",
  category: "Activities",
  aliases: ["football"],
  tags: ["sports"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFC9",
  description: "rugby football",
  category: "Activities",
  aliases: ["rugby_football"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFBE",
  description: "tennis",
  category: "Activities",
  aliases: ["tennis"],
  tags: ["sports"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD4F",
  description: "flying disc",
  category: "Activities",
  aliases: ["flying_disc"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFB3",
  description: "bowling",
  category: "Activities",
  aliases: ["bowling"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFCF",
  description: "cricket game",
  category: "Activities",
  aliases: ["cricket_game"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFD1",
  description: "field hockey",
  category: "Activities",
  aliases: ["field_hockey"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFD2",
  description: "ice hockey",
  category: "Activities",
  aliases: ["ice_hockey"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD4D",
  description: "lacrosse",
  category: "Activities",
  aliases: ["lacrosse"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFD3",
  description: "ping pong",
  category: "Activities",
  aliases: ["ping_pong"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFF8",
  description: "badminton",
  category: "Activities",
  aliases: ["badminton"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD4A",
  description: "boxing glove",
  category: "Activities",
  aliases: ["boxing_glove"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD4B",
  description: "martial arts uniform",
  category: "Activities",
  aliases: ["martial_arts_uniform"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDD45",
  description: "goal net",
  category: "Activities",
  aliases: ["goal_net"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\u26F3",
  description: "flag in hole",
  category: "Activities",
  aliases: ["golf"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\u26F8\uFE0F",
  description: "ice skate",
  category: "Activities",
  aliases: ["ice_skate"],
  tags: ["skating"],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFA3",
  description: "fishing pole",
  category: "Activities",
  aliases: ["fishing_pole_and_fish"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD3F",
  description: "diving mask",
  category: "Activities",
  aliases: ["diving_mask"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83C\uDFBD",
  description: "running shirt",
  category: "Activities",
  aliases: ["running_shirt_with_sash"],
  tags: ["marathon"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFBF",
  description: "skis",
  category: "Activities",
  aliases: ["ski"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEF7",
  description: "sled",
  category: "Activities",
  aliases: ["sled"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD4C",
  description: "curling stone",
  category: "Activities",
  aliases: ["curling_stone"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFAF",
  description: "bullseye",
  category: "Activities",
  aliases: ["dart"],
  tags: ["target"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE80",
  description: "yo-yo",
  category: "Activities",
  aliases: ["yo_yo"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDE81",
  description: "kite",
  category: "Activities",
  aliases: ["kite"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDD2B",
  description: "water pistol",
  category: "Activities",
  aliases: ["gun"],
  tags: ["shoot", "weapon"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFB1",
  description: "pool 8 ball",
  category: "Activities",
  aliases: ["8ball"],
  tags: ["pool", "billiards"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD2E",
  description: "crystal ball",
  category: "Activities",
  aliases: ["crystal_ball"],
  tags: ["fortune"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE84",
  description: "magic wand",
  category: "Activities",
  aliases: ["magic_wand"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83C\uDFAE",
  description: "video game",
  category: "Activities",
  aliases: ["video_game"],
  tags: ["play", "controller", "console"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD79\uFE0F",
  description: "joystick",
  category: "Activities",
  aliases: ["joystick"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFB0",
  description: "slot machine",
  category: "Activities",
  aliases: ["slot_machine"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFB2",
  description: "game die",
  category: "Activities",
  aliases: ["game_die"],
  tags: ["dice", "gambling"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDE9",
  description: "puzzle piece",
  category: "Activities",
  aliases: ["jigsaw"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDF8",
  description: "teddy bear",
  category: "Activities",
  aliases: ["teddy_bear"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDE85",
  description: "pi\xF1ata",
  category: "Activities",
  aliases: ["pinata"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDEA9",
  description: "mirror ball",
  category: "Activities",
  aliases: ["mirror_ball"],
  tags: ["disco", "party"],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDE86",
  description: "nesting dolls",
  category: "Activities",
  aliases: ["nesting_dolls"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\u2660\uFE0F",
  description: "spade suit",
  category: "Activities",
  aliases: ["spades"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2665\uFE0F",
  description: "heart suit",
  category: "Activities",
  aliases: ["hearts"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2666\uFE0F",
  description: "diamond suit",
  category: "Activities",
  aliases: ["diamonds"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2663\uFE0F",
  description: "club suit",
  category: "Activities",
  aliases: ["clubs"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u265F\uFE0F",
  description: "chess pawn",
  category: "Activities",
  aliases: ["chess_pawn"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDCCF",
  description: "joker",
  category: "Activities",
  aliases: ["black_joker"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDC04",
  description: "mahjong red dragon",
  category: "Activities",
  aliases: ["mahjong"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFB4",
  description: "flower playing cards",
  category: "Activities",
  aliases: ["flower_playing_cards"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFAD",
  description: "performing arts",
  category: "Activities",
  aliases: ["performing_arts"],
  tags: ["theater", "drama"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDBC\uFE0F",
  description: "framed picture",
  category: "Activities",
  aliases: ["framed_picture"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFA8",
  description: "artist palette",
  category: "Activities",
  aliases: ["art"],
  tags: ["design", "paint"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDF5",
  description: "thread",
  category: "Activities",
  aliases: ["thread"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEA1",
  description: "sewing needle",
  category: "Activities",
  aliases: ["sewing_needle"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDDF6",
  description: "yarn",
  category: "Activities",
  aliases: ["yarn"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEA2",
  description: "knot",
  category: "Activities",
  aliases: ["knot"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDC53",
  description: "glasses",
  category: "Objects",
  aliases: ["eyeglasses"],
  tags: ["glasses"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD76\uFE0F",
  description: "sunglasses",
  category: "Objects",
  aliases: ["dark_sunglasses"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDD7D",
  description: "goggles",
  category: "Objects",
  aliases: ["goggles"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD7C",
  description: "lab coat",
  category: "Objects",
  aliases: ["lab_coat"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDBA",
  description: "safety vest",
  category: "Objects",
  aliases: ["safety_vest"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDC54",
  description: "necktie",
  category: "Objects",
  aliases: ["necktie"],
  tags: ["shirt", "formal"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC55",
  description: "t-shirt",
  category: "Objects",
  aliases: ["shirt", "tshirt"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC56",
  description: "jeans",
  category: "Objects",
  aliases: ["jeans"],
  tags: ["pants"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDE3",
  description: "scarf",
  category: "Objects",
  aliases: ["scarf"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDE4",
  description: "gloves",
  category: "Objects",
  aliases: ["gloves"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDE5",
  description: "coat",
  category: "Objects",
  aliases: ["coat"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDE6",
  description: "socks",
  category: "Objects",
  aliases: ["socks"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC57",
  description: "dress",
  category: "Objects",
  aliases: ["dress"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC58",
  description: "kimono",
  category: "Objects",
  aliases: ["kimono"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD7B",
  description: "sari",
  category: "Objects",
  aliases: ["sari"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDE71",
  description: "one-piece swimsuit",
  category: "Objects",
  aliases: ["one_piece_swimsuit"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDE72",
  description: "briefs",
  category: "Objects",
  aliases: ["swim_brief"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDE73",
  description: "shorts",
  category: "Objects",
  aliases: ["shorts"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDC59",
  description: "bikini",
  category: "Objects",
  aliases: ["bikini"],
  tags: ["beach"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC5A",
  description: "woman\u2019s clothes",
  category: "Objects",
  aliases: ["womans_clothes"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEAD",
  description: "folding hand fan",
  category: "Objects",
  aliases: ["folding_hand_fan"],
  tags: ["sensu"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDC5B",
  description: "purse",
  category: "Objects",
  aliases: ["purse"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC5C",
  description: "handbag",
  category: "Objects",
  aliases: ["handbag"],
  tags: ["bag"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC5D",
  description: "clutch bag",
  category: "Objects",
  aliases: ["pouch"],
  tags: ["bag"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDECD\uFE0F",
  description: "shopping bags",
  category: "Objects",
  aliases: ["shopping"],
  tags: ["bags"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF92",
  description: "backpack",
  category: "Objects",
  aliases: ["school_satchel"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE74",
  description: "thong sandal",
  category: "Objects",
  aliases: ["thong_sandal"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDC5E",
  description: "man\u2019s shoe",
  category: "Objects",
  aliases: ["mans_shoe", "shoe"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC5F",
  description: "running shoe",
  category: "Objects",
  aliases: ["athletic_shoe"],
  tags: ["sneaker", "sport", "running"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDD7E",
  description: "hiking boot",
  category: "Objects",
  aliases: ["hiking_boot"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDD7F",
  description: "flat shoe",
  category: "Objects",
  aliases: ["flat_shoe"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDC60",
  description: "high-heeled shoe",
  category: "Objects",
  aliases: ["high_heel"],
  tags: ["shoe"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC61",
  description: "woman\u2019s sandal",
  category: "Objects",
  aliases: ["sandal"],
  tags: ["shoe"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE70",
  description: "ballet shoes",
  category: "Objects",
  aliases: ["ballet_shoes"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDC62",
  description: "woman\u2019s boot",
  category: "Objects",
  aliases: ["boot"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEAE",
  description: "hair pick",
  category: "Objects",
  aliases: ["hair_pick"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDC51",
  description: "crown",
  category: "Objects",
  aliases: ["crown"],
  tags: ["king", "queen", "royal"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC52",
  description: "woman\u2019s hat",
  category: "Objects",
  aliases: ["womans_hat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFA9",
  description: "top hat",
  category: "Objects",
  aliases: ["tophat"],
  tags: ["hat", "classy"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF93",
  description: "graduation cap",
  category: "Objects",
  aliases: ["mortar_board"],
  tags: ["education", "college", "university", "graduation"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDE2",
  description: "billed cap",
  category: "Objects",
  aliases: ["billed_cap"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDE96",
  description: "military helmet",
  category: "Objects",
  aliases: ["military_helmet"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\u26D1\uFE0F",
  description: "rescue worker\u2019s helmet",
  category: "Objects",
  aliases: ["rescue_worker_helmet"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCFF",
  description: "prayer beads",
  category: "Objects",
  aliases: ["prayer_beads"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDC84",
  description: "lipstick",
  category: "Objects",
  aliases: ["lipstick"],
  tags: ["makeup"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC8D",
  description: "ring",
  category: "Objects",
  aliases: ["ring"],
  tags: ["wedding", "marriage", "engaged"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC8E",
  description: "gem stone",
  category: "Objects",
  aliases: ["gem"],
  tags: ["diamond"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD07",
  description: "muted speaker",
  category: "Objects",
  aliases: ["mute"],
  tags: ["sound", "volume"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD08",
  description: "speaker low volume",
  category: "Objects",
  aliases: ["speaker"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD09",
  description: "speaker medium volume",
  category: "Objects",
  aliases: ["sound"],
  tags: ["volume"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD0A",
  description: "speaker high volume",
  category: "Objects",
  aliases: ["loud_sound"],
  tags: ["volume"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE2",
  description: "loudspeaker",
  category: "Objects",
  aliases: ["loudspeaker"],
  tags: ["announcement"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE3",
  description: "megaphone",
  category: "Objects",
  aliases: ["mega"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCEF",
  description: "postal horn",
  category: "Objects",
  aliases: ["postal_horn"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD14",
  description: "bell",
  category: "Objects",
  aliases: ["bell"],
  tags: ["sound", "notification"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD15",
  description: "bell with slash",
  category: "Objects",
  aliases: ["no_bell"],
  tags: ["volume", "off"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFBC",
  description: "musical score",
  category: "Objects",
  aliases: ["musical_score"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFB5",
  description: "musical note",
  category: "Objects",
  aliases: ["musical_note"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFB6",
  description: "musical notes",
  category: "Objects",
  aliases: ["notes"],
  tags: ["music"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF99\uFE0F",
  description: "studio microphone",
  category: "Objects",
  aliases: ["studio_microphone"],
  tags: ["podcast"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF9A\uFE0F",
  description: "level slider",
  category: "Objects",
  aliases: ["level_slider"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDF9B\uFE0F",
  description: "control knobs",
  category: "Objects",
  aliases: ["control_knobs"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFA4",
  description: "microphone",
  category: "Objects",
  aliases: ["microphone"],
  tags: ["sing"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFA7",
  description: "headphone",
  category: "Objects",
  aliases: ["headphones"],
  tags: ["music", "earphones"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCFB",
  description: "radio",
  category: "Objects",
  aliases: ["radio"],
  tags: ["podcast"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFB7",
  description: "saxophone",
  category: "Objects",
  aliases: ["saxophone"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE97",
  description: "accordion",
  category: "Objects",
  aliases: ["accordion"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83C\uDFB8",
  description: "guitar",
  category: "Objects",
  aliases: ["guitar"],
  tags: ["rock"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFB9",
  description: "musical keyboard",
  category: "Objects",
  aliases: ["musical_keyboard"],
  tags: ["piano"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFBA",
  description: "trumpet",
  category: "Objects",
  aliases: ["trumpet"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFBB",
  description: "violin",
  category: "Objects",
  aliases: ["violin"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE95",
  description: "banjo",
  category: "Objects",
  aliases: ["banjo"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDD41",
  description: "drum",
  category: "Objects",
  aliases: ["drum"],
  tags: [],
  unicode_version: "",
  ios_version: "10.2"
}, {
  emoji: "\uD83E\uDE98",
  description: "long drum",
  category: "Objects",
  aliases: ["long_drum"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDE87",
  description: "maracas",
  category: "Objects",
  aliases: ["maracas"],
  tags: ["shaker"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83E\uDE88",
  description: "flute",
  category: "Objects",
  aliases: ["flute"],
  tags: ["recorder"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDCF1",
  description: "mobile phone",
  category: "Objects",
  aliases: ["iphone"],
  tags: ["smartphone", "mobile"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCF2",
  description: "mobile phone with arrow",
  category: "Objects",
  aliases: ["calling"],
  tags: ["call", "incoming"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u260E\uFE0F",
  description: "telephone",
  category: "Objects",
  aliases: ["phone", "telephone"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCDE",
  description: "telephone receiver",
  category: "Objects",
  aliases: ["telephone_receiver"],
  tags: ["phone", "call"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCDF",
  description: "pager",
  category: "Objects",
  aliases: ["pager"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE0",
  description: "fax machine",
  category: "Objects",
  aliases: ["fax"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD0B",
  description: "battery",
  category: "Objects",
  aliases: ["battery"],
  tags: ["power"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEAB",
  description: "low battery",
  category: "Objects",
  aliases: ["low_battery"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDD0C",
  description: "electric plug",
  category: "Objects",
  aliases: ["electric_plug"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCBB",
  description: "laptop",
  category: "Objects",
  aliases: ["computer"],
  tags: ["desktop", "screen"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDA5\uFE0F",
  description: "desktop computer",
  category: "Objects",
  aliases: ["desktop_computer"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDA8\uFE0F",
  description: "printer",
  category: "Objects",
  aliases: ["printer"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u2328\uFE0F",
  description: "keyboard",
  category: "Objects",
  aliases: ["keyboard"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDB1\uFE0F",
  description: "computer mouse",
  category: "Objects",
  aliases: ["computer_mouse"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDB2\uFE0F",
  description: "trackball",
  category: "Objects",
  aliases: ["trackball"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCBD",
  description: "computer disk",
  category: "Objects",
  aliases: ["minidisc"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCBE",
  description: "floppy disk",
  category: "Objects",
  aliases: ["floppy_disk"],
  tags: ["save"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCBF",
  description: "optical disk",
  category: "Objects",
  aliases: ["cd"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCC0",
  description: "dvd",
  category: "Objects",
  aliases: ["dvd"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDEE",
  description: "abacus",
  category: "Objects",
  aliases: ["abacus"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFA5",
  description: "movie camera",
  category: "Objects",
  aliases: ["movie_camera"],
  tags: ["film", "video"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF9E\uFE0F",
  description: "film frames",
  category: "Objects",
  aliases: ["film_strip"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCFD\uFE0F",
  description: "film projector",
  category: "Objects",
  aliases: ["film_projector"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFAC",
  description: "clapper board",
  category: "Objects",
  aliases: ["clapper"],
  tags: ["film"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCFA",
  description: "television",
  category: "Objects",
  aliases: ["tv"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCF7",
  description: "camera",
  category: "Objects",
  aliases: ["camera"],
  tags: ["photo"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCF8",
  description: "camera with flash",
  category: "Objects",
  aliases: ["camera_flash"],
  tags: ["photo"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCF9",
  description: "video camera",
  category: "Objects",
  aliases: ["video_camera"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCFC",
  description: "videocassette",
  category: "Objects",
  aliases: ["vhs"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD0D",
  description: "magnifying glass tilted left",
  category: "Objects",
  aliases: ["mag"],
  tags: ["search", "zoom"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD0E",
  description: "magnifying glass tilted right",
  category: "Objects",
  aliases: ["mag_right"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD6F\uFE0F",
  description: "candle",
  category: "Objects",
  aliases: ["candle"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCA1",
  description: "light bulb",
  category: "Objects",
  aliases: ["bulb"],
  tags: ["idea", "light"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD26",
  description: "flashlight",
  category: "Objects",
  aliases: ["flashlight"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFEE",
  description: "red paper lantern",
  category: "Objects",
  aliases: ["izakaya_lantern", "lantern"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE94",
  description: "diya lamp",
  category: "Objects",
  aliases: ["diya_lamp"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDCD4",
  description: "notebook with decorative cover",
  category: "Objects",
  aliases: ["notebook_with_decorative_cover"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCD5",
  description: "closed book",
  category: "Objects",
  aliases: ["closed_book"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCD6",
  description: "open book",
  category: "Objects",
  aliases: ["book", "open_book"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCD7",
  description: "green book",
  category: "Objects",
  aliases: ["green_book"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCD8",
  description: "blue book",
  category: "Objects",
  aliases: ["blue_book"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCD9",
  description: "orange book",
  category: "Objects",
  aliases: ["orange_book"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCDA",
  description: "books",
  category: "Objects",
  aliases: ["books"],
  tags: ["library"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCD3",
  description: "notebook",
  category: "Objects",
  aliases: ["notebook"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCD2",
  description: "ledger",
  category: "Objects",
  aliases: ["ledger"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCC3",
  description: "page with curl",
  category: "Objects",
  aliases: ["page_with_curl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCDC",
  description: "scroll",
  category: "Objects",
  aliases: ["scroll"],
  tags: ["document"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCC4",
  description: "page facing up",
  category: "Objects",
  aliases: ["page_facing_up"],
  tags: ["document"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCF0",
  description: "newspaper",
  category: "Objects",
  aliases: ["newspaper"],
  tags: ["press"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDDE\uFE0F",
  description: "rolled-up newspaper",
  category: "Objects",
  aliases: ["newspaper_roll"],
  tags: ["press"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCD1",
  description: "bookmark tabs",
  category: "Objects",
  aliases: ["bookmark_tabs"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD16",
  description: "bookmark",
  category: "Objects",
  aliases: ["bookmark"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFF7\uFE0F",
  description: "label",
  category: "Objects",
  aliases: ["label"],
  tags: ["tag"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCB0",
  description: "money bag",
  category: "Objects",
  aliases: ["moneybag"],
  tags: ["dollar", "cream"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE99",
  description: "coin",
  category: "Objects",
  aliases: ["coin"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDCB4",
  description: "yen banknote",
  category: "Objects",
  aliases: ["yen"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCB5",
  description: "dollar banknote",
  category: "Objects",
  aliases: ["dollar"],
  tags: ["money"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCB6",
  description: "euro banknote",
  category: "Objects",
  aliases: ["euro"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCB7",
  description: "pound banknote",
  category: "Objects",
  aliases: ["pound"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCB8",
  description: "money with wings",
  category: "Objects",
  aliases: ["money_with_wings"],
  tags: ["dollar"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCB3",
  description: "credit card",
  category: "Objects",
  aliases: ["credit_card"],
  tags: ["subscription"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDDFE",
  description: "receipt",
  category: "Objects",
  aliases: ["receipt"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDCB9",
  description: "chart increasing with yen",
  category: "Objects",
  aliases: ["chart"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2709\uFE0F",
  description: "envelope",
  category: "Objects",
  aliases: ["envelope"],
  tags: ["letter", "email"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE7",
  description: "e-mail",
  category: "Objects",
  aliases: ["email", "e-mail"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE8",
  description: "incoming envelope",
  category: "Objects",
  aliases: ["incoming_envelope"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE9",
  description: "envelope with arrow",
  category: "Objects",
  aliases: ["envelope_with_arrow"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE4",
  description: "outbox tray",
  category: "Objects",
  aliases: ["outbox_tray"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE5",
  description: "inbox tray",
  category: "Objects",
  aliases: ["inbox_tray"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE6",
  description: "package",
  category: "Objects",
  aliases: ["package"],
  tags: ["shipping"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCEB",
  description: "closed mailbox with raised flag",
  category: "Objects",
  aliases: ["mailbox"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCEA",
  description: "closed mailbox with lowered flag",
  category: "Objects",
  aliases: ["mailbox_closed"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCEC",
  description: "open mailbox with raised flag",
  category: "Objects",
  aliases: ["mailbox_with_mail"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCED",
  description: "open mailbox with lowered flag",
  category: "Objects",
  aliases: ["mailbox_with_no_mail"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCEE",
  description: "postbox",
  category: "Objects",
  aliases: ["postbox"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDF3\uFE0F",
  description: "ballot box with ballot",
  category: "Objects",
  aliases: ["ballot_box"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u270F\uFE0F",
  description: "pencil",
  category: "Objects",
  aliases: ["pencil2"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2712\uFE0F",
  description: "black nib",
  category: "Objects",
  aliases: ["black_nib"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD8B\uFE0F",
  description: "fountain pen",
  category: "Objects",
  aliases: ["fountain_pen"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD8A\uFE0F",
  description: "pen",
  category: "Objects",
  aliases: ["pen"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD8C\uFE0F",
  description: "paintbrush",
  category: "Objects",
  aliases: ["paintbrush"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD8D\uFE0F",
  description: "crayon",
  category: "Objects",
  aliases: ["crayon"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCDD",
  description: "memo",
  category: "Objects",
  aliases: ["memo", "pencil"],
  tags: ["document", "note"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCBC",
  description: "briefcase",
  category: "Objects",
  aliases: ["briefcase"],
  tags: ["business"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCC1",
  description: "file folder",
  category: "Objects",
  aliases: ["file_folder"],
  tags: ["directory"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCC2",
  description: "open file folder",
  category: "Objects",
  aliases: ["open_file_folder"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDC2\uFE0F",
  description: "card index dividers",
  category: "Objects",
  aliases: ["card_index_dividers"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCC5",
  description: "calendar",
  category: "Objects",
  aliases: ["date"],
  tags: ["calendar", "schedule"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCC6",
  description: "tear-off calendar",
  category: "Objects",
  aliases: ["calendar"],
  tags: ["schedule"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDD2\uFE0F",
  description: "spiral notepad",
  category: "Objects",
  aliases: ["spiral_notepad"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDD3\uFE0F",
  description: "spiral calendar",
  category: "Objects",
  aliases: ["spiral_calendar"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCC7",
  description: "card index",
  category: "Objects",
  aliases: ["card_index"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCC8",
  description: "chart increasing",
  category: "Objects",
  aliases: ["chart_with_upwards_trend"],
  tags: ["graph", "metrics"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCC9",
  description: "chart decreasing",
  category: "Objects",
  aliases: ["chart_with_downwards_trend"],
  tags: ["graph", "metrics"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCCA",
  description: "bar chart",
  category: "Objects",
  aliases: ["bar_chart"],
  tags: ["stats", "metrics"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCCB",
  description: "clipboard",
  category: "Objects",
  aliases: ["clipboard"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCCC",
  description: "pushpin",
  category: "Objects",
  aliases: ["pushpin"],
  tags: ["location"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCCD",
  description: "round pushpin",
  category: "Objects",
  aliases: ["round_pushpin"],
  tags: ["location"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCCE",
  description: "paperclip",
  category: "Objects",
  aliases: ["paperclip"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD87\uFE0F",
  description: "linked paperclips",
  category: "Objects",
  aliases: ["paperclips"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCCF",
  description: "straight ruler",
  category: "Objects",
  aliases: ["straight_ruler"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCD0",
  description: "triangular ruler",
  category: "Objects",
  aliases: ["triangular_ruler"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2702\uFE0F",
  description: "scissors",
  category: "Objects",
  aliases: ["scissors"],
  tags: ["cut"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDC3\uFE0F",
  description: "card file box",
  category: "Objects",
  aliases: ["card_file_box"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDC4\uFE0F",
  description: "file cabinet",
  category: "Objects",
  aliases: ["file_cabinet"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDD1\uFE0F",
  description: "wastebasket",
  category: "Objects",
  aliases: ["wastebasket"],
  tags: ["trash"],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD12",
  description: "locked",
  category: "Objects",
  aliases: ["lock"],
  tags: ["security", "private"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD13",
  description: "unlocked",
  category: "Objects",
  aliases: ["unlock"],
  tags: ["security"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD0F",
  description: "locked with pen",
  category: "Objects",
  aliases: ["lock_with_ink_pen"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD10",
  description: "locked with key",
  category: "Objects",
  aliases: ["closed_lock_with_key"],
  tags: ["security"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD11",
  description: "key",
  category: "Objects",
  aliases: ["key"],
  tags: ["lock", "password"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDDDD\uFE0F",
  description: "old key",
  category: "Objects",
  aliases: ["old_key"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD28",
  description: "hammer",
  category: "Objects",
  aliases: ["hammer"],
  tags: ["tool"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE93",
  description: "axe",
  category: "Objects",
  aliases: ["axe"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\u26CF\uFE0F",
  description: "pick",
  category: "Objects",
  aliases: ["pick"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\u2692\uFE0F",
  description: "hammer and pick",
  category: "Objects",
  aliases: ["hammer_and_pick"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEE0\uFE0F",
  description: "hammer and wrench",
  category: "Objects",
  aliases: ["hammer_and_wrench"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDE1\uFE0F",
  description: "dagger",
  category: "Objects",
  aliases: ["dagger"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u2694\uFE0F",
  description: "crossed swords",
  category: "Objects",
  aliases: ["crossed_swords"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDCA3",
  description: "bomb",
  category: "Objects",
  aliases: ["bomb"],
  tags: ["boom"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE83",
  description: "boomerang",
  category: "Objects",
  aliases: ["boomerang"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83C\uDFF9",
  description: "bow and arrow",
  category: "Objects",
  aliases: ["bow_and_arrow"],
  tags: ["archery"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDEE1\uFE0F",
  description: "shield",
  category: "Objects",
  aliases: ["shield"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDE9A",
  description: "carpentry saw",
  category: "Objects",
  aliases: ["carpentry_saw"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDD27",
  description: "wrench",
  category: "Objects",
  aliases: ["wrench"],
  tags: ["tool"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE9B",
  description: "screwdriver",
  category: "Objects",
  aliases: ["screwdriver"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDD29",
  description: "nut and bolt",
  category: "Objects",
  aliases: ["nut_and_bolt"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2699\uFE0F",
  description: "gear",
  category: "Objects",
  aliases: ["gear"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDDDC\uFE0F",
  description: "clamp",
  category: "Objects",
  aliases: ["clamp"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u2696\uFE0F",
  description: "balance scale",
  category: "Objects",
  aliases: ["balance_scale"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDDAF",
  description: "white cane",
  category: "Objects",
  aliases: ["probing_cane"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDD17",
  description: "link",
  category: "Objects",
  aliases: ["link"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u26D3\uFE0F",
  description: "chains",
  category: "Objects",
  aliases: ["chains"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDE9D",
  description: "hook",
  category: "Objects",
  aliases: ["hook"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDDF0",
  description: "toolbox",
  category: "Objects",
  aliases: ["toolbox"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDF2",
  description: "magnet",
  category: "Objects",
  aliases: ["magnet"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDE9C",
  description: "ladder",
  category: "Objects",
  aliases: ["ladder"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\u2697\uFE0F",
  description: "alembic",
  category: "Objects",
  aliases: ["alembic"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDDEA",
  description: "test tube",
  category: "Objects",
  aliases: ["test_tube"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDEB",
  description: "petri dish",
  category: "Objects",
  aliases: ["petri_dish"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDEC",
  description: "dna",
  category: "Objects",
  aliases: ["dna"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDD2C",
  description: "microscope",
  category: "Objects",
  aliases: ["microscope"],
  tags: ["science", "laboratory", "investigate"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD2D",
  description: "telescope",
  category: "Objects",
  aliases: ["telescope"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCE1",
  description: "satellite antenna",
  category: "Objects",
  aliases: ["satellite"],
  tags: ["signal"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDC89",
  description: "syringe",
  category: "Objects",
  aliases: ["syringe"],
  tags: ["health", "hospital", "needle"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE78",
  description: "drop of blood",
  category: "Objects",
  aliases: ["drop_of_blood"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDC8A",
  description: "pill",
  category: "Objects",
  aliases: ["pill"],
  tags: ["health", "medicine"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDE79",
  description: "adhesive bandage",
  category: "Objects",
  aliases: ["adhesive_bandage"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDE7C",
  description: "crutch",
  category: "Objects",
  aliases: ["crutch"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDE7A",
  description: "stethoscope",
  category: "Objects",
  aliases: ["stethoscope"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDE7B",
  description: "x-ray",
  category: "Objects",
  aliases: ["x_ray"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDEAA",
  description: "door",
  category: "Objects",
  aliases: ["door"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDED7",
  description: "elevator",
  category: "Objects",
  aliases: ["elevator"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDE9E",
  description: "mirror",
  category: "Objects",
  aliases: ["mirror"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDE9F",
  description: "window",
  category: "Objects",
  aliases: ["window"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDECF\uFE0F",
  description: "bed",
  category: "Objects",
  aliases: ["bed"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDECB\uFE0F",
  description: "couch and lamp",
  category: "Objects",
  aliases: ["couch_and_lamp"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDE91",
  description: "chair",
  category: "Objects",
  aliases: ["chair"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDEBD",
  description: "toilet",
  category: "Objects",
  aliases: ["toilet"],
  tags: ["wc"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEA0",
  description: "plunger",
  category: "Objects",
  aliases: ["plunger"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83D\uDEBF",
  description: "shower",
  category: "Objects",
  aliases: ["shower"],
  tags: ["bath"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEC1",
  description: "bathtub",
  category: "Objects",
  aliases: ["bathtub"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEA4",
  description: "mouse trap",
  category: "Objects",
  aliases: ["mouse_trap"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDE92",
  description: "razor",
  category: "Objects",
  aliases: ["razor"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83E\uDDF4",
  description: "lotion bottle",
  category: "Objects",
  aliases: ["lotion_bottle"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDF7",
  description: "safety pin",
  category: "Objects",
  aliases: ["safety_pin"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDF9",
  description: "broom",
  category: "Objects",
  aliases: ["broom"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDFA",
  description: "basket",
  category: "Objects",
  aliases: ["basket"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDFB",
  description: "roll of paper",
  category: "Objects",
  aliases: ["roll_of_paper"],
  tags: ["toilet"],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEA3",
  description: "bucket",
  category: "Objects",
  aliases: ["bucket"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDDFC",
  description: "soap",
  category: "Objects",
  aliases: ["soap"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEE7",
  description: "bubbles",
  category: "Objects",
  aliases: ["bubbles"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83E\uDEA5",
  description: "toothbrush",
  category: "Objects",
  aliases: ["toothbrush"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDDFD",
  description: "sponge",
  category: "Objects",
  aliases: ["sponge"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDDEF",
  description: "fire extinguisher",
  category: "Objects",
  aliases: ["fire_extinguisher"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83D\uDED2",
  description: "shopping cart",
  category: "Objects",
  aliases: ["shopping_cart"],
  tags: [],
  unicode_version: "9.0",
  ios_version: "10.2"
}, {
  emoji: "\uD83D\uDEAC",
  description: "cigarette",
  category: "Objects",
  aliases: ["smoking"],
  tags: ["cigarette"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u26B0\uFE0F",
  description: "coffin",
  category: "Objects",
  aliases: ["coffin"],
  tags: ["funeral"],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDEA6",
  description: "headstone",
  category: "Objects",
  aliases: ["headstone"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\u26B1\uFE0F",
  description: "funeral urn",
  category: "Objects",
  aliases: ["funeral_urn"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83E\uDDFF",
  description: "nazar amulet",
  category: "Objects",
  aliases: ["nazar_amulet"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83E\uDEAC",
  description: "hamsa",
  category: "Objects",
  aliases: ["hamsa"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83D\uDDFF",
  description: "moai",
  category: "Objects",
  aliases: ["moyai"],
  tags: ["stone"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEA7",
  description: "placard",
  category: "Objects",
  aliases: ["placard"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83E\uDEAA",
  description: "identification card",
  category: "Objects",
  aliases: ["identification_card"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\uD83C\uDFE7",
  description: "ATM sign",
  category: "Symbols",
  aliases: ["atm"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEAE",
  description: "litter in bin sign",
  category: "Symbols",
  aliases: ["put_litter_in_its_place"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEB0",
  description: "potable water",
  category: "Symbols",
  aliases: ["potable_water"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u267F",
  description: "wheelchair symbol",
  category: "Symbols",
  aliases: ["wheelchair"],
  tags: ["accessibility"],
  unicode_version: "4.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEB9",
  description: "men\u2019s room",
  category: "Symbols",
  aliases: ["mens"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEBA",
  description: "women\u2019s room",
  category: "Symbols",
  aliases: ["womens"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEBB",
  description: "restroom",
  category: "Symbols",
  aliases: ["restroom"],
  tags: ["toilet"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEBC",
  description: "baby symbol",
  category: "Symbols",
  aliases: ["baby_symbol"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEBE",
  description: "water closet",
  category: "Symbols",
  aliases: ["wc"],
  tags: ["toilet", "restroom"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEC2",
  description: "passport control",
  category: "Symbols",
  aliases: ["passport_control"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEC3",
  description: "customs",
  category: "Symbols",
  aliases: ["customs"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEC4",
  description: "baggage claim",
  category: "Symbols",
  aliases: ["baggage_claim"],
  tags: ["airport"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEC5",
  description: "left luggage",
  category: "Symbols",
  aliases: ["left_luggage"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u26A0\uFE0F",
  description: "warning",
  category: "Symbols",
  aliases: ["warning"],
  tags: ["wip"],
  unicode_version: "4.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEB8",
  description: "children crossing",
  category: "Symbols",
  aliases: ["children_crossing"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u26D4",
  description: "no entry",
  category: "Symbols",
  aliases: ["no_entry"],
  tags: ["limit"],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEAB",
  description: "prohibited",
  category: "Symbols",
  aliases: ["no_entry_sign"],
  tags: ["block", "forbidden"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEB3",
  description: "no bicycles",
  category: "Symbols",
  aliases: ["no_bicycles"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEAD",
  description: "no smoking",
  category: "Symbols",
  aliases: ["no_smoking"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEAF",
  description: "no littering",
  category: "Symbols",
  aliases: ["do_not_litter"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEB1",
  description: "non-potable water",
  category: "Symbols",
  aliases: ["non-potable_water"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEB7",
  description: "no pedestrians",
  category: "Symbols",
  aliases: ["no_pedestrians"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCF5",
  description: "no mobile phones",
  category: "Symbols",
  aliases: ["no_mobile_phones"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD1E",
  description: "no one under eighteen",
  category: "Symbols",
  aliases: ["underage"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2622\uFE0F",
  description: "radioactive",
  category: "Symbols",
  aliases: ["radioactive"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u2623\uFE0F",
  description: "biohazard",
  category: "Symbols",
  aliases: ["biohazard"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u2B06\uFE0F",
  description: "up arrow",
  category: "Symbols",
  aliases: ["arrow_up"],
  tags: [],
  unicode_version: "4.0",
  ios_version: "6.0"
}, {
  emoji: "\u2197\uFE0F",
  description: "up-right arrow",
  category: "Symbols",
  aliases: ["arrow_upper_right"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u27A1\uFE0F",
  description: "right arrow",
  category: "Symbols",
  aliases: ["arrow_right"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2198\uFE0F",
  description: "down-right arrow",
  category: "Symbols",
  aliases: ["arrow_lower_right"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2B07\uFE0F",
  description: "down arrow",
  category: "Symbols",
  aliases: ["arrow_down"],
  tags: [],
  unicode_version: "4.0",
  ios_version: "6.0"
}, {
  emoji: "\u2199\uFE0F",
  description: "down-left arrow",
  category: "Symbols",
  aliases: ["arrow_lower_left"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2B05\uFE0F",
  description: "left arrow",
  category: "Symbols",
  aliases: ["arrow_left"],
  tags: [],
  unicode_version: "4.0",
  ios_version: "6.0"
}, {
  emoji: "\u2196\uFE0F",
  description: "up-left arrow",
  category: "Symbols",
  aliases: ["arrow_upper_left"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2195\uFE0F",
  description: "up-down arrow",
  category: "Symbols",
  aliases: ["arrow_up_down"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2194\uFE0F",
  description: "left-right arrow",
  category: "Symbols",
  aliases: ["left_right_arrow"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u21A9\uFE0F",
  description: "right arrow curving left",
  category: "Symbols",
  aliases: ["leftwards_arrow_with_hook"],
  tags: ["return"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u21AA\uFE0F",
  description: "left arrow curving right",
  category: "Symbols",
  aliases: ["arrow_right_hook"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2934\uFE0F",
  description: "right arrow curving up",
  category: "Symbols",
  aliases: ["arrow_heading_up"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2935\uFE0F",
  description: "right arrow curving down",
  category: "Symbols",
  aliases: ["arrow_heading_down"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD03",
  description: "clockwise vertical arrows",
  category: "Symbols",
  aliases: ["arrows_clockwise"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD04",
  description: "counterclockwise arrows button",
  category: "Symbols",
  aliases: ["arrows_counterclockwise"],
  tags: ["sync"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD19",
  description: "BACK arrow",
  category: "Symbols",
  aliases: ["back"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD1A",
  description: "END arrow",
  category: "Symbols",
  aliases: ["end"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD1B",
  description: "ON! arrow",
  category: "Symbols",
  aliases: ["on"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD1C",
  description: "SOON arrow",
  category: "Symbols",
  aliases: ["soon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD1D",
  description: "TOP arrow",
  category: "Symbols",
  aliases: ["top"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDED0",
  description: "place of worship",
  category: "Symbols",
  aliases: ["place_of_worship"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\u269B\uFE0F",
  description: "atom symbol",
  category: "Symbols",
  aliases: ["atom_symbol"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD49\uFE0F",
  description: "om",
  category: "Symbols",
  aliases: ["om"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u2721\uFE0F",
  description: "star of David",
  category: "Symbols",
  aliases: ["star_of_david"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u2638\uFE0F",
  description: "wheel of dharma",
  category: "Symbols",
  aliases: ["wheel_of_dharma"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u262F\uFE0F",
  description: "yin yang",
  category: "Symbols",
  aliases: ["yin_yang"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u271D\uFE0F",
  description: "latin cross",
  category: "Symbols",
  aliases: ["latin_cross"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u2626\uFE0F",
  description: "orthodox cross",
  category: "Symbols",
  aliases: ["orthodox_cross"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u262A\uFE0F",
  description: "star and crescent",
  category: "Symbols",
  aliases: ["star_and_crescent"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\u262E\uFE0F",
  description: "peace symbol",
  category: "Symbols",
  aliases: ["peace_symbol"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD4E",
  description: "menorah",
  category: "Symbols",
  aliases: ["menorah"],
  tags: [],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD2F",
  description: "dotted six-pointed star",
  category: "Symbols",
  aliases: ["six_pointed_star"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83E\uDEAF",
  description: "khanda",
  category: "Symbols",
  aliases: ["khanda"],
  tags: [],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\u2648",
  description: "Aries",
  category: "Symbols",
  aliases: ["aries"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2649",
  description: "Taurus",
  category: "Symbols",
  aliases: ["taurus"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u264A",
  description: "Gemini",
  category: "Symbols",
  aliases: ["gemini"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u264B",
  description: "Cancer",
  category: "Symbols",
  aliases: ["cancer"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u264C",
  description: "Leo",
  category: "Symbols",
  aliases: ["leo"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u264D",
  description: "Virgo",
  category: "Symbols",
  aliases: ["virgo"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u264E",
  description: "Libra",
  category: "Symbols",
  aliases: ["libra"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u264F",
  description: "Scorpio",
  category: "Symbols",
  aliases: ["scorpius"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2650",
  description: "Sagittarius",
  category: "Symbols",
  aliases: ["sagittarius"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2651",
  description: "Capricorn",
  category: "Symbols",
  aliases: ["capricorn"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2652",
  description: "Aquarius",
  category: "Symbols",
  aliases: ["aquarius"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2653",
  description: "Pisces",
  category: "Symbols",
  aliases: ["pisces"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u26CE",
  description: "Ophiuchus",
  category: "Symbols",
  aliases: ["ophiuchus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD00",
  description: "shuffle tracks button",
  category: "Symbols",
  aliases: ["twisted_rightwards_arrows"],
  tags: ["shuffle"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD01",
  description: "repeat button",
  category: "Symbols",
  aliases: ["repeat"],
  tags: ["loop"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD02",
  description: "repeat single button",
  category: "Symbols",
  aliases: ["repeat_one"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u25B6\uFE0F",
  description: "play button",
  category: "Symbols",
  aliases: ["arrow_forward"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u23E9",
  description: "fast-forward button",
  category: "Symbols",
  aliases: ["fast_forward"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u23ED\uFE0F",
  description: "next track button",
  category: "Symbols",
  aliases: ["next_track_button"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.1"
}, {
  emoji: "\u23EF\uFE0F",
  description: "play or pause button",
  category: "Symbols",
  aliases: ["play_or_pause_button"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.1"
}, {
  emoji: "\u25C0\uFE0F",
  description: "reverse button",
  category: "Symbols",
  aliases: ["arrow_backward"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u23EA",
  description: "fast reverse button",
  category: "Symbols",
  aliases: ["rewind"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u23EE\uFE0F",
  description: "last track button",
  category: "Symbols",
  aliases: ["previous_track_button"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD3C",
  description: "upwards button",
  category: "Symbols",
  aliases: ["arrow_up_small"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u23EB",
  description: "fast up button",
  category: "Symbols",
  aliases: ["arrow_double_up"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD3D",
  description: "downwards button",
  category: "Symbols",
  aliases: ["arrow_down_small"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u23EC",
  description: "fast down button",
  category: "Symbols",
  aliases: ["arrow_double_down"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u23F8\uFE0F",
  description: "pause button",
  category: "Symbols",
  aliases: ["pause_button"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u23F9\uFE0F",
  description: "stop button",
  category: "Symbols",
  aliases: ["stop_button"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u23FA\uFE0F",
  description: "record button",
  category: "Symbols",
  aliases: ["record_button"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\u23CF\uFE0F",
  description: "eject button",
  category: "Symbols",
  aliases: ["eject_button"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFA6",
  description: "cinema",
  category: "Symbols",
  aliases: ["cinema"],
  tags: ["film", "movie"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD05",
  description: "dim button",
  category: "Symbols",
  aliases: ["low_brightness"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD06",
  description: "bright button",
  category: "Symbols",
  aliases: ["high_brightness"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCF6",
  description: "antenna bars",
  category: "Symbols",
  aliases: ["signal_strength"],
  tags: ["wifi"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEDC",
  description: "wireless",
  category: "Symbols",
  aliases: ["wireless"],
  tags: ["wifi"],
  unicode_version: "15.0",
  ios_version: "16.4"
}, {
  emoji: "\uD83D\uDCF3",
  description: "vibration mode",
  category: "Symbols",
  aliases: ["vibration_mode"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCF4",
  description: "mobile phone off",
  category: "Symbols",
  aliases: ["mobile_phone_off"],
  tags: ["mute", "off"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2640\uFE0F",
  description: "female sign",
  category: "Symbols",
  aliases: ["female_sign"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\u2642\uFE0F",
  description: "male sign",
  category: "Symbols",
  aliases: ["male_sign"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\u26A7\uFE0F",
  description: "transgender symbol",
  category: "Symbols",
  aliases: ["transgender_symbol"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\u2716\uFE0F",
  description: "multiply",
  category: "Symbols",
  aliases: ["heavy_multiplication_x"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2795",
  description: "plus",
  category: "Symbols",
  aliases: ["heavy_plus_sign"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2796",
  description: "minus",
  category: "Symbols",
  aliases: ["heavy_minus_sign"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2797",
  description: "divide",
  category: "Symbols",
  aliases: ["heavy_division_sign"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDFF0",
  description: "heavy equals sign",
  category: "Symbols",
  aliases: ["heavy_equals_sign"],
  tags: [],
  unicode_version: "14.0",
  ios_version: "15.4"
}, {
  emoji: "\u267E\uFE0F",
  description: "infinity",
  category: "Symbols",
  aliases: ["infinity"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\u203C\uFE0F",
  description: "double exclamation mark",
  category: "Symbols",
  aliases: ["bangbang"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2049\uFE0F",
  description: "exclamation question mark",
  category: "Symbols",
  aliases: ["interrobang"],
  tags: [],
  unicode_version: "3.0",
  ios_version: "6.0"
}, {
  emoji: "\u2753",
  description: "red question mark",
  category: "Symbols",
  aliases: ["question"],
  tags: ["confused"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2754",
  description: "white question mark",
  category: "Symbols",
  aliases: ["grey_question"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2755",
  description: "white exclamation mark",
  category: "Symbols",
  aliases: ["grey_exclamation"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2757",
  description: "red exclamation mark",
  category: "Symbols",
  aliases: ["exclamation", "heavy_exclamation_mark"],
  tags: ["bang"],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\u3030\uFE0F",
  description: "wavy dash",
  category: "Symbols",
  aliases: ["wavy_dash"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCB1",
  description: "currency exchange",
  category: "Symbols",
  aliases: ["currency_exchange"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCB2",
  description: "heavy dollar sign",
  category: "Symbols",
  aliases: ["heavy_dollar_sign"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2695\uFE0F",
  description: "medical symbol",
  category: "Symbols",
  aliases: ["medical_symbol"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\u267B\uFE0F",
  description: "recycling symbol",
  category: "Symbols",
  aliases: ["recycle"],
  tags: ["environment", "green"],
  unicode_version: "3.2",
  ios_version: "6.0"
}, {
  emoji: "\u269C\uFE0F",
  description: "fleur-de-lis",
  category: "Symbols",
  aliases: ["fleur_de_lis"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "9.1"
}, {
  emoji: "\uD83D\uDD31",
  description: "trident emblem",
  category: "Symbols",
  aliases: ["trident"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCDB",
  description: "name badge",
  category: "Symbols",
  aliases: ["name_badge"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD30",
  description: "Japanese symbol for beginner",
  category: "Symbols",
  aliases: ["beginner"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2B55",
  description: "hollow red circle",
  category: "Symbols",
  aliases: ["o"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\u2705",
  description: "check mark button",
  category: "Symbols",
  aliases: ["white_check_mark"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2611\uFE0F",
  description: "check box with check",
  category: "Symbols",
  aliases: ["ballot_box_with_check"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2714\uFE0F",
  description: "check mark",
  category: "Symbols",
  aliases: ["heavy_check_mark"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u274C",
  description: "cross mark",
  category: "Symbols",
  aliases: ["x"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u274E",
  description: "cross mark button",
  category: "Symbols",
  aliases: ["negative_squared_cross_mark"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u27B0",
  description: "curly loop",
  category: "Symbols",
  aliases: ["curly_loop"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u27BF",
  description: "double curly loop",
  category: "Symbols",
  aliases: ["loop"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u303D\uFE0F",
  description: "part alternation mark",
  category: "Symbols",
  aliases: ["part_alternation_mark"],
  tags: [],
  unicode_version: "3.2",
  ios_version: "6.0"
}, {
  emoji: "\u2733\uFE0F",
  description: "eight-spoked asterisk",
  category: "Symbols",
  aliases: ["eight_spoked_asterisk"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2734\uFE0F",
  description: "eight-pointed star",
  category: "Symbols",
  aliases: ["eight_pointed_black_star"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2747\uFE0F",
  description: "sparkle",
  category: "Symbols",
  aliases: ["sparkle"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\xA9\uFE0F",
  description: "copyright",
  category: "Symbols",
  aliases: ["copyright"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\xAE\uFE0F",
  description: "registered",
  category: "Symbols",
  aliases: ["registered"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u2122\uFE0F",
  description: "trade mark",
  category: "Symbols",
  aliases: ["tm"],
  tags: ["trademark"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "#\uFE0F\u20E3",
  description: "keycap: #",
  category: "Symbols",
  aliases: ["hash"],
  tags: ["number"],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "*\uFE0F\u20E3",
  description: "keycap: *",
  category: "Symbols",
  aliases: ["asterisk"],
  tags: [],
  unicode_version: "",
  ios_version: "9.1"
}, {
  emoji: "0\uFE0F\u20E3",
  description: "keycap: 0",
  category: "Symbols",
  aliases: ["zero"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "1\uFE0F\u20E3",
  description: "keycap: 1",
  category: "Symbols",
  aliases: ["one"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "2\uFE0F\u20E3",
  description: "keycap: 2",
  category: "Symbols",
  aliases: ["two"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "3\uFE0F\u20E3",
  description: "keycap: 3",
  category: "Symbols",
  aliases: ["three"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "4\uFE0F\u20E3",
  description: "keycap: 4",
  category: "Symbols",
  aliases: ["four"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "5\uFE0F\u20E3",
  description: "keycap: 5",
  category: "Symbols",
  aliases: ["five"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "6\uFE0F\u20E3",
  description: "keycap: 6",
  category: "Symbols",
  aliases: ["six"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "7\uFE0F\u20E3",
  description: "keycap: 7",
  category: "Symbols",
  aliases: ["seven"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "8\uFE0F\u20E3",
  description: "keycap: 8",
  category: "Symbols",
  aliases: ["eight"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "9\uFE0F\u20E3",
  description: "keycap: 9",
  category: "Symbols",
  aliases: ["nine"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD1F",
  description: "keycap: 10",
  category: "Symbols",
  aliases: ["keycap_ten"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD20",
  description: "input latin uppercase",
  category: "Symbols",
  aliases: ["capital_abcd"],
  tags: ["letters"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD21",
  description: "input latin lowercase",
  category: "Symbols",
  aliases: ["abcd"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD22",
  description: "input numbers",
  category: "Symbols",
  aliases: ["1234"],
  tags: ["numbers"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD23",
  description: "input symbols",
  category: "Symbols",
  aliases: ["symbols"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD24",
  description: "input latin letters",
  category: "Symbols",
  aliases: ["abc"],
  tags: ["alphabet"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD70\uFE0F",
  description: "A button (blood type)",
  category: "Symbols",
  aliases: ["a"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD8E",
  description: "AB button (blood type)",
  category: "Symbols",
  aliases: ["ab"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD71\uFE0F",
  description: "B button (blood type)",
  category: "Symbols",
  aliases: ["b"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD91",
  description: "CL button",
  category: "Symbols",
  aliases: ["cl"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD92",
  description: "COOL button",
  category: "Symbols",
  aliases: ["cool"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD93",
  description: "FREE button",
  category: "Symbols",
  aliases: ["free"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u2139\uFE0F",
  description: "information",
  category: "Symbols",
  aliases: ["information_source"],
  tags: [],
  unicode_version: "3.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD94",
  description: "ID button",
  category: "Symbols",
  aliases: ["id"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u24C2\uFE0F",
  description: "circled M",
  category: "Symbols",
  aliases: ["m"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD95",
  description: "NEW button",
  category: "Symbols",
  aliases: ["new"],
  tags: ["fresh"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD96",
  description: "NG button",
  category: "Symbols",
  aliases: ["ng"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD7E\uFE0F",
  description: "O button (blood type)",
  category: "Symbols",
  aliases: ["o2"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD97",
  description: "OK button",
  category: "Symbols",
  aliases: ["ok"],
  tags: ["yes"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD7F\uFE0F",
  description: "P button",
  category: "Symbols",
  aliases: ["parking"],
  tags: [],
  unicode_version: "5.2",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD98",
  description: "SOS button",
  category: "Symbols",
  aliases: ["sos"],
  tags: ["help", "emergency"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD99",
  description: "UP! button",
  category: "Symbols",
  aliases: ["up"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDD9A",
  description: "VS button",
  category: "Symbols",
  aliases: ["vs"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE01",
  description: "Japanese \u201Chere\u201D button",
  category: "Symbols",
  aliases: ["koko"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE02\uFE0F",
  description: "Japanese \u201Cservice charge\u201D button",
  category: "Symbols",
  aliases: ["sa"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE37\uFE0F",
  description: "Japanese \u201Cmonthly amount\u201D button",
  category: "Symbols",
  aliases: ["u6708"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE36",
  description: "Japanese \u201Cnot free of charge\u201D button",
  category: "Symbols",
  aliases: ["u6709"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE2F",
  description: "Japanese \u201Creserved\u201D button",
  category: "Symbols",
  aliases: ["u6307"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE50",
  description: "Japanese \u201Cbargain\u201D button",
  category: "Symbols",
  aliases: ["ideograph_advantage"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE39",
  description: "Japanese \u201Cdiscount\u201D button",
  category: "Symbols",
  aliases: ["u5272"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE1A",
  description: "Japanese \u201Cfree of charge\u201D button",
  category: "Symbols",
  aliases: ["u7121"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE32",
  description: "Japanese \u201Cprohibited\u201D button",
  category: "Symbols",
  aliases: ["u7981"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE51",
  description: "Japanese \u201Cacceptable\u201D button",
  category: "Symbols",
  aliases: ["accept"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE38",
  description: "Japanese \u201Capplication\u201D button",
  category: "Symbols",
  aliases: ["u7533"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE34",
  description: "Japanese \u201Cpassing grade\u201D button",
  category: "Symbols",
  aliases: ["u5408"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE33",
  description: "Japanese \u201Cvacancy\u201D button",
  category: "Symbols",
  aliases: ["u7a7a"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\u3297\uFE0F",
  description: "Japanese \u201Ccongratulations\u201D button",
  category: "Symbols",
  aliases: ["congratulations"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u3299\uFE0F",
  description: "Japanese \u201Csecret\u201D button",
  category: "Symbols",
  aliases: ["secret"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE3A",
  description: "Japanese \u201Copen for business\u201D button",
  category: "Symbols",
  aliases: ["u55b6"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDE35",
  description: "Japanese \u201Cno vacancy\u201D button",
  category: "Symbols",
  aliases: ["u6e80"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD34",
  description: "red circle",
  category: "Symbols",
  aliases: ["red_circle"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDFE0",
  description: "orange circle",
  category: "Symbols",
  aliases: ["orange_circle"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFE1",
  description: "yellow circle",
  category: "Symbols",
  aliases: ["yellow_circle"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFE2",
  description: "green circle",
  category: "Symbols",
  aliases: ["green_circle"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDD35",
  description: "blue circle",
  category: "Symbols",
  aliases: ["large_blue_circle"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDFE3",
  description: "purple circle",
  category: "Symbols",
  aliases: ["purple_circle"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFE4",
  description: "brown circle",
  category: "Symbols",
  aliases: ["brown_circle"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\u26AB",
  description: "black circle",
  category: "Symbols",
  aliases: ["black_circle"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "6.0"
}, {
  emoji: "\u26AA",
  description: "white circle",
  category: "Symbols",
  aliases: ["white_circle"],
  tags: [],
  unicode_version: "4.1",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDFE5",
  description: "red square",
  category: "Symbols",
  aliases: ["red_square"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFE7",
  description: "orange square",
  category: "Symbols",
  aliases: ["orange_square"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFE8",
  description: "yellow square",
  category: "Symbols",
  aliases: ["yellow_square"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFE9",
  description: "green square",
  category: "Symbols",
  aliases: ["green_square"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFE6",
  description: "blue square",
  category: "Symbols",
  aliases: ["blue_square"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFEA",
  description: "purple square",
  category: "Symbols",
  aliases: ["purple_square"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\uD83D\uDFEB",
  description: "brown square",
  category: "Symbols",
  aliases: ["brown_square"],
  tags: [],
  unicode_version: "12.0",
  ios_version: "13.0"
}, {
  emoji: "\u2B1B",
  description: "black large square",
  category: "Symbols",
  aliases: ["black_large_square"],
  tags: [],
  unicode_version: "5.1",
  ios_version: "6.0"
}, {
  emoji: "\u2B1C",
  description: "white large square",
  category: "Symbols",
  aliases: ["white_large_square"],
  tags: [],
  unicode_version: "5.1",
  ios_version: "6.0"
}, {
  emoji: "\u25FC\uFE0F",
  description: "black medium square",
  category: "Symbols",
  aliases: ["black_medium_square"],
  tags: [],
  unicode_version: "3.2",
  ios_version: "6.0"
}, {
  emoji: "\u25FB\uFE0F",
  description: "white medium square",
  category: "Symbols",
  aliases: ["white_medium_square"],
  tags: [],
  unicode_version: "3.2",
  ios_version: "6.0"
}, {
  emoji: "\u25FE",
  description: "black medium-small square",
  category: "Symbols",
  aliases: ["black_medium_small_square"],
  tags: [],
  unicode_version: "3.2",
  ios_version: "6.0"
}, {
  emoji: "\u25FD",
  description: "white medium-small square",
  category: "Symbols",
  aliases: ["white_medium_small_square"],
  tags: [],
  unicode_version: "3.2",
  ios_version: "6.0"
}, {
  emoji: "\u25AA\uFE0F",
  description: "black small square",
  category: "Symbols",
  aliases: ["black_small_square"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\u25AB\uFE0F",
  description: "white small square",
  category: "Symbols",
  aliases: ["white_small_square"],
  tags: [],
  unicode_version: "",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD36",
  description: "large orange diamond",
  category: "Symbols",
  aliases: ["large_orange_diamond"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD37",
  description: "large blue diamond",
  category: "Symbols",
  aliases: ["large_blue_diamond"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD38",
  description: "small orange diamond",
  category: "Symbols",
  aliases: ["small_orange_diamond"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD39",
  description: "small blue diamond",
  category: "Symbols",
  aliases: ["small_blue_diamond"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD3A",
  description: "red triangle pointed up",
  category: "Symbols",
  aliases: ["small_red_triangle"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD3B",
  description: "red triangle pointed down",
  category: "Symbols",
  aliases: ["small_red_triangle_down"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDCA0",
  description: "diamond with a dot",
  category: "Symbols",
  aliases: ["diamond_shape_with_a_dot_inside"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD18",
  description: "radio button",
  category: "Symbols",
  aliases: ["radio_button"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD33",
  description: "white square button",
  category: "Symbols",
  aliases: ["white_square_button"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDD32",
  description: "black square button",
  category: "Symbols",
  aliases: ["black_square_button"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFC1",
  description: "chequered flag",
  category: "Flags",
  aliases: ["checkered_flag"],
  tags: ["milestone", "finish"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83D\uDEA9",
  description: "triangular flag",
  category: "Flags",
  aliases: ["triangular_flag_on_post"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDF8C",
  description: "crossed flags",
  category: "Flags",
  aliases: ["crossed_flags"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDFF4",
  description: "black flag",
  category: "Flags",
  aliases: ["black_flag"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFF3\uFE0F",
  description: "white flag",
  category: "Flags",
  aliases: ["white_flag"],
  tags: [],
  unicode_version: "7.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08",
  description: "rainbow flag",
  category: "Flags",
  aliases: ["rainbow_flag"],
  tags: ["pride"],
  unicode_version: "6.0",
  ios_version: "10.0"
}, {
  emoji: "\uD83C\uDFF3\uFE0F\u200D\u26A7\uFE0F",
  description: "transgender flag",
  category: "Flags",
  aliases: ["transgender_flag"],
  tags: [],
  unicode_version: "13.0",
  ios_version: "14.0"
}, {
  emoji: "\uD83C\uDFF4\u200D\u2620\uFE0F",
  description: "pirate flag",
  category: "Flags",
  aliases: ["pirate_flag"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDE8",
  description: "flag: Ascension Island",
  category: "Flags",
  aliases: ["ascension_island"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDE9",
  description: "flag: Andorra",
  category: "Flags",
  aliases: ["andorra"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDEA",
  description: "flag: United Arab Emirates",
  category: "Flags",
  aliases: ["united_arab_emirates"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDEB",
  description: "flag: Afghanistan",
  category: "Flags",
  aliases: ["afghanistan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDEC",
  description: "flag: Antigua & Barbuda",
  category: "Flags",
  aliases: ["antigua_barbuda"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDEE",
  description: "flag: Anguilla",
  category: "Flags",
  aliases: ["anguilla"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDF1",
  description: "flag: Albania",
  category: "Flags",
  aliases: ["albania"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDF2",
  description: "flag: Armenia",
  category: "Flags",
  aliases: ["armenia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDF4",
  description: "flag: Angola",
  category: "Flags",
  aliases: ["angola"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDF6",
  description: "flag: Antarctica",
  category: "Flags",
  aliases: ["antarctica"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDF7",
  description: "flag: Argentina",
  category: "Flags",
  aliases: ["argentina"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDF8",
  description: "flag: American Samoa",
  category: "Flags",
  aliases: ["american_samoa"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDF9",
  description: "flag: Austria",
  category: "Flags",
  aliases: ["austria"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDFA",
  description: "flag: Australia",
  category: "Flags",
  aliases: ["australia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDFC",
  description: "flag: Aruba",
  category: "Flags",
  aliases: ["aruba"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDFD",
  description: "flag: \xC5land Islands",
  category: "Flags",
  aliases: ["aland_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDE6\uD83C\uDDFF",
  description: "flag: Azerbaijan",
  category: "Flags",
  aliases: ["azerbaijan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDE6",
  description: "flag: Bosnia & Herzegovina",
  category: "Flags",
  aliases: ["bosnia_herzegovina"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDE7",
  description: "flag: Barbados",
  category: "Flags",
  aliases: ["barbados"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDE9",
  description: "flag: Bangladesh",
  category: "Flags",
  aliases: ["bangladesh"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDEA",
  description: "flag: Belgium",
  category: "Flags",
  aliases: ["belgium"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDEB",
  description: "flag: Burkina Faso",
  category: "Flags",
  aliases: ["burkina_faso"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDEC",
  description: "flag: Bulgaria",
  category: "Flags",
  aliases: ["bulgaria"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDED",
  description: "flag: Bahrain",
  category: "Flags",
  aliases: ["bahrain"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDEE",
  description: "flag: Burundi",
  category: "Flags",
  aliases: ["burundi"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDEF",
  description: "flag: Benin",
  category: "Flags",
  aliases: ["benin"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDF1",
  description: "flag: St. Barth\xE9lemy",
  category: "Flags",
  aliases: ["st_barthelemy"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDF2",
  description: "flag: Bermuda",
  category: "Flags",
  aliases: ["bermuda"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDF3",
  description: "flag: Brunei",
  category: "Flags",
  aliases: ["brunei"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDF4",
  description: "flag: Bolivia",
  category: "Flags",
  aliases: ["bolivia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDF6",
  description: "flag: Caribbean Netherlands",
  category: "Flags",
  aliases: ["caribbean_netherlands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDF7",
  description: "flag: Brazil",
  category: "Flags",
  aliases: ["brazil"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDF8",
  description: "flag: Bahamas",
  category: "Flags",
  aliases: ["bahamas"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDF9",
  description: "flag: Bhutan",
  category: "Flags",
  aliases: ["bhutan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDFB",
  description: "flag: Bouvet Island",
  category: "Flags",
  aliases: ["bouvet_island"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDFC",
  description: "flag: Botswana",
  category: "Flags",
  aliases: ["botswana"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDFE",
  description: "flag: Belarus",
  category: "Flags",
  aliases: ["belarus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE7\uD83C\uDDFF",
  description: "flag: Belize",
  category: "Flags",
  aliases: ["belize"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDE6",
  description: "flag: Canada",
  category: "Flags",
  aliases: ["canada"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDE8",
  description: "flag: Cocos (Keeling) Islands",
  category: "Flags",
  aliases: ["cocos_islands"],
  tags: ["keeling"],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDE9",
  description: "flag: Congo - Kinshasa",
  category: "Flags",
  aliases: ["congo_kinshasa"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDEB",
  description: "flag: Central African Republic",
  category: "Flags",
  aliases: ["central_african_republic"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDEC",
  description: "flag: Congo - Brazzaville",
  category: "Flags",
  aliases: ["congo_brazzaville"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDED",
  description: "flag: Switzerland",
  category: "Flags",
  aliases: ["switzerland"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDEE",
  description: "flag: C\xF4te d\u2019Ivoire",
  category: "Flags",
  aliases: ["cote_divoire"],
  tags: ["ivory"],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDF0",
  description: "flag: Cook Islands",
  category: "Flags",
  aliases: ["cook_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDF1",
  description: "flag: Chile",
  category: "Flags",
  aliases: ["chile"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDF2",
  description: "flag: Cameroon",
  category: "Flags",
  aliases: ["cameroon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDF3",
  description: "flag: China",
  category: "Flags",
  aliases: ["cn"],
  tags: ["china"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDF4",
  description: "flag: Colombia",
  category: "Flags",
  aliases: ["colombia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDF5",
  description: "flag: Clipperton Island",
  category: "Flags",
  aliases: ["clipperton_island"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDF7",
  description: "flag: Costa Rica",
  category: "Flags",
  aliases: ["costa_rica"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDFA",
  description: "flag: Cuba",
  category: "Flags",
  aliases: ["cuba"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDFB",
  description: "flag: Cape Verde",
  category: "Flags",
  aliases: ["cape_verde"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDFC",
  description: "flag: Cura\xE7ao",
  category: "Flags",
  aliases: ["curacao"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDFD",
  description: "flag: Christmas Island",
  category: "Flags",
  aliases: ["christmas_island"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDFE",
  description: "flag: Cyprus",
  category: "Flags",
  aliases: ["cyprus"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE8\uD83C\uDDFF",
  description: "flag: Czechia",
  category: "Flags",
  aliases: ["czech_republic"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE9\uD83C\uDDEA",
  description: "flag: Germany",
  category: "Flags",
  aliases: ["de"],
  tags: ["flag", "germany"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDE9\uD83C\uDDEC",
  description: "flag: Diego Garcia",
  category: "Flags",
  aliases: ["diego_garcia"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDE9\uD83C\uDDEF",
  description: "flag: Djibouti",
  category: "Flags",
  aliases: ["djibouti"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE9\uD83C\uDDF0",
  description: "flag: Denmark",
  category: "Flags",
  aliases: ["denmark"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE9\uD83C\uDDF2",
  description: "flag: Dominica",
  category: "Flags",
  aliases: ["dominica"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE9\uD83C\uDDF4",
  description: "flag: Dominican Republic",
  category: "Flags",
  aliases: ["dominican_republic"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDE9\uD83C\uDDFF",
  description: "flag: Algeria",
  category: "Flags",
  aliases: ["algeria"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDE6",
  description: "flag: Ceuta & Melilla",
  category: "Flags",
  aliases: ["ceuta_melilla"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDE8",
  description: "flag: Ecuador",
  category: "Flags",
  aliases: ["ecuador"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDEA",
  description: "flag: Estonia",
  category: "Flags",
  aliases: ["estonia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDEC",
  description: "flag: Egypt",
  category: "Flags",
  aliases: ["egypt"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDED",
  description: "flag: Western Sahara",
  category: "Flags",
  aliases: ["western_sahara"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDF7",
  description: "flag: Eritrea",
  category: "Flags",
  aliases: ["eritrea"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDF8",
  description: "flag: Spain",
  category: "Flags",
  aliases: ["es"],
  tags: ["spain"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDF9",
  description: "flag: Ethiopia",
  category: "Flags",
  aliases: ["ethiopia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEA\uD83C\uDDFA",
  description: "flag: European Union",
  category: "Flags",
  aliases: ["eu", "european_union"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEB\uD83C\uDDEE",
  description: "flag: Finland",
  category: "Flags",
  aliases: ["finland"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEB\uD83C\uDDEF",
  description: "flag: Fiji",
  category: "Flags",
  aliases: ["fiji"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEB\uD83C\uDDF0",
  description: "flag: Falkland Islands",
  category: "Flags",
  aliases: ["falkland_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEB\uD83C\uDDF2",
  description: "flag: Micronesia",
  category: "Flags",
  aliases: ["micronesia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEB\uD83C\uDDF4",
  description: "flag: Faroe Islands",
  category: "Flags",
  aliases: ["faroe_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEB\uD83C\uDDF7",
  description: "flag: France",
  category: "Flags",
  aliases: ["fr"],
  tags: ["france", "french"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDE6",
  description: "flag: Gabon",
  category: "Flags",
  aliases: ["gabon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDE7",
  description: "flag: United Kingdom",
  category: "Flags",
  aliases: ["gb", "uk"],
  tags: ["flag", "british"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDE9",
  description: "flag: Grenada",
  category: "Flags",
  aliases: ["grenada"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDEA",
  description: "flag: Georgia",
  category: "Flags",
  aliases: ["georgia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDEB",
  description: "flag: French Guiana",
  category: "Flags",
  aliases: ["french_guiana"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDEC",
  description: "flag: Guernsey",
  category: "Flags",
  aliases: ["guernsey"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDED",
  description: "flag: Ghana",
  category: "Flags",
  aliases: ["ghana"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDEE",
  description: "flag: Gibraltar",
  category: "Flags",
  aliases: ["gibraltar"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDF1",
  description: "flag: Greenland",
  category: "Flags",
  aliases: ["greenland"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDF2",
  description: "flag: Gambia",
  category: "Flags",
  aliases: ["gambia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDF3",
  description: "flag: Guinea",
  category: "Flags",
  aliases: ["guinea"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDF5",
  description: "flag: Guadeloupe",
  category: "Flags",
  aliases: ["guadeloupe"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDF6",
  description: "flag: Equatorial Guinea",
  category: "Flags",
  aliases: ["equatorial_guinea"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDF7",
  description: "flag: Greece",
  category: "Flags",
  aliases: ["greece"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDF8",
  description: "flag: South Georgia & South Sandwich Islands",
  category: "Flags",
  aliases: ["south_georgia_south_sandwich_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDF9",
  description: "flag: Guatemala",
  category: "Flags",
  aliases: ["guatemala"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDFA",
  description: "flag: Guam",
  category: "Flags",
  aliases: ["guam"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDFC",
  description: "flag: Guinea-Bissau",
  category: "Flags",
  aliases: ["guinea_bissau"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEC\uD83C\uDDFE",
  description: "flag: Guyana",
  category: "Flags",
  aliases: ["guyana"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDED\uD83C\uDDF0",
  description: "flag: Hong Kong SAR China",
  category: "Flags",
  aliases: ["hong_kong"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDED\uD83C\uDDF2",
  description: "flag: Heard & McDonald Islands",
  category: "Flags",
  aliases: ["heard_mcdonald_islands"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDED\uD83C\uDDF3",
  description: "flag: Honduras",
  category: "Flags",
  aliases: ["honduras"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDED\uD83C\uDDF7",
  description: "flag: Croatia",
  category: "Flags",
  aliases: ["croatia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDED\uD83C\uDDF9",
  description: "flag: Haiti",
  category: "Flags",
  aliases: ["haiti"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDED\uD83C\uDDFA",
  description: "flag: Hungary",
  category: "Flags",
  aliases: ["hungary"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDE8",
  description: "flag: Canary Islands",
  category: "Flags",
  aliases: ["canary_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDE9",
  description: "flag: Indonesia",
  category: "Flags",
  aliases: ["indonesia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDEA",
  description: "flag: Ireland",
  category: "Flags",
  aliases: ["ireland"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDF1",
  description: "flag: Israel",
  category: "Flags",
  aliases: ["israel"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDF2",
  description: "flag: Isle of Man",
  category: "Flags",
  aliases: ["isle_of_man"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDF3",
  description: "flag: India",
  category: "Flags",
  aliases: ["india"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDF4",
  description: "flag: British Indian Ocean Territory",
  category: "Flags",
  aliases: ["british_indian_ocean_territory"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDF6",
  description: "flag: Iraq",
  category: "Flags",
  aliases: ["iraq"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDF7",
  description: "flag: Iran",
  category: "Flags",
  aliases: ["iran"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDF8",
  description: "flag: Iceland",
  category: "Flags",
  aliases: ["iceland"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEE\uD83C\uDDF9",
  description: "flag: Italy",
  category: "Flags",
  aliases: ["it"],
  tags: ["italy"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDEF\uD83C\uDDEA",
  description: "flag: Jersey",
  category: "Flags",
  aliases: ["jersey"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDEF\uD83C\uDDF2",
  description: "flag: Jamaica",
  category: "Flags",
  aliases: ["jamaica"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEF\uD83C\uDDF4",
  description: "flag: Jordan",
  category: "Flags",
  aliases: ["jordan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDEF\uD83C\uDDF5",
  description: "flag: Japan",
  category: "Flags",
  aliases: ["jp"],
  tags: ["japan"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDEA",
  description: "flag: Kenya",
  category: "Flags",
  aliases: ["kenya"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDEC",
  description: "flag: Kyrgyzstan",
  category: "Flags",
  aliases: ["kyrgyzstan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDED",
  description: "flag: Cambodia",
  category: "Flags",
  aliases: ["cambodia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDEE",
  description: "flag: Kiribati",
  category: "Flags",
  aliases: ["kiribati"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDF2",
  description: "flag: Comoros",
  category: "Flags",
  aliases: ["comoros"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDF3",
  description: "flag: St. Kitts & Nevis",
  category: "Flags",
  aliases: ["st_kitts_nevis"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDF5",
  description: "flag: North Korea",
  category: "Flags",
  aliases: ["north_korea"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDF7",
  description: "flag: South Korea",
  category: "Flags",
  aliases: ["kr"],
  tags: ["korea"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDFC",
  description: "flag: Kuwait",
  category: "Flags",
  aliases: ["kuwait"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDFE",
  description: "flag: Cayman Islands",
  category: "Flags",
  aliases: ["cayman_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF0\uD83C\uDDFF",
  description: "flag: Kazakhstan",
  category: "Flags",
  aliases: ["kazakhstan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDE6",
  description: "flag: Laos",
  category: "Flags",
  aliases: ["laos"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDE7",
  description: "flag: Lebanon",
  category: "Flags",
  aliases: ["lebanon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDE8",
  description: "flag: St. Lucia",
  category: "Flags",
  aliases: ["st_lucia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDEE",
  description: "flag: Liechtenstein",
  category: "Flags",
  aliases: ["liechtenstein"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDF0",
  description: "flag: Sri Lanka",
  category: "Flags",
  aliases: ["sri_lanka"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDF7",
  description: "flag: Liberia",
  category: "Flags",
  aliases: ["liberia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDF8",
  description: "flag: Lesotho",
  category: "Flags",
  aliases: ["lesotho"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDF9",
  description: "flag: Lithuania",
  category: "Flags",
  aliases: ["lithuania"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDFA",
  description: "flag: Luxembourg",
  category: "Flags",
  aliases: ["luxembourg"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDFB",
  description: "flag: Latvia",
  category: "Flags",
  aliases: ["latvia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF1\uD83C\uDDFE",
  description: "flag: Libya",
  category: "Flags",
  aliases: ["libya"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDE6",
  description: "flag: Morocco",
  category: "Flags",
  aliases: ["morocco"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDE8",
  description: "flag: Monaco",
  category: "Flags",
  aliases: ["monaco"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDE9",
  description: "flag: Moldova",
  category: "Flags",
  aliases: ["moldova"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDEA",
  description: "flag: Montenegro",
  category: "Flags",
  aliases: ["montenegro"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDEB",
  description: "flag: St. Martin",
  category: "Flags",
  aliases: ["st_martin"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDEC",
  description: "flag: Madagascar",
  category: "Flags",
  aliases: ["madagascar"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDED",
  description: "flag: Marshall Islands",
  category: "Flags",
  aliases: ["marshall_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF0",
  description: "flag: North Macedonia",
  category: "Flags",
  aliases: ["macedonia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF1",
  description: "flag: Mali",
  category: "Flags",
  aliases: ["mali"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF2",
  description: "flag: Myanmar (Burma)",
  category: "Flags",
  aliases: ["myanmar"],
  tags: ["burma"],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF3",
  description: "flag: Mongolia",
  category: "Flags",
  aliases: ["mongolia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF4",
  description: "flag: Macao SAR China",
  category: "Flags",
  aliases: ["macau"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF5",
  description: "flag: Northern Mariana Islands",
  category: "Flags",
  aliases: ["northern_mariana_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF6",
  description: "flag: Martinique",
  category: "Flags",
  aliases: ["martinique"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF7",
  description: "flag: Mauritania",
  category: "Flags",
  aliases: ["mauritania"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF8",
  description: "flag: Montserrat",
  category: "Flags",
  aliases: ["montserrat"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDF9",
  description: "flag: Malta",
  category: "Flags",
  aliases: ["malta"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDFA",
  description: "flag: Mauritius",
  category: "Flags",
  aliases: ["mauritius"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDFB",
  description: "flag: Maldives",
  category: "Flags",
  aliases: ["maldives"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDFC",
  description: "flag: Malawi",
  category: "Flags",
  aliases: ["malawi"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDFD",
  description: "flag: Mexico",
  category: "Flags",
  aliases: ["mexico"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDFE",
  description: "flag: Malaysia",
  category: "Flags",
  aliases: ["malaysia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF2\uD83C\uDDFF",
  description: "flag: Mozambique",
  category: "Flags",
  aliases: ["mozambique"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDE6",
  description: "flag: Namibia",
  category: "Flags",
  aliases: ["namibia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDE8",
  description: "flag: New Caledonia",
  category: "Flags",
  aliases: ["new_caledonia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDEA",
  description: "flag: Niger",
  category: "Flags",
  aliases: ["niger"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDEB",
  description: "flag: Norfolk Island",
  category: "Flags",
  aliases: ["norfolk_island"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDEC",
  description: "flag: Nigeria",
  category: "Flags",
  aliases: ["nigeria"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDEE",
  description: "flag: Nicaragua",
  category: "Flags",
  aliases: ["nicaragua"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDF1",
  description: "flag: Netherlands",
  category: "Flags",
  aliases: ["netherlands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDF4",
  description: "flag: Norway",
  category: "Flags",
  aliases: ["norway"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDF5",
  description: "flag: Nepal",
  category: "Flags",
  aliases: ["nepal"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDF7",
  description: "flag: Nauru",
  category: "Flags",
  aliases: ["nauru"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDFA",
  description: "flag: Niue",
  category: "Flags",
  aliases: ["niue"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF3\uD83C\uDDFF",
  description: "flag: New Zealand",
  category: "Flags",
  aliases: ["new_zealand"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF4\uD83C\uDDF2",
  description: "flag: Oman",
  category: "Flags",
  aliases: ["oman"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDE6",
  description: "flag: Panama",
  category: "Flags",
  aliases: ["panama"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDEA",
  description: "flag: Peru",
  category: "Flags",
  aliases: ["peru"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDEB",
  description: "flag: French Polynesia",
  category: "Flags",
  aliases: ["french_polynesia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDEC",
  description: "flag: Papua New Guinea",
  category: "Flags",
  aliases: ["papua_new_guinea"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDED",
  description: "flag: Philippines",
  category: "Flags",
  aliases: ["philippines"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDF0",
  description: "flag: Pakistan",
  category: "Flags",
  aliases: ["pakistan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDF1",
  description: "flag: Poland",
  category: "Flags",
  aliases: ["poland"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDF2",
  description: "flag: St. Pierre & Miquelon",
  category: "Flags",
  aliases: ["st_pierre_miquelon"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDF3",
  description: "flag: Pitcairn Islands",
  category: "Flags",
  aliases: ["pitcairn_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDF7",
  description: "flag: Puerto Rico",
  category: "Flags",
  aliases: ["puerto_rico"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDF8",
  description: "flag: Palestinian Territories",
  category: "Flags",
  aliases: ["palestinian_territories"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDF9",
  description: "flag: Portugal",
  category: "Flags",
  aliases: ["portugal"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDFC",
  description: "flag: Palau",
  category: "Flags",
  aliases: ["palau"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF5\uD83C\uDDFE",
  description: "flag: Paraguay",
  category: "Flags",
  aliases: ["paraguay"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF6\uD83C\uDDE6",
  description: "flag: Qatar",
  category: "Flags",
  aliases: ["qatar"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF7\uD83C\uDDEA",
  description: "flag: R\xE9union",
  category: "Flags",
  aliases: ["reunion"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF7\uD83C\uDDF4",
  description: "flag: Romania",
  category: "Flags",
  aliases: ["romania"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF7\uD83C\uDDF8",
  description: "flag: Serbia",
  category: "Flags",
  aliases: ["serbia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF7\uD83C\uDDFA",
  description: "flag: Russia",
  category: "Flags",
  aliases: ["ru"],
  tags: ["russia"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDF7\uD83C\uDDFC",
  description: "flag: Rwanda",
  category: "Flags",
  aliases: ["rwanda"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDE6",
  description: "flag: Saudi Arabia",
  category: "Flags",
  aliases: ["saudi_arabia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDE7",
  description: "flag: Solomon Islands",
  category: "Flags",
  aliases: ["solomon_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDE8",
  description: "flag: Seychelles",
  category: "Flags",
  aliases: ["seychelles"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDE9",
  description: "flag: Sudan",
  category: "Flags",
  aliases: ["sudan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDEA",
  description: "flag: Sweden",
  category: "Flags",
  aliases: ["sweden"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDEC",
  description: "flag: Singapore",
  category: "Flags",
  aliases: ["singapore"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDED",
  description: "flag: St. Helena",
  category: "Flags",
  aliases: ["st_helena"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDEE",
  description: "flag: Slovenia",
  category: "Flags",
  aliases: ["slovenia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDEF",
  description: "flag: Svalbard & Jan Mayen",
  category: "Flags",
  aliases: ["svalbard_jan_mayen"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDF0",
  description: "flag: Slovakia",
  category: "Flags",
  aliases: ["slovakia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDF1",
  description: "flag: Sierra Leone",
  category: "Flags",
  aliases: ["sierra_leone"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDF2",
  description: "flag: San Marino",
  category: "Flags",
  aliases: ["san_marino"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDF3",
  description: "flag: Senegal",
  category: "Flags",
  aliases: ["senegal"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDF4",
  description: "flag: Somalia",
  category: "Flags",
  aliases: ["somalia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDF7",
  description: "flag: Suriname",
  category: "Flags",
  aliases: ["suriname"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDF8",
  description: "flag: South Sudan",
  category: "Flags",
  aliases: ["south_sudan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDF9",
  description: "flag: S\xE3o Tom\xE9 & Pr\xEDncipe",
  category: "Flags",
  aliases: ["sao_tome_principe"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDFB",
  description: "flag: El Salvador",
  category: "Flags",
  aliases: ["el_salvador"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDFD",
  description: "flag: Sint Maarten",
  category: "Flags",
  aliases: ["sint_maarten"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDFE",
  description: "flag: Syria",
  category: "Flags",
  aliases: ["syria"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF8\uD83C\uDDFF",
  description: "flag: Eswatini",
  category: "Flags",
  aliases: ["swaziland"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDE6",
  description: "flag: Tristan da Cunha",
  category: "Flags",
  aliases: ["tristan_da_cunha"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDE8",
  description: "flag: Turks & Caicos Islands",
  category: "Flags",
  aliases: ["turks_caicos_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDE9",
  description: "flag: Chad",
  category: "Flags",
  aliases: ["chad"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDEB",
  description: "flag: French Southern Territories",
  category: "Flags",
  aliases: ["french_southern_territories"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDEC",
  description: "flag: Togo",
  category: "Flags",
  aliases: ["togo"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDED",
  description: "flag: Thailand",
  category: "Flags",
  aliases: ["thailand"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDEF",
  description: "flag: Tajikistan",
  category: "Flags",
  aliases: ["tajikistan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDF0",
  description: "flag: Tokelau",
  category: "Flags",
  aliases: ["tokelau"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDF1",
  description: "flag: Timor-Leste",
  category: "Flags",
  aliases: ["timor_leste"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDF2",
  description: "flag: Turkmenistan",
  category: "Flags",
  aliases: ["turkmenistan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDF3",
  description: "flag: Tunisia",
  category: "Flags",
  aliases: ["tunisia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDF4",
  description: "flag: Tonga",
  category: "Flags",
  aliases: ["tonga"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDF7",
  description: "flag: Turkey",
  category: "Flags",
  aliases: ["tr"],
  tags: ["turkey"],
  unicode_version: "8.0",
  ios_version: "9.1"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDF9",
  description: "flag: Trinidad & Tobago",
  category: "Flags",
  aliases: ["trinidad_tobago"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDFB",
  description: "flag: Tuvalu",
  category: "Flags",
  aliases: ["tuvalu"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDFC",
  description: "flag: Taiwan",
  category: "Flags",
  aliases: ["taiwan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDF9\uD83C\uDDFF",
  description: "flag: Tanzania",
  category: "Flags",
  aliases: ["tanzania"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFA\uD83C\uDDE6",
  description: "flag: Ukraine",
  category: "Flags",
  aliases: ["ukraine"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFA\uD83C\uDDEC",
  description: "flag: Uganda",
  category: "Flags",
  aliases: ["uganda"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFA\uD83C\uDDF2",
  description: "flag: U.S. Outlying Islands",
  category: "Flags",
  aliases: ["us_outlying_islands"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDFA\uD83C\uDDF3",
  description: "flag: United Nations",
  category: "Flags",
  aliases: ["united_nations"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDDFA\uD83C\uDDF8",
  description: "flag: United States",
  category: "Flags",
  aliases: ["us"],
  tags: ["flag", "united", "america"],
  unicode_version: "6.0",
  ios_version: "6.0"
}, {
  emoji: "\uD83C\uDDFA\uD83C\uDDFE",
  description: "flag: Uruguay",
  category: "Flags",
  aliases: ["uruguay"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFA\uD83C\uDDFF",
  description: "flag: Uzbekistan",
  category: "Flags",
  aliases: ["uzbekistan"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFB\uD83C\uDDE6",
  description: "flag: Vatican City",
  category: "Flags",
  aliases: ["vatican_city"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDFB\uD83C\uDDE8",
  description: "flag: St. Vincent & Grenadines",
  category: "Flags",
  aliases: ["st_vincent_grenadines"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFB\uD83C\uDDEA",
  description: "flag: Venezuela",
  category: "Flags",
  aliases: ["venezuela"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFB\uD83C\uDDEC",
  description: "flag: British Virgin Islands",
  category: "Flags",
  aliases: ["british_virgin_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFB\uD83C\uDDEE",
  description: "flag: U.S. Virgin Islands",
  category: "Flags",
  aliases: ["us_virgin_islands"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFB\uD83C\uDDF3",
  description: "flag: Vietnam",
  category: "Flags",
  aliases: ["vietnam"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFB\uD83C\uDDFA",
  description: "flag: Vanuatu",
  category: "Flags",
  aliases: ["vanuatu"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFC\uD83C\uDDEB",
  description: "flag: Wallis & Futuna",
  category: "Flags",
  aliases: ["wallis_futuna"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDFC\uD83C\uDDF8",
  description: "flag: Samoa",
  category: "Flags",
  aliases: ["samoa"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFD\uD83C\uDDF0",
  description: "flag: Kosovo",
  category: "Flags",
  aliases: ["kosovo"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFE\uD83C\uDDEA",
  description: "flag: Yemen",
  category: "Flags",
  aliases: ["yemen"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFE\uD83C\uDDF9",
  description: "flag: Mayotte",
  category: "Flags",
  aliases: ["mayotte"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "9.0"
}, {
  emoji: "\uD83C\uDDFF\uD83C\uDDE6",
  description: "flag: South Africa",
  category: "Flags",
  aliases: ["south_africa"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFF\uD83C\uDDF2",
  description: "flag: Zambia",
  category: "Flags",
  aliases: ["zambia"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDDFF\uD83C\uDDFC",
  description: "flag: Zimbabwe",
  category: "Flags",
  aliases: ["zimbabwe"],
  tags: [],
  unicode_version: "6.0",
  ios_version: "8.3"
}, {
  emoji: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F",
  description: "flag: England",
  category: "Flags",
  aliases: ["england"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F",
  description: "flag: Scotland",
  category: "Flags",
  aliases: ["scotland"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}, {
  emoji: "\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F",
  description: "flag: Wales",
  category: "Flags",
  aliases: ["wales"],
  tags: [],
  unicode_version: "11.0",
  ios_version: "12.1"
}];
var Emoji = _core.Extension.create({
  name: "emoji",
  addOptions: {
    suggestion: {
      "char": ":",
      startOfLine: false,
      allowSpaces: false,
      items: function items(_ref) {
        var query = _ref.query;
        return emojisList.filter(function (emoji) {
          return emoji.emoji.toLowerCase().includes(query.toLowerCase()) || emoji.aliases.some(function (alias) {
            return alias.toLowerCase().includes(query.toLowerCase());
          }) || emoji.description.toLowerCase().includes(query.toLowerCase());
        }).slice(0, 10);
      },
      render: function render() {
        var component;
        var popup;
        return {
          onStart: function onStart(props) {
            component = new _react2.ReactRenderer(_EmojiList["default"], {
              props: props,
              editor: props.editor
            });
            if (!props.clientRect) {
              return;
            }
            popup = (0, _tippy["default"])("body", {
              getReferenceClientRect: props.clientRect,
              appendTo: function appendTo() {
                return document.body;
              },
              content: component.element,
              showOnCreate: true,
              interactive: true,
              trigger: "manual",
              placement: "bottom-start"
            });
          },
          onUpdate: function onUpdate(props) {
            component.updateProps(props);
            if (!props.clientRect) {
              return;
            }
            popup[0].setProps({
              getReferenceClientRect: props.clientRect
            });
          },
          onKeyDown: function onKeyDown(props) {
            var _component$ref;
            if (props.event.key === "Escape") {
              popup[0].hide();
              return true;
            }
            return (_component$ref = component.ref) === null || _component$ref === void 0 ? void 0 : _component$ref.onKeyDown(props);
          },
          onExit: function onExit() {
            popup[0].destroy();
            component.destroy();
          }
        };
      },
      command: function command(_ref2) {
        var editor = _ref2.editor,
          range = _ref2.range,
          props = _ref2.props;
        editor.chain().focus().deleteRange(range).insertContentAt(range.from, props.emoji).run();
      }
    }
  },
  addProseMirrorPlugins: function addProseMirrorPlugins() {
    return [(0, _suggestion["default"])(_objectSpread({
      pluginKey: new _state.PluginKey("emojiPluginKey"),
      editor: this.editor
    }, this.options.suggestion))];
  }
});
var _default = Emoji;
exports["default"] = _default;