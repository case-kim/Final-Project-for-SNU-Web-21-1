import { Button, Grid } from "@material-ui/core";
import { useState } from "react";
import { auth } from "../../firebase";
import Chat from "./Chat";
import ChatList from "./ChatList";

const ChatBoard = () => {

    const user = auth.currentUser;
    const [currentCounterId, setCurrentCounterId] = useState(null);

    return <Grid container>

    <Grid item xs={4} className="center">
        <ChatList userId={user.uid} setCurrentCounterId={setCurrentCounterId} />
    </Grid>

    <Grid item xs={8} className="center">
        <Chat counterId={currentCounterId} />
    </Grid>
</Grid>
}

export default ChatBoard;