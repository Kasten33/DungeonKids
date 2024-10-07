import React from 'react';
import styles from './CS.module.scss';

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
      <p className={styles.header}>Header</p>
      <div className={styles.container}>
        <div className={styles.box}>
          <table>
            <thead>
              <tr>
                <th colSpan="6">Character Info</th>
              </tr>
              <tr>
                <th>Level</th>
                <th>
                  <input type="number" className={styles.statInput} />
                </th>
                <th>PB: num</th>
                <th>INSP: YES</th>
              </tr>
            </thead>
            <tbody id="chara-info">{generateCharaInfo()}</tbody>
          </table>
        </div>
        <div className={styles.box}>
          <table>
            <thead>
              <tr>
                <th>Stat</th>
                <th>Value</th>
                <th>Modifier</th>
              </tr>
            </thead>
            <tbody id="stats-table">{generateAttributes()}</tbody>
          </table>
        </div>
        <div className={styles.box}>Two</div>
        <div className={styles.box}>Three</div>
        <div className={styles.box}>Four</div>
      </div>
    </div>
  );
};

export default CharaSheet;