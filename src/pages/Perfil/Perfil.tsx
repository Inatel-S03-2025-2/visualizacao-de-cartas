import styles from "./Perfil.module.css";

const Perfil: React.FC = () => {
 
  const player = {
    name: "Ash Ketchum",
    email: "ash@pallet.com",
    level: 42,
    victories: 128,
    defeats: 45,
    favoritePokemon: "Pikachu",

  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h2 className={styles.name}>{player.name}</h2>
        <p className={styles.email}>{player.email}</p>

        <div className={styles.stats}>
          <div>
            <span className={styles.label}>Nível</span>
            <span>{player.level}</span>
          </div>
          <div>
            <span className={styles.label}>Vitórias</span>
            <span>{player.victories}</span>
          </div>
          <div>
            <span className={styles.label}>Derrotas</span>
            <span>{player.defeats}</span>
          </div>
        </div>

        <p className={styles.favorite}>
          Pokémon Favorito:{" "}
          <strong className={styles.highlight}>{player.favoritePokemon}</strong>
        </p>
      </div>
    </div>
  );
};

export default Perfil;