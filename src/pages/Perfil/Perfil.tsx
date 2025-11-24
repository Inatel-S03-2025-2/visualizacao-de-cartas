import styles from "./Perfil.module.css";

const Profile: React.FC = () => {
  const player = {
    name: "Ash Ketchum",
    email: "ash@pallet.com",
    victories: 128,
    defeats: 45,
    favoritePokemon: "Pikachu",
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/trainers/ash.png",
    pokemons: [
      { name: "Pikachu", defeated: 12, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
      { name: "Charizard", defeated: 27, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" },
      { name: "Blastoise", defeated: 19, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png" },
      { name: "Venusaur", defeated: 15, sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png" },
    ]
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.profileContainer}>

        
        <div className={styles.leftCard}>
          <img
            src={player.avatar}
            alt="Avatar do jogador"
            className={styles.avatar}
          />

          <h2>{player.name}</h2>
          <p className={styles.email}>{player.email}</p>

          <div className={styles.infoBox}>
            <span>Vitórias</span>
            <strong>{player.victories}</strong>
          </div>

          <div className={styles.infoBox}>
            <span>Derrotas</span>
            <strong>{player.defeats}</strong>
          </div>

          <div className={styles.infoBox}>
            <span>Pokémon preferido: </span>
            <strong className={styles.favoritePokemon}>{player.favoritePokemon}</strong>
          </div>
        </div>

        
        <div className={styles.rightContent}>
          <h2 className={styles.sectionTitle}>Meus Pokémons</h2>

          <div className={styles.pokemonGrid}>
            {player.pokemons.map((p) => (
              <div key={p.name} className={styles.pokemonCard}>
                <img src={p.sprite} className={styles.pokemonImage} />
                <h3>{p.name}</h3>
                <p>Pokémons derrotados: <strong>{p.defeated}</strong></p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
