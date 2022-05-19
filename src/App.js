import "./App.css";
import {useEffect, useState} from "react";
import steem from "steem";
import moment from "moment";

function App() {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        steem.api.getAccountHistory(username, -1, 100, (err, result) => {
            let transfers = result.filter((x) => x[1].op[0] === "transfer");
            let myArray = [];
            for (let item in transfers) {
                myArray.push(transfers[item][1]);
            }
            setData(myArray);
        });
        return() => {};
    }, [username]);

    data.sort((a, b) => b.block - a.block);

    // console.log(username)
    return (
        <div className="App">
            <input style={
                    {
                        padding: "1rem",
                        borderRadius: "2rem",
                        fontSize: "23px",
                        textAlign: "center",
                        margin: "1rem",
                        width: "35%",
                        outline: "none",
                        color: "#000000",
                        backgroundColor: "#b6b6b6"
                    }
                }
                placeholder={"Enter a username"}
                value={username}
                type="text"
                onChange={
                    (e) => setUsername(e.target.value)
                }/> {
            data.map((dt, index) => (
                <div style={
                        {
                            margin: "1rem",
                            padding: "0.2rem",
                            textAlign: "center",
                            borderRadius: "2rem",
                            fontSize: "19px"
                        }
                    }
                    key={index}>
                    <p key={index}
                        style={
                            {color: "#d0d0d0"}
                    }>
                        <b>{
                            moment(dt.timestamp).fromNow()
                        }</b>
                        - Claim rewards:{" "}
                        <span style={
                            {color: "#ff9100"}
                        }>
                            {
                            dt.op[1].amount
                        }</span>
                    </p>
                </div>
            ))
        } </div>
    );
}

export default App;
