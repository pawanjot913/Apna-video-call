import React, { useContext } from "react";
import withAuth from "../utils/withAuth";
import { IconButton } from "@mui/material";
import RestoreIcon from '@mui/icons-material/Restore';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import styles from "../styles/home.module.css";
import Button from '@mui/material/Button';
import { AuthContext } from "../contexts/AuthContext";

function HomePage() {
    const { addToUserHistory } = useContext(AuthContext);
    let navigate = useNavigate();
    let [meetingcode, setMeetingcode] = useState("");
    let handlejoinvideocall = async  () => {
        await addToUserHistory(meetingcode);
        navigate(`/${meetingcode}`);
    }

    return (
        <>
        <div className={styles.navbar}>
            <div className={styles.logo}>
                <h1>Apna Video Call</h1>
            </div>
            <div className={styles.buttons}>
                <IconButton onClick={() => navigate("/history")}>
                    <RestoreIcon/>
                        <p>History</p>
                    
                </IconButton>
                <Button variant="contained" onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/Auth");
                }}>Logout</Button>
            </div>
            
        </div>
        <div className={styles.content}>
                 <div className={styles.leftContent}>
                    <h5>Providing Quality Video call Just Like Quality Education</h5>
                    <div className={styles.textarea}>

                    <TextField onChange={(e) => setMeetingcode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                    <Button variant="contained" onClick={handlejoinvideocall}>Join Video Call</Button>
                    </div>
                    </div>   
                <div className={styles.rightContent}>
                    <img src="/logo3.png" alt="calling image" />
                </div>
        </div>
        </>
    )
}

export default withAuth(HomePage);