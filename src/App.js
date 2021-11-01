import './App.css';
import {useEffect, useState} from "react";
import steem from "steem";
import moment from "moment";

function App() {
    const [data, setData] = useState([]);
    const [username, setUsername] = useState("ned");

    useEffect(() => {
        let isMounted = true
        steem.api.getAccountHistory(username, -1, 100, (err, result) => {
            let transfers = result.filter(tx => tx[1].op[0] === 'transfer')
            let myArray = []
            for (let item in transfers) {
                myArray.push(transfers[item][1])
            }
            setData(myArray)
        })
        return () => {
            isMounted = false
        }
    }, [username])

    console.log(username)
    return (
        <div className="App">

            <input value={username} type="text" onChange={(e) => setUsername(e.target.value)} />

            {
                data.map((dt, index) => (

                    <p key={index}>{moment(dt.timestamp).fromNow()} - Claim rewards: {dt.op[1].amount}</p>
                ))
            }

        </div>
    );
}

export default App;
