import male_child_avatar from "../../assets/avatar/male_child.png";
import male_teen_avatar from "../../assets/avatar/male_teen.png";
import male_adult_avatar from "../../assets/avatar/male_adult.png";
import male_senior_avatar from "../../assets/avatar/male_senior.png";

import female_child_avatar from "../../assets/avatar/female_child.png";
import female_teen_avatar from "../../assets/avatar/female_teen.png";
import female_adult_avatar from "../../assets/avatar/female_adult.png";
import female_senior_avatar from "../../assets/avatar/female_senior.png";
import female_teen_hijab_avatar from "../../assets/avatar/famale_teen_hijab.png";
import female_adult_hijab_avatar from "../../assets/avatar/female_adult_hijab.png";
import female_senior_hijab_avatar from "../../assets/avatar/female_senior_hijab.png";

import type { Gender } from "../../types";

export const Avatar = ({
  gender,
  age,
  hijab = true,
  className = "",
}: {
  gender: Gender;
  age: number;
  hijab?: boolean;
  className?: string;
}) => {
  switch (gender) {
    case "male":
      return (
        <img
          src={
            age < 12
              ? male_child_avatar
              : age < 20
                ? male_teen_avatar
                : age < 64
                  ? male_adult_avatar
                  : male_senior_avatar
          }
          className={className}
          alt="male"
        />
      );
    case "female":
      return (
        <img
          src={
            age < 12
              ? female_child_avatar
              : age < 20
                ? hijab
                  ? female_teen_hijab_avatar
                  : female_teen_avatar
                : age < 64
                  ? hijab
                    ? female_adult_hijab_avatar
                    : female_adult_avatar
                  : hijab
                    ? female_senior_hijab_avatar
                    : female_senior_avatar
          }
          className={className}
          alt="female"
        />
      );

    default:
      return <img src={male_adult_avatar} alt="male" className={className} />;
  }
};
