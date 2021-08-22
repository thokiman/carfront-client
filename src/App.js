import { AppBar, Toolbar, Typography } from "@material-ui/core";
import Login from "./components/login/login.component";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppBar id="app-bar" position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Car List
          </Typography>
        </Toolbar>
      </AppBar>
      <Login />
    </div>
  );
}

export default App;
