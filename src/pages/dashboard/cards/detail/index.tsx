import { PokemonViewer } from "@/components/PokemonViewer";

import styles from "./styles.module.css";

export function CardsDetailPage() {
  return (
    <div className={styles.viewerContainer}>
      <PokemonViewer />
    </div>
  );
}
