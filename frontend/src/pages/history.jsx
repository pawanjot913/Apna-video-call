import React, { useContext, useEffect, useState } from "react";
import { IconButton,  Card, CardContent, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function HistoryPage() {

    const { getHistoryOfUser } = useContext(AuthContext);
    const [meeting, setMeeting] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                let result = await getHistoryOfUser();
                setMeeting(result);
              

            } catch (e) {
                console.log(e);
            }
        };

        fetchHistory(); 
    }, []);
    console.log(meeting);
    return (
        <>
            <IconButton onClick={() => navigate("/home")}>
                <HomeIcon />
            </IconButton>

            <div className="cards">
                {meeting.length!==0? meeting.map((e, i) => (
                    <div className="card" key={i}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
                                    Code:{e.meetingId}
                                </Typography>

                                

                                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                                    Date: {new Date(e.date).toLocaleString()}
                                </Typography>

                            </CardContent>

                            
                        </Card>
                    </div>
                )):<></>}
            </div>
        </>
    );
}
