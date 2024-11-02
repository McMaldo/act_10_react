import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import s from './Act_10.module.css';

export default function Act_10() {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1)

  const DB_ENDPOINT = `https://dragonball-api.com/api/characters?limit=10&page=${page}`;
  const fetchData = async () => {
    try {
      const response = await fetch(DB_ENDPOINT);
      const result = await response.json();
      setData(result);
      console.log(result)
    } catch (err) {
      console.log("error: "+err)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [DB_ENDPOINT]);

  const handlePage = (newPage) => {
    setPage(newPage);
    document.querySelector("."+s.heading).scrollIntoView({behavior: 'smooth'})
  }
  const NavButtons = () => {
    const nav = [1,2,3,4,5,6];
    return (<nav className={s.navigator}>
      {nav.map((n,nKey)=>(
        <button
          key={nKey}
          onClick={() => handlePage(n)}>
          {n}
        </button>
      ))}</nav>
    )
 }

  return (
    <main className={s.act_10}>
      <section className={s.heading}>
        <img src="https://web.dragonball-api.com/images-compress/logo_dragonballapi.webp" alt="" />
        <div className={s.desc}>
          <span>Practice with: <img src={reactLogo} alt="React" />+<img src={viteLogo} alt="Vite" /></span>
          <span>Base: <a href="https://web.dragonball-api.com/">https://web.dragonball-api.com/</a></span>
        </div>
      </section>
      <section className={s.card_list}>
        {loading ? "Loading..." :
        data.items? data.items.map((item, itemKey)=>(
          <article key={itemKey}>
            <div className={s.img_container}>
              <img src={item.image} alt="" />
            </div>
            <div className={s.data}>
              <h2>{item.name}</h2>
              <p>{item.race} - {item.gender}</p>
            </div>
            <div className={s.data_more}>
              <div className={s.data_stat}>
                <p>Base KI:</p>
                <span>{item.ki}</span>
              </div>
              <div className={s.data_stat}>
                <p>Total KI:</p>
                <span>{item.maxKi}</span>
              </div>
              <div className={s.data_stat}>
                <p>Afilliation:</p>
                <span>{item.affiliation}</span>
              </div>
            </div>
          </article>
        )) : "sin datos"}
      </section>
      <NavButtons/>
    </main>
  )
}