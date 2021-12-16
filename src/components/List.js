import React, {useEffect, useState} from "react";
import {API} from "../API";
import {Link} from "react-router-dom";
import styles from "./List.module.css";

const List = (props) => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [loadingData, setloadingData] = useState(false);
  const postPerPage = 20;

  const getData = () => {
    setloadingData(false);
    let dataAPi = API.getUsersList(page, postPerPage);
    if (props && props.id) {
      dataAPi = API.getUserFriends(props.id, page, postPerPage);
    }

    dataAPi.then((data) => {
      if (data.data.list) {
        const listData = [...list, ...data.data.list];
        setList(listData);
        if (data.data.pagination.total <= list.length) return;
        setPage(data.data.pagination.nextPage);
      }
    });
  };

  useEffect(() => {
    if (!loadingData) return;
    getData();
  }, [loadingData]);

  useEffect(() => {
    getData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    )
      return;
    setloadingData(true);
  };

  return (
    <div className={styles.list}>
      {list.map((item) => (
        <div key={item.id} className={styles.card}>
          <h2>
            {item.prefix}
            {item.name} - {item.lastName}
          </h2>
          <p>{item.title}</p>
          <Link to={"/user/" + item.id}>
            <img src={item.imageUrl + item.id} alt={item.title} />
          </Link>
        </div>
      ))}
      {loadingData && (
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif" />
      )}
    </div>
  );
};

export default List;
