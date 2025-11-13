
import styles from "./Perfil.module.css";

const Profile: React.FC = () => {
  const player = {
    name: "Ash Ketchum",
    email: "ash@pallet.com",
    victories: 128,
    defeats: 45,
    favoritePokemon: "Pikachu",
    avatar: "https://archives.bulbagarden.net/media/upload/8/8a/Ash_SM.png",
    pokemons: [
      { name: "Charizard", defeated: 35, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png" },
      { name: "Bulbasaur", defeated: 20, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
      { name: "Squirtle", defeated: 18, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
    ],
  };

  return (
    <div className={styles.container}>
      {/* Coluna esquerda com informações do jogador */}
      <aside className={styles.sidebar}>
        <img src={player.avatar} alt="Foto do jogador" className={styles.avatar} />
        <h2 className={styles.name}>{player.name}</h2>
        <p className={styles.email}>{player.email}</p>

        <div className={styles.stats}>
          <div>
            <span className={styles.label}>Vitórias:</span>
            <span>{player.victories}</span>
          </div>
          <div>
            <span className={styles.label}>Derrotas:</span>
            <span>{player.defeats}</span>
          </div>
          <div>
            <span className={styles.label}>Pokémon Preferido:</span>
            <span>{player.favoritePokemon}</span>
          </div>
        </div>
      </aside>

      {/* Cards dos Pokémons */}
      <main className={styles.pokemonSection}>
        {player.pokemons.map((pokemon, index) => (
          <div key={index} className={styles.pokemonCard}>
            <img src={pokemon.image} alt={pokemon.name} className={styles.pokemonImage} />
            <h3 className={styles.pokemonName}>{pokemon.name}</h3>
            <p className={styles.defeated}>Pokémons derrotados: {pokemon.defeated}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Profile;