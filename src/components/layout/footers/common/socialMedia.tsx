// import { IconPickerItem } from 'react-fa-icon-picker'

import { kebabCase } from "@/helpers/misc";

const SocialMedia = ({ data, socialClass }: any) => {
  return (
    <div className={`${socialClass || "footer-social"}`}>
      <ul>
        {data &&
          data.length > 0 &&
          data.map((soc: any, i: number) => (
            <li key={i}>
              <a href={soc?.url || null} target="_blank">
                <i
                  className={`fa-brands ${kebabCase(soc?.icon)}`}
                  aria-hidden="true"
                ></i>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SocialMedia;
