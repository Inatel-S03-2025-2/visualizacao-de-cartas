import styles from "./Perfil.module.css";

const Profile: React.FC = () => {
  
  const player = {
    name: "Ash Ketchum",
    email: "ash@pallet.com",
    level: 42,
    victories: 128,
    defeats: 45,
    favoritePokemon: "Pikachu",
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/ash.png",
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img
          src={player.avatar}
          alt=","
          className={styles.avatar}
        />
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

export default Profile;