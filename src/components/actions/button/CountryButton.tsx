import style from "../../styles/Button.module.scss";
import ReactCountryFlag from "react-country-flag";

function CountryButton(props: any) {
  return (
    <div className={style.countryBtn} onClick={props.onClick}>
      {props.country === "en" && (
        <ReactCountryFlag
          countryCode="US"
          svg
          style={{
            width: "1em",
            height: "1em",
          }}
          title="Select Country"
        />
      )}

      {props.country === "id" && (
        <ReactCountryFlag
          countryCode="ID"
          svg
          style={{
            width: "1em",
            height: "1em",
          }}
          title="Select Country"
        />
      )}
    </div>
  );
}

export default CountryButton;
