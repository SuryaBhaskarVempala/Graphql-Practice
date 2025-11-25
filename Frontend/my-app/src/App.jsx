import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from  "./components/Header";
import UsersList from "./components/UserList";
import Stats from "./components/Stats";
import "./i18n";  // IMPORTANT

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div style={{ padding: "20px" }}>
      <Header />
      <UsersList />
      <Stats />
    </div>
  );
}
