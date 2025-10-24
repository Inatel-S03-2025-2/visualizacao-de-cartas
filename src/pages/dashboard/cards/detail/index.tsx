import { PokemonViewer } from "@/components/PokemonViewer";

import styles from "./styles.module.css";
import type { Pokemon } from "@/types/pokemon";

export function CardsDetailPage() {

  return (
    <div className={styles.viewerContainer}>
      <PokemonViewer />
    </div>
  );
}
