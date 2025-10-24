import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { User as UserIcon, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import styles from "./styles.module.css";

export function UserDropdown() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfile = () => {
    setIsOpen(false);
    navigate("/dashboard/profile");
  };

  if (!user) return null;

  return (
    <div className={styles.userDropdown} ref={dropdownRef}>
      <button className={styles.userButton} onClick={() => setIsOpen(!isOpen)}>
        <UserIcon size={20} />
        <span className={styles.username}>{user.username}</span>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <button className={styles.dropdownItem} onClick={handleProfile}>
            <UserIcon size={18} />
            <span>Visualizar Perfil</span>
          </button>
          <button className={styles.dropdownItem} onClick={handleLogout}>
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}
