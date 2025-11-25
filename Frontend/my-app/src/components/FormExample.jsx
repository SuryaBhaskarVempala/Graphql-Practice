import { useTranslation } from "react-i18next";

export default function FormExample() {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div style={{ padding: 20 }}>
      <label>{t("name")}</label><br/>

      <input
        type="text"
        placeholder={t("name")}
        style={{
          width: "250px",
          padding: "10px",
          marginTop: "5px",
          direction: isArabic ? "rtl" : "ltr",
          textAlign: isArabic ? "right" : "left",
        }}
      />
    </div>
  );
}
