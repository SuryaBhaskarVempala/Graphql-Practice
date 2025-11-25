import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    // Handle RTL for Arabic
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <header style={{ padding: 20, borderBottom: "1px solid #ccc" }}>
      <h2>{t("title")}</h2>

      <select
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        style={{ padding: "8px", fontSize: "16px" }}
      >
        <option value="en"> {t("lang_english")} ❤️</option>
        <option value="ar"> {t("lang_arabic")} ❤️</option>
      </select>
    </header>
  );
}
