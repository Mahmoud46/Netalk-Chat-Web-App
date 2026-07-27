import winking_face from "../../assets/icons/emojis/winking_face.png";
import ace_with_bags_under_eyes from "../../assets/icons/emojis/ace_with_bags_under_eyes.png";
import beaming_face_with_smiling_eyes from "../../assets/icons/emojis/beaming_face_with_smiling_eyes.png";
import clapping_hands from "../../assets/icons/emojis/clapping_hands.png";
import face_with_tears_of_joy from "../../assets/icons/emojis/face_with_tears_of_joy.png";
import grinning_face from "../../assets/icons/emojis/grinning_face.png";
import grinning_face_with_big_eyes from "../../assets/icons/emojis/grinning_face_with_big_eyes.png";
import grinning_face_with_smiling_eyes from "../../assets/icons/emojis/grinning_face_with_smiling_eyes.png";
import grinning_face_with_sweat from "../../assets/icons/emojis/grinning_face_with_sweat.png";
import grinning_squinting_face from "../../assets/icons/emojis/grinning_squinting_face.png";
import hand_with_fingers_splayed from "../../assets/icons/emojis/hand_with_fingers_splayed.png";
import handshake from "../../assets/icons/emojis/handshake.png";
import heart_hands from "../../assets/icons/emojis/heart_hands.png";
import index_pointing_at_the_viewer from "../../assets/icons/emojis/index_pointing_at_the_viewer.png";
import melting_face from "../../assets/icons/emojis/melting_face.png";
import ok_hand from "../../assets/icons/emojis/ok_hand.png";
import pinched_fingers from "../../assets/icons/emojis/pinched_fingers.png";
import pinching_hand from "../../assets/icons/emojis/pinching_hand.png";
import raised_back_of_hand from "../../assets/icons/emojis/raised_back_of_hand.png";
import rolling_on_the_floor_laughing from "../../assets/icons/emojis/rolling_on_the_floor_laughing.png";
import slightly_smiling_face from "../../assets/icons/emojis/slightly_smiling_face.png";
import smiling_face_with_halo from "../../assets/icons/emojis/smiling_face_with_halo.png";
import smiling_face_with_heart_eyes from "../../assets/icons/emojis/smiling_face_with_heart_eyes.png";
import smiling_face_with_hearts from "../../assets/icons/emojis/smiling_face_with_hearts.png";
import smiling_face_with_smiling_eyes from "../../assets/icons/emojis/smiling_face_with_smiling_eyes.png";
import star_struck from "../../assets/icons/emojis/star_struck.png";
import thumbs_down from "../../assets/icons/emojis/thumbs_down.png";
import thumbs_up from "../../assets/icons/emojis/thumbs_up.png";
import upside_down_face from "../../assets/icons/emojis/upside_down_face.png";
import victory_hand from "../../assets/icons/emojis/victory_hand.png";
import vulcan_salute from "../../assets/icons/emojis/vulcan_salute.png";
import waving_hand from "../../assets/icons/emojis/waving_hand.png";

const emojiIcons = {
  winking_face,
  ace_with_bags_under_eyes,
  beaming_face_with_smiling_eyes,
  clapping_hands,
  face_with_tears_of_joy,
  grinning_face,
  grinning_face_with_big_eyes,
  grinning_face_with_smiling_eyes,
  grinning_face_with_sweat,
  grinning_squinting_face,
  hand_with_fingers_splayed,
  handshake,
  heart_hands,
  index_pointing_at_the_viewer,
  melting_face,
  ok_hand,
  pinched_fingers,
  pinching_hand,
  raised_back_of_hand,
  rolling_on_the_floor_laughing,
  slightly_smiling_face,
  smiling_face_with_halo,
  smiling_face_with_heart_eyes,
  smiling_face_with_hearts,
  smiling_face_with_smiling_eyes,
  star_struck,
  thumbs_down,
  thumbs_up,
  upside_down_face,
  victory_hand,
  vulcan_salute,
  waving_hand,
} as const;

export type EmojiType = keyof typeof emojiIcons;

export default function EmojiIcon({
  label,
  className = "",
}: {
  label?: EmojiType;
  className?: string;
}) {
  if (!label || !(label in emojiIcons)) return <></>;

  return (
    <img src={emojiIcons[label]} alt="" loading="lazy" className={className} />
  );
}
