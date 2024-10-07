import styles from "./CS.module.scss";

const stats = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];
const chara = ["class", "subclass", "race", "subrace", "background"];
const CharaSheet = () => {
  // Function to generate table rows dynamically
  const generateAttributes = () => {
    return stats.map((stat) => (
      <tr key={stat}>
        <td className={styles.td}>{stat}</td>
        <td className={styles.td}>
          <input type="number" className={styles.statInput} /> 
        </td>
        <td className={styles.td}>0</td>
      </tr>
    ));
  };

  const generateCharaInfo = () => {
    return chara.map((chara) => (
      <tr key={chara}>
        <td colSpan="1" className={styles.td}>{chara}</td>
        <td colSpan="4" className={styles.td}>
          <select className={styles.chDrop}>
            <option>Cleric</option>
            <option>Fighter</option>
            <option>Rogue</option>
          </select>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <p className={styles.header}>Character Sheet</p>
      <div className={styles.container}>
        <div className={styles.box}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th colSpan="6" className={styles.th}>Character Info</th>
              </tr>
              <tr>
                <th className={styles.th}>Level</th>
                <th className={styles.th}>
                  <input type="number" className={styles.statInput} />
                </th>
                <th className={styles.th}>PB: num</th>
                <th className={styles.th}>INSP: YES</th>
              </tr>
            </thead>
            <tbody id="chara-info">{generateCharaInfo()}</tbody>
          </table>
        </div>
        <div className={styles.box}>
          <table className={styles.table}>
            <thead>
            <tr>
              <th className={styles.th}>Stat</th>
              <th className={styles.th}>Value</th>
              <th className={styles.th}>Modifier</th>
            </tr>
            </thead>
            <tbody id="stats-table">{generateAttributes()}</tbody>
          </table>
        </div>
        <div className={styles.box}></div>
        <div className={styles.box}>Three</div>
        <div className={styles.box}>Four</div>
      </div>
    </div>
  );
};

export default CharaSheet;