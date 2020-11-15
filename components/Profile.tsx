import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { connect, useSelector } from "react-redux";
import { Redux } from "../interfaces/Redux";
import { toggleProfile, ToggleProfile } from "../redux/actions";
import styles from "../styles/profile.module.css";

interface Props {
  toggleProfile: (toggle: boolean) => ToggleProfile;
}

const Profile: React.FC<Props> = props => {
  const showProfile = useSelector<Redux>(
    state => state.user.showProfile
  ) as Redux["user"]["showProfile"];
  return (
    <div className={`${showProfile ? styles.shown : ""}`}>
      <div className={`${styles.container} `}>
        <div onClick={() => props.toggleProfile(false)} className={styles.icon}>
          <HiOutlineArrowLeft size="30px" />
        </div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime
        reprehenderit, et sint asperiores dolorem ipsam ab ratione quae ad velit
        odio quia iusto similique vitae ex veritatis nisi hic nihil repellendus
        nemo voluptatem? Voluptates eligendi porro ullam ipsa exercitationem
        blanditiis unde excepturi soluta, quidem pariatur tenetur assumenda
        labore a. Reiciendis cupiditate rem animi exercitationem facere est,
        veritatis voluptas delectus quaerat soluta enim architecto facilis optio
        quam, at tempore voluptatem quibusdam. Asperiores error mollitia earum
        consequuntur! Recusandae facere dolor iure! Hic, cum assumenda totam id
        recusandae laudantium eaque laborum nihil beatae quaerat? Repellat
        molestias aut, quam voluptatum ullam qui debitis ad reiciendis nemo
        quaerat incidunt enim nobis quas, aspernatur maxime, pariatur labore sit
        alias provident expedita eligendi itaque voluptas. Hic obcaecati rem
        excepturi similique ratione doloremque repellat perferendis dicta quod
        magni illo ad aperiam, asperiores quis! Omnis quaerat illum beatae hic
        excepturi, et dignissimos assumenda eaque, praesentium laudantium
        possimus dolore optio distinctio cumque! Sapiente, laudantium vero.
        Quaerat in enim molestias voluptates, expedita sapiente? Repudiandae qui
        laboriosam non, ipsam ex magnam laudantium cum beatae nemo aspernatur
        culpa voluptatem nihil tenetur consequatur labore velit excepturi
        doloribus saepe eveniet asperiores pariatur voluptatum libero et!
        Repellat consequatur sit doloribus assumenda praesentium, blanditiis
        accusantium eum sapiente.
      </div>
    </div>
  );
};

export default connect(null, { toggleProfile })(Profile);
