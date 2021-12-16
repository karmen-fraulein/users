import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {API} from "../API";
import List from "./List";
import styles from "./Single.module.css";

localStorage.setItem("breadcums", "");

function Single() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [breadcums, setBreadcumps] = useState("");

  useEffect(() => {
    let name = localStorage.getItem("breadcums");
    name = name || "";
    API.getUser(params.userId).then((data) => {
      setUser(data.data);
      if (name !== "") {
        setBreadcumps(name + data.data.name + " > ");
      }

      localStorage.setItem("breadcums", name + data.data.name + " > ");
    });
  }, [params]);

  return (
    <div className="user">
      <div className={styles.title}>
        <h1>User</h1>
      </div>
      {user ? (
        <>
          <div className={styles.singleUser}>
            <div>
              <img src={user.imageUrl + user.id} alt={user.title} />
            </div>
            <div>
              <h3>Info:</h3>
              <h2>
                {user.prefix}
                {user.name} - {user.lastName}
              </h2>
              <p>{user.title}</p>
              <p>Email: {user.email}</p>
              <p>Ip Address: {user.ip}</p>
              <p>Job Area: {user.jobArea}</p>
              <p>Job Type: {user.jobType}</p>
            </div>
            <div>
              <h3>Address:</h3>
              <p>{user.address.country}</p>
              <p>City: {user.address.city}</p>
              <p>State: {user.address.state}</p>
              <p>Street Address: {user.address.streetAddress}</p>
              <p>ZIP: : {user.address.zipCode}</p>
            </div>
          </div>
          <div className={styles.breadcums}>
            <h3>{breadcums}</h3>
          </div>

          <div className={styles.title}>
            <h1>Friends:</h1>
            <List id={user.id} />
          </div>
        </>
      ) : (
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Loader.gif/480px-Loader.gif" />
      )}
    </div>
  );
}

export default Single;
