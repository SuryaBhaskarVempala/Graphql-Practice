import { useTranslation } from "react-i18next";

export default function Stats() {
  const { t } = useTranslation();

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>{t("stats")}</h3>
      <p>Total: 1200</p>
    </div>
  );
}
