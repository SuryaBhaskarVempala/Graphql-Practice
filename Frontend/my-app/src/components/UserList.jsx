import { useTranslation } from "react-i18next";
import FormExample from "./FormExample"

export default function UsersList() {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>{t("users")}</h3>
      <ul>
        <li>Surya</li>
        <li>Bhaskar</li>
        <li>John</li>
      </ul>

      <FormExample/>
    </div>
  );
}
